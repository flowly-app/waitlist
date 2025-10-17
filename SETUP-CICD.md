# CI/CD Setup Guide

This guide will help you set up the complete CI/CD pipeline for the Flowly Waitlist project.

## Prerequisites

- GitHub repository with Actions enabled
- Vercel account for deployments
- Node.js 20+ installed locally
- pnpm package manager

## 1. GitHub Repository Setup

### Enable GitHub Actions
1. Go to your repository settings
2. Navigate to "Actions" → "General"
3. Ensure "Allow all actions and reusable workflows" is selected

### Create Required Secrets
Go to Settings → Secrets and variables → Actions, and add:

```bash
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id_here
VERCEL_PROJECT_ID=your_vercel_project_id_here

# GitHub (usually auto-configured)
GITHUB_TOKEN=your_github_token_here
```

### How to Get Vercel Credentials

1. **VERCEL_TOKEN**:
   - Go to Vercel Dashboard → Settings → Tokens
   - Create a new token with appropriate permissions

2. **VERCEL_ORG_ID**:
   - Go to Vercel Dashboard → Settings → General
   - Copy the "Team ID" or "Personal Account ID"

3. **VERCEL_PROJECT_ID**:
   - Go to your project in Vercel Dashboard
   - Copy the Project ID from the URL or settings

## 2. Vercel Project Setup

### Create Vercel Project
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

### Environment Variables in Vercel
Set these in your Vercel project settings:

```bash
NODE_ENV=production
VITE_APP_ENV=production  # or staging for preview deployments
```

## 3. Branch Protection Rules

Set up branch protection for `main` and `develop`:

1. Go to Settings → Branches
2. Add rule for `main`:
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Include administrators
   - Restrict pushes that create files larger than 100MB

3. Add rule for `develop`:
   - Require status checks to pass before merging
   - Require branches to be up to date before merging

## 4. Workflow Configuration

### Required Status Checks
Configure these workflows as required status checks:

- `CI / Lint and Type Check`
- `CI / Build`
- `CI / Security Scan`

### Optional Status Checks
- `Code Quality / Code Quality Checks`
- `Code Quality / Performance Check`

## 5. Local Development Setup

### Install Dependencies
```bash
pnpm install
```

### Available Scripts
```bash
# Development
pnpm dev                 # Start development server
pnpm preview            # Preview production build

# Building
pnpm build              # Build for production
pnpm build:staging      # Build for staging
pnpm build:production   # Build for production

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:fix           # Fix ESLint issues
pnpm type-check         # TypeScript type checking

# Security
pnpm audit              # Security audit
pnpm audit:fix          # Fix security issues
pnpm outdated           # Check outdated packages
```

## 6. Testing the Pipeline

### Test CI Pipeline
1. Create a feature branch
2. Make a small change
3. Push to trigger CI workflow
4. Verify all checks pass

### Test Preview Deployment
1. Create a pull request
2. Verify preview deployment is created
3. Check PR comment with preview URL

### Test Production Deployment
1. Merge to `main` branch
2. Verify production deployment
3. Check Vercel dashboard for deployment status

## 7. Monitoring and Maintenance

### Regular Tasks
- **Weekly**: Review dependency updates from automated PRs
- **Monthly**: Check security audit results
- **As needed**: Monitor build performance and bundle sizes

### Monitoring Points
- GitHub Actions workflow status
- Vercel deployment logs
- Security audit results
- Bundle size changes

## 8. Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check local build
pnpm build

# Check TypeScript errors
pnpm type-check

# Check linting errors
pnpm lint
```

#### Deployment Issues
- Verify Vercel credentials are correct
- Check environment variables in Vercel
- Review Vercel project settings

#### Workflow Issues
- Check GitHub Actions logs
- Verify repository secrets
- Ensure branch protection rules are correct

### Debug Commands
```bash
# Test workflows locally (requires act)
act -j lint-and-typecheck
act -j build

# Check security vulnerabilities
pnpm audit --audit-level moderate

# Check outdated packages
pnpm outdated
```

## 9. Customization

### Adding New Environments
1. Update `deploy.yml` workflow
2. Add new environment variables
3. Configure Vercel project settings

### Modifying Build Process
1. Update `vite.config.ts`
2. Modify build scripts in `package.json`
3. Update workflow build steps

### Adding New Checks
1. Create new workflow file
2. Add required status checks
3. Update branch protection rules

## 10. Security Considerations

### Secrets Management
- Never commit secrets to repository
- Use GitHub Secrets for sensitive data
- Rotate tokens regularly

### Dependency Security
- Regular security audits
- Automated dependency updates
- Vulnerability monitoring

### Code Security
- ESLint security rules
- TypeScript strict mode
- Security headers in Vercel config

## Support

For issues with the CI/CD pipeline:
1. Check GitHub Actions logs
2. Review Vercel deployment logs
3. Consult the workflow documentation in `.github/README.md`
4. Check this setup guide for common solutions
