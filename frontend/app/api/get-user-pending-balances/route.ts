import {NextRequest, NextResponse} from 'next/server';
import {ethers} from 'ethers';
import {CONTRACT_ABI, CONTRACT_ADDRESS} from '@/common/constants/abi';

// This endpoint is not protected with authentication for demo purposes,
// but in a real-world scenario, we will protect it to allow access only for authenticated producers.
// And the signer will be the producer's wallet, not our admin wallet.
export async function GET(request: NextRequest) {
  try {
    // Get containerId from request query
    const userAddress = request.nextUrl.searchParams.get('address');

    if (!userAddress) {
      return NextResponse.json(
        {
          error:
            'Invalid payload: user address must be a valid ethereum address.',
        },
        {status: 400}
      );
    }

    const rpcUrl = process.env.RPC_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const contractAddress = CONTRACT_ADDRESS;

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
    const args = [userAddress];
    const txData = await contract.pendingBalances(...args);

    return NextResponse.json({
      success: true,
      data: Number(txData) / 100,
    });
  } catch (error: any) {
    console.error('Error executing contract method:', error);
    return NextResponse.json(
      {error: error.message || 'Unknown error'},
      {status: 500}
    );
  }
}
