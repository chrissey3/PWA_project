
import { Link, useCatch, Form, Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";
import ListItem from "~/components/ListItem";
import Searchbar from "~/components/Searchbar";

export default function CatchBoundary() {
  const caught = useCatch();
  const [offlineSnippets, setOfflineSnippets] = useState([]);

  // Load cached snippets in a useEffect (which only runs in the browser)
  // because the Cache API is not available when rendering on the server
  useEffect(() => {
    async function getCachedSnippets() {
      const cache = await caches.open("dynamic-cache");
      const cachedRequests = await cache.keys();
      const cachedLoaderRequestsForSnippetPages = cachedRequests.filter(
        (request) => {
          const url = new URL(request.url);
          return (
            // Does it have a _data param, e.g. is it a loader request?
            url.searchParams.has("_data") &&
            // And is it a loader request specifically for the $snippetId route?
            url.searchParams.get("_data").includes("$snippetId")
          );
        }
      );
      const simplifiedCachedSnippets = await Promise.all(
        cachedLoaderRequestsForSnippetPages.map(async (request) => {
          const response = await cache.match(request);
          const body = await response.json();
          return {
            _id: body._id,
            title: body.title,
            description: body.description,
            language: body.language
          };
        })
      );
      setOfflineSnippets(simplifiedCachedSnippets);
    }
    if (caught.status === 503) {
      getCachedSnippets();
    }

  }, [caught.status]);

  // Special case for offline viewing
  if (caught.status === 503) {
    return (
      <>
      
      <div className=" border-x-2 sm:h-screen bg-sky-50 dark:bg-stone-900">
        <div className="flex w-full p-4 shadow">
 <h2>Snippets</h2>
 <p>
  You appear to be offline, this the available snippets
 </p>
 </div>
 <hr />
 <ul>
 {offlineSnippets.map((snip) => {
return <><Link to={`/snippet/${snip._id}`} key={snip._id}>{snip.title}</Link><br></br></>
})}
 
 
</ul>
</div>


  
        
      
  
      </>
    );
  }

  
  // Default CatchBoundary
  return (
    <div className="text-red-500 font-bold">
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}