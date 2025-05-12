import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";

export const meta: MetaFunction = () => {
  return [
    { title: "Autobots-AI | Spectrum Web Co Australia" },
    { name: "description", content: "Autobots-AI is an advanced AI platform for automating business processes and enhancing decision-making capabilities." },
  ];
};

// Product data
const product = {
  id: "autobots-ai",
  name: "Autobots-AI",
  tagline: "Intelligent Automation for the Modern Enterprise",
  description: "An advanced AI platform for automating business processes and enhancing decision-making capabilities.",
  longDescription: "Autobots-AI is our flagship artificial intelligence platform designed to transform how businesses operate. By leveraging cutting-edge machine learning algorithms and natural language processing, Autobots-AI can automate complex workflows, extract insights from unstructured data, and provide predictive analytics to drive better business decisions.",
  features: [
    {
      title: "Natural Language Processing",
      description: "Process and understand human language to extract insights, automate responses, and enhance customer interactions."
    },
    {
      title: "Predictive Analytics",
      description: "Leverage historical data to forecast trends, identify opportunities, and mitigate risks before they occur."
    },
    {
      title: "Process Automation",
      description: "Automate repetitive tasks and complex workflows to increase efficiency and reduce operational costs."
    },
    {
      title: "Custom AI Model Training",
      description: "Train specialized AI models tailored to your specific business needs and industry requirements."
    }
  ],
  benefits: [
    "Reduce operational costs by up to 40%",
    "Improve decision-making accuracy by 35%",
    "Decrease time-to-insight by 60%",
    "Enhance customer satisfaction through personalized experiences"
  ],
  useCases: [
    "Customer service automation",
    "Fraud detection and prevention",
    "Supply chain optimization",
    "Personalized marketing campaigns"
  ],
  image: "/images/products/autobots-ai.jpg", // Placeholder - replace with actual image path
  techStack: ["Python", "TensorFlow", "PyTorch", "Docker", "Kubernetes", "AWS"]
};

export default function AutobotsAI() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <Link
              to="/software-catalogue"
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-1 h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Software Catalogue
            </Link>
            
            <h1 className="font-display text-4xl font-medium tracking-tight text-balance text-neutral-950 sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-xl text-primary-600 font-medium">
              {product.tagline}
            </p>
            <p className="mt-6 text-base text-neutral-600">
              {product.longDescription}
            </p>
            
            <div className="mt-10">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Key Features</h2>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="relative flex flex-col gap-6 rounded-2xl bg-neutral-50 px-6 py-8 ring-1 ring-neutral-950/5">
                    <h3 className="text-base font-semibold text-neutral-950">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-10">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Business Benefits</h2>
              <ul className="mt-6 space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5 flex-none text-primary-600 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-10">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-950">Common Use Cases</h2>
              <ul className="mt-6 space-y-3">
                {product.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 h-5 w-5 flex-none text-primary-600 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <span className="text-neutral-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          
          <FadeIn className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <div className="overflow-hidden rounded-3xl bg-neutral-50 p-6 ring-1 ring-neutral-950/5">
                <h3 className="text-lg font-semibold text-neutral-950">Technology Stack</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.techStack.map((tech, index) => (
                    <span key={index} className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="overflow-hidden rounded-3xl bg-neutral-50 p-6 ring-1 ring-neutral-950/5">
                <h3 className="text-lg font-semibold text-neutral-950">Interested in Autobots-AI?</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Contact our team to schedule a demo or discuss how Autobots-AI can benefit your business.
                </p>
                <div className="mt-6">
                  <Link
                    to="/contact-us"
                    className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </>
  );
}
