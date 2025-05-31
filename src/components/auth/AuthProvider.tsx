import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType{
    isAuthenticated:boolean,
    login:(token:string)=>void;
    logout:()=>void;
}
const AuthContext=createContext<AuthContextType|undefined>(undefined);
export const AuthProvider=({children}:{children:ReactNode})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    useEffect(()=>{

    },[])
    const login=()=>{
        setIsAuthenticated(true)
    }
    const logout=()=>{
        setIsAuthenticated(false)
    }
    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    );

}