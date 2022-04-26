import { redirect, Form, useLoaderData } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader(){
    const db = await connectDb();
    const count = db.models.Snip.countDocuments();
    return count;
}

export async function action({request}){
    const db = await connectDb();
    const answer = await request.formData();
    const value = answer._fields.action[0];
    if(value == "yes"){
        await db.models.Snip.deleteMany();
        await db.models.Snip.insertMany([{
            title: "Monaco example",
            body: `<div>
            <Editor 
            height="100vh"
            defaultLanguage="javascript"
            value={body}
            onChange={updateBody}
            onMount={handleEditorDidMount}
            />
          </div>`,
          description: "An example of how to use monaco",
          fav: true,
          language: "JS"
        },
        {
            title: "Action/Db Remix example",
            body: `export async function action({request}){
  

                const formData = await request.formData();
                const db = await connectDb();
                const values = formData._fields;
               
               
                
                console.log('Request', request);
                const snip = await db.models.Snip.create({title: values.title[0], description: values.description[0], body: values.body[0], language: values.lang[0]});
                const id = snip._id
                return redirect(/{id});
               
            
                
              };`,
          description: "An example of how to action with database in remix",
          fav: false,
          language: "JS"
        },
        {
            title: "Insert stamement",
            body: `INSERT INTO table_name (column1, column2, column3, ...)
            VALUES (value1, value2, value3, ...);`,
          description: "An example of how to use the INSERT INTO Stament",
          fav: false,
          language: "MySql"
        },
        {
            title: "PHP fruit example",
            body: `<?php
            class Fruit {
              // Properties
              public $name;
              public $color;
            
              // Methods
              function set_name($name) {
                $this->name = $name;
              }
              function get_name() {
                return $this->name;
              }
            }
            ?>`,
          description: "Basic PHP class usage",
          fav: true,
          language: "PHP"
        }])
        return redirect("/");
    }else{
        return redirect("/");
    }
}

export default function Seed(){
    //
    const count = useLoaderData();
    

    //await db.models.Snip.deleteMany();

    return (
        <Form method="post">
            <div class="border-2 rounded border-black bg-white mx-96 my-96">
            <p>You have {count} elements in your database</p>
            <h2>Do you want to reSeed the database?</h2>
            <div className="flex justify-evenly">
            <button type="submit" name="action" value="yes">Yes</button>
            <button type="submit" name="action" value="no">no</button>
            </div>
            </div>
        </Form>
    )
}