import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
import Swal from 'sweetalert2';
const addrequestUrl = "http://localhost:8081/lostandfound/api/v1/request"
export const addRequests = async (request: any,navigate:any) => {

    try {
        const response = await axios.post(
            addrequestUrl, request,
            {
                headers:{
                    Authorization:fetchToken()
                }
            }

        );
        return response.data;
    // } catch (error) {
    //     console.error("failed to add the data", error)
    //     throw error
    // }
    } catch (error: any) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                navigate("/unauth");
            } else {
                console.error("Failed to add the request:", error);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
    
                Toast.fire({
                    icon: "error",
                    title: "Failed to Add Request"
                });
    
            }
            throw error; // Optional: rethrow if upstream handlers need to catch it
        }
}