import { useRef, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useCatch,
} from "remix";
import styles from "~/tailwind.css";
import connectDb from "~/db/connectDb.server.js";
import Llist from "~/components/lList";
import Dark from "~/components/Darkmode";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export function meta() {
  return {
    charset: "utf-8",
    title: "Remix + MongoDB",
    viewport: "width=device-width,initial-scale=1",
  };
}

export async function loader() {
  const db = await connectDb();
  const snippets = await db.models.Snip.distinct("language");
  return snippets;
}

export default function App() {
  const bodyRef = useRef();
  const url = useLocation();
  const snippets = useLoaderData();
  const [check, setCheck] = useState();

  function dark() {
    if (typeof window !== "undefined") {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        bodyRef.current.classList.add("dark");
      } else {
        bodyRef.current.classList.remove("dark");
      }
    }
  }

  useEffect(() => {
    dark();
  });

  return (
    <html lang="en">
      <head>
        <Meta />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <Links />
      </head>
      <body
        ref={bodyRef}
        className="bg-slate-100 text-slate-800 font-sans dark:bg-stone-700"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/5 bg-sky-100 dark:bg-stone-900 sm:h-screen">
            <div className="bg-sky-200 p-1">
              <h2 className="text-center p-4 text-2xl dark:text-white">
                Languages
              </h2>
              <Link to={url.pathname}>
                <Dark />
              </Link>
            </div>
            <hr className="bg-zinc-400 shadow-lg dark:bg-white" />
            <div className="py-1">
              <div className="my-3 mx-2">
                {snippets?.map((snip) => {
                  return (
                    <Llist snip={snip} key={snip} location={url.pathname} />
                  );
                })}
              </div>
            </div>
          </div>

          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const card = useCatch();
  return (
    <div>
      {card.status} {card.statusText}
    </div>
    //Error layout
  );
}

export function ErrorBoundary({ error }) {
  return <div>{error.message}</div>;
}
