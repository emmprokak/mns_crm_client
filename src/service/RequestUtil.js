import axios from "axios";

class RequestUtil{
    static async makeHttpRequest(req){
        return await axios.get(req);
    }
}

export default RequestUtil;