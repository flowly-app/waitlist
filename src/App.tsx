import Footer from "./components/footer";

function App() {
	return (
		<section className="flex flex-col items-center justify-between h-screen gap-8 p-8">
			<div className="flex flex-col items-center justify-center gap-8 p-8 flex-1">
				<h1 className="text-4xl">
					Good things comes to those{" "}
					<span className="font-serif">who wait</span>.
				</h1>
				<p>
					Be the first to meet your AI Finance Mentor. Get early access before
					launch day.
				</p>
			</div>
			<Footer />
		</section>
	);
}

export default App;
