import axios from 'axios'
const getRequestsUrl="http://localhost:8081/lostandfound/api/v1/request/getallrequests"
export const getRequest = async()=>{
    
    try{
        const response=await axios.get(getRequestsUrl);
        return response.data;   
    }catch(error){
        console.error("failed to get the data",error)
        throw error
    }
}