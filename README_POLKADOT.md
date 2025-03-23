# Circuls

<img src="./frontend/public/assets/logo.png" alt="Logo" style="width:200px; height:200px; border-radius:15px; margin-right: 20px;" />

**Aleph Hackathon March '25** — Polkadot track

## The Problem

Our mission is to build tools of mass restoration for nature, and we’re kicking things off with a focus on recycling.

Every year, billions of beverage containers are produced, distributed, and eventually discarded. Coca-Cola alone produces over 100 billion plastic bottles annually. Many of these bottles never see a recycling facility, ending up in landfills or, worse, in our oceans and waterways.

Deposit Return Schemes (DRS) have proven successful in many regions by incentivizing consumers to return their containers and claim a small deposit. However, traditional DRS implementations rely heavily on physical reverse vending machines, government-mandated infrastructure, and complex logistical overhead. These constraints often make it difficult or prohibitively expensive to implement deposit systems in countries that could benefit most—especially those in LATAM and other emerging markets.

To solve this problem, we decided to digitize the entire deposit system — no expensive machines, just the **Circuls** app. Circuls aims to modernize the deposit return approach by introducing a fully digital system that uses blockchain technology to track each container, ensure transparent deposits, fight fraud, and reward consumers. Our ultimate vision is to integrate every actor in the recycling chain: from packaging producers (e.g., Coca-Cola), to supermarkets, to consumers, to recycling centers—while also providing an extensible framework for advanced governance, metrics, and funding mechanisms.

## The hackathon

During the hackathon, we didn't have time to implement code for the solution (as we first decided to go with a different sponsor before the announcement of multiple sponsors), so we focused on presenting the business model, the user flow, and the system architecture. On this file, we describe the architecture that the system would have — not just for the hackathon, but for a real-world scenario. We're thinking on a Scalable Digital Deposit Return Scheme for Global Beverage Recycling!

We are committed to implementing this solution in the real world, so we are looking for the appropiate technology to implement this project at scale. Also, if you want to help us implement a pilot in a small city (or big one!) anywhere in LATAM or beyond, reach out. Let’s protect our planet together!

## Why a blockchain approach?

Blockchain offers transparency, security, and programmability—making it an excellent fit for deposit tracking. By tokenizing deposits and registering unique container IDs on-chain, we can ensure each container’s deposit is traceable from production to redemption. Nonetheless, many blockchains face constraints in transaction throughput and cost that make them unsuitable for the scale of global beverage producers.

## Core Concept

Circuls digitizes the deposit system by assigning a unique code (e.g., QR) to each container at the point of production. When a container is manufactured, the producer “locks” a deposit (in tokens) into a smart contract treasury. Consumers who purchase the container pay the deposit implicitly as part of the product cost. When the consumer recycles the container (by scanning the QR code at a designated recycling bin) they become eligible to claim that deposit, but with pending validation by a recycling center.

