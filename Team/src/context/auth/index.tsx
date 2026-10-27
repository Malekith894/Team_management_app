import { createContext,useEffect } from "react";
import { useState } from "react";
import type { ReactNode } from "react";
import { boolean } from "yup";


type authcontexttype={
    auth:boolean;
    setauth:React.Dispatch<any>
}


const initial=JSON.parse(localStorage.getItem("authentication")|| "false") ;

export const Authcontext=createContext<authcontexttype>(initial);


function Authcontextprovider({children}:{children:ReactNode}){
    const [auth,setauth]=useState(initial)

    useEffect(function(){
        localStorage.setItem("authentication",JSON.stringify(auth))
    },[auth])

    return(
        <Authcontext.Provider value={{auth,setauth}}>
            {children}
        </Authcontext.Provider>
    )
}

export default Authcontextprovider;