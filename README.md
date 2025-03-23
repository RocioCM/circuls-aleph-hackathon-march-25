# Circuls

Aleph Hackathon March '25

## Description

Our mission is to build tools of mass restoration for nature, and we’re kicking things off with a focus on recycling.

We discovered a proven solution that increases recycling rates, reduces litter, and makes a profit: the Deposit Return Scheme. You pay a small deposit when you buy soda, then return the container on the supermarket and get the deposit back. It’s been super successful in Europe, but it relay's reverse vending machines that are expensive and setting them up takes a ton of effort (often dragging in the government).

To solve this problem, we decided to digitize the entire deposit system —no expensive machines, just an app that tracks every container, fights fraud, and makes it feasible for communities and countries from LATAM to adopt a deposit return scheme.

## Productive Demo

We have our WorldCoin MiniApp Demo available on the World App: [Link Here!](///TODOLINK)

You can access additional functionality on our Web App:

- Producer containers generator: [Link Here!](///TODOLINK) - You can generate a batch of containers ids with associated deposits (then the user can return them and get the deposit back).
- Recycling center validator: [Link Here!](///TODOLINK) - You can validate a container id and release the deposit back to the user.

We have our contract deployed on World Chain Mainnet, you can check it on the World Explorer: [Link Here!](///TODOLINK).

## How it works?

We have ///

## Future Tech Roadmap

///TODO:image

This is a demo prototype, built over a weekend. However, the idea behind this product is contagious, and our team is determined to continue developing it after the hackathon to bring it to life. With that in mind, here are some technical considerations for the project's future:

- **WLD Payments:** For demonstration purposes, we've managed user balances as numeric values in a contract. In a production system, we plan to use WLD both for storing container deposits and for paying users.
- **FIAT Payments:** Given the project's scope—which aims to serve everyone in a city regardless of technical background—we will integrate a solution that allows users to convert their Circoins into FIAT directly into their bank accounts. We already have potential partner projects available in the World app for this conversion.
- **Nationality Verification:** We will utilize WorldCoin’s nationality feature to ensure that our users access the application only from the countries where we offer support.
- **Scalability:** We intend to separate token management into an ERC-20 contract, representing Circoins as fungible tokens, while keeping the traceability and deposit logic in separate contracts.
- **Data Storage:** While this demo currently lacks a backend, in the future we plan to implement off-chain storage for additional user and container data, aiming for a more efficient and flexible data retrieval system.
- **Metrics:** By combining an off-chain database with on-chain data validation, we will be able to compute real and transparent impact metrics for our users and for every actor in the recycling value chain, including producers and recycling centers.

## Future Product Roadmap

- **User Incentives:** In future iterations, we aim to offer a wider variety of redemption options for Circoins—such as crowdfunding, donations, FIAT conversion, or cashback at retail outlets like supermarkets.
- **Gamification:** We are considering gamification strategies with goals, badges, and tiers to boost engagement and increase recycling participation.
- **Batch Redemption Model:** In some regions or with certain producers, uniquely identifying each container might be challenging. To maximize reach, we are also working on a more relaxed traceability model for batch-based recycling. This approach will ensure anti-fraud validation, but adding enhanced protective measures that might occasionally result in lower rewards for honest users within communities susceptible to fraudulent behavior. Although this restriction, this scheme will still be more effective and profittable for the users than the current recycling system.
