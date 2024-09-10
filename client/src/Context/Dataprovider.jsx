
import { createContext, useState } from "react";

export const Datacontext = createContext(null)

export default function Dataprovider({children}){
    const [users, setUsers] = useState([])
    
   
    return(
        <Datacontext.Provider 
        value={{users, setUsers}}>
            {children}

        </Datacontext.Provider>
        
    )
}