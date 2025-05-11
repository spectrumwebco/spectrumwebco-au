import { cssBundle } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  MetaFunction,
} from "@remix-run/react";

import tailwindStylesheet from "@/styles/tailwind.css";
import { RootLayout } from '@/components/RootLayout';

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";


export const links: LinksFunction = () => [
  ...(cssBundle ? [{ rel: "stylesheet", href: cssBundle }]: []),
  { rel: "stylesheet", href: tailwindStylesheet },
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Studio - Award winning developer studio based in Denmark" },
    { name: "charset", content: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};

// Example loader - can be expanded for site-wide data
export async function loader({ request }: LoaderFunctionArgs) {
  return json({ ENV: { /* Pass environment variables if needed */ } });
}

export default function App() {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-full flex-col">
        <RootLayout>
          <Outlet />
        </RootLayout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
