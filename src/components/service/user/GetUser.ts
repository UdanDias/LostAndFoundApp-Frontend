import axios from 'axios'
const getUserurl="http://localhost:8081/lostandfound/api/v1/user/getallusers"

export const getUsers=async()=>{
    try {
        const response=await axios.get(getUserurl);
        return response.data;  
    } catch (error) {
        console.error("Error Getting User Data ",error)
        throw error
    }
}