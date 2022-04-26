import { Form } from "remix";
import { useLocation } from 'react-router-dom';

export default function Searchbar(){
  const url = useLocation();
    return(
      <Form className="w-full" method="get" action={url.pathname}>
          <div className="flex items-center bg-white rounded-md">
          <button type="submit" className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
</button>
          <input placeholder="Search" className="focus:outline-none " name="search"></input>
        
             
            
          </div>
          
      </Form>
    );
}