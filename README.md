# ListingBoost AI

Next.js App Router application with React, TypeScript, Tailwind CSS and Lucide icons.

## Run

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill the variables below.
3. `npm run dev` (or `npm run build && npm start` for production).

- `OPENAI_API_KEY`: server-only OpenAI API key. Generation uses gpt-4o-mini.
- `NEXT_PUBLIC_CHECKOUT_URL`: your Lemon Squeezy $12/month checkout URL. Set before building; Next.js embeds public variables at build time.
- `LEMON_SQUEEZY_STORE_ID` and `LEMON_SQUEEZY_PRODUCT_ID`: restrict accepted licenses to your product.
- `TRIAL_SIGNING_SECRET`: a long random server-only secret (generate with `openssl rand -hex 32`).

Configure the Lemon Squeezy subscription product to issue license keys. The server validates licenses at https://api.lemonsqueezy.com/v1/licenses/validate for activation and every licensed generation. No Lemon Squeezy API token is needed for this endpoint.

## Behavior

Two successful free generations are tracked in localStorage, reinforced by a signed HttpOnly cookie. Failed requests do not consume a credit. The example is clearly marked and consumes no credit. Stored keys must be activated again after reload; client state never grants server authorization. Generated output is schema-checked before it is shown. Copy buttons use the browser clipboard API (HTTPS or localhost required).

Browser-local trials are a convenience limit, not a billing or abuse-prevention boundary: clearing browser data, switching browsers, or concurrent requests can bypass them. Before a public paid launch, add authenticated accounts, persistent atomic quotas, and rate limiting. Pro keys are bearer credentials stored in browser localStorage for convenience; a production account-based flow can keep them entirely server-side.

## Deployment

Deploy to a Node.js host that supports Next.js server routes, such as Vercel. Configure all environment variables, then build. This is a real Next.js application, not a static export; API routes require a server. No live API credentials or checkout URL were supplied in this session.

## Validation

`npm run build` performs a production compilation and TypeScript validation.
