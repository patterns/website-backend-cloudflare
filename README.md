# Da Vinci Renaissance Website Backend

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https%3A%2F%2Fgithub.com%2Fdavinci-demo%2Fwebsite-backend-cloudflare)

clone edit : `https://github.com/davinci-demo/website-backend-cloudflare`

### notes
- Branch control configuration: `cloudflare`
- Build configuration for the deploy command: `npm run db:migrations:apply && npx wrangler deploy`
- Variables and Secrets field for auth middleware: `DEMO_API_KEY` (e.g., "davinci" as the demo API secret )
- D1 database ID needs to be replaced in `wrangler.jsonc` (or wrangler.toml)

