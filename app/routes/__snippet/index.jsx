import Popup from "reactjs-popup";
import { Form } from "remix";

export default function Placeholder(){
    return (
       
      <>
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
          <textarea placholder="Description" className="resize-none w-full" name="description"></textarea>
          <br />
          <button type="submit" className="border-2 border-black rounded bg-gray-300" name="action" value="new">Create new snip</button>
          </Form>
          </div>
          
      
    </Popup> 
      </>
      );
}