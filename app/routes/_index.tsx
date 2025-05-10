import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Spectrum Web Co - Home" },
    { name: "description", content: "Welcome to Spectrum Web Co!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Spectrum Web Co (Remix Version)</h1>
      <p>This is a placeholder page for your new Remix application.</p>
      <p>Start building your routes in <code>app/routes/</code>.</p>
    </div>
  );
}
