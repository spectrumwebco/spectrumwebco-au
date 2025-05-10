# Kubernetes Manifests for Marketing Site

- `deployment.yaml`: Main Deployment and Service using OVHcloud's managed K8s load balancer.
- Secrets/configs should be managed securely (see DevSecOps best practices).
- Mirror these resources in Terraform for drift protection.
