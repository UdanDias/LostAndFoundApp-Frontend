import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const getUserurl = "http://localhost:8081/lostandfound/api/v1/user/getallusers"

export const getUsers = async () => {
    try {
        const response = await axios.get(getUserurl,
            {
                headers: {
                    Authorization: fetchToken()
                }
            });
        return response.data;
    } catch (error) {
        console.error("Error Getting User Data ", error)
        throw error
    }
}