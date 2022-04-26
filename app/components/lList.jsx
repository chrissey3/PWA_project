import { Form } from "remix";

export default function Llist({snip, location}){
    return(
        <div className="my-3 bg-white dark:bg-stone-900">
            <Form method="get" action={location}>
                <button type="submit">
            <h2 className="mx-3 font-bold dark:text-white">{snip}</h2>
            </button>
            <input type="hidden" name="lang" defaultValue={snip}/>
            </Form>
            <hr />
        </div>
    )
}