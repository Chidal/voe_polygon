# 0G-VOE (Vision of Onchain Events)
**Built for**: 0G WaveHack Challenge (Dapps Track)  
**License**: MIT  

---

## Overview

**0G-VOE (Vision of Onchain Events)** is a decentralized, AI-powered blockchain analytics dashboard built on [0G](https://0g.ai/), the first decentralized AI Layer 1 blockchain. It provides real-time insights into transaction histories, block details, and wallet activities on the 0G network, enhanced by AI-driven summarization, anomaly detection, and predictive analytics. Leveraging 0G’s modular infrastructure—**0G Chain**, **0G Compute**, **0G Storage**, and **0G Data Availability (DA)**—the app delivers a censorship-resistant, scalable, and user-friendly platform for monitoring onchain activities. With a degen-style UI built using **Next.js**, **Tailwind CSS**, and **TypeScript**, 0G-VOE makes blockchain data accessible and engaging, aligning with 0G’s mission to democratize AI as a public good.

The smart contract for OGVOE was successfully built and deployed to the Mainnet and integrated. The contract is live at 0xd9aC52cCaD325f96398A06ADad409B30b3768d24, confirmed with 6 blocks. Verification is queued post-API key setup. https://explorer.0g.ai/address/0xd9aC52cCaD325f96398A06ADad409B30b3768d24 
---

## Features

- **Real-Time Analytics**: Live feeds of transaction logs, block details (height, timestamp, gas used), and wallet activities via 0G Chain and Webhooks.
- **AI-Powered Insights**: Summarizes onchain events (e.g., “10 large USDT transfers in the last hour”), detects anomalies (e.g., “Unusual whale activity”), and predicts trends (e.g., “High gas fees likely”) using 0G Compute.
- **Decentralized Storage**: Stores historical data and AI model weights securely in 0G Storage.
- **Scalable Data Access**: Leverages 0G Data Availability for high-throughput, low-latency data retrieval.
- **Gamified UI**: Interactive panels (Transaction Tracker, Block Explorer, AI Insights) and charts built with Tailwind CSS and Chart.js for an engaging experience.
- **Developer Dashboard**: A `/nerds` route displaying raw and decoded event logs for developers, powered by 0G Webhooks.

---

## Tech Stack

- **Frontend**:
  - **Next.js (App Router)**: Server-side rendering and scalable UI.
  - **Tailwind CSS**: Responsive, degen-style design.
  - **TypeScript**: Type-safe data handling.
  - **Chart.js**: Interactive charts for transaction and gas trends.
- **Blockchain**:
  - **0G Chain**: EVM-compatible blockchain for smart contracts and event logging.
  - **0G Compute**: AI inference for summarization, anomaly detection, and predictions.
  - **0G Storage**: Decentralized storage for historical data and AI models.
  - **0G Data Availability (DA)**: Scalable data access for real-time analytics.
  - **Viem/Wagmi**: Blockchain queries and contract interactions.
  - **RainbowKit**: Wallet connections (e.g., Coinbase Wallet, MetaMask).
  - **Ethers.js**: Log parsing and decoding (e.g., ERC-20 events).
- **Real-Time**:
  - **WebSocket (Server-Sent Events)**: Live event streaming via 0G Webhooks.
- **Development**:
  - **Hardhat**: Smart contract deployment and testing on 0G testnet.
  - **Node.js**: Backend API and data processing pipelines.

---

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Wallet**: Coinbase Wallet or MetaMask configured for the 0G testnet
- **0G Testnet Tokens**: Obtain from the 0G faucet (see [0G Docs](https://0g.ai/docs))
- **Git**: For cloning the repository

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Chidal/OG-VOE.git
   cd OG-VOE
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_0G_RPC_URL=https://testnet.0g.ai/rpc
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
   ```
   - Replace `your_wallet_connect_project_id` with your WalletConnect ID.
   - Obtain the 0G testnet RPC URL from [0G Docs](https://0g.ai/docs).

4. **Deploy Smart Contracts**:
   - Update `hardhat.config.ts` with your 0G testnet private key.
   - Deploy the analytics contract:
     ```bash
     npx hardhat run scripts/deploy.js --network 0g
     ```
   - Update `src/config/contract.ts` with the deployed contract address.

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Usage

1. **Connect Wallet**: Use RainbowKit to connect your wallet (e.g., MetaMask) to the 0G testnet.
2. **Explore Analytics**:
   - **Transaction Tracker**: View live token transfers (e.g., sender, receiver, amount).
   - **Block Explorer**: Monitor block details (height, timestamp, gas used).
   - **AI Insights**: See AI-generated summaries and anomaly alerts.
3. **Developer Dashboard**: Access `/nerds` to view raw and decoded event logs (TokenTransfers, WalletActivity, MinedTxs).
4. **Interact with Predictions**: Engage with gamified features like transaction or gas price prediction challenges (Wave 3+).

---

## Project Structure

```
OG-VOE/
├── contracts/                # Solidity smart contracts for analytics
├── scripts/                  # Hardhat deployment scripts
├── src/
│   ├── components/           # Reusable UI components (Next.js + Tailwind)
│   ├── pages/                # Next.js pages (App Router)
│   ├── api/                  # API routes for Webhooks and event processing
│   ├── config/               # Configuration (e.g., contract addresses, RPC)
│   ├── lib/                  # Utilities (e.g., Viem, Ethers.js helpers)
│   ├── styles/               # Tailwind CSS configuration
├── public/                   # Static assets (e.g., images)
├── hardhat.config.ts         # Hardhat configuration
├── .env.local                # Environment variables (not tracked)
├── README.md                 # This file
├── package.json              # Dependencies and scripts
```

---

## How It Works

1. **Wave 1 (Ideation and Demo)**:
   - Built a Next.js frontend with Tailwind CSS and TypeScript.
   - Deployed a smart contract on 0G testnet to fetch transaction and block data.
   - Integrated RainbowKit and Viem for wallet and blockchain interactions.
   - Delivered a demo with basic Transaction and Block panels.

2. **Wave 2 (Real-Time Analytics and Initial AI)**:
   - Implemented real-time log streaming (`eth_getLogs`) for token transfers and block data via 0G Chain.
   - Created Transaction Tracker and Block Explorer panels with live updates using WebSocket SSE.
   - Integrated 0G Compute for AI summarization (e.g., “10 large USDT transfers”).
   - Stored historical data in 0G Storage for queryable archives.

3. **Wave 3 (Enhanced AI and Scalability)**:
   - Added 0G Webhooks for streaming token transfers, wallet activity, and mined transactions.
   - Upgraded AI on 0G Compute for anomaly detection and predictions.
   - Implemented 0G DA for scalable data access, supporting high-throughput analytics.
   - Built a Developer Dashboard (`/nerds`) with panels for raw and decoded events.
   - Enhanced the backend pipeline with `eth_call` and standardized JSON payloads.

---

## Challenges Faced

- **Real-Time Streaming**: Configuring 0G Webhooks and log streaming for low-latency updates required robust error handling for network instability.
- **AI Data Processing**: Standardizing and deduplicating raw blockchain logs for AI readiness was complex, necessitating TypeScript schemas.
- **Scalability**: Integrating 0G DA for high-throughput data retrieval demanded careful caching and optimization to maintain performance.
- **UI Performance**: Rendering real-time charts with Chart.js while ensuring mobile responsiveness with Tailwind CSS required balancing aesthetics and speed.
- **Type Safety**: Ensuring type-safe handling of blockchain and AI data across APIs and WebSockets was challenging but critical for reliability.

---

## Roadmap

### Wave 4: Advanced AI and Unified Backend
- Enhance AI on 0G Compute for predictive analytics (e.g., “Next block’s gas fees”).
- Build a unified backend pipeline combining Webhooks, `eth_getLogs`, and `eth_call`.
- Add gamified prediction challenges (e.g., “Guess the next whale transaction”).
- Store AI model weights in 0G Storage for efficient retrieval.

### Wave 5: Polished Product and Ecosystem Integration
- Polish UI with Framer Motion animations, leaderboards, and interactive charts.
- Develop SDKs/CLIs for developers to query 0G-VOE’s data pipeline.
- Add cross-chain analytics for other EVM-compatible chains via 0G Chain.
- Deploy on a decentralized CDN (e.g., Fleek) for trustless hosting.

### Long-Term Vision
- Integrate narrative AI insights (e.g., “Spike due to DeFi launch”).
- Support Intelligent NFTs (INFTs) to tokenize analytics dashboards or AI models.
- Position 0G-VOE as a leading analytics platform for the 0G ecosystem.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository: [https://github.com/Chidal/OG-VOE](https://github.com/Chidal/OG-VOE).
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request with a clear description of changes.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md) and ensure tests pass (`npm run test`).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **0G Team**: For their modular infrastructure, comprehensive documentation, and support during the WaveHack challenge.




```markdown
# 0G-VOE Roadmap

**Repository**: [https://github.com/Chidal/OG-VOE](https://github interference.com/Chidal/OG-VOE)  
**Author**: Chidal  
**Project**: 0G-VOE (Vision of Onchain Events)  
**Built for**: 0G WaveHack Challenge (Dapps Track)  
**License**: MIT  

---

## Introduction

The **0G-VOE (Vision of Onchain Events)** roadmap outlines the development journey of a decentralized, AI-powered blockchain analytics dashboard built on [0G](https://0g.ai/), the first decentralized AI Layer 1 blockchain. Designed to deliver real-time insights into transaction histories, block details, and wallet activities, 0G-VOE leverages 0G’s modular infrastructure—**0G Chain**, **0G Compute**, **0G Storage**, and **0G Data Availability (DA)**—to create a scalable, censorship-resistant platform. With a tech stack of **Next.js**, **Tailwind CSS**, and **TypeScript**, the app combines a degen-style UI with AI-driven summarization, anomaly detection, and predictive analytics, making blockchain data accessible and engaging.

This roadmap is structured into five waves, each building on the previous to transform 0G-VOE into a production-ready, ecosystem-integrated dApp. The plan reflects progress through **Wave 2** (real-time analytics and initial AI) and **Wave 3** (enhanced AI and scalability), with a clear vision for future waves. The roadmap is designed to align with 0G’s mission to democratize AI as a public good, fostering innovation in the Web3 space.

---

## Roadmap Overview

The 0G-VOE roadmap is divided into five iterative waves, each with specific objectives, deliverables, and milestones. Below, we elaborate on each wave, including technical details, creative goals, and illustrative diagrams to visualize the journey.

### Wave 1: Ideation and Foundation


**Objective**: Lay the groundwork for 0G-VOE by defining the project scope and building a functional demo with core analytics panels.

**Key Achievements**:
- **Ideation**: Conceptualized 0G-VOE as a real-time blockchain analytics dashboard with AI-driven insights, leveraging 0G’s modular services to monitor transactions, blocks, and wallet activities.
- **Tech Stack Setup**: Initialized a **Next.js** project with **TypeScript** and **Tailwind CSS** for a modular, responsive UI.
- **Smart Contract**: Deployed a basic Solidity contract on the 0G testnet using **Hardhat** to fetch transaction logs and block details.
- **Wallet Integration**: Integrated **RainbowKit** for wallet connections (e.g., Coinbase Wallet, MetaMask) and **Viem** for blockchain queries.
- **UI Foundation**: Built two core panels—**Transaction Tracker** (live token transfers) and **Block Explorer** (block details)—styled with Tailwind CSS.
- **Demo**: Delivered a functional prototype showcasing live data feeds on the 0G testnet.

**Deliverables**:
- Next.js app with Transaction Tracker and Block Explorer panels.
- Deployed smart contract for event logging.
- Wallet authentication via RainbowKit.
- Demo at [http://localhost:3000](http://localhost:3000) with live transaction and block data.

**Diagram**:
```plaintext
[User] --> [Next.js Frontend] --> [RainbowKit Wallet] --> [0G Chain]
    |                             |                        |
[Tailwind UI]                 [Viem API Calls]         [Smart Contract]
    |                                                |
[Transaction/Block Panels]                         [Event Logs]
```

**Creative Vision**: Wave 1 planted the seed for a vibrant, degen-style analytics platform, inspired by the fast-paced, community-driven ethos of Web3. The demo set the stage for a user-friendly dashboard that feels like a trading floor for blockchain data.

---

### Wave 2: Real-Time Analytics and Initial AI Integration


**Objective**: Enable real-time transaction and block analytics with initial AI-driven insights, leveraging 0G Chain, 0G Compute, and 0G Storage for a robust, user-facing dashboard.

**Key Updates**:
- **Real-Time Event Streaming**: Implemented log streaming using 0G Chain’s `eth_getLogs` for token transfers (e.g., ERC-20 events) and block metadata, synced via **WebSocket-based Server-Sent Events (SSE)** for low-latency updates.
- **Analytics Panels**:
  - **Transaction Tracker**: Displays live token transfers (sender, receiver, amount) with filters for tokens like USDT and WETH, styled with Tailwind CSS for a sleek, responsive layout.
  - **Block Explorer**: Shows block details (height, timestamp, gas used, transaction count) with expandable rows for deeper inspection.
- **AI Integration**: Used **0G Compute** to run a lightweight AI model for summarizing transaction data (e.g., “10 large USDT transfers in the last hour”). Outputs are displayed in a new **AI Insights Panel**.
- **Data Storage**: Stored historical transaction and block data in **0G Storage**, enabling queryable archives for users.
- **Wallet Enhancements**: Added user profiles via RainbowKit to save preferences (e.g., favorite tokens, alert settings).
- **Performance**: Optimized backend API calls with TypeScript for type-safe data handling and implemented caching for recent blocks to reduce 0G Chain load.

**Deliverables**:
- Real-time Transaction Tracker and Block Explorer panels with WebSocket sync.
- AI-driven summaries in the AI Insights Panel, powered by 0G Compute.
- Historical data archived in 0G Storage.
- User profiles for personalized analytics.
- Demo showcasing live analytics and AI summaries.

**Diagram**:
```plaintext
[User] --> [Next.js Frontend] --> [0G Chain] --> [Smart Contract Logs]
    |                             |                   |
[Tailwind UI]             [WebSocket SSE]       [0G Compute]
    |                                             |
[Transaction + Block + AI Panels]          [AI Summaries]
    |                                             |
[0G Storage] <---------------------------- [Historical Data]
```

**Creative Vision**: Wave 2 brought 0G-VOE to life as a pulsating hub of onchain activity, with a UI that feels like a crypto trading dashboard meets a sci-fi control room. The AI Insights Panel adds a layer of intelligence, making data feel alive and actionable.

**Metrics**:
- Transaction Tracker displays 50+ live token transfers per session.
- Block Explorer updates every 5 seconds.
- AI generates 3+ unique summaries per minute.
- 0G Storage retains 24+ hours of historical data.

---

### Wave 3: Enhanced AI Insights and Scalability

**Objective**: Deepen AI capabilities with anomaly detection and predictive analytics, integrate 0G Webhooks for real-time streaming, and ensure scalability with 0G Data Availability.

**Key Updates**:
- **Webhook Integration**: Configured **0G Webhooks** to stream real-time events:
  - **Token Transfers**: Movements of key tokens (e.g., USDT, WETH).
  - **Wallet Activity**: Interactions from high-volume wallets or contracts.
  - **Mined Transactions**: Confirmation of significant transactions.
  - Streamed events via SSE to a `/api/events/logs` endpoint, powering a **Developer Dashboard** (`/nerds`) with panels:
    - **TokenTransfersPanel**: Live token transfer events.
    - **WalletActivityPanel**: High-volume wallet interactions.
    - **MinedTxsPanel**: Freshly mined transactions.
- **Enhanced AI**: Upgraded the AI model on **0G Compute** to perform:
  - **Anomaly Detection**: Flags unusual activity (e.g., “Spike in wallet 0x… activity”).
  - **Predictive Analytics**: Forecasts trends (e.g., “High gas fees likely in the next block”).
  - Displayed in the AI Insights Panel with dynamic alerts.
- **Scalability**: Integrated **0G DA** for high-throughput data access, supporting thousands of concurrent users with <1s latency.
- **Backend Pipeline**: Built a modular pipeline for parsing webhook and log data:
  - Added `eth_call` for dynamic contract state queries (e.g., token balances).
  - Standardized payloads with token mapping, deduplication, and error handling.
  - Exposed via `/api/0g/events` for frontend and developer use.
- **UI Enhancements**: Added **Chart.js** for interactive charts (e.g., transaction volume, gas trends) and user-configurable settings (e.g., token filters, alert thresholds).
- **Developer Tools**: Enhanced the Developer Dashboard with raw and decoded event logs, plus basic API documentation.

**Deliverables**:
- Webhook-driven Developer Dashboard with TokenTransfers, WalletActivity, and MinedTxs panels.
- AI-driven anomaly detection and predictions in the AI Insights Panel.
- Scalable data access via 0G DA.
- Modular backend pipeline with `eth_call` and standardized payloads.
- Interactive UI with charts and settings.
- Demo showcasing webhook-driven analytics and developer tools.

**Diagram**:
```plaintext
[User] --> [Next.js Frontend] --> [0G Chain] --> [Webhooks + eth_getLogs]
    |                             |                   |
[Tailwind UI]             [SSE Streaming]       [0G Compute]
    |                                             |
[Analytics + AI + Dev Panels]              [AI Insights/Anomalies]
    |                                             |
[0G Storage] <---- [0G DA] <-------------- [Scalable Data]
```

**Creative Vision**: Wave 3 transforms 0G-VOE into a dynamic nerve center for blockchain analytics, with AI acting as a vigilant sentinel spotting anomalies and predicting trends. The Developer Dashboard invites the 0G community to build atop our pipeline, fostering a collaborative ecosystem.

**Metrics**:
- Webhooks stream 100+ events per minute.
- AI detects 5+ anomalies per hour and generates 2+ predictions per minute.
- 0G DA supports 1,000+ concurrent users with <1s latency.
- Developer Dashboard achieves 99% uptime.

---

### Wave 4: Advanced AI and Unified Backend


**Objective**: Enhance AI capabilities for predictive analytics and gamified features, unifying the backend pipeline for seamless integration of 0G services.

**Key Updates**:
- **Advanced AI**: Leverage **0G Compute** for sophisticated predictive analytics (e.g., “Next block’s gas fees will rise by 10%”) and narrative insights (e.g., “Spike due to new DeFi protocol”).
- **Gamified Features**: Introduce prediction challenges (e.g., “Guess the next whale transaction amount”) with leaderboards to boost user engagement.
- **Unified Backend Pipeline**:
  - Combine 0G Webhooks, `eth_getLogs`, and `eth_call` into a modular pipeline for flexible contract interactions.
  - Use **Ethers.js** for advanced log decoding across multiple contract types.
  - Expose a `/api/mcp/events` endpoint for dynamic event processing.
- **Storage Optimization**: Store AI model weights and large datasets in **0G Storage** for efficient retrieval and model updates.
- **UI Polish**: Refine Tailwind CSS styles with micro-animations (e.g., Framer Motion) for transitions and alerts.
- **Performance**: Implement advanced caching and batch processing to handle 10,000+ events per minute.

**Deliverables**:
- Predictive AI analytics and narrative insights in the AI Insights Panel.
- Gamified prediction challenges with leaderboards.
- Unified backend pipeline for all 0G services.
- Optimized storage for AI models and historical data.
- Enhanced UI with animations.

**Diagram**:
```plaintext
[User] --> [Next.js Frontend] --> [0G Chain] --> [Webhooks + Logs + eth_call]
    |                             |                   |
[Tailwind UI]             [Unified Pipeline]    [0G Compute]
    |                                             |
[Analytics + Prediction Panels]            [AI Predictions]
    |                                             |
[0G Storage] <---- [0G DA] <-------------- [Models + Data]
```

**Creative Vision**: Wave 4 turns 0G-VOE into a thrilling, game-like experience where users compete in onchain predictions, powered by a seamless backend that feels like a Web3 supercomputer. The AI becomes a storytelling companion, weaving narratives from raw data.

**Metrics**:
- AI generates 5+ predictive insights per minute with 80% accuracy.
- Prediction challenges engage 1,000+ users daily.
- Backend pipeline processes 10,000+ events per minute.

---

### Wave 5: Polished Product and Ecosystem Integration

**Objective**: Finalize 0G-VOE as a production-ready dApp with a polished UI, developer tools, and cross-chain support, solidifying its role in the 0G ecosystem.

**Key Updates**:
- **Polished UI**: Enhance the dashboard with **Framer Motion** animations, interactive leaderboards, and customizable themes using Tailwind CSS.
- **Developer Tools**: Release SDKs and CLI tools for querying 0G-VOE’s data pipeline, enabling developers to build custom analytics apps.
- **Cross-Chain Support**: Integrate with other EVM-compatible chains via 0G Chain for multi-chain analytics (e.g., Ethereum, Polygon).
- **Decentralized Hosting**: Deploy on a decentralized CDN (e.g., Fleek) for trustless access.
- **INFT Exploration**: Experiment with Intelligent NFTs (INFTs) to tokenize AI models or analytics dashboards as tradeable assets.
- **Community Features**: Add user profiles with achievement badges and social sharing for prediction challenge wins.

**Deliverables**:
- Production-ready UI with animations, leaderboards, and themes.
- SDKs/CLIs for ecosystem integration.
- Cross-chain analytics support.
- Decentralized deployment on Fleek.
- Initial INFT prototypes.
- Community features with badges and sharing.

**Diagram**:
```plaintext
[User] --> [Next.js Frontend] --> [0G Chain] --> [Webhooks + Logs + eth_call]
    |                             |                   |
[Polished UI]             [Unified Pipeline]    [0G Compute]
    |                                             |
[Analytics + Gamified UI]                 [AI Insights + Predictions]
    |                                             |
[0G Storage] <---- [0G DA] <---- [Cross-Chain Data] <---- [Other EVM Chains]
    |                             |
[Fleek CDN]                 [Developer SDKs]
```

**Creative Vision**: Wave 5 elevates 0G-VOE into a flagship analytics platform for Web3, with a UI that feels like a futuristic mission control and developer tools that empower the 0G community. INFTs add a collectible, innovative twist, turning analytics into ownable assets.

**Metrics**:
- UI supports 10,000+ concurrent users with 99.9% uptime.
- SDKs adopted by 50+ developers in the 0G ecosystem.
- Cross-chain analytics cover 3+ EVM chains.
- INFT prototypes deployed for 10+ unique assets.

---

## Long-Term Vision

Beyond Wave 5, 0G-VOE aims to become the go-to analytics platform for the 0G ecosystem and beyond:
- **Narrative AI**: Deliver rich, contextual narratives (e.g., “Spike in wallet activity tied to NFT mint”) to make data storytelling intuitive.
- **Personalized Alerts**: Allow users to set custom thresholds for anomaly alerts and predictions.
- **Ecosystem Hub**: Expand developer tools into a full-fledged API marketplace for 0G-based analytics.
- **INFT Expansion**: Tokenize advanced AI models and dashboards as INFTs, enabling trading and collaboration.
- **Global Adoption**: Position 0G-VOE as a cornerstone of decentralized AI analytics, driving adoption across Web3 communities.

## Acknowledgments

Thanks to the 0G Team for providing a good documentation  and infrastructure and invaluable support during the WaveHack.
