import { Form } from "remix"

export default function Dark(){

   
    

    function dark(){
        if (typeof window !== 'undefined'){
            if(localStorage.getItem('theme') == 'light'){
    localStorage.setItem('theme', 'dark');
}else{
    localStorage.setItem('theme', 'light');
}
}
   
}
   
return(
    <Form>
        <button className="text-black dark:text-white" type="submit" onClick={() => {dark()}}>
          Dark/Light
        </button>
    </Form>
    )
}