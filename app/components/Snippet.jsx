import { useLoaderData } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ id }) {
  const db = await connectDb();
  return db.models.Snip.findById(id);
}

export default function SnippetPage(id) {
  const snippet = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{snippet.title}</h1>
      <code>
      
        <pre>{JSON.stringify(snippet, null, 2)}</pre>
      </code>
    </div>
  );
}
