import { ethers } from 'ethers';
import { PrivyClient } from '@privy-io/react-auth';

// USDC ABI (minimal version for our needs)
const USDC_ABI = [
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
];

export const getProvider = () => {
  return new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_BASE_RPC_URL);
};

export const getUSDCContract = (signer: ethers.Signer) => {
  const provider = getProvider();
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS!,
    USDC_ABI,
    signer
  );
};

export const connectWallet = async (privyClient: PrivyClient) => {
  try {
    const provider = await privyClient.getEthereumProvider();
    const signer = new ethers.BrowserProvider(provider).getSigner();
    return signer;
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};
