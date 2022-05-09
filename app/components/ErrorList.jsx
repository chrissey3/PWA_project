import { useEffect } from "react/cjs/react.production.min";
import { useLoaderData, Outlet, Form, useSubmit, useCatch } from "remix";
import ListItem from "~/components/ListItem";
import Searchbar from "~/components/Searchbar";




export default function ErrorList(){
    
    return(
<>
      
<div className="w-1/5  border-x-2 h-screen bg-white dark:bg-stone-900">
  <div className="flex p-4 shadow">
  <Searchbar />
 
 <Form>
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
<div className="w-3/5 ">
<Outlet />

</div>

</>
)
}