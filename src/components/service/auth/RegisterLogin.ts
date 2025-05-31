import axios from "axios";


const baseAuthUrl="http://localhost:8081/lostandfound/api/v1/user";
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
const LoginTask=async(login:any)=>{
    console.log(login)
    
        try{
            const loginResponse=await axios.post(
            `${baseAuthUrl}/signin`,login
            );
            console.log(loginResponse.data.token)
            return loginResponse.data.token
        }catch(err){
            console.error(err)
            throw err
        }
 
}
export {RegisterTask,LoginTask}