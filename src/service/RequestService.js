import axios from "axios";
import RequestConstructor from '../service/RequestContructor';
import RequestUtil from "./RequestUtil";
import { Logger } from "./Logger";

class RequestService{
    static IP_ADDRESS = "localhost";
    static PROTOCOL = "http";
    static PORT = "8080";

    static async getAllAccounts(){
       return await this.getAllRecords("account")
    }

    static async getAllContacts(){
        return await this.getAllRecords("contact")
     }

     static async getAllLeads(){
        return await this.getAllRecords("lead")
     }

    static async getAllRecords(entityName){
        if(entityName === "overview")
            return;

        const request = RequestConstructor.getEntityAllRecordsRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, entityName);

        const response =  await RequestUtil.makeHttpRequest(request);
        return response.data;
    }

    static async getSingleRecord(entityName, recordId){
        const request = RequestConstructor.getEntitySingleRecordRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, entityName.toLowerCase(), recordId);
    
        const response = await RequestUtil.makeHttpRequest(request);
        return response.data;
    }

    static async getSingleRecordComplete(entityName, recordId){
        const request = RequestConstructor.getEntitySingleRecordCompleteRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, entityName.toLowerCase(), recordId);
    
        const response = await RequestUtil.makeHttpRequest(request);
        return response.data;
    }

    static async getLastModifiedRecords(entityName, limitNumber, orderByField, orderType){
        const request = RequestConstructor.getEntityRecordsRequestLimit(this.IP_ADDRESS, this.PORT, this.PROTOCOL, entityName, limitNumber, orderByField, orderType);
        const response = await RequestUtil.makeHttpRequest(request);
        return response.data;
    }

    static async sendCreateEntry(entityName, entry){
        const request = RequestConstructor.getEntityCreateRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, entityName);
        Logger.log(`create req = ${request}`)
        const response = await RequestUtil.makeHttpRequest(request, "POST", entry);
        return response;
    }

    static async sendUpdateEntry(entityName, entry){
        const request = RequestConstructor.getEntityUpdateRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, entityName, entry.id);
        Logger.log(`update req = ${request}`)
        const response = await RequestUtil.makeHttpRequest(request, "PUT", entry);
        return response;
    }

    static async sendDeleteEntry(entityName, entry){
        const request = RequestConstructor.getEntityDeleteRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, entityName, entry.id);
        Logger.log(`del req = ${request}`)
        const response = await RequestUtil.makeHttpRequest(request, "DELETE");
        return response;
    }

    static async getConfigOptionsByType(configType){
        const request = RequestConstructor.getConfigRecordsByType(this.IP_ADDRESS, this.PORT, this.PROTOCOL, configType);
        const response = await RequestUtil.makeHttpRequest(request);

        return response.data;
    }

    static async sendConvertLead(leadEntry){
        const request = RequestConstructor.getConvertLeadRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, leadEntry.id);
        Logger.log(`convert req = ${request}`)
        const response = await RequestUtil.makeHttpRequest(request, "POST");
        return response;
    }
}

export default RequestService;