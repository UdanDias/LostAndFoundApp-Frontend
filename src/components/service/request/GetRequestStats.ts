import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const getRequestStatsByUserIdUrl = "http://localhost:8081/lostandfound/api/v1/requeststats"
export const getRequestStatsByUserId = async (userId: string) => {

    try {
        const response = await axios.get(`${getRequestStatsByUserIdUrl}?userId=${userId}`,
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