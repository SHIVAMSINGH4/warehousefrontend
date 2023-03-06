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
    const body = await response.json();
    const data = body.data;    
    return data;
}

export const getOneProduct = async(id)=>{
    const header = {
        method:"get",
        headers:{
            'content-type':"application/json",
        }
    }
    const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_all_Product}?O_E_REF=${id}&ITEMS_REF=${id}`,header);
    const body = await response.json();
    const data = body.data;    
    console.log(data)
    return data;
}