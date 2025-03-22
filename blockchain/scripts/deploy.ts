import hre, { ethers } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import logger from '../utils/logger';
import { getEnv } from '../utils/env';

const CONTRACT_NAME = 'MyContract';

type Contract = Awaited<
  ReturnType<HardhatRuntimeEnvironment['ethers']['deployContract']>
>;

const getNetwork = () => getEnv('HARDHAT_NETWORK', 'localhost');

async function deployContract(
  contractName: string,
  constructorArguments: string[] = [],
): Promise<Contract> {
  const ContractFactory = await ethers.getContractFactory(contractName);
  const contract = await ContractFactory.deploy(...constructorArguments);
  const contractAddress = await contract.getAddress();

  // Wait for network confirmation
  const network = getNetwork();
  const isRealNetwork = !!network && network !== 'localhost';
  if (isRealNetwork) {
    const res = await contract.waitForDeployment();
    await res.deploymentTransaction()?.wait(5);
  }
  logger.success(
    `Contract ${contractName} deployed on network ${network} at address ${contractAddress}`,
  );

  return contract as Contract;
}

async function verifyContract(
  contractName: string,
  contract: Contract,
  constructorArguments: string[] = [],
) {
  try {
    const contractAddress = await contract.getAddress();
    await hre.run('verify:verify', {
      address: contractAddress,
      constructorArguments,
    });
    logger.success('Contract', contractName, 'verified!');
  } catch (error: any) {
    if (error?.message?.toLowerCase().includes('already verified')) {
      logger.info('Contract', contractName, 'already verified!');
    } else {
      logger.error('Contract', contractName, 'verification failed:', error);
    }
  }
}

async function main() {
  const [deployer] = await ethers.getSigners();
  logger.info('Deploying contracts with the account:', deployer.address);

  const network = getNetwork();
  const isRealNetwork = !!network && network !== 'localhost';

  // Deploy contracts
  const baseContract = await deployContract(CONTRACT_NAME);
  const baseContractAddress = await baseContract.getAddress();

  // Verify contracts
  if (isRealNetwork) {
    logger.info('Verifying contracts...');

    await verifyContract(CONTRACT_NAME, baseContract);
  }

  logger.info("Contract's addresses:");
  logger.info(`CONTRACT_ADDRESS="${baseContractAddress}"`);
  logger.success('Successful deployment!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });
