# Circuls Blockchain

We have our contract deployed on World Chain Mainnet for the demo, you can check it on the World Explorer: [https://worldscan.org/address/0x76aFD8E56201A75D7C427424A074A99258C8aD6a](https://worldscan.org/address/0x76aFD8E56201A75D7C427424A074A99258C8aD6a)

## Network

We use the Optimistic Ethereum and World Chain networks for this project. You can find more information about it [here for World](https://worldscan.org) and [here for Optimism](https://optimism.io/). You can find network configuration in the [hardhat.config.js](./hardhat.config.js) file.

- Testnet: Optimism Sepolia
- Mainnet: World Chain Mainnet

Both networks use different Etherscan API keys for contract verification. The private key for the deployment account is stored in the .env file. The account should have enough funds on the network to deploy the contracts.

## Development

### Install dependencies

```bash
npm install
```

### Compile contracts

```bash
npm run compile
```

### Run tests

```bash
npm run test
```

First time you run the tests or to update typescript types of your contracts to add new tests, run:

```bash
npx hardhat typechain
```

### Run coverage

```bash
npm run coverage
```

### Run and deploy to local node

First run the local node:

```bash
npm run node
```

Then deploy the contracts in another terminal:

```bash
npm run compile
npm run deployLocal
```

### Deploy and verify contracts

```bash
npm run deployTest
# or for production:
npm run deployProd
```
