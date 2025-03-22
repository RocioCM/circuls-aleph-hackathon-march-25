import {NextResponse} from 'next/server';
import {ethers} from 'ethers';
import {CONTRACT_ABI} from '@/common/constants/abi';

// This endpoint is not protected with authentication for demo purposes,
// but in a real-world scenario, we will protect it to allow access only for authenticated producers.
// And the signer will be the producer's wallet, not our admin wallet.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {containerId, accepted} = body;

    if (isNaN(containerId) || typeof accepted !== 'boolean') {
      return NextResponse.json(
        {
          error:
            'Invalid payload: containerId must be a number and accepted must be a boolean.',
        },
        {status: 400}
      );
    }

    const rpcUrl = process.env.RPC_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const contractAddress = process.env.CONTRACT_ADDRESS;

    if (!rpcUrl || !privateKey || !contractAddress) {
      return NextResponse.json(
        {
          error:
            'Missing env variables: RPC_URL, PRIVATE_KEY or CONTRACT_ADDRESS',
        },
        {status: 500}
      );
    }

    // Create a provider and a wallet
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Connect to the contract
    const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, wallet);

    // Call the method dynamically
    const methodName = accepted ? 'validateContainer' : 'rejectContainer';
    const args = [containerId];
    const tx = await contract[methodName](...args);
    const receipt = await tx.wait();

    return NextResponse.json({
      success: true,
      txHash: tx.hash,
      receipt,
    });
  } catch (error: any) {
    console.error('Error executing contract method:', error);
    return NextResponse.json(
      {error: error.message || 'Unknown error'},
      {status: 500}
    );
  }
}
