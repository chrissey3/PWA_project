import connectDb from "~/db/connectDb.server.js";
import { redirect } from "remix";

export async function action({request}){
  

    const formData = await request.formData();
    const db = await connectDb();
    const values = formData._fields;
   
   
    
    console.log('Request', request);
    const snip = await db.models.Snip.create({title: values.title[0], description: values.description[0], body: values.body[0], language: values.lang[0]});
    const id = snip._id
    return redirect(`/${id}`);
   

    
  };