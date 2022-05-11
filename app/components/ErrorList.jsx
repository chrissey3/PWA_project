import { useEffect } from "react/cjs/react.production.min";
import { useLoaderData, Outlet, Form, useSubmit, useCatch } from "remix";
import ListItem from "~/components/ListItem";
import Searchbar from "~/components/Searchbar";



export default function ErrorList({error}){
  
    return(
<>

<div className="sm:w-1/5 border-x-2 sm:h-screen bg-sky-50 dark:bg-stone-900">
  <div className="sm:w-2/6 sm:flex sm:items-center ">
    
  <Searchbar />
 
 <Form className="sm:w-2/6 sm:flex sm:items-center ">
 <select name="sort">
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

 
 
</ul>
</div>
<div className="sm:w-3/5 sm:h-screen">


</div>

</>
)
}

