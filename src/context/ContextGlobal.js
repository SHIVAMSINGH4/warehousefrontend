import { useState } from "react";
import { Maincontext } from "./Context";

export default function GlobalContext({children}){
    const[VIdinfo,setVIdinfo] = useState({name:"vendor"})

    function dd(info){
        setVIdinfo({name:info})
    }

    const value = {
        id:VIdinfo,
        setid:dd
    }

    return(
        <>
         <Maincontext.Provider value={value}>
            {children}
         </Maincontext.Provider>
        </>
    )
} 