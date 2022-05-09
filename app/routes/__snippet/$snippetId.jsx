import { useLoaderData, Form, useCatch } from "remix";
import connectDb from "~/db/connectDb.server.js";
import { useEffect, useState, useRef } from "react";

import Editor from "@monaco-editor/react";
import Popup from "reactjs-popup";

export async function loader({ params }) {
  //
  let snippet;
  const db = await connectDb();
  if (params.snippetId != "index") {
    snippet = await db.models.Snip.findById(params.snippetId);
  } else {
    snippet = await db.models.Snip.find().sort({ _id: 1 }).limit(1);
  }
  console.log(snippet);
  return snippet;
}

export function CatchBoundary() {
  const card = useCatch();
  return (
    <div>
      {card.status} {card.statusText}
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return <div>{error.message}</div>;
}

export default function SnippetPage() {
  //window.addEventListener('offline', function(e) { handleOffline()});
  //navigator.serviceWorker.addEventListener('message', event => {return true;});
  let snippet = useLoaderData();
  const [body, setBody] = useState();
  const [title, setTitle] = useState();

  const editorRef = useRef(null);
  const bodyUpdate = useRef(null);
  const titleUpdate = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function updateBody() {
    const b = editorRef.current.getValue();
    setBody(b);
  }

  function updateTitle(e) {
    setTitle(e.value);
  }

  function copy(text) {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    setBody(snippet.body);
    setTitle(snippet.title);
  }, [snippet]);

  return (
    <div className="h-full bg-sky-50">
      <Form method="post" action="/requestHandler" className="h-1/5 flex justify-center items-center sm:block sm:h-fit">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between dark:bg-stone-900">
          <div className="flex items-center justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-6 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <h1 className="inline-block text-2xl m-4 dark:text-white">
              <input
                ref={titleUpdate}
                name="title"
                className="bg-transparent"
                value={title}
                onChange={updateTitle}
              ></input>
            </h1>
            <button
              type="button"
              onClick={() => copy(snippet.body)}
              className="inline-block text-2x1 m-4 dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <input type="hidden" name="id" defaultValue={snippet._id}></input>
            <input
              ref={bodyUpdate}
              type="hidden"
              id="bodyUpdate"
              defaultValue={body}
              name="body"
            ></input>
            <button
              name="toDo"
              value="delete"
              type="submit"
              className="border rounded px-2 border-black bg-slate-400 mx-2 h-10"
            >
              Delete
            </button>

            <button
              name="toDo"
              value="update"
              className="border rounded px-2 border-black bg-slate-400 mx-2 h-10"
              type="submit"
            >
              Save
            </button>

            <Popup
              trigger={
                <button
                  type="button"
                  className="float-right border rounded px-2 border-black bg-slate-400 mx-2 h-10"
                >
                  New
                </button>
              }
            >
              <div className="border rounded">
                <Form method="post" action="/new">
                  <input
                    placeholder="Title"
                    className="w-full mb-2"
                    name="title"
                  ></input>
                  <input
                    placeholder="Language"
                    className="w-full mb-2"
                    name="lang"
                  ></input>
                  <input
                    type="hidden"
                    defaultValue="Start writing or copy code here"
                    name="body"
                  ></input>
                  <br />
                  <textarea
                    placeholder="Description"
                    className="resize-none w-full"
                    name="description"
                  ></textarea>
                  <br />
                  <button
                    type="submit"
                    className="border-2 border-black rounded bg-gray-300"
                    name="action"
                    value="new"
                  >
                    Create new snip
                  </button>
                </Form>
              </div>
            </Popup>
          </div>
        </div>
      </Form>

      {
        //<textarea className="resize-none h-screen w-full dark:bg-stone-400" id='code' value={body} name="body" onChange={updateBody}></textarea>
      }

      <div className="h-4/5 sm:h-full">
        <Editor
          defaultLanguage="javascript"
          height="100%"
          value={body}
          onChange={updateBody}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}
