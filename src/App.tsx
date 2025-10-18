import { Sparkles } from "lucide-react";
import { useState } from "react";
import flowHeaderVideo from "./assets/flow-header.mp4";
import { Footer, InputField, Pill, TextButton } from "./components";

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
			// TODO: Implement actual API call
			console.log("Submitting email:", email);
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			alert("Thanks for joining our waitlist!");
			setEmail("");
		} catch (error) {
			console.error("Error submitting email:", error);
			alert("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const isEmailValid = email.trim().length > 0 && email.includes("@");

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
				<form
					onSubmit={handleSubmit}
					className="flex gap-[1.6rem] items-center mt-[5.8rem]"
				>
					<InputField
						type="email"
						placeholder="Your email address"
						value={email}
						onChange={handleEmailChange}
						disabled={isSubmitting}
						required
					/>
					<TextButton
						title={"Join Waitlist"}
						disabled={!isEmailValid || isSubmitting}
						type="submit"
					/>
				</form>
			</header>

			<div className="relative z-20">
				<Footer />
			</div>
		</section>
	);
}

export default App;
