export const SetToken =(login_data)=> {
    sessionStorage.setItem("userInfo", JSON.stringify(login_data))
}

export const getToken = () => {
    if (localStorage.getItem("customer-info")) {
        return JSON.parse(localStorage.getItem("customer-info")).token;
    }
    else return false
}

export const clearToken = ()=>{
    localStorage.clear()
    sessionStorage.clear()
}