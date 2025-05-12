import type { MetaFunction } from "@remix-run/node";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy | Spectrum Web Co Australia" },
    { name: "description", content: "Learn how Spectrum Web Co collects, uses, and protects your personal information." },
  ];
};

export default function PrivacyPolicy() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn>
          <h1 className="font-display text-4xl font-medium tracking-tight text-balance text-neutral-950 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Last updated: June 1, 2023
          </p>
          
          <div className="mt-10 prose prose-neutral max-w-none">
            <h2>1. Introduction</h2>
            <p>
              At Spectrum Web Co ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (www.spectrumwebco.com.au) and tell you about your privacy rights and how the law protects you.
            </p>
            <p>
              This privacy policy applies to all personal information collected through our website, as well as any related services, sales, marketing, or events.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our service to you:
            </p>
            <h3>2.1 Personal Information</h3>
            <p>
              While using our website, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include:
            </p>
            <ul>
              <li>Name and contact details (email address, phone number, etc.)</li>
              <li>Company information</li>
              <li>Information provided when filling out forms on our website</li>
              <li>Information provided when corresponding with us by phone, email, or otherwise</li>
              <li>Information provided when participating in discussion boards or other social media functions on our website</li>
            </ul>
            
            <h3>2.2 Usage Data</h3>
            <p>
              We may also collect information about how the website is accessed and used. This usage data may include:
            </p>
            <ul>
              <li>Your computer's Internet Protocol address (IP address)</li>
              <li>Browser type and version</li>
              <li>Pages of our website that you visit</li>
              <li>Time and date of your visit</li>
              <li>Time spent on those pages</li>
              <li>Other diagnostic data</li>
            </ul>
            
            <h3>2.3 Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, including for customer service, updates, and marketing purposes</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>
            
            <h2>4. Legal Basis for Processing Personal Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul>
              <li>Where we need to perform the contract we are about to enter into or have entered into with you</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests</li>
              <li>Where we need to comply with a legal or regulatory obligation</li>
              <li>Where you have provided consent</li>
            </ul>
            
            <h2>5. Data Retention</h2>
            <p>
              We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            <p>
              To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal requirements.
            </p>
            
            <h2>6. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>
            <p>
              We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
            </p>
            
            <h2>7. Your Data Protection Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:
            </p>
            <ul>
              <li>The right to access your personal data</li>
              <li>The right to request correction of your personal data</li>
              <li>The right to request erasure of your personal data</li>
              <li>The right to object to processing of your personal data</li>
              <li>The right to request restriction of processing your personal data</li>
              <li>The right to request transfer of your personal data</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              If you wish to exercise any of these rights, please contact us using the details provided in the "Contact Us" section.
            </p>
            
            <h2>8. Third-Party Websites</h2>
            <p>
              Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
            </p>
            <p>
              We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
            
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>By email: privacy@spectrumwebco.com.au</li>
              <li>By visiting this page on our website: www.spectrumwebco.com.au/contact-us</li>
            </ul>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
