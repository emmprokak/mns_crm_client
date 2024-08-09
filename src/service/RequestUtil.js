import axios from "axios";
import { Logger } from "./Logger";

class RequestUtil{
    static async makeHttpRequest(url, method = "GET", reqBody = null){
        const configuredHeaders = (method === "POST" || method === "PUT") ? {'Content-Type': 'application/json'} : null;

        try {
            const response = await axios({
                url: url,
                method: method,
                data: reqBody ? JSON.stringify(reqBody) : null,
                headers: configuredHeaders,
            });
            return response; 
            } catch (error) {

            return error;
        }
    }
}

export default RequestUtil;