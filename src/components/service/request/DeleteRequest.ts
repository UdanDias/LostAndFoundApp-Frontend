import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const deleteRequestsUrl = "http://localhost:8081/lostandfound/api/v1/request"
export const deleteRequests = async (requestId: string) => {

    try {
        const response = await axios.delete(
            `${deleteRequestsUrl}?requestId=${requestId}`,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }

        );
        return response.data;
    } catch (error) {
        console.error("failed to delete the data", error)
        throw error
    }
}