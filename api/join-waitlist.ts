import { LoopsClient } from "loops";

interface JoinWaitlistRequest {
	email: string;
}

interface VercelRequest {
	method?: string;
	body?: JoinWaitlistRequest;
}

interface VercelResponse {
	status: (code: number) => VercelResponse;
	json: (data: { success: boolean; message: string }) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Only allow POST requests
	if (req.method !== "POST") {
		return res.status(405).json({
			success: false,
			message: "Method not allowed",
		});
	}

	try {
		if (!req.body || typeof req.body.email !== "string") {
			return res.status(400).json({
				success: false,
				message: "Email is required",
			});
		}

		// Normalize email: trim whitespace and convert to lowercase
		// This prevents duplicates like 'John@Email.com' vs 'john@email.com'
		const email = req.body.email.trim().toLowerCase();

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
			email: email,
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
			// Handle duplicate email (409 Conflict or similar)
			if (
				error.message.includes("already exists") ||
				error.message.includes("duplicate") ||
				error.message.includes("409") ||
				error.message.includes("conflict")
			) {
				return res.status(200).json({
					success: true,
					message: "You're already on our waitlist! We'll keep you updated.",
				});
			}

			// Handle validation errors (400 Bad Request)
			if (error.message.includes("400") || error.message.includes("invalid")) {
				return res.status(400).json({
					success: false,
					message: "Please enter a valid email address.",
				});
			}
		}

		return res.status(500).json({
			success: false,
			message: "Failed to join waitlist. Please try again.",
		});
	}
}
