import axios from 'axios'
const addUsersUrl="http://localhost:8081/lostandfound/api/v1/user"
export const addUsers = async(user:any)=>{
    
    try{
        const response=await axios.post(
          addUsersUrl,user

        );
        return response.data;    
    }catch(error){
        console.error("failed to add the data",error)
        throw error
    }
}