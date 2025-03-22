import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { getEnv } from './utils/env';
import 'solidity-coverage';
import '@typechain/hardhat';
import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v6',
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },

    // TESTNET: World Chain Sepolia
    worldChainSepolia: {
      url: `https://worldchain-sepolia.g.alchemy.com/public`, // RPC url
      chainId: 4801,
      accounts: [`0x${getEnv('PRIVATE_KEY')}`],
    },

    // MAINNET: World Chain
    worldChain: {
      url: `https://worldchain-mainnet.g.alchemy.com/v2/8feZkJ6vk4kZHppavhSoCrONwlJ4nn4i`, // RPC url
      chainId: 480,
      accounts: [`0x${getEnv('PRIVATE_KEY')}`],
    },

    sepoliaEth: {
      url: 'https://sepolia.drpc.org',
      chainId: 11155111,
      accounts: [`0x${getEnv('PRIVATE_KEY')}`],
    },
  },
  etherscan: {
    apiKey: {
      sepoliaEth: getEnv('ETHERSCAN_API_KEY'),
      worldChainSepolia: getEnv('ETHERSCAN_API_KEY'),
      worldChain: getEnv('WORLDSCAN_API_KEY'),
    },
    customChains: [
      {
        network: 'worldChain',
        chainId: 480,
        urls: {
          apiURL: 'https://api.worldscan.org/api',
          browserURL: 'https://worldscan.org',
        },
      },
      {
        network: 'sepoliaEth',
        chainId: 11155111,
        urls: {
          apiURL: 'https://api-sepolia.etherscan.io/api',
          browserURL: 'https://sepolia.etherscan.io',
        },
      },
      {
        network: 'worldChainSepolia',
        chainId: 4801,
        urls: {
          apiURL: 'https://worldchain-sepolia.g.alchemy.com/v2',
          browserURL: 'https://worldchain-sepolia.explorer.alchemy.com/',
        },
      },
    ],
  },
};

export default config;
