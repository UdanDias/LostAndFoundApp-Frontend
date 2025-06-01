import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const updateItemsUrl = "http://localhost:8081/lostandfound/api/v1/item/updateitem"
export const updateItems = async (item: any, navigate: any) => {

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
        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            console.warn("Unauthorized or forbidden, redirecting to /unauth");
            navigate("/unauth");
        } else {
            console.error("Failed to update item:", error);
        }

        throw error;
    }
}