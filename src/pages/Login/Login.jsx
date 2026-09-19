import { GoogleLogin } from "@react-oauth/google";
import { ArrowRight, BrainCircuit, Check, ShieldCheck } from "lucide-react";

const Login = () => {
	const handleGoogleSuccess = (credentialResponse) => {
		// Keep the credential available for the app's auth flow when it is added.
		console.log("Google sign-in succeeded", credentialResponse);
	};

	return (
		<main className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.22),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(124,58,237,0.18),_transparent_35%)]" />
			<div className="absolute -left-24 top-24 h-72 w-72 rounded-full border border-blue-500/10 bg-blue-500/5 blur-3xl" />
			<div className="absolute -right-24 bottom-8 h-80 w-80 rounded-full border border-purple-500/10 bg-purple-500/5 blur-3xl" />

			<div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-10 sm:px-8">
				<div className="grid w-full overflow-hidden rounded-3xl border border-gray-800 bg-gray-900/80 shadow-2xl shadow-blue-950/20 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
					<section className="relative flex flex-col justify-between border-b border-gray-800 p-8 sm:p-12 lg:border-b-0 lg:border-r">
						<div>
							<div className="mb-14 flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
									<BrainCircuit className="h-5 w-5" />
								</div>
								<span className="text-xl font-bold tracking-tight">PrepPal</span>
							</div>

							<p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-blue-400">
								Your interview edge
							</p>
							<h1 className="max-w-lg text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
								Turn preparation into progress.
							</h1>
							<p className="mt-6 max-w-md text-base leading-7 text-gray-400">
								Keep your questions, practice sessions, and momentum in one focused workspace.
							</p>
						</div>

						<div className="mt-14 space-y-4 text-sm text-gray-300">
							{["Track your question bank", "Build a consistent practice habit", "See progress that keeps you moving"].map((item) => (
								<div className="flex items-center gap-3" key={item}>
									<span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
										<Check className="h-3.5 w-3.5" />
									</span>
									{item}
								</div>
							))}
						</div>
					</section>

					<section className="flex items-center justify-center p-8 sm:p-12">
						<div className="w-full max-w-sm">
							<div className="mb-9">
								<p className="mb-3 text-sm font-medium text-gray-500">Welcome back</p>
								<h2 className="text-3xl font-bold tracking-tight">Sign in to PrepPal</h2>
								<p className="mt-3 text-sm leading-6 text-gray-400">
									Pick up where you left off and keep your preparation moving.
								</p>
							</div>

							<div className="rounded-2xl border border-gray-700 bg-gray-800/70 p-5 shadow-xl">
								<GoogleLogin
									onSuccess={handleGoogleSuccess}
									onError={() => console.error("Google sign-in failed")}
									theme="filled_black"
									size="large"
									width="320"
									text="continue_with"
									shape="rectangular"
								/>
								<div className="mt-5 flex items-start gap-3 border-t border-gray-700 pt-5 text-xs leading-5 text-gray-500">
									<ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
									<span>Sign in securely with your Google account. We never store your Google password.</span>
								</div>
							</div>

							<button className="group mx-auto mt-7 flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white">
								Explore PrepPal first
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</button>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};

export default Login;
