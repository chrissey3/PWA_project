import { useRef, useEffect } from "react";

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
        <div className="flex">
          <div className="w-1/5 bg-white dark:bg-stone-900">
            <h2 className="text-center text-2xl m-4 dark:text-white">
              Languages
            </h2>
            <Link to={url.pathname}>
              <Dark />
            </Link>
            <hr className="bg-zinc-400 shadow-lg dark:bg-white" />
            <div className=" bg-zinc-400 h-screen py-1 dark:bg-stone-700">
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
