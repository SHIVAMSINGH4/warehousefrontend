import { ApiRoute } from "../routes/ApiRoutes"
import { API_URL } from "./Url"

export const getAllProducts = async()=>{
    const header = {
        method:"GET",
        headers:{
            'Content-Type':'application/json',            
        }
    }
    const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_all_Product}`,header);
    const data = await response.json();
    console.log(data)
    // return data ;
}