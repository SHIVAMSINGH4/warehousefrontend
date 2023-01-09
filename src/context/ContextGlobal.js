import { useReducer, useState } from "react";
import { Maincontext } from "./Context";

export default function GlobalContext({children}){
    // const [state, seState]=useReducer(reducer,state)

    const[VIdinfo,setVIdinfo] = useState({name:"choose user"})

    function dd(info){
        setVIdinfo({name:info})
    }

    const value = {
        id:VIdinfo,
        setid:dd
    }

    // function reducer(state,action){
    //     switch (action.type) {
    //         case "login":
    //             return {...state,auth:1,type:action.type}
    //         case "logout":
    //             return {...state,auth:0,type:action.type}            
        
    //         default:
    //             return 0;
    //     }

    // }
 


    return(
        <>
         <Maincontext.Provider value={value}>
            {children}
         </Maincontext.Provider>
        </>
    )
} 