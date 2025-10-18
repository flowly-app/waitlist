import { Toaster as SonnerToaster } from "./ui/sonner";

export function Toaster() {
	return (
		<SonnerToaster
			position="bottom-center"
			expand={true}
			richColors={true}
			closeButton={false}
			duration={4000}
			toastOptions={{
				className: "glassmorphism",
			}}
		/>
	);
}
