# Flowly Waitlist

AI Finance Mentor waitlist page with glassmorphism design, SEO optimization, and Loops email integration.

## Environment Variables

### Frontend (.env.local)
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update the values in `.env.local` as needed:
   ```env
   # App Configuration
   VITE_APP_URL=https://getflowly.io
   VITE_APP_NAME=Flowly
   VITE_APP_DESCRIPTION=Meet your AI Finance Mentor...
   ```

3. When you get the `flowly.io` domain, simply update `VITE_APP_URL` in `.env.local`

### Vercel Environment Variables
Configure these in your Vercel dashboard under Settings > Environment Variables:

```env
LOOPS_API_KEY=your_loops_api_key_here
```

## Loops Integration

This waitlist integrates with [Loops](https://loops.so/) for email management through a secure serverless API:

- **Secure API Key**: Loops API key is stored server-side only
- **Serverless Function**: `/api/join-waitlist` handles all Loops integration
- **Automatic Contact Creation**: New emails are automatically added to your Loops contact list
- **Source Tracking**: All contacts are tagged with `source: "waitlist"`
- **Error Handling**: Comprehensive error handling with user-friendly messages

### Setting up Loops

1. Create a Loops account at [loops.so](https://loops.so/)
2. Get your API key from the Loops dashboard
3. Add the API key to your Vercel environment variables as `LOOPS_API_KEY`
4. Deploy to Vercel - the integration will automatically handle contact creation

## Features

- ✅ Glassmorphism design system
- ✅ Form handling with validation
- ✅ Toast notifications
- ✅ Loops email integration
- ✅ SEO optimized (meta tags, structured data, sitemap)
- ✅ Accessibility compliant
- ✅ Responsive design
- ✅ Performance optimized

## SEO Features

- Meta tags (Open Graph, Twitter Cards)
- JSON-LD structured data
- Sitemap.xml
- Robots.txt
- Canonical URLs
- Social media optimization

## Development

```bash
npm install
npm run dev
```
*Runs the frontend development server on port 5173*

**Note:** API routes only work in production deployment. For local testing, use the deployed version.

## Build

```bash
npm run build
```