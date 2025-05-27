import axios from 'axios'
const deleteRequestsUrl="http://localhost:8081/lostandfound/api/v1/request"
export const deleteRequests = async(requestId:string)=>{
    
    try{
        const response=await axios.delete(
          `${deleteRequestsUrl}?requestId=${requestId}`

        );
        return response.data; 
    }catch(error){
        console.error("failed to delete the data",error)
        throw error
    }
}