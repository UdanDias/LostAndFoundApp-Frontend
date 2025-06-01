import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const deleteItemsUrl = "http://localhost:8081/lostandfound/api/v1/item"
export const deleteItems = async (itemId: string) => {

    try {
        const response = await axios.delete(
            `${deleteItemsUrl}?itemId=${itemId}`,
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