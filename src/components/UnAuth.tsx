import { useEffect } from "react"
import Swal from "sweetalert2"

export const UnAuth=()=>{
    useEffect(()=>{
        Swal.fire({
                    title:"Access denied!",
                    text:"You have no permission to access this page",
                    icon:"warning",
                    // confirmButtonText:"OK"
                    allowOutsideClick:true
        })
    })
    return (
        <>
        <h1 style={{color:"red"}}>You have no permission to handle Data</h1>
        </>
    )
}