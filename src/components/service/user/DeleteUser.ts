import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const deleteUserUrl = "http://localhost:8081/lostandfound/api/v1/user/deleteuser"
export const deleteUsers = async (userId: string) => {

    try {
        const response = await axios.delete(
            `${deleteUserUrl}?userId=${userId}`,
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