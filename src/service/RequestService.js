import axios from "axios";

class RequestService{
    static IP_ADDRESS = "test"
    
    static async getAllAccounts(){
       return await this.getAllRecords("account")
    }

    static async getAllContacts(){
        return await this.getAllRecords("contact")
     }

     static async getAllLeads(){
        return await this.getAllRecords("lead")
     }

    static async getAllRecords(objectName){
        const response =  await axios.get(`http://localhost:8080/api/${objectName}/all`); 
        return response.data;
    }
}

export default RequestService;