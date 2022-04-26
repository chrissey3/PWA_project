import connectDb from "~/db/connectDb.server.js";

import { redirect } from "remix";


export async function action({request}){
    
    const formData = await request.formData();
    const db = await connectDb();
    const values = formData._fields;

    const filter = values.id[0];
   
    const toUpdate = await db.models.Snip.findById(filter);
    const fav = toUpdate.fav;
    let check;

    if(fav == true){
       check = false;
       
    }else{
        check = true;
        
    }
    toUpdate.fav = check;
    await toUpdate.save();
    return redirect(`/${filter}`);
    //return values.fav[0];
    
    
    /*
    await db.models.Snip.findOneAndUpdate(filter, update, {
        new: true
    });
    */
    
    //return toUpdate;
}