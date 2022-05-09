import { useLoaderData, Outlet, Form, useSubmit, useCatch } from "remix";
import ListItem from "~/components/ListItem";
import Searchbar from "~/components/Searchbar";
import ErrorList from "~/components/ErrorList";

import connectDb from "~/db/connectDb.server.js";

import { useLocation } from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(await request.url);
  const sort = url.searchParams.get("sort");
  const search = url.searchParams.get("search");
  const lang = url.searchParams.get("lang");
  let snippets;
  const db = await connectDb();

  if (lang != null) {
    snippets = await db.models.Snip.find({
      language: lang,
    });
  } else {
    if (sort != null) {
      if (sort == "asc") {
        snippets = await db.models.Snip.find({}).sort({
          title: -1,
        });
      } else if (sort == "desc") {
        snippets = await db.models.Snip.find({}).sort({
          title: 1,
        });
      } else if (sort == "newest") {
        snippets = await db.models.Snip.find({}).sort({
          _id: -1,
        });
      } else if (sort == "oldest") {
        snippets = await db.models.Snip.find({}).sort({
          _id: 1,
        });
      } else if (sort == "fav") {
        snippets = await db.models.Snip.find({
          fav: true,
        });
      } else if (sort == "all") {
        snippets = await db.models.Snip.find();
      }
    } else if (search != " ") {
      const $regex = new RegExp(search, "i");
      snippets = await db.models.Snip.find(search ? { title: $regex } : {});
    } else {
      snippets = await db.models.Snip.find();
    }
  }
  return snippets;
}

export function CatchBoundary() {
  const card = useCatch();
  return (
    <div>
      {card.status} {card.statusText}
    </div>
  );
}

export function ErrorBoundary({error}){
  return(
   <ErrorList />
  )
 }


 



export default function Index() {
  const submit = useSubmit();

  function handleChange(event) {
    submit(event.currentTarget, { replace: true });
  }

  const snippets = useLoaderData();

  const url = useLocation();
  return (
    <>
      <div className="sm:w-1/5 border-x-2 sm:h-screen bg-sky-50 dark:bg-stone-900">
        <div className="flex sm:w-full p-4 shadow">
          <Searchbar />

          <Form className="sm:w-2/6 sm:flex sm:items-center " method="get" action={url.pathname} onChange={handleChange}>
            <select className="p-1 rounded-md sm:w-full" name="sort">
              <option value="all">all</option>
              <option value="asc">asc</option>
              <option value="desc">desc</option>
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
              <option value="fav">favorites</option>
            </select>
          </Form>
        </div>
        <hr />
        <ul>
          {snippets?.map((snip) => {
            console.log(snip.title);

            return <ListItem snippet={snip} key={snip._id} />;
          })}
        </ul>
      </div>
      <div className="sm:w-3/5 sm:h-screen">
        <Outlet />
      </div>
    </>
  );
}
