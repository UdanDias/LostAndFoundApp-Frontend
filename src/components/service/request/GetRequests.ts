import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const getRequestsUrl="http://localhost:8081/lostandfound/api/v1/request/getallrequests"
export const getRequest = async()=>{
    
    try{
        const response=await axios.get(getRequestsUrl,
            {
                        headers:{
                            Authorization:fetchToken()
                        }
                    }
        );
        return response.data;   
    }catch(error){
        console.error("failed to get the data",error)
        throw error
    }
}