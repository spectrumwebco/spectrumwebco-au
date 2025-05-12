import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";

export const meta: MetaFunction = () => {
  return [
    { title: "Software Catalogue | Spectrum Web Co Australia" },
    { name: "description", content: "Explore our innovative software solutions including Autobots-AI, Laravel-Unchained, Djan-GO, and Radicle-RS." },
  ];
};

// Software product data
const products = [
  {
    id: "autobots-ai",
    name: "Autobots-AI",
    description: "An advanced AI platform for automating business processes and enhancing decision-making capabilities.",
    features: [
      "Natural language processing",
      "Predictive analytics",
      "Process automation",
      "Custom AI model training"
    ],
    image: "/images/products/autobots-ai.jpg" // Placeholder - replace with actual image path
  },
  {
    id: "laravel-unchained",
    name: "Laravel-Unchained",
    description: "A powerful extension to the Laravel framework, providing enhanced features and optimizations for enterprise applications.",
    features: [
      "Advanced caching system",
      "Extended authentication options",
      "Performance optimization tools",
      "Enterprise-grade security features"
    ],
    image: "/images/products/laravel-unchained.jpg" // Placeholder - replace with actual image path
  },
  {
    id: "djan-go",
    name: "Djan-GO",
    description: "A high-performance Django implementation with Go-powered microservices for scalable web applications.",
    features: [
      "Microservices architecture",
      "High-performance data processing",
      "Seamless scaling capabilities",
      "Real-time data synchronization"
    ],
    image: "/images/products/djan-go.jpg" // Placeholder - replace with actual image path
  },
  {
    id: "radicle-rs",
    name: "Radicle-RS",
    description: "A Rust-based distributed version control system designed for secure, peer-to-peer code collaboration.",
    features: [
      "Decentralized repository hosting",
      "Cryptographic verification",
      "Offline-first collaboration",
      "Integrated code review tools"
    ],
    image: "/images/products/radicle-rs.jpg" // Placeholder - replace with actual image path
  }
];

export default function SoftwareCatalogue() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            Software Catalogue
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Explore our innovative software solutions designed to empower businesses and drive digital transformation.
          </p>
        </FadeIn>
        
        <FadeInStagger className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {products.map((product) => (
              <FadeIn key={product.id} className="flex">
                <div className="relative flex w-full flex-col overflow-hidden rounded-3xl bg-neutral-50 p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-100 sm:p-8">
                  <h2 className="mt-4 text-2xl font-bold text-neutral-950">
                    <Link to={`/software-catalogue/${product.id}`} className="after:absolute after:inset-0">
                      {product.name}
                    </Link>
                  </h2>
                  <p className="mt-2 text-base text-neutral-600">
                    {product.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5 text-primary-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      to={`/software-catalogue/${product.id}`}
                      className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-1 h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeInStagger>
      </Container>
    </>
  );
}
