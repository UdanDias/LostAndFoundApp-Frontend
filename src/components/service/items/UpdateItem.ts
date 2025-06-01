import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const updateItemsUrl = "http://localhost:8081/lostandfound/api/v1/item"
export const updateItems = async (item: any) => {

    try {
        const response = await axios.patch(
            `${updateItemsUrl}?itemId=${item.itemId}`, item,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }

        );
        return response.data;
    } catch (error) {
        console.error("failed to update the data", error)
        throw error
    }
}