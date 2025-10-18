import { Sparkles } from "lucide-react";
import flowHeaderVideo from "./assets/flow-header.mp4";
import { Footer, Pill, TextButton } from "./components";

function App() {
	return (
		<section className="relative flex flex-col items-center justify-between h-screen p-8 overflow-hidden">
			<video
				autoPlay
				muted
				loop
				playsInline
				className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
			>
				<source src={flowHeaderVideo} type="video/mp4" />
			</video>

			<header className="relative flex flex-col items-center justify-center gap-[2.4rem] p-8 flex-1 text-center z-20">
				<Pill title="Launching soon." icon={<Sparkles />} />
				<h1 className="text-[6.4rem] tracking-[-0.192rem] font-normal text-white drop-shadow-lg">
					Good things comes <br /> to those{" "}
					<span className="font-serif">who wait</span>.
				</h1>
				<p className="text-[1.8rem] text-white/80">
					Be the first to meet your AI Finance Mentor. <br /> Get early access
					before launch day.
				</p>
				<TextButton variant="primary" title="Join Waitlist" />
			</header>

			<div className="relative z-20">
				<Footer />
			</div>
		</section>
	);
}

export default App;
