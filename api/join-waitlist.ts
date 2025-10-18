import { LoopsClient } from "loops";

interface JoinWaitlistRequest {
	email: string;
}

export default async function handler(req: any, res: any) {
	// Only allow POST requests
	if (req.method !== "POST") {
		return res.status(405).json({
			success: false,
			message: "Method not allowed",
		});
	}

	try {
		const { email }: JoinWaitlistRequest = req.body;

		// Validate email
		if (!email || !email.trim()) {
			return res.status(400).json({
				success: false,
				message: "Email is required",
			});
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				success: false,
				message: "Please enter a valid email address",
			});
		}

		// Initialize Loops client
		const loopsApiKey = process.env.LOOPS_API_KEY;
		if (!loopsApiKey) {
			console.error("LOOPS_API_KEY environment variable is not set");
			return res.status(500).json({
				success: false,
				message: "Server configuration error",
			});
		}

		const loops = new LoopsClient(loopsApiKey);

		// Create contact in Loops
		await loops.createContact({
			email: email.trim(),
			properties: {
				source: "waitlist",
			},
			mailingLists: {
				subscribed: true,
			},
		});

		return res.status(200).json({
			success: true,
			message:
				"Welcome to Flowly waitlist! You'll be notified when we're live.",
		});
	} catch (error) {
		console.error("Error joining waitlist:", error);

		// Handle specific Loops API errors
		if (error instanceof Error) {
			if (error.message.includes("already exists")) {
				return res.status(200).json({
					success: true,
					message: "You're already on our waitlist! We'll keep you updated.",
				});
			}
		}

		return res.status(500).json({
			success: false,
			message: "Failed to join waitlist. Please try again.",
		});
	}
}
