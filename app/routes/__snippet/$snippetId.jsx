import { useLoaderData, Form } from "remix";
import connectDb from "~/db/connectDb.server.js";
import { useEffect, useState, useRef } from "react";

import Editor from "@monaco-editor/react";
import Popup from 'reactjs-popup';



export async function loader({ params }) {
  //
  let snippet;
  const db = await connectDb();
  if(params.snippetId != "index"){
  
    
  
  snippet = await db.models.Snip.findById(params.snippetId);
}else{
  
  snippet = await db.models.Snip.find().sort({_id: 1}).limit(1);
}
console.log(snippet);
return snippet;
}
 
export function test(data){
  let snippet = '';
  navigator.serviceWorker.addEventListener('message', event => {return snippet = {title: 'test'};});
     
   return snippet = data;
  

}


export default function SnippetPage() {
  
  const snippet = test(useLoaderData());
  const [body, setBody] = useState();
  const [title, setTitle] = useState();

  const editorRef = useRef(null);
  const bodyUpdate = useRef(null);
  const titleUpdate = useRef(null);
  

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }

  
    
  
  function updateBody(){
    const b = editorRef.current.getValue()
    setBody(b);
   
  }

  function updateTitle(e){
    setTitle(e.value);
   
 }
  
  
  useEffect(()=>{
    
    setBody(snippet.body);
    setTitle(snippet.title);
  },[snippet]);
  
  
  
  return (
    <div>
      <Form method="post" action="/requestHandler">
      <div className="flex justify-between dark:bg-stone-900">
      <div className="flex items-center justify-start"> 
      <svg xmlns="http://www.w3.org/2000/svg" className="ml-6 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg> 
      <h1 className="inline-block text-2xl m-4 dark:text-white"><input ref={titleUpdate} name="title" className="bg-transparent" value={title} onChange={updateTitle}></input></h1>
      </div>
      <div className="flex items-center">
      
        <input type="hidden" name="id" defaultValue={snippet._id}></input>
        <input ref={bodyUpdate} type="hidden" id="bodyUpdate" defaultValue={body} name="body" ></input>
        <button name="toDo" value="delete" type="submit" className="border rounded px-2 border-black bg-slate-400 mx-2 h-10">
        Delete
        </button>
  
      <button name="toDo" value="update" className="border rounded px-2 border-black bg-slate-400 mx-2 h-10" type="submit" >Save</button>

      <Popup trigger={
    <button type="button" className="float-right border rounded px-2 border-black bg-slate-400 mx-2 h-10">  
    New
    </button>
    }>
      
        
          <div className="border rounded"> 
          <Form method="post" action="/new">
          <input placeholder="Title" className="w-full mb-2" name="title"></input>
          <input placeholder="Language" className="w-full mb-2" name="lang"></input>
          <input type="hidden" defaultValue="Start writing or copy code here" name="body"></input>
          <br />
          <textarea placeholder="Description" className="resize-none w-full" name="description"></textarea>
          <br />
          <button type="submit" className="border-2 border-black rounded bg-gray-300" name="action" value="new">Create new snip</button>
          </Form>
          </div>
          
      
    </Popup> 
      </div>
      
      </div>
      </Form>
       
      
      
      
      
      

      {//<textarea className="resize-none h-screen w-full dark:bg-stone-400" id='code' value={body} name="body" onChange={updateBody}></textarea>
      }
      
      <div>
        <Editor 
        height="100vh"
        defaultLanguage="javascript"
        value={body}
        onChange={updateBody}
        onMount={handleEditorDidMount}
        />
      </div>
      
      
    </div>
  );
}
