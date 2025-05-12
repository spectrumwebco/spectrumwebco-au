import type { MetaFunction } from "@remix-run/node";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";

export const meta: MetaFunction = () => {
  return [
    { title: "About Us | Spectrum Web Co Australia" },
    { name: "description", content: "Learn about Spectrum Web Co, our team, mission, and vision for the future of software development in Australia." },
  ];
};

export default function AboutUs() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            About Spectrum Web Co
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            We are an Australian-based software development company specializing in creating innovative solutions for businesses of all sizes.
          </p>
        </FadeIn>
        
        <div className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Our Mission</h2>
              <p className="mt-4 text-lg text-neutral-600">
                At Spectrum Web Co, our mission is to deliver exceptional software solutions that empower businesses to thrive in the digital landscape. We combine technical expertise with creative thinking to solve complex problems and drive innovation.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Our Vision</h2>
              <p className="mt-4 text-lg text-neutral-600">
                We envision a future where technology seamlessly integrates with business processes, enhancing productivity and creating new opportunities for growth. Our goal is to be at the forefront of this transformation, leading the way in software development excellence.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 sm:mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Our Team</h2>
          <p className="mt-4 text-lg text-neutral-600">
            Our team consists of passionate developers, designers, and strategists who are dedicated to delivering exceptional results. With diverse backgrounds and expertise, we bring a unique perspective to every project we undertake.
          </p>
          
          {/* Team members section can be added here */}
        </div>
        
        <div className="mt-16 sm:mt-20">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Our Approach</h2>
          <p className="mt-4 text-lg text-neutral-600">
            We believe in a collaborative approach to software development, working closely with our clients to understand their needs and deliver solutions that exceed expectations. Our process is transparent, agile, and focused on delivering value at every stage.
          </p>
        </div>
      </Container>
    </>
  );
}
