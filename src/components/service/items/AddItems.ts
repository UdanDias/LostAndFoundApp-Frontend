import axios from 'axios'
import { fetchToken } from '../../auth/FetchToken';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const addItemsUrl = "http://localhost:8081/lostandfound/api/v1/item"


export const addItems = async (item: any, navigate: any) => {

    try {
        const response = await axios.post(
            addItemsUrl, item,
            {
                headers: {
                    Authorization: fetchToken()
                }
            }

        );
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401 || error.response?.status === 403) {
            navigate("/unauth");
        } else {
            console.error("Failed to add the data:", error);
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
                title: "Failed to Add Item"
            });

        }
        throw error; // Optional: rethrow if upstream handlers need to catch it
    }
}