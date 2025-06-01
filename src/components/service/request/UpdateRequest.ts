import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const updateRequestsUrl="http://localhost:8081/lostandfound/api/v1/request"
export const updateRequest = async(request:any)=>{
    
    try{
        const response=await axios.patch(
          `${updateRequestsUrl}?requestId=${request.requestId}`,request,
                      {
                          headers:{
                              Authorization:fetchToken()
                          }
                      }

        );
        return response.data;   
    }catch(error){
        console.error("failed to update the data",error)
        throw error
    }
}