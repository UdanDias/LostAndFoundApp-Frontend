import axios from 'axios'
const addItemsUrl="http://localhost:8081/lostandfound/api/v1/item"
export const addItems = async(item:any)=>{
    
    try{
        const response=await axios.post(
          addItemsUrl,item

        );
        return response.data;    
    }catch(error){
        console.error("failed to add the data",error)
        throw error
    }
}