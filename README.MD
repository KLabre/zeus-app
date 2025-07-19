# Zeus App

## Enterprise-Grade SaaS Dashboard

### Why

- Complex UI + routing + forms + auth + testing + infrastructure + deployment → demonstrates full mastery.

### Core Technical features

- Auth: JWT sign in/sign up with refresh tokens + route guards
- Routing: React Router with nested & protected routes
- UI: Tailwind & Material UI
- Forms: React Hook Form with multi-step sign up, settings forms, validation (Yup/Zod)
- State management: Context API or Zustand for auth & app state
- Testing: Jest + React Testing Library unit & integration tests on forms, routes, API mocks
- API integration: Connected to a .NET microservice API for data fetching & mutations
- Dark mode with persisted settings
- Localization (i18n) support
- ESLinter / Prettier linting
- Security Checks using `npm audit`
- TODO:
  - Performance Tracking: Lighthouse

### Build | Infra

- Dockerized React app with multi-stage builds
- Azure DevOps pipeline YAML for CI/CD (build, test, deploy)
- Terraform scripts for AKS cluster + Azure Container Registry + Azure resources
- Kubernetes manifests for deploying frontend as container on AKS

### Core Functional Features

- Auth

## Getting Started

### Pre-requisites

you must have the following software installed;

1. [Node js](https://nodejs.org/en/download)
2. [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Configure the .env file

IN oder the run the app locally, the .env file must be populated with your values.

On your local machine, replace the contents of /src/.env with your values.

Template:

```env
VITE_MSAL_CLIENT_ID=<your-azure-entra-external-id-app-registration-client-id>
VITE_MSAL_AUTHORITY='https://<your-domain>.ciamlogin.com/'
VITE_MSAL_REDIRECT_URI='http://localhost:5173/'
VITE_MSAL_POST_LOGOUT_REDIRECT_URI='/'
```

### Installation

Install the dependencies:

```bash
cd src
npm install
```

### Development

Start the development server with HMR:

```bash
cd src
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
cd src
npm run build
```
