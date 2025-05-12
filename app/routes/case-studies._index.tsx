import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Container } from "@/components/Container";
import { FadeIn, FadeInStagger } from "@/components/FadeIn";

export const meta: MetaFunction = () => {
  return [
    { title: "Case Studies | Spectrum Web Co Australia" },
    { name: "description", content: "Explore detailed case studies of how Spectrum Web Co has helped businesses solve complex challenges with innovative software solutions." },
  ];
};

// Case studies data
const caseStudies = [
  {
    title: "Digital Transformation for National Retailer",
    client: "AusRetail Group",
    description: "How we helped Australia's leading retail chain modernize their digital infrastructure and increase online sales by 200%.",
    industry: "Retail",
    results: [
      "200% increase in online sales",
      "45% reduction in operational costs",
      "98% customer satisfaction rating"
    ],
    image: "/images/case-studies/retail-transformation.jpg", // Placeholder - replace with actual image path
    slug: "retail-transformation"
  },
  {
    title: "Real-time Financial Data Processing",
    client: "Pacific Financial Services",
    description: "Implementing high-performance data processing systems enabling real-time decision making for a major financial institution.",
    industry: "Finance",
    results: [
      "Processing time reduced from hours to seconds",
      "60% improvement in decision accuracy",
      "$4.2M annual cost savings"
    ],
    image: "/images/case-studies/finance-data-processing.jpg", // Placeholder - replace with actual image path
    slug: "finance-data-processing"
  },
  {
    title: "Secure Collaboration Platform for Government",
    client: "Australian Government Agency",
    description: "Building a secure, decentralized collaboration platform meeting strict compliance and security requirements.",
    industry: "Government",
    results: [
      "100% compliance with security regulations",
      "35% increase in cross-department collaboration",
      "Zero security incidents since implementation"
    ],
    image: "/images/case-studies/government-collaboration.jpg", // Placeholder - replace with actual image path
    slug: "government-collaboration"
  },
  {
    title: "AI-Powered Customer Service Transformation",
    client: "Connect Telecom",
    description: "Revolutionizing customer service operations with intelligent automation and predictive analytics.",
    industry: "Telecommunications",
    results: [
      "40% reduction in call handling time",
      "75% of inquiries resolved by AI",
      "Customer satisfaction increased by 28%"
    ],
    image: "/images/case-studies/telecom-customer-service.jpg", // Placeholder - replace with actual image path
    slug: "telecom-customer-service"
  },
  {
    title: "Supply Chain Optimization",
    client: "AusManu Industries",
    description: "Streamlining manufacturing and distribution processes with predictive analytics and process automation.",
    industry: "Manufacturing",
    results: [
      "32% reduction in inventory costs",
      "48% improvement in delivery time accuracy",
      "Annual savings of $2.8M"
    ],
    image: "/images/case-studies/manufacturing-supply-chain.jpg", // Placeholder - replace with actual image path
    slug: "manufacturing-supply-chain"
  },
  {
    title: "Healthcare Data Management System",
    client: "National Health Network",
    description: "Developing secure, compliant systems for managing sensitive patient data while improving healthcare outcomes.",
    industry: "Healthcare",
    results: [
      "100% HIPAA compliance",
      "42% reduction in administrative workload",
      "Improved patient outcomes across 12 metrics"
    ],
    image: "/images/case-studies/healthcare-data-management.jpg", // Placeholder - replace with actual image path
    slug: "healthcare-data-management"
  }
];

export default function CaseStudies() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            Case Studies
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Explore how we've helped businesses across Australia solve complex challenges with innovative software solutions.
          </p>
        </FadeIn>
        
        <FadeInStagger className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {caseStudies.map((study, index) => (
              <FadeIn key={index}>
                <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-neutral-50 ring-1 ring-neutral-950/5 transition hover:bg-neutral-100">
                  <div className="aspect-[16/9] overflow-hidden">
                    <div className="h-full w-full bg-neutral-200">
                      {/* Image placeholder - replace with actual image */}
                      <div className="flex h-full items-center justify-center text-neutral-400">
                        [Image: {study.title}]
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-x-4">
                        <span className="text-sm font-medium text-primary-600">
                          {study.industry}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {study.client}
                        </span>
                      </div>
                      <div className="mt-2 block">
                        <h3 className="text-xl font-semibold text-neutral-950">
                          {study.title}
                        </h3>
                        <p className="mt-3 text-base text-neutral-600">
                          {study.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-neutral-950">Key Results:</h4>
                      <ul className="mt-2 space-y-1">
                        {study.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-start text-sm text-neutral-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1.5 h-4 w-4 flex-none text-primary-600 mt-0.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {result}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <Link
                          to={`/case-studies/${study.slug}`}
                          className="text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                          Read full case study
                          <span className="absolute inset-0" aria-hidden="true" />
                        </Link>
                      </div>
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
                Ready to become our next success story?
              </h2>
              <p className="mt-6 text-lg leading-8 text-neutral-300">
                Let's discuss how our software solutions can help your business overcome challenges and achieve your goals.
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
