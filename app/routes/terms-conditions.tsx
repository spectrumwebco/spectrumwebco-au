import type { MetaFunction } from "@remix-run/node";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";

export const meta: MetaFunction = () => {
  return [
    { title: "Terms & Conditions | Spectrum Web Co Australia" },
    { name: "description", content: "Read the terms and conditions for using Spectrum Web Co's services and website." },
  ];
};

export default function TermsConditions() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn>
          <h1 className="font-display text-4xl font-medium tracking-tight text-balance text-neutral-950 sm:text-5xl">
            Terms & Conditions
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Last updated: June 1, 2023
          </p>
          
          <div className="mt-10 prose prose-neutral max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Spectrum Web Co ("Company", "we", "our", "us"). These Terms and Conditions ("Terms", "Terms and Conditions") govern your use of our website located at www.spectrumwebco.com.au (the "Service") and any related services offered by Spectrum Web Co.
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
            
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials (information or software) on Spectrum Web Co's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on Spectrum Web Co's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by Spectrum Web Co at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
            </p>
            
            <h2>3. Disclaimer</h2>
            <p>
              The materials on Spectrum Web Co's website are provided on an 'as is' basis. Spectrum Web Co makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, Spectrum Web Co does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
            
            <h2>4. Limitations</h2>
            <p>
              In no event shall Spectrum Web Co or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Spectrum Web Co's website, even if Spectrum Web Co or a Spectrum Web Co authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            <p>
              Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
            
            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Spectrum Web Co's website could include technical, typographical, or photographic errors. Spectrum Web Co does not warrant that any of the materials on its website are accurate, complete or current. Spectrum Web Co may make changes to the materials contained on its website at any time without notice. However, Spectrum Web Co does not make any commitment to update the materials.
            </p>
            
            <h2>6. Links</h2>
            <p>
              Spectrum Web Co has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Spectrum Web Co of the site. Use of any such linked website is at the user's own risk.
            </p>
            
            <h2>7. Modifications</h2>
            <p>
              Spectrum Web Co may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
            
            <h2>8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Australia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul>
              <li>By email: legal@spectrumwebco.com.au</li>
              <li>By visiting this page on our website: www.spectrumwebco.com.au/contact-us</li>
            </ul>
          </div>
        </FadeIn>
      </Container>
    </>
  );
}
