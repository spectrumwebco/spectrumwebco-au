import { cssBundle } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
} from "@remix-run/react";

import stylesheet from "@/styles/global.css"; // Assuming your global CSS is here

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";


export const links: LinksFunction = () => [
  ...(cssBundle ? [{ rel: "stylesheet", href: cssBundle }]: []),
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }, // Ensure favicon is in public
];

// Example loader - can be expanded for site-wide data
export async function loader({ request }: LoaderFunctionArgs) {
  return json({ ENV: { /* Pass environment variables if needed */ } });
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
