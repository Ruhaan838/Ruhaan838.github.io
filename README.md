# Ruhaan838

## Using template from https://github.com/once-ui-system/magic-portfolio

## Configuration

### Environment Variables

For local development, copy `.env.local.example` to `.env.local` and fill in the values:

```bash
# GitHub Personal Access Token (with no special permissions needed)
GITHUB_TOKEN=your_github_token_here

# Password for protected pages
NEXT_PUBLIC_PAGE_ACCESS_PASSWORD=your_secure_password_here
```

### GitHub Actions Secrets

For deployment to GitHub Pages, you need to set up these secrets:

1. Go to your repository -> Settings -> Secrets and variables -> Actions
2. Create a new repository secret named `PAGE_ACCESS_PASSWORD` with your desired password value

This password will be used for protected pages in your live site.