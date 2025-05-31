import axios from "axios";


const baseAuthUrl="http://localhost:8081/lostandfound/api/v1/auth";
const RegisterTask=async(register:any)=>{
    console.log(register)
    
        try{
            const registerResponse=await axios.post(
            `${baseAuthUrl}/signup`,register
            );
            console.log(registerResponse.data.token)
            return registerResponse.data.token
        }catch(err){
            console.error(err)
            throw err
        }
        
    
    
}