# Flowly Waitlist

A modern waitlist application built with React, TypeScript, and Vite for collecting user interest and managing early access signups.

## About

Flowly Waitlist is a streamlined application designed to capture user interest and manage early access signups. Built with modern web technologies, it provides a fast, responsive interface for users to join the waitlist and for administrators to manage signups.

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Linting**: ESLint with TypeScript support
- **Styling**: CSS (ready for Tailwind CSS integration)

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/flowly-app/waitlist)

## Setup / Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd waitlist
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## Usage

This application provides a clean interface for users to:
- Join the waitlist by providing their email
- View confirmation messages
- Experience a smooth, responsive design

## Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── index.css        # Global styles
└── assets/          # Static assets (images, icons, etc.)
```

## Contributing

This project follows a structured git workflow:

1. **Always work from feature branches** - Never commit directly to `main` or `develop`
2. **Create feature branches from `develop`** - Use descriptive names like `feature/add-login`
3. **Commit frequently** - Use clear, descriptive commit messages
4. **Use Pull Requests** - All changes must go through PR review
5. **Keep `develop` stable** - Ready for integration at all times

### Git Workflow

```bash
# Switch to develop and pull latest changes
git checkout develop
git pull origin develop

# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "feat: add your feature description"

# Push and create PR
git push origin feature/your-feature-name
gh pr create --title "Your PR Title" --body "Description of changes"
```

## License

This project is proprietary and confidential. All rights reserved.
