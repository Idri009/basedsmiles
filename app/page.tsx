import { ConnectWallet } from '@/components/ConnectWallet';
import { SmileCamera } from '@/components/SmileCamera';
import { useUSDC } from '@/hooks/useUSDC';

export default function Home() {
	const { balance, isConnected } = useUSDC();

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
			<div className="container mx-auto px-4 py-8">
				<header className="flex justify-between items-center mb-8">
					<h1 className="text-4xl font-bold">Based Smiles 😊</h1>
					<ConnectWallet />
				</header>

				<div className="max-w-2xl mx-auto">
					<div className="bg-gray-800 rounded-lg p-6 shadow-xl">
						<h2 className="text-2xl font-semibold mb-4">Capture Your Smile</h2>
						<p className="text-gray-300 mb-6">
							Smile at the camera and earn USDC rewards! Your smile will be analyzed
							in real-time, and genuine smiles (score > 70%) will receive 0.001 USDC.
						</p>

						{isConnected ? (
							<>
								<div className="mb-4">
									<p className="text-sm text-gray-400">Your USDC Balance:</p>
									<p className="text-xl font-bold">{balance} USDC</p>
								</div>
								<SmileCamera />
							</>
						) : (
							<div className="text-center py-8">
								<p className="text-gray-300 mb-4">
									Please connect your wallet to start earning USDC rewards!
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	)
}