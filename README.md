# Creatify

Creatify is a Next.js crowdfunding platform built for creators to fund their projects with direct support from their fans.

Fans can visit a creator's public page, choose a custom or preset contribution amount, add a message, and complete the payment securely through Razorpay. Authenticated creators can manage their profile, payment settings, and creator page from a dedicated dashboard.


## Project Overview

The application uses the Next.js App Router. Creator profiles and payment records are stored in MongoDB. Authentication is handled by NextAuth with GitHub as the configured provider.

Creators can connect their Razorpay credentials and receive direct financial support from their fanbase. Payment orders are created using the creator's Razorpay credentials and verified by the server before a contribution is marked as complete.


## Features

- Public landing page with links to login and the about page.
- GitHub authentication through NextAuth.
- Automatic user creation after a user's first successful GitHub sign-in.
- Creator dashboard for editing name, username, profile image, cover image, and Razorpay credentials.
- Public creator pages at `/<username>`.
- Razorpay checkout with custom contribution amounts and preset amounts of INR 10, INR 25, and INR 50.
- Supporters can enter their name and a personal message.
- Server-side payment verification through the Razorpay callback route.
- Public display of the five highest completed contributions and the total amount raised.
- Automatic redirection to the creator page after successful payment verification.
- Toast notifications for profile updates and successful contributions.
The login page currently renders buttons for Google, LinkedIn, Facebook, GitHub, but only the GitHub button calls `signIn("github")` in the current implementation.

## Demo Video

🎥 [Watch Creatify Demo on YouTube](https://youtu.be/2u_5s0-fFVQ?si=pH-l9jqhjlZd5eEu)

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js `16.2.12` with the App Router |
| UI | React `19.2.4` |
| Styling | Tailwind CSS `4.3.3` and PostCSS |
| Authentication | NextAuth `4.24.15` with GitHub provider |
| Database | MongoDB via Mongoose `9.9.2` |
| Payments | Razorpay `2.9.8` |
| Notifications | React Toastify `11.1.0` |
| Code quality | ESLint `9` and `eslint-config-next` |

## Project Structure

```text
app/
	page.js                         Landing page
	about/page.js                   About page
	login/page.js                   Login page
	dashboard/page.js               Authenticated dashboard route
	[username]/page.js              Public creator payment page
	api/auth/[...nextauth]/route.js NextAuth GitHub authentication route
	api/razorpay/route.js           Razorpay payment verification callback
	globals.css                     Global styles and Tailwind import
	layout.js                       Root layout, metadata, navbar, footer, session provider
actions/
	useractions.js                  Server actions for users and payments
Components/
	Dashboard.js                    Profile settings form
	Footer.js                       Site footer
	Navbar.js                       Navigation and session controls
	PaymentPage.js                  Creator profile and payment UI
	SessionWrapper.js               NextAuth SessionProvider wrapper
db/
	connectDb.js                    Local MongoDB connection helper
models/
	User.js                         User schema
	Payment.js                      Payment schema
public/                           GIF and static image assets
```

## Prerequisites

- Node.js and npm. The repository does not declare a specific Node.js version.
- A running MongoDB server available at `mongodb://localhost:27017/chai`.
- A GitHub OAuth application with a client ID and client secret.
- Razorpay credentials for each creator who wants to receive payments.

## Installation & Setup

1. Clone the repository and change into the project directory.
2. Install the locked dependencies:

	 ```bash
	 npm install
	 ```

3. Start MongoDB locally. The application connects to the `chai` database on the default local MongoDB port.
4. Create a `.env.local` file in the project root and add the variables listed below.
5. Configure the GitHub OAuth application for the local NextAuth application.

## Environment Variables

The source code references these variables:

| Variable | Used for |
| --- | --- |
| `GITHUB_ID` | GitHub OAuth client ID |
| `GITHUB_SECRET` | GitHub OAuth client secret |
| `NEXT_PUBLIC_URL` | Base URL used when Razorpay redirects back to the application |

Example for local development:

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXT_PUBLIC_URL=http://localhost:3000
```

Do not commit real credentials. Environment files are ignored by the repository's `.gitignore` file. Creator-specific Razorpay ID and secret values are entered through the dashboard and stored in the `User` document.

## How to Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in with GitHub, open the dashboard, configure the creator profile and Razorpay credentials, then use the creator page shown under the account menu to test a payment.

## Usage / API Examples

### Application routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/about` | About and platform information |
| `/login` | GitHub login page |
| `/dashboard` | Authenticated profile settings |
| `/<username>` | Public creator page and payment form |

### Authentication route

NextAuth handles `GET` and `POST` requests under:

```text
/api/auth/[...nextauth]
```

The configured provider is GitHub.

### Razorpay callback

Razorpay sends a `POST` request to `/api/razorpay`. The route reads form data containing the Razorpay order ID, payment ID, and signature, verifies the signature using the receiving creator's stored Razorpay secret, marks the matching payment as complete, and redirects to:

```text
/<username>?paymentdone=true
```

The payment order itself is created by the `initiate` server action in `actions/useractions.js`; it is not exposed as a separate public HTTP endpoint.

## Available Scripts / Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates a production build |
| `npm run start` | Starts the production server after a successful build |
| `npm run lint` | Runs ESLint |

## Configuration

- `next.config.mjs` currently contains no custom Next.js options.
- `jsconfig.json` defines the `@/*` import alias for paths relative to the project root.
- `postcss.config.mjs` enables `@tailwindcss/postcss`.
- `app/globals.css` imports Tailwind CSS and defines the `invertImg` utility class.
- MongoDB connection settings are currently hard-coded in `db/connectDb.js` as `mongodb://localhost:27017/chai`.
- The root layout sets the page metadata, loads Geist fonts, and wraps the application in NextAuth's `SessionProvider`.

## Deployment Instructions

The repository provides the standard Next.js production commands but no provider-specific deployment files or infrastructure configuration.

For a deployment that supports Next.js:

1. Install dependencies with `npm install`.
2. Set `GITHUB_ID`, `GITHUB_SECRET`, and `NEXT_PUBLIC_URL` in the deployment environment.
3. Provide MongoDB at the address currently hard-coded in `db/connectDb.js`, or update that connection helper for the deployment database before deploying.
4. Configure the GitHub OAuth application for the deployed application's callback URL.
5. Build and start the application:

	 ```bash
	 npm run build
	 npm run start
	 ```

6. Ensure the deployed URL can receive Razorpay's callback at `/api/razorpay`.
