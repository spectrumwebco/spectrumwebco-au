import { useState } from "react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us | Spectrum Web Co Australia" },
    { name: "description", content: "Get in touch with Spectrum Web Co. We'd love to hear from you and discuss how we can help with your software development needs." },
  ];
};

// This is a server-side action that will be called when the form is submitted
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const company = formData.get("company");
  const message = formData.get("message");
  
  // Validate the form data
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  if (!message) errors.message = "Message is required";
  
  if (Object.keys(errors).length > 0) {
    return json({ errors, success: false });
  }
  
  try {
    // In a real application, you would send this data to your API
    // For now, we'll just simulate a successful submission
    
    // Example API call:
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, company, message }),
    // });
    
    return json({ success: true });
  } catch (error) {
    return json({ 
      errors: { form: "Failed to submit the form. Please try again." },
      success: false 
    });
  }
}

export default function ContactUs() {
  const actionData = useActionData<typeof action>();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            Contact Us
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            We'd love to hear from you. Get in touch with our team to discuss your project or ask any questions.
          </p>
        </FadeIn>
        
        <div className="mt-16 sm:mt-20 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Contact Information</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Our team is ready to assist you with any inquiries or project discussions.
            </p>
            
            <dl className="mt-8 space-y-6 text-base text-neutral-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-neutral-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </dt>
                <dd>Sydney, Australia</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-neutral-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </dt>
                <dd><a href="mailto:info@spectrumwebco.com.au" className="hover:text-neutral-950">info@spectrumwebco.com.au</a></dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950">Send us a message</h2>
            
            {actionData?.success && (
              <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            <Form method="post" className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
                {actionData?.errors?.name && (
                  <p className="mt-1 text-sm text-red-600">{actionData.errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
                {actionData?.errors?.email && (
                  <p className="mt-1 text-sm text-red-600">{actionData.errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-neutral-700">Company (Optional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                ></textarea>
                {actionData?.errors?.message && (
                  <p className="mt-1 text-sm text-red-600">{actionData.errors.message}</p>
                )}
              </div>
              
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
              
              {actionData?.errors?.form && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.form}</p>
              )}
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
}
