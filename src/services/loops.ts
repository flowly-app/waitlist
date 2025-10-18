interface JoinWaitlistRequest {
	email: string;
}

interface JoinWaitlistResponse {
	success: boolean;
	code: string;
	message: string;
}

export class LoopsService {
	private readonly baseUrl: string;

	constructor(baseUrl: string = "") {
		this.baseUrl = baseUrl;
	}

	async joinWaitlist(email: string): Promise<JoinWaitlistResponse> {
		const response = await fetch(`${this.baseUrl}/api/join-waitlist`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email } as JoinWaitlistRequest),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		return result as JoinWaitlistResponse;
	}

	// Future methods can be added here:
	// async sendTransactionalEmail(...)
	// async createContact(...)
	// async updateContact(...)
	// async sendEvent(...)
}

// Export a default instance
export const loopsService = new LoopsService();
