// Environment configuration
export const config = {
	appUrl: import.meta.env.VITE_APP_URL || "https://getflowly.io",
	appName: import.meta.env.VITE_APP_NAME || "Flowly",
	appDescription:
		import.meta.env.VITE_APP_DESCRIPTION ||
		"Meet your AI Finance Mentor. Get early access to Flowly's revolutionary AI-powered financial guidance platform. Join our waitlist and be the first to experience the future of personal finance.",
} as const;

// Helper function to get full URL for assets
export const getAssetUrl = (path: string) => {
	return `${config.appUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
