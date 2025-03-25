# TechDoc Hackathon

A public-facing technical documentation website built with Next.js that fetches and displays documentation from GitHub repositories.

## Features

- Fetches technical documentation from GitHub repositories
- Displays documentation titles and metadata
- Modern, responsive UI with Tailwind CSS
- Server-side rendering for better performance

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- GitHub organization with technical documentation repositories
- GitHub Personal Access Token (optional, but recommended)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd techdoc-hackathon
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
GITHUB_ORG=your-org-name
GITHUB_TOKEN=your-github-token  # Optional
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### GitHub Organization
Set the `GITHUB_ORG` environment variable to your GitHub organization name. This is required for the application to fetch repositories.

### GitHub Token
While optional, it's recommended to set up a GitHub Personal Access Token to avoid rate limiting issues. To create a token:

1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
2. Generate a new token with the following scopes:
   - `repo` (Full control of private repositories)
   - `read:org` (Read organization data)

## Project Structure

- `src/app/page.tsx` - Main page component that displays documentation
- `src/lib/github.ts` - GitHub service for fetching documentation
- `.env.local` - Environment variables configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# Techdocs-list
