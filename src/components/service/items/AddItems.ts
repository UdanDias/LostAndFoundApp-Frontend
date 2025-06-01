import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
import { Navigate, useNavigate } from 'react-router-dom';

const addItemsUrl="http://localhost:8081/lostandfound/api/v1/item"


export const addItems = async(item:any,navigate:any)=>{
    
    try{
        const response=await axios.post(
          addItemsUrl,item,
          {
            headers:{
                Authorization:fetchToken()
            }
          }

        );
        return response.data;    
    }catch(error){
        navigate("/unauth")
        console.error("failed to add the data",error)
        throw error
    }
}