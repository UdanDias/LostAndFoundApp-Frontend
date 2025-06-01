import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const updateUserUrl = "http://localhost:8081/lostandfound/api/v1/user/updateuser"
export const updateUser = async (user: any) => {

    try {
        const response = await axios.patch(
            `${updateUserUrl}?userId=${user.userId}`, user,
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