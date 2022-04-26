import connectDb from "~/db/connectDb.server.js";
import { redirect } from "remix";

export async function action({request}){
    const formData = await request.formData();
    const db = await connectDb();
    const values = formData._fields;
  

    const filter = values.id[0];
    const body = values.body[0];
    const title = values.title[0];
   const action = values.toDo[0];

    if(action == "update"){
        if(filter){

    const toUpdate = await db.models.Snip.findById(filter);
    toUpdate.body = body;
    toUpdate.title = title;
    await toUpdate.save();
    /*
    await db.models.Snip.findOneAndUpdate(filter, update, {
        new: true
    });
    */
   console.log(values);
    return redirect(`/${filter}`);
}else{
    const snip = await db.models.Snip.create({title: values.title[0], body: values.body[0]});
    const id = snip._id
    return redirect(`/${id}`);
}

}else if(action == "delete"){
    if(filter){
    await db.models.Snip.deleteOne({_id: filter}); 
    return redirect(`/`);
    }else{
        return redirect(`/`);
    }
}
}
   