import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const addrequestUrl = "http://localhost:8081/lostandfound/api/v1/request"
export const addRequests = async (request: any) => {

    try {
        const response = await axios.post(
            addrequestUrl, request,
            {
                headers:{
                    Authorization:fetchToken()
                }
            }

        );
        return response.data;
    } catch (error) {
        console.error("failed to add the data", error)
        throw error
    }
}