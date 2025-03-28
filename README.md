# Based Smiles: Immutable USDC Rewards for Genuine Smiles 😊

An innovative Web3 application that uses face-api.js to analyze your smile and rewards genuine happiness with USDC cryptocurrency on the Base Network.

## Features

- 🔐 Web3 wallet authentication via RainbowKit
- 📸 Real-time camera feed with smile detection
- 🤖 Face expression analysis using face-api.js
- 💰 Automatic USDC rewards for genuine smiles
- 📱 Responsive design for all devices
- 🌐 Built on Base Network

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- USDC on Base Network for testing

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/basedsmiles.git
cd basedsmiles
```

2. Install dependencies:
```bash
npm install
```

3. Download face-api.js models:
   - Download the following files from [face-api.js weights](https://github.com/justadudewhohacks/face-api.js/tree/master/weights):
     - tiny_face_detector_model-weights_manifest.json
     - tiny_face_detector_model-shard1
     - face_expression_model-weights_manifest.json
     - face_expression_model-shard1
   - Place them in the `public/models` directory

4. Create a `.env` file in the root directory with the following variables:
```env
# Web3 Configuration
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# USDC Contract Address on Base Network
NEXT_PUBLIC_USDC_CONTRACT_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

# Reward Configuration
NEXT_PUBLIC_REWARD_ADDRESS=your_reward_address
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Connect your Web3 wallet
2. Allow camera access
3. Smile at the camera
4. If your smile score is above 70%, you'll receive 0.001 USDC
5. Your USDC balance will update automatically

## Technical Stack

- Next.js 14 with TypeScript
- Tailwind CSS for styling
- RainbowKit for Web3 authentication
- wagmi for blockchain interactions
- face-api.js for smile detection
- Base Network for USDC rewards

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT

---

Built with ❤️ and 😊 on Base Network