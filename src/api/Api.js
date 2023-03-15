import { getToken } from "../constant/Constant";
import { ApiRoute } from "../routes/ApiRoutes"
import { API_URL } from "./Url"

export const userLogin = async()=>{
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

export const getAllProducts = async()=>{
    const header = {
        method:"GET",
        headers:{
            'Content-Type':'application/json',
        }
    }
    const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_all_Product}`,header);
    const body = await response.json();
    const data = body&&body.data;
    return data;
}

export const getOneProduct = async(id,loc)=>{
    const header = {
        method:"get",
        headers:{
            'content-type':"application/json",
            // 'authorization':`bearer${getToken()}`
        }
    }
    const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_one_product}/${loc}?OE_REF=${id}&ITEMS_REF=${id}`,header);
    //console.log(`${API_URL.Auth_URL}${ApiRoute.get_one_product}/${loc}?OE_REF=${id}&ITEMS_REF=${id}`,header)
    const body = await response.json();
    const data = body.data;  
    console.log(...data)
    return data;
}

export const postBill = async(bill)=>{
    const header = {
        method:"post",
        headers:{
            'content-type':"application/json",
            // 'authorization':`bearer${getToken()}`
        },
        body:JSON.stringify(bill)
    }
    // const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_all_Product}?O_E_REF=${id}&ITEMS_REF=${id}`,header);
    // const body = await response.json();
    // const data = body.data;
    // console.log(data)
    // return data;
}