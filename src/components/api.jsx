import axios from "axios";


const api = axios.create({
        baseURL:'https://greendy-bank.azurewebsites.net/'
    })
 
export default api;