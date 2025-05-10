terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
      version = ">= 2.0"
    }
  }
}

provider "kubernetes" {
  # Configure with OVHcloud Kubeconfig or API endpoint
  config_path = var.kubeconfig_path
}

resource "kubernetes_deployment" "marketing_site" {
  metadata {
    name = "marketing-site"
    labels = {
      app = "marketing-site"
    }
  }
  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "marketing-site"
      }
    }
    template {
      metadata {
        labels = {
          app = "marketing-site"
        }
      }
      spec {
        container {
          image = var.image
          name  = "marketing-site"
          port {
            container_port = 3000
          }
          env_from {
            secret_ref {
              name = "marketing-site-secrets"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "marketing_site" {
  metadata {
    name = "marketing-site"
  }
  spec {
    selector = {
      app = kubernetes_deployment.marketing_site.metadata[0].labels.app
    }
    port {
      port        = 80
      target_port = 3000
      protocol    = "TCP"
    }
    type = "LoadBalancer"
  }
}
