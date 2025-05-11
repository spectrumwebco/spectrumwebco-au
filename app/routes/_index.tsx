import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { ContactSection } from '@/components/ContactSection';
import { Container } from '@/components/Container';
import { FadeIn, FadeInStagger } from '@/components/FadeIn';
import { List, ListItem } from '@/components/List';
import { SectionIntro } from '@/components/SectionIntro';
import { StylizedImage } from '@/components/StylizedImage';
import { Testimonial } from '@/components/Testimonial';

// Assuming loadCaseStudies and its types are correctly defined in @/lib/mdx
// and image paths within case study data are updated to be public paths.
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx';

// Data for Clients component - image paths need to be public
const clientsData = [
  ['Phobia', '/images/clients/phobia/logo-light.svg'],
  ['Family Fund', '/images/clients/family-fund/logo-light.svg'],
  ['Unseal', '/images/clients/unseal/logo-light.svg'],
  ['Mail Smirk', '/images/clients/mail-smirk/logo-light.svg'],
  ['Home Work', '/images/clients/home-work/logo-light.svg'],
  ['Green Life', '/images/clients/green-life/logo-light.svg'],
  ['Bright Path', '/images/clients/bright-path/logo-light.svg'],
  ['North Adventures', '/images/clients/north-adventures/logo-light.svg'],
];

interface LoaderData {
  caseStudies: Array<MDXEntry<CaseStudy>>;
  // If clientsData is dynamic, load it here too.
  // For now, it's static above.
}

export const loader = async ({}: LoaderFunctionArgs) => {
  // Ensure image paths within caseStudies (e.g., caseStudy.logo) are adjusted to be public paths
  // by the loadCaseStudies function or manually here if necessary.
  const caseStudies = (await loadCaseStudies()).slice(0, 3);
  return json<LoaderData>({ caseStudies });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Studio - Award winning developer studio" }, // Or use a more specific title from root.tsx template
    { name: "description", content: "We are a development studio working at the intersection of design and technology." },
  ];
};

// Helper component: Clients
function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            We’ve worked with hundreds of amazing people
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clientsData.map(([client, logo]) => (
              <li key={client as string}>
                <FadeIn>
                  {/* Use <img> tag, ensure 'logo' is a public path */}
                  <img src={logo as string} alt={client as string} />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  );
}

// Helper component: CaseStudiesDisplay (renamed to avoid conflict with CaseStudy type)
function CaseStudiesDisplay({ caseStudies }: { caseStudies: Array<MDXEntry<CaseStudy>> }) {
  return (
    <>
      <SectionIntro
        title="Harnessing technology for a brighter future"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We believe technology is the answer to the world’s greatest
          challenges. It’s also the cause, so we find ourselves in bit of a
          catch 22 situation.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  {/* Use Remix <Link to=...> */}
                  <Link to={caseStudy.href}> 
                    <span className="absolute inset-0 rounded-3xl" />
                    {/* Use <img> tag, ensure caseStudy.logo is a public path */}
                    <img
                      src={caseStudy.logo as string} // Ensure this path is public
                      alt={caseStudy.client}
                      className="h-16 w-16"
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  );
}

// Helper component: Services
function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="We help you identify, explore and respond to new opportunities."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          As long as those opportunities involve giving us money to re-purpose
          old projects — we can come up with an endless number of those.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                // Ensure imageLaptop path is public, e.g., /images/laptop.jpg
                src={'/images/laptop.jpg'} 
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Web development">
              We specialise in crafting beautiful, high quality marketing pages.
              The rest of the website will be a shell that uses lorem ipsum
              everywhere.
            </ListItem>
            <ListItem title="Application development">
              We have a team of skilled developers who are experts in the latest
              app frameworks, like Angular 1 and Google Web Toolkit.
            </ListItem>
            <ListItem title="E-commerce">
              We are at the forefront of modern e-commerce development. Which
              mainly means adding your logo to the Shopify store template we’ve
              used for the past six years.
            </ListItem>
            <ListItem title="Custom content management">
              At Studio we understand the importance of having a robust and
              customised CMS. That’s why we run all of our client projects out
              of a single, enormous Joomla instance.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  );
}

export default function Index() {
  const { caseStudies } = useLoaderData<LoaderData>();

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            Award-winning development studio based in Denmark.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            We are a development studio working at the intersection of design
            and technology. It’s a really busy intersection though — a lot of
            our staff have been involved in hit and runs.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <CaseStudiesDisplay caseStudies={caseStudies} />

      <Services />

      <Testimonial className="mt-24 sm:mt-32 lg:mt-40">
        We relied on Studio to infer the underlying thinking behind our vague
        demand for a “logo with a planet in it.” They exceeded our
        expectations and sent us a logo with two planets in it.
      </Testimonial>

      <ContactSection />
    </>
  );
}
