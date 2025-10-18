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
	json: (data: WaitlistResponse) => void;
}

// Standardized response codes
type WaitlistResponseCode =
	| "ok"
	| "invalid_email"
	| "already_subscribed"
	| "server_error"
	| "validation_error";

interface WaitlistResponse {
	success: boolean;
	code: WaitlistResponseCode;
	message: string;
}

interface WaitlistService {
	createContact(email: string): Promise<WaitlistResponse>;
}

class LoopsWaitlistService implements WaitlistService {
	constructor(private loopsClient: LoopsClient) {}

	async createContact(email: string): Promise<WaitlistResponse> {
		try {
			await this.loopsClient.createContact({
				email,
				properties: {
					source: "waitlist",
				},
				mailingLists: {
					subscribed: true,
				},
			});

			return {
				success: true,
				code: "ok",
				message:
					"Welcome to Flowly waitlist! You'll be notified when we're live.",
			};
		} catch (error) {
			console.error("Error creating contact:", error);

			// Handle specific Loops API errors
			if (error instanceof Error) {
				// Handle duplicate email (409 Conflict or similar)
				if (
					error.message.includes("already exists") ||
					error.message.includes("duplicate") ||
					error.message.includes("409") ||
					error.message.includes("conflict")
				) {
					return {
						success: true,
						code: "already_subscribed",
						message: "You're already on our waitlist! We'll keep you updated.",
					};
				}

				// Handle validation errors (400 Bad Request)
				if (
					error.message.includes("400") ||
					error.message.includes("invalid")
				) {
					return {
						success: false,
						code: "invalid_email",
						message: "Please enter a valid email address.",
					};
				}
			}

			return {
				success: false,
				code: "server_error",
				message: "Failed to join waitlist. Please try again.",
			};
		}
	}
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Debug logging
	console.log("Request method:", req.method);
	console.log("Request body type:", typeof req.body);
	console.log("Request body:", req.body);

	// Only allow POST requests
	if (req.method !== "POST") {
		return res.status(405).json({
			success: false,
			code: "validation_error",
			message: "Method not allowed",
		});
	}

	try {
		// Parse JSON body if it's a string
		let body = req.body;
		if (typeof body === "string") {
			try {
				body = JSON.parse(body);
				console.log("Parsed body:", body);
			} catch (parseError) {
				console.error("JSON parse error:", parseError);
				return res.status(400).json({
					success: false,
					code: "validation_error",
					message: "Invalid JSON payload",
				});
			}
		}

		if (!body || typeof body.email !== "string") {
			return res.status(400).json({
				success: false,
				code: "validation_error",
				message: "Email is required",
			});
		}

		// Normalize email: trim whitespace and convert to lowercase
		// This prevents duplicates like 'John@Email.com' vs 'john@email.com'
		const email = body.email.trim().toLowerCase();

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				success: false,
				code: "invalid_email",
				message: "Please enter a valid email address",
			});
		}

		// Initialize Loops client
		const loopsApiKey = process.env.LOOPS_API_KEY;
		if (!loopsApiKey) {
			console.error("LOOPS_API_KEY environment variable is not set");
			return res.status(500).json({
				success: false,
				code: "server_error",
				message: "Server configuration error",
			});
		}

		// Create service with dependency injection
		const waitlistService: WaitlistService = new LoopsWaitlistService(
			new LoopsClient(loopsApiKey),
		);

		// Create contact using service
		const result = await waitlistService.createContact(email);

		// Map service response codes to HTTP status codes
		const httpStatus = getHttpStatusFromCode(result.code);
		return res.status(httpStatus).json(result);
	} catch (error) {
		console.error("Error joining waitlist:", error);

		// Handle unexpected errors
		return res.status(500).json({
			success: false,
			code: "server_error",
			message: "Failed to join waitlist. Please try again.",
		});
	}
}

// Helper function to map response codes to HTTP status codes
function getHttpStatusFromCode(code: WaitlistResponseCode): number {
	switch (code) {
		case "ok":
		case "already_subscribed":
			return 200;
		case "invalid_email":
		case "validation_error":
			return 400;
		case "server_error":
		default:
			return 500;
	}
}
