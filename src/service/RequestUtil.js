import axios from "axios";

class RequestUtil{
    static async makeHttpRequest(url, method = "get", reqBody = null){
        const configuredHeaders = method === "POST" ? {'Content-Type': 'application/json'} : null;
        return await axios({
            url: url,
            method: method,
            data: JSON.stringify(reqBody),
            headers: configuredHeaders
        });
    }
}

export default RequestUtil;