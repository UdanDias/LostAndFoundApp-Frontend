export const fetchToken=()=>{
    const token=localStorage.getItem("LFToken")
    return "Bearer "+token
}
