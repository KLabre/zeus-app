# Zeus App

## Enterprise-Grade SaaS Dashboard

### Why

- Complex UI + routing + forms + auth + testing + infrastructure + deployment → demonstrates full mastery.

### Core Technical features

- Auth: JWT sign in/sign up with refresh tokens + route guards
- Routing: React Router with nested & protected routes (e.g., Dashboard, User Settings, Admin Panel)
- Forms: React Hook Form with multi-step sign up, settings forms, validation (Yup/Zod)
- State management: Context API or Zustand for auth & app state
- Testing: Jest + React Testing Library unit & integration tests on forms, routes, API mocks
- API integration: Connected to a .NET microservice API for data fetching & mutations
- Dark mode with persisted settings
- Localization (i18n) support

### Build | Infra

- Dockerized React app with multi-stage builds
- Azure DevOps pipeline YAML for CI/CD (build, test, deploy)
- Terraform scripts for AKS cluster + Azure Container Registry + Azure resources
- Kubernetes manifests for deploying frontend as container on AKS

### Core Functional Features

- Auth

## Getting Started

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
