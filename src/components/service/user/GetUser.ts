import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
const getUserurl = "http://localhost:8081/lostandfound/api/v1/user/getallusers"

export const getUsers = async (navigate:any) => {
    try {
        const response = await axios.get(getUserurl, {
            headers: {
                Authorization: fetchToken()
            }
        });
        return response.data;
    } catch (error) {
        if (
            axios.isAxiosError(error) &&
            (error.response?.status === 401 || error.response?.status === 403)
        ) {
            console.warn("Unauthorized or forbidden, redirecting to /unauth");
            navigate("/unauth");
            return null; // ✅ Do not throw, just return null
        } else {
            console.error("Failed to get users:", error);
            return null; // ✅ Optional: gracefully handle other errors too
        }
    }
}