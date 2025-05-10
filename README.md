# Spectrum Web Co – Australian Marketing Website

This is the official marketing website for Spectrum Web Co, an Australian software engineering firm. Built with Next.js (App Directory), TypeScript, Tailwind CSS, and Rsbuild, it showcases our services, case studies, technologies, and values.

---

## Features
- Modern, responsive marketing site for Spectrum Web Co
- Built with React 19, Tailwind CSS 4, and Rsbuild
- Component-driven UI with Storybook support
- Secure, production-ready, and CI/CD enabled
- Deployable to both Vercel (marketing) and OVHcloud Kubernetes (mirror/production)
- Infrastructure as Code (IaC) with Terraform for drift protection

---

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) (preferred) or npm
- [Node.js](https://nodejs.org) v20+

### Installation
```bash
bun install
```

### Environment Setup
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Update `.env` with your database and API credentials.

### Database Setup (if using TimescaleDB)
```bash
bun run db:init
```

### Running Locally
- Frontend dev server:
  ```bash
  bun run dev
  ```
- Backend API server:
  ```bash
  bun run server
  ```
- Auto-restart backend:
  ```bash
  bun run server:dev
  ```
- Storybook:
  ```bash
  bun run storybook
  ```

Visit [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3001](http://localhost:3001) for the API.

---

## Deployment

### Vercel
- Connect your GitHub repo to Vercel for instant, production-grade deployments.
- All marketing traffic should be directed to the Vercel-hosted site.

### Kubernetes (OVHcloud)
- Mirror production deployments to your OVHcloud managed K8s cluster.
- Use the manifests in `/k8s` and the Terraform in `/terraform` for IaC and drift protection.
- Use the pre-existing OVHcloud load balancer for public traffic.

### CI/CD
- Automated via GitHub Actions (`.github/workflows/ci-cd.yml`).
- Lint, build, test, deploy to Vercel, build/push Docker image, deploy to K8s.

---

## Security & GitOps
- DevSecOps best practices: secrets in CI/CD, IaC for all infra, GitOps for K8s.
- Use Vercel and GitHub secrets for sensitive values.
- All K8s resources mirrored in Terraform for drift detection and recovery.

---

## Directory Structure
- `src/app` – Next.js app directory (pages)
- `src/components` – React components
- `src/styles` – Tailwind/global CSS
- `src/server` – Express API server
- `k8s` – Kubernetes manifests
- `terraform` – Terraform IaC mirror
- `.github/workflows` – CI/CD pipelines

---

## License
Copyright (c) Spectrum Web Co, Australia. All rights reserved.