![Treasure Founds Flow](https://github.com/user-attachments/assets/145d6985-2374-4773-9cd1-72876987bad6)

## Why Polkadot?

### 1. Scalability for Massive Transaction Volumes

When dealing with major beverage producers like Coca-Cola, the system could see tens of thousands of containers produced every hour—translating to equally high volumes of on-chain events. Traditional Layer 1 blockchains such as Ethereum mainnet may struggle with high fees and limited throughput (typically ~15–30 transactions per second). Polkadot’s design, on the other hand, enables horizontal scalability through its parachains.

- **Launch as a Substrate-based parachain** with a transaction throughput that can handle the creation and redemption of container IDs at scale.
- **Leverage Polkadot’s shared security** while customizing the chain’s logic for deposit tracking.
- **Achieve thousands of transactions per second** if necessary by optimizing the parachain’s runtime and potentially scaling across multiple parachains.

### 2. Parachain Architecture and XCMP

Polkadot’s **Cross-Chain Message Passing (XCMP)** allows Circuls to distribute logic across different parachains and consume public goods from other parachains. This opens up a range of possibilities:

- **Integration with Payment Parachains**: If we decide to store deposits in stablecoins or an existing asset, bridging from a stablecoin parachain or a payment parachain is straightforward.
- **Interoperability**: We can exchange data (e.g., user identity or container metadata) with other parachains specialized in identity solutions, decentralized storage, or supply chain tracking.
- **Modularity**: We keep deposit logic on our specialized parachain while deferring tasks like file storage or advanced analytics to other specialized parachains.

### 3. Flexible Governance and Upgradability

Polkadot's on-chain governance, enables Circuls to evolve over time without hard forks. This is crucial for a deposit return system, where deposit values, fraud detection mechanisms, or community incentives might need to change frequently or even business logic may change when new container types or entire regions or countries are introduced to the system.

- **Deposit Values and Rules** can change over time (e.g., deposit for glass might be different from plastic).
- **Ecosystem Evolution**: We can add new features, adapt to new regulations and countries, or integrate advanced fraud-detection modules through on-chain upgrades.
- **Community Involvement**: Stakeholders—beverage producers, retailers, recycling centers, and consumers—could hold governance tokens or be represented in a council, collectively shaping the system’s future.

#### Governance and DAO Integration

One of the biggest challenges for deposit return systems is deciding how to manage unclaimed deposits, set deposit amounts, and allocate operational funds. Polkadot’s on-chain governance and potential DAO models address these challenges elegantly:

- **Token-Based Voting**: Each stakeholder (producers, retailers, recycling centers, consumers) can hold governance tokens that grant them voting power.
- **Weighted Proposals**: Major changes—like adjusting deposit rates for certain materials—can be proposed on-chain. If a majority or supermajority of stakeholders support the proposal, it’s automatically enacted.
- **Adaptive Deposit Rates**: Over time, deposit amounts might need to be increased or decreased to reflect market conditions or environmental goals. The DAO can handle these adjustments in a transparent, decentralized way.
- **Treasury Allocation**: A portion of unclaimed deposits or transaction fees can flow into a treasury governed by the DAO. Funds can be used to support recycling infrastructure, local environmental projects, or community-led initiatives.

By leveraging Polkadot’s robust governance framework, Circuls can evolve dynamically while maintaining stakeholder trust. This stands in stark contrast to purely centralized or rigid solutions that often stagnate or fail to address community needs.

## Polkadot-Based Architecture

<img width="1720" alt="Polkadot schemas" src="https://github.com/user-attachments/assets/26772a78-e542-4381-a91d-99a8b9bb46c9" />

#### 1. **Substrate Parachain Setup**

- Circuls built using Substrate, implementing custom pallets for deposit management, container ID registration, and user reward distribution.The chain is registered as a parachain on Polkadot.

#### 2. **Unique Container ID Generation**

- A "ContainerPallet" is responsible for generating a unique ID (using a descentralized ID generation algorithm) for each new container minted by a producer.
- Coca-Cola (or any other producer) interacts with the parachain to "mint" container IDs, each ID carrying deposit metadata (e.g., deposit amount, type of material, expiration date).

#### 3. **Deposit Treasury**

- A "DepositPallet" manages the locked funds. When a container is minted, the producer deposits tokens into a treasury account on the Circuls parachain.
- The deposit amount is recorded, and the container’s status is set to "deposit-funded". If producers want to use a stable asset, we can link to a stablecoin parachain via XCMP.

#### 4. **Consumer Interaction**

- Consumers use a user-friendly mobile or web application that communicates with the Circuls parachain.
- **Buying a Container**: The deposit cost is baked into the container’s retail price. The actual deposit tokens remain locked in the parachain treasury until the container is recycled.
- **Recycling a Container**: Consumers scan the container’s QR code at a recognized recycling bin or center. The system checks on-chain data to confirm deposit eligibility. The deposit is then put into a “pending” state awaiting final validation.

#### 5. **Recycling Center Validation**

- Once containers physically arrive at the recycling center, an operator (or an automated system) confirms the container is legitimate and not tampered with.
- The recycling center’s interface (connected to the Circuls parachain) updates the container’s status to "validated".
- Upon validation, the deposit is automatically unlocked, transferring the tokens to the consumer’s wallet on the parachain.

#### 6. **DAO and Governance**

- A governance pallet manages proposals and votes regarding deposit amounts, expansions to new container types, or changes to the fee structure.
- The entire community of token holders—producers, retailers, recycling centers, and consumers—can stake governance tokens to participate in decisions.
- Polkadot’s on-chain upgrade mechanism ensures that changes are enacted smoothly without hard forks.

#### 7. **Cross-Chain Bridges**

- If consumers want to move tokens to other ecosystems or convert them to fiat, they can leverage Polkadot’s bridging solutions (e.g., bridging to Ethereum or a stablecoin parachain).
- This design ensures maximum flexibility and adoption in regions with different financial infrastructures.

## Future Product Features

#### Multi-regional Support and Customization of Business Models

Circuls should be designed with a vision to operate simultaneously in multiple countries and regions. This presents significant challenges, as each region or country may have distinct regulatory requirements, cultural preferences, market participants, logistical infrastructure, and varying levels of technological adoption.

For example: In Europe, traditional highly regulated deposit return schemes with individual container validation may be prevalent. In Latin America, given the urgent need for mass adoption, Circuls may implement simpler or alternative schemes, such as batch-level tracking rather than individual container tracking.

Building on Polkadot, we can use customization per Parachain. Each region or country could have its own specialized parachain, tailored with specific business rules, validation methods, deposit types, and reward structures according to local needs. Circuls parachains can share essential information or functionality (such as user identity, global governance frameworks, and basic deposit mechanisms), while still maintaining complete local operational flexibility. As more regions join, Circuls can deploy additional parachains to handle increased transaction volumes and specialized business logic.

#### Batch-Level Container Tracking (Relaxed Traceability Scheme)

One practical limitation in certain regions or with specific producers is the difficulty or impossibility of generating, printing, and tracking a unique identifier for each individual container produced. To address these scenarios, Circuls plans to implement an alternative solution: batch-level traceability.

This approach relaxes the initial requirement of individualized tracking by grouping containers into identifiable batches, each marked by a single QR code or batch number. From a technical perspective, this involves:

1. Assigning a single consolidated deposit amount to each batch.
2. When consumers return containers for recycling, the batch is validated collectively rather than individually, using weight, volume, or statistical sampling methods.
3. Consumers might receive slightly reduced rewards to mitigate potential fraud risks associated with this less stringent tracking method.

Leveraging specialized Substrate pallets allows for rapid implementation of alternative validation or tracking methods without affecting other parts of the system. At the same time, batch-tracking schemes could be governed independently, allowing local communities to determine their own implementation details, reward parameters, and conditions for batch acceptance. Polkadot’s parachain architecture facilitates safe and isolated experimentation within specific regions without endangering the global functionality of Circuls.
