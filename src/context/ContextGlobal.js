import { useReducer, useState } from "react";
import { MainContext } from "./Context";

export default function GlobalContext({ children }) {
    // profile 
    const [profile, setProfile] = useState()
    const [cartCount,setCartCount] = useState(0)

    //values to be travelling around
    const value = {
        profile: {
            profile,
            setProfile
        },
        cart:{
            cartCount,
            setCartCount
        }
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



    return (
        <>
            <MainContext.Provider value={value}>
                {children}
            </MainContext.Provider>
        </>
    )
} 