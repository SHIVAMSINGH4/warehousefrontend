import { getToken } from "../constant/Constant";
import { ApiRoute } from "../routes/ApiRoutes"
import { API_URL } from "./Url"

export const userLogin = async () => {
    const header = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_all_Product}`, header);
    const body = await response.json();
    const data = body.data;
    return data;
}


export const getAllProducts = async () => {
    const header = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_all_Product}`, header);
    const body = await response.json();
    const data = body && body.data;
    return data;
}

export const getOneProduct = async (id, loc) => {
    const header = {
        method: "get",
        headers: {
            'content-type': "application/json",
            // 'authorization':`bearer${getToken()}`
        }
    }
        const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_one_product}/${loc}?OE_REF=${id}&ITEMS_REF=${id}`, header);        
        const body = await response.json();
        const data = body.data;
//     const data = [
//         {
//         APPLICATION: "DISCOVERY V",
//         Descripation: "AIR FILTER",
//         ITEMS_REF: "1",
//         LOC: "GGN_001",
//         MAKE: "MAHLE",
//         MRP: 1900,
//         OE_REF: "1",
//         OP_BAL: 10,
//         PUR: "1100",
//         QTY: 1,
//         REF_TYPE: "String",
//         SALES: 9,
//         SAPREF: "String",
//         STORE: "GGN_01",
//         UNIT: "EA"
//     },
//     {
//         APPLICATION: "DISCOVERY V",
//         Descripation: "AIR FILTER",
//         ITEMS_REF: "2",
//         LOC: "GGN_001",
//         MAKE: "MAAN",
//         MRP: 1900,
//         OE_REF: "1",
//         OP_BAL: 10,
//         PUR: "1100",
//         QTY: 1,
//         REF_TYPE: "String",
//         SALES: 9,
//         SAPREF: "String",
//         STORE: "GGN_01",
//         UNIT: "EA"
//     },
//     {
//         APPLICATION: "DISCOVERY V",
//         Descripation: "AIR FILTER",
//         ITEMS_REF: "3",
//         LOC: "GGN_001",
//         MAKE: "MAAN",
//         MRP: 1900,
//         OE_REF: "1",
//         OP_BAL: 10,
//         PUR: "1100",
//         QTY: 1,
//         REF_TYPE: "String",
//         SALES: 9,
//         SAPREF: "String",
//         STORE: "GGN_01",
//         UNIT: "EA"
//     },
//     {
//         APPLICATION: "DISCOVERY V",
//         Descripation: "AIR FILTER",
//         ITEMS_REF: "4",
//         LOC: "GGN_001",
//         MAKE: "HENGEST/OTHER",
//         MRP: 1900,
//         OE_REF: "1",
//         OP_BAL: 10,
//         PUR: "1100",
//         QTY: 1,
//         REF_TYPE: "String",
//         SALES: 9,
//         SAPREF: "String",
//         STORE: "GGN_01",
//         UNIT: "EA"
//     }
// ]
    console.log(data)
    // console.log(`${API_URL.Auth_URL}${ApiRoute.get_one_product}/${loc}?OE_REF=${id}&ITEMS_REF=${id}`, header)
    return data;
}

export const addBill = async (bill) => {
    const header = {
        method: "post",
        headers: {
            'content-type': "application/json",
            // 'authorization':`bearer${getToken()}`
        },
        body: JSON.stringify(bill)
    }
    const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.add_bill}`,header);
    const body = await response.json();
    
    console.log(body)
    console.log(`${API_URL.Auth_URL}${ApiRoute.add_bill}`,header)
    return body;
  
}
export const getBill = async (bill) => {
    const header = {
        method: "get",
        headers: {
            'content-type': "application/json",
            // 'authorization':`bearer${getToken()}`
        },
        // body: JSON.stringify(bill)
    };
    const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_bill}?bill=${bill}`,header);
    const body = await response.json();
    const data = body.data;     
    console.log(data);
    return data;
}

export const getCustBill = async (custNo) => {
    const header = {
        method: "get",
        headers: {
            'content-type': "application/json",
            // 'authorization':`bearer${getToken()}`
        },
        // body: JSON.stringify(bill)
    };
    const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_custBill}?phone_no=${custNo}`,header);
    const body = await response.json();
    const data = body.data;     
    console.log(data);
    return data;
}