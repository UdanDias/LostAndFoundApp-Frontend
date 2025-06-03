import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const getUserUrl = "http://localhost:8081/lostandfound/api/v1/user/getuser"
export const getUserbyId = async (userId: string) => {

    try {
        const response = await axios.get(
            `${getUserUrl}?userId=${userId}`,
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