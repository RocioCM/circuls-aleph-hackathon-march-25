import {NextRequest, NextResponse} from 'next/server';
import {ethers} from 'ethers';
import {CONTRACT_ABI} from '@/common/constants/abi';

// This endpoint is not protected with authentication for demo purposes,
// but in a real-world scenario, we will protect it to allow access only for authenticated producers.
// And the signer will be the producer's wallet, not our admin wallet.
export async function GET(_request: NextRequest) {
  try {
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
    const args: any[] = [];
    const txData = await contract.getPendingContainerIds(...args);

    return NextResponse.json({
      success: true,
      data: txData.map((id: bigint) => Number(id)),
    });
  } catch (error: any) {
    console.error('Error executing contract method:', error);
    return NextResponse.json(
      {error: error.message || 'Unknown error'},
      {status: 500}
    );
  }
}
