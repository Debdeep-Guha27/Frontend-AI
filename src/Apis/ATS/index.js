import AxiosInstance from "@/utils/AxiosInstance";
import axios from "axios";

export async function ATSchecker(formdata){
    try {
        const response = await axios.post('http://localhost:5000/score' , formdata);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default ATSchecker;