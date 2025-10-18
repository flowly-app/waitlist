import { Sparkles } from "lucide-react";
import { useState } from "react";
import flowHeaderVideo from "./assets/flow-header.mp4";
import { Footer, InputField, Pill, TextButton } from "./components";
import { toast } from "./lib/toast";
import { loopsService } from "./services/loops";

function App() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;

		setIsSubmitting(true);
		try {
			const result = await loopsService.joinWaitlist(email);

			if (result.success) {
				toast.success(result.message);
				setEmail("");
			} else {
				throw new Error(result.message);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Please try again.";
			toast.error(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	const isEmailValid = email.trim().length > 0 && email.includes("@");

	return (
		<main className="relative flex flex-col items-center justify-between h-screen p-8 overflow-hidden">
			<video
				autoPlay
				muted
				loop
				playsInline
				className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
				aria-label="Background video showing financial concepts"
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
				<form
					onSubmit={handleSubmit}
					className="flex gap-[1.6rem] items-center mt-[5.8rem]"
					aria-label="Join Flowly waitlist"
				>
					<InputField
						type="email"
						placeholder="Your email address"
						value={email}
						onChange={handleEmailChange}
						disabled={isSubmitting}
						required
						aria-label="Email address for waitlist"
					/>
					<TextButton
						title={"Join Waitlist"}
						disabled={!isEmailValid || isSubmitting}
						type="submit"
						aria-label="Submit email to join waitlist"
					/>
				</form>
			</header>

			<footer className="relative z-20">
				<Footer />
			</footer>
		</main>
	);
}

export default App;
