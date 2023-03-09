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
    const data = body.data;    
    return data;
}

export const getOneProduct = async(id)=>{
    const header = {
        method:"get",
        headers:{
            'content-type':"application/json",
            // 'authorization':`bearer${getToken()}`
        }
    }
    // const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_all_Product}?O_E_REF=${id}&ITEMS_REF=${id}`,header);
    // const body = await response.json();
    // const data = body.data;
    const data =  {
        OE_REF: "FG123",
        Descripation: "Air Filter",
        APPLICATION: "Discovery V",
        MAKER: [
            {
                BRAND_NAME: "MEYLE",
                ITEMS_REF: 123,
                LOCATION: [
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    },
                    {
                        BRANCH_CODE: "MUN01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }

                    },
                    {
                        BRANCH_CODE: "DEL01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    }
                ]
            },
            {
                BRAND_NAME: "MAHLE",
                ITEMS_REF: 234,
                LOCATION: [
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }

                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    }
                ]
            },
            {
                BRAND_NAME: "MANN",
                ITEMS_REF: 345,
                LOCATION: [
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }

                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    }
                ]
            },
            {
                BRAND_NAME: "HENGEST/OTH",
                ITEMS_REF: 456,
                LOCATION: [
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }

                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    }
                ]
            },
            {
                BRAND_NAME: "MEGMA/OTH",
                ITEMS_REF: 678,
                LOCATION: [
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }

                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    }
                ]
            }
        ],
    }
    // console.log(data)
    return data;
}

export const getCartItem = async(cartList)=>{
    const header = {
        method:"get",
        headers:{
            'content-type':"application/json",
            // 'authorization':`bearer${getToken()}`
        },
        body:JSON.stringify(cartList)
    }
    // const response = await fetch(`${API_URL.Auth_URL}${ApiRoute.get_all_Product}?O_E_REF=${id}&ITEMS_REF=${id}`,header);
    // const body = await response.json();
    // const data = body.data;
    const data =  {
        OE_REF: "FG123",
        Descripation: "Air Filter",
        APPLICATION: "Discovery V",
        MAKER: [
            {
                BRAND_NAME: "MEYLE",
                ITEMS_REF: 123,
                LOCATION: [
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    },
                    {
                        BRANCH_CODE: "MUN01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }

                    },
                    {
                        BRANCH_CODE: "DEL01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    }
                ]
            },
            {
                BRAND_NAME: "MAHLE",
                ITEMS_REF: 234,
                LOCATION: [
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }

                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    }
                ]
            },
            {
                BRAND_NAME: "MANN",
                ITEMS_REF: 345,
                LOCATION: [
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }

                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    }
                ]
            },
            {
                BRAND_NAME: "HENGEST/OTH",
                ITEMS_REF: 456,
                LOCATION: [
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }

                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    }
                ]
            },
            {
                BRAND_NAME: "MEGMA/OTH",
                ITEMS_REF: 678,
                LOCATION: [
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }

                    },
                    {
                        BRANCH_CODE: "GGM01",
                        STOCK: {
                            QUANTITY: 7,
                            OLD_MRP: 1600,
                            NEW_MRP: 1900,
                            OP_Balance: 10,
                        }
                    }
                ]
            }
        ],
    }
    // console.log(data)
    return data;
}