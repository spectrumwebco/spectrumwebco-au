# Augment Agent User Guidelines for Spectrum Web Co LLC (Australia)

## Introduction

This document provides guidelines for effectively using the Augment Agent with the Spectrum Web Co LLC Australian marketing website project. The Augment Agent is an AI-powered coding assistant that can help with development tasks across your technology stack.

## Project Overview

The Spectrum Web Co LLC Australian website is a marketing platform showcasing our software catalog with:

- Modern frontend built with React 19 and Remix
- TypeScript for type safety across the codebase
- Express backend with TimescaleDB for data storage
- Deployment to Vercel (marketing site) and OVHcloud Kubernetes (production)
- Infrastructure as Code with Terraform
- CI/CD pipeline using GitHub Actions
- Integration with spectrum-lsp MCP Server for enhanced language context

## How to Use Augment Agent

### General Usage Tips

1. **Be specific in your requests**: Provide context about which part of the codebase you're working on.
2. **Reference file paths**: When asking about code, include the file path relative to the project root.
3. **Specify technologies**: Mention relevant technologies (React, Remix, TypeScript, etc.) in your queries.
4. **Provide error messages**: When troubleshooting, share the complete error message.
5. **Ask for explanations**: Request explanations of code or concepts you don't understand.

### Frontend Development Tasks

Use Augment Agent for:

- **Component Development**: "Help me create a responsive hero section component using Tailwind CSS"
- **Remix Route Creation**: "Show me how to create a new Remix route for our services page"
- **TypeScript Type Definitions**: "Generate TypeScript interfaces for our product catalog data"
- **Styling Assistance**: "Help me implement the design system using our Tailwind configuration"
- **Storybook Integration**: "Show me how to create a story for our new Button component"

Example:
```
Can you help me create a new Remix route at app/routes/services/consulting.tsx that displays our consulting services with proper TypeScript typing?
```

### Backend Development Tasks

Use Augment Agent for:

- **API Endpoint Creation**: "Help me create an Express route for handling newsletter subscriptions"
- **Database Queries**: "Write a TimescaleDB query to track page views over time"
- **Data Modeling**: "Help me design a Sequelize model for our case studies"
- **Authentication Logic**: "Show me how to implement JWT authentication in our Express server"
- **Performance Optimization**: "Help optimize our database connection pooling"

Example:
```
Can you help me write a function in src/server/controllers/analytics.ts to aggregate daily page views from our TimescaleDB?
```

### Infrastructure and Deployment Tasks

Use Augment Agent for:

- **Terraform Configuration**: "Help me update our Terraform config to add a new K8s resource"
- **Kubernetes Manifests**: "Create a K8s deployment manifest for our new microservice"
- **CI/CD Pipeline**: "Help me modify our GitHub Actions workflow to include security scanning"
- **Vercel Configuration**: "Update our vercel.json to handle API routes correctly"
- **Environment Setup**: "Help me configure environment variables for local development"

Example:
```
Can you help me update our k8s/deployment.yaml to increase the replica count and add resource limits?
```

### Testing and Quality Assurance

Use Augment Agent for:

- **Unit Test Creation**: "Write a Vitest test for our authentication utility"
- **Integration Testing**: "Help me test the interaction between our contact form and API"
- **Accessibility Testing**: "Check if our navigation component meets WCAG standards"
- **Performance Testing**: "Help me write a script to benchmark our API endpoints"
- **Code Reviews**: "Review this pull request for potential issues"

Example:
```
Can you help me write a test for the src/lib/utils/formatCurrency.ts function using Vitest?
```

### Spectrum-LSP MCP Server Integration

The spectrum-lsp MCP Server is a critical component that enhances the Augment Agent's language context capabilities, providing improved code understanding and suggestions.

#### What is the spectrum-lsp MCP Server?

