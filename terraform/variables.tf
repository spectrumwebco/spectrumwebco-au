variable "image" {
  description = "Docker image for the marketing site"
  type        = string
}

variable "kubeconfig_path" {
  description = "Path to kubeconfig file for OVHcloud K8s cluster"
  type        = string
}
