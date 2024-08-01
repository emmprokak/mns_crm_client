import axios from "axios";

class RequestUtil{
    static async makeHttpRequest(url, method = "GET", reqBody = null){
        const configuredHeaders = (method === "POST" || method === "PUT") ? {'Content-Type': 'application/json'} : null;
        return await axios({
            url: url,
            method: method,
            data: JSON.stringify(reqBody),
            headers: configuredHeaders
        });
    }
}

export default RequestUtil;