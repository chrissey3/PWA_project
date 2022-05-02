import { Link, Form } from "remix";

export default function ListItem({snippet}){
 
    
    return(
      
      <div className="my-1" >
        
      <div className="mx-2 py-4 rounded flex justify-between">
      <Link to={`/${snippet._id}`}>
      <div className="flex justify-between mx-5  ">
      <h2 className="font-semibold dark:text-white">{snippet.title}</h2>
      
      
      
      </div>
      <div className="mx-5">
      <div><p className=" text-sm text-gray-900/70 dark:text-white">{snippet.description}</p></div>
      <div className=""><p className="text-sm font-semibold dark:text-white">{snippet.language}</p></div>
      </div>
      </Link>
      <div className="flex justify-end">
      
      
      <Form method="post" action="/fav">
        <input type="hidden" name="id" defaultValue={snippet._id}/>
        <input type="hidden" name="fav" defaultValue={snippet.fav}/>
      <button type="submit">
        {snippet.fav == true?
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      :
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
      }
      </button>
      </Form>
      </div>
      </div>
      <hr className="mx-2"/>

      </div>
      
    )
}