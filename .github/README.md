# CI/CD Pipeline Documentation

This repository uses GitHub Actions for continuous integration and deployment. The pipeline is designed to ensure code quality, security, and reliable deployments.

## Workflows Overview

### 🔄 CI Workflow (`ci.yml`)
**Triggers:** Push to `main`/`develop`, Pull Requests
**Purpose:** Continuous Integration checks

**Jobs:**
- **Lint and Type Check**: ESLint validation and TypeScript type checking
- **Build**: Application build with artifact upload
- **Security Scan**: Dependency vulnerability audit

### 🚀 Deploy Workflow (`deploy.yml`)
**Triggers:** Push to `main`, Manual dispatch
**Purpose:** Production and staging deployments

**Environments:**
- **Production**: Deploys from `main` branch to production
- **Staging**: Deploys from `develop` branch to staging
- **Manual**: Workflow dispatch for specific environment selection

### 👀 Preview Workflow (`preview.yml`)
**Triggers:** Pull Request events
**Purpose:** Preview deployments for PRs

**Features:**
- Automatic preview deployment for each PR
- PR comment with preview URL
- Concurrency control to prevent multiple deployments

### 📦 Dependencies Workflow (`dependencies.yml`)
**Triggers:** Weekly schedule (Mondays), Manual dispatch
**Purpose:** Dependency management and security

**Jobs:**
- **Update Dependencies**: Automated dependency updates with PR creation
- **Security Audit**: Regular security vulnerability scanning

### 🔍 Quality Workflow (`quality.yml`)
**Triggers:** Push to `main`/`develop`, Pull Requests
**Purpose:** Code quality and performance analysis

**Features:**
- ESLint with detailed reporting
- TypeScript type checking
- Bundle size analysis
- Performance warnings

## Environment Variables

### Required Secrets
Configure these in your GitHub repository settings:

```bash
# Vercel Deployment
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# GitHub (usually auto-configured)
GITHUB_TOKEN=your_github_token
```

### Environment-Specific Variables
- `NODE_ENV`: Set to `production` for builds
- `VITE_APP_ENV`: Set to `production`, `staging`, or `preview`

## Deployment Strategy

### Branch Strategy
- **`main`**: Production deployments
- **`develop`**: Staging deployments
- **Feature branches**: Preview deployments via PRs

### Deployment Flow
1. **Feature Development**: Create feature branch from `develop`
2. **Pull Request**: Creates preview deployment
3. **Merge to Develop**: Triggers staging deployment
4. **Merge to Main**: Triggers production deployment

## Security Features

### Security Scanning
- Dependency vulnerability audit
- Security audit results stored as artifacts
- Moderate-level vulnerability detection

### Security Headers
Vercel configuration includes security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Performance Optimizations

### Caching
- Node.js dependencies cached
- Build artifacts cached
- Static assets cached with long TTL

### Bundle Analysis
- Automatic bundle size monitoring
- Large file detection (>500KB JS, >100KB CSS)
- Performance warnings in PR comments

## Monitoring and Notifications

### Build Status
- All workflows report success/failure status
- Deployment notifications with environment details
- Artifact storage for debugging

### Quality Metrics
- ESLint results stored as artifacts
- Security audit results with 30-day retention
- Bundle analysis in PR summaries

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review ESLint and TypeScript errors

2. **Deployment Issues**
   - Verify Vercel credentials are correct
   - Check environment variables
   - Review Vercel project configuration

3. **Preview Deployment Issues**
   - Ensure PR is not in draft mode
   - Check Vercel token permissions
   - Verify concurrency settings

### Debugging
- Check workflow logs in GitHub Actions
- Review artifact uploads for detailed reports
- Use Vercel dashboard for deployment logs

## Best Practices

### Code Quality
- Always run `pnpm lint` before pushing
- Ensure TypeScript types are correct
- Keep bundle sizes optimized

### Security
- Regularly review dependency updates
- Monitor security audit results
- Keep secrets secure and rotated

### Performance
- Monitor bundle size changes
- Optimize static assets
- Use appropriate caching strategies

## Local Development

### Pre-commit Checks
```bash
# Install dependencies
pnpm install

# Run linting
pnpm lint

# Type check
pnpm exec tsc --noEmit

# Build application
pnpm build
```

### Testing Workflows Locally
Use [act](https://github.com/nektos/act) to test workflows locally:
```bash
# Install act
brew install act

# Run CI workflow
act -j lint-and-typecheck

# Run specific job
act -j build
```
