import { useContractWrite, useContractRead, useAccount } from 'wagmi';
import { USDC_CONTRACT } from '@/lib/web3';
import { parseUnits, formatUnits } from 'viem';

export function useUSDC() {
  const { address } = useAccount();
  const { data: decimals } = useContractRead({
    ...USDC_CONTRACT,
    functionName: 'decimals',
  });

  const { data: balance } = useContractRead({
    ...USDC_CONTRACT,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  });

  const { write: transfer } = useContractWrite({
    ...USDC_CONTRACT,
    functionName: 'transfer',
  });

  const transferUSDC = async (to: string, amount: number) => {
    if (!decimals) return;
    const amountInWei = parseUnits(amount.toString(), decimals);
    await transfer({
      args: [to as `0x${string}`, amountInWei],
    });
  };

  const formattedBalance = balance && decimals
    ? formatUnits(balance, decimals)
    : '0';

  return {
    balance: formattedBalance,
    transferUSDC,
    isConnected: !!address,
  };
} 