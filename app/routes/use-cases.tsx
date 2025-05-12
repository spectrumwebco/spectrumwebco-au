import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";

export const meta: MetaFunction = () => {
  return [
    { title: "Use Cases | Spectrum Web Co Australia" },
    { name: "description", content: "Explore real-world applications of our software solutions across various industries and business challenges." },
  ];
};

// Use cases data
const useCases = [
  {
    title: "Enterprise Digital Transformation",
    description: "How our solutions helped a leading Australian retailer modernize their legacy systems and embrace digital-first operations.",
    industry: "Retail",
    products: ["Autobots-AI", "Laravel-Unchained"],
    image: "/images/use-cases/digital-transformation.jpg", // Placeholder - replace with actual image path
    link: "/case-studies/retail-transformation"
  },
  {
    title: "Real-time Data Processing",
    description: "Implementing high-performance data processing systems for a financial services company to enable real-time decision making.",
    industry: "Finance",
    products: ["Djan-GO", "Autobots-AI"],
    image: "/images/use-cases/real-time-data.jpg", // Placeholder - replace with actual image path
    link: "/case-studies/finance-data-processing"
  },
  {
    title: "Secure Collaboration Platform",
    description: "Building a secure, decentralized collaboration platform for a government agency with strict compliance requirements.",
    industry: "Government",
    products: ["Radicle-RS", "Laravel-Unchained"],
    image: "/images/use-cases/secure-collaboration.jpg", // Placeholder - replace with actual image path
    link: "/case-studies/government-collaboration"
  },
  {
    title: "AI-Powered Customer Service",
    description: "Implementing intelligent automation to enhance customer service operations for a telecommunications provider.",
    industry: "Telecommunications",
    products: ["Autobots-AI"],
    image: "/images/use-cases/ai-customer-service.jpg", // Placeholder - replace with actual image path
    link: "/case-studies/telecom-customer-service"
  },
  {
    title: "Supply Chain Optimization",
    description: "Streamlining supply chain operations for a manufacturing company using predictive analytics and process automation.",
    industry: "Manufacturing",
    products: ["Autobots-AI", "Djan-GO"],
    image: "/images/use-cases/supply-chain.jpg", // Placeholder - replace with actual image path
    link: "/case-studies/manufacturing-supply-chain"
  },
  {
    title: "Healthcare Data Management",
    description: "Developing secure, compliant systems for managing sensitive patient data and enabling better healthcare outcomes.",
    industry: "Healthcare",
    products: ["Laravel-Unchained", "Radicle-RS"],
    image: "/images/use-cases/healthcare-data.jpg", // Placeholder - replace with actual image path
    link: "/case-studies/healthcare-data-management"
  }
];

// Industry filter options
const industries = ["All", "Retail", "Finance", "Government", "Telecommunications", "Manufacturing", "Healthcare"];

export default function UseCases() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            Use Cases
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Discover how our software solutions are solving real-world challenges across various industries and business domains.
          </p>
        </FadeIn>
        
        {/* Industry filter - in a real implementation, this would have state and filtering logic */}
        <div className="mt-10 flex flex-wrap gap-2">
          {industries.map((industry, index) => (
            <button
              key={index}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                index === 0
                  ? "bg-primary-600 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
        
        <FadeInStagger className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase, index) => (
              <FadeIn key={index}>
                <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-neutral-50 ring-1 ring-neutral-950/5 transition hover:bg-neutral-100">
                  <div className="aspect-[16/9] overflow-hidden">
                    <div className="h-full w-full bg-neutral-200">
                      {/* Image placeholder - replace with actual image */}
                      <div className="flex h-full items-center justify-center text-neutral-400">
                        [Image: {useCase.title}]
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary-600">
                        {useCase.industry}
                      </p>
                      <div className="mt-2 block">
                        <h3 className="text-xl font-semibold text-neutral-950">
                          {useCase.title}
                        </h3>
                        <p className="mt-3 text-base text-neutral-600">
                          {useCase.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {useCase.products.map((product, productIndex) => (
                          <span
                            key={productIndex}
                            className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={useCase.link}
                        className="text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        Read case study
                        <span className="absolute inset-0" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeInStagger>
        
        <FadeIn className="mt-24">
          <div className="rounded-3xl bg-neutral-950 px-6 py-16 sm:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to solve your business challenges?
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-300">
                Contact our team to discuss how our software solutions can address your specific needs and drive your business forward.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/contact-us"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-neutral-950 shadow-sm hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Contact Us
                </Link>
                <Link
                  to="/software-catalogue"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Explore Our Solutions <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
