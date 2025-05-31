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
        const token=localStorage.getItem("LFToken")
    },[])
    const login=(token:string)=>{
        localStorage.setItem("LFToken",token)
        setIsAuthenticated(true)
    }
    const logout=()=>{
        localStorage.removeItem("LFToken")
        setIsAuthenticated(false)
    }
    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    );

}