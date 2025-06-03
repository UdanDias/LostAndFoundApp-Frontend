import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const getRequestsByUserUrl = "http://localhost:8081/lostandfound/api/v1/request/getrequestsbyuserid"
export const getRequestsByUserId = async (userId: string) => {

    try {
        const response = await axios.get(`${getRequestsByUserUrl}?userId=${userId}`,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("failed to get the data", error)
        throw error
    }
}