import axios from 'axios'
const updateUserUrl="http://localhost:8081/lostandfound/api/v1/user"
export const updateUser = async(user:any)=>{
    
    try{
        const response=await axios.patch(
          `${updateUserUrl}?userId=${user.userId}`,user

        );
        return response.data;   
    }catch(error){
        console.error("failed to update the data",error)
        throw error
    }
}