- **LSP (Language Server Protocol)**: Provides language-specific features like code completion, diagnostics, and navigation
- **MCP (Model Context Provider)**: Enriches the Augment Agent with additional context about your codebase
- **Deployment**: Runs in your OVHcloud Kubernetes cluster with specific resource allocations

#### Key Configuration Details:

- **Ports**:
  - LSP Server: 3000
  - MCP Server: 3100
- **Health Endpoint**: `/health` on port 3100
- **Resource Limits**:
  - CPU: 500m (request: 100m)
  - Memory: 512Mi (request: 256Mi)

Use Augment Agent for:

- **LSP Configuration**: "Help me configure the spectrum-lsp server for better language context"
- **MCP Server Deployment**: "Update the spectrum-lsp-mcp-deployment.yaml with new environment variables"
- **Integration Testing**: "Test the connection between our application and the LSP server"
- **Performance Tuning**: "Optimize the resource allocation for our spectrum-lsp MCP server"
- **Troubleshooting**: "Debug connection issues between our codebase and the LSP server"
- **Feature Enhancement**: "Extend the LSP capabilities to support our custom TypeScript patterns"

Example:
```
Can you help me troubleshoot the connection between our application and the spectrum-lsp server? I'm getting a timeout when trying to connect to the health endpoint at port 3100.
```

#### Best Practices for spectrum-lsp MCP Server:

1. **Regular Updates**: Keep the server updated with the latest language features
2. **Monitoring**: Set up alerts for server health and performance
3. **Resource Scaling**: Adjust resource limits based on team size and codebase complexity
4. **Security**: Ensure proper authentication with the LIBRECHAT_API_KEY secret
5. **Backup**: Maintain configuration backups in your version control system

## Best Practices

### Code Organization

- Follow the established project structure:
  - `app/` for Remix routes and components
  - `src/components/` for shared React components
  - `src/server/` for Express backend code
  - `src/styles/` for Tailwind and global CSS
  - `k8s/` for Kubernetes manifests
  - `terraform/` for infrastructure as code

### Development Workflow

1. **Local Development**:
   ```bash
   bun install
   cp .env.example .env
   # Update .env with your credentials
   bun run dev
   ```

2. **Testing**:
   ```bash
   bun run test        # Run all tests
   bun run test:watch  # Watch mode
   bun run test:cov    # Coverage report
   ```

3. **Code Quality**:
   ```bash
   bun run lint        # ESLint
   bun run format      # Prettier
   bun run typecheck   # TypeScript
   bun run check:all   # All checks
   ```

4. **Storybook**:
   ```bash
   bun run storybook
   ```

### Deployment Process

1. **Vercel Deployment**:
   - Automatic deployment via GitHub integration
   - Preview deployments for pull requests
   - Production deployment from main branch

2. **Kubernetes Deployment**:
   - CI/CD pipeline builds Docker image
   - Pushes to GitHub Container Registry
   - Applies K8s manifests to OVHcloud cluster
   - Terraform ensures infrastructure consistency

## Troubleshooting Common Issues

Ask Augment Agent for help with:

1. **Build Errors**: "Help me fix this Remix build error..."
2. **TypeScript Errors**: "I'm getting this TypeScript error in my component..."
3. **Database Connection Issues**: "TimescaleDB connection is failing with this error..."
4. **Deployment Failures**: "My GitHub Actions workflow is failing at the deployment step..."
5. **K8s Issues**: "Pods are not starting correctly in our OVHcloud cluster..."

## Additional Resources

- [Remix Documentation](https://remix.run/docs/en/main)
- [React 19 Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TimescaleDB Documentation](https://docs.timescale.com/)
- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [OVHcloud Documentation](https://docs.ovh.com/au/en/)

## Conclusion

The Augment Agent is a powerful tool to assist with development across your entire stack. By providing clear, specific requests and following these guidelines, you can maximize productivity and code quality for the Spectrum Web Co LLC Australian marketing website.

Remember that the Augment Agent works best when you provide context, are specific in your requests, and build upon its suggestions with your domain knowledge.
