import axios from "axios";
import RequestConstructor from '../service/RequestContructor';
import RequestUtil from "./RequestUtil";
import { Logger } from "./Logger";

class RequestService{
    static IP_ADDRESS = "localhost";
    static PROTOCOL = "http";
    static PORT = "8080";

    static async getIndustryOptions(){
        return [
            {text: "IT", value: "IT"},
            {text: "Food", value: "Food"},
            {text: "Retail", value: "Retail"}
        ]
    }

    static async getAccountTypes(){
        return [
            {text: "person", value: "person"},
            {text: "company", value: "company"},
        ]
    }
    
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
        if(objectName === "overview")
            return;

        const request = RequestConstructor.getEntityAllRecordsRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, objectName);

        const response =  await RequestUtil.makeHttpRequest(request);
        return response.data;
    }

    static async getSingleRecord(objectName, recordId){
        const request = RequestConstructor.getEntitySingleRecordRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, objectName.toLowerCase(), recordId);
    
        const response = await RequestUtil.makeHttpRequest(request);
        return response.data;
    }

    static async sendCreateEntry(objectName, entry){
        const request = RequestConstructor.getEntityCreateRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, objectName);
        Logger.log(`create req = ${request}`)
        const response = await RequestUtil.makeHttpRequest(request, "POST", entry);
        return response;
    }

    //TODO create update and delete operaitons
}

export default RequestService;