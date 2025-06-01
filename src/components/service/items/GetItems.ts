import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const getItemsUrl="http://localhost:8081/lostandfound/api/v1/item/getallitems"
export const getItems = async()=>{
    
    try{
        const response=await axios.get(getItemsUrl,
            {
            headers:{
                Authorization:fetchToken()
            }
        }
        )
        return response.data;   
    }catch(error){
        console.error("failed to get the data",error)
        throw error
    }
}