import axios from 'axios'
const deleteUserUrl="http://localhost:8081/lostandfound/api/v1/user"
export const deleteUsers = async(userId:string)=>{
    
    try{
        const response=await axios.delete(
          `${deleteUserUrl}?userId=${userId}`

        );
        return response.data; 
    }catch(error){
        console.error("failed to delete the data",error)
        throw error
    }
}