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

    static async getPrefixOptions(){
        return [
            {text: "Mr", value: "Mr"},
            {text: "Ms", value: "Ms"},
            {text: "Mrs", value: "Mrs"},
        ]
    }

    static async getLeadStatusOptions(){
        return [
            {text: "Discovery", value: "Discovery"},
            {text: "Sent Email", value: "Send Email"},
            {text: "Received Email", value: "Received Email"},
            {text: "Confirmation", value: "Confirmation"},
            {text: "Success", value: "Success"},
            {text: "Failure", value: "Failure"}
        ]
    }

    static async getRoleOptions(){
        return [
            {text: "PM", value: "PM"},
            {text: "Developer", value: "Developer"},
            {text: "Analyst", value: "Analyst"},
            {text: "Consultant", value: "Consultant"},
            {text: "Architect", value: "Architect"},
            {text: "Manager", value: "Manager"},
            {text: "Employee", value: "Employee"},
            {text: "Representative", value: "Representative"},
            {text: "CEO", value: "CEO"},
            {text: "CIO", value: "CIO"},
        ]
    }

    static async getOpptyStatusOptions(){
        return [
            {text: "new", value: "new"},
            {text: "discovery", value: "discovery"},
            {text: "quote", value: "quote"},
            {text: "approval", value: "approval"},
            {text: "success", value: "success"},
            {text: "failure", value: "failure"},
        ]
    }

    static async getOpptyTypeOptions(){
        return [
            {text: "sell", value: "sell"},
            {text: "upsell", value: "upsell"},
            {text: "winback", value: "winback"}
        ]
    }

    static async getTaskStatusOptions(){
        return [
            {text: "Discovery", value: "Discovery"},
            {text: "Sent Email", value: "Send Email"},
            {text: "Received Email", value: "Received Email"},
            {text: "Confirmation", value: "Confirmation"},
            {text: "Success", value: "Success"},
            {text: "Failure", value: "Failure"}
        ]
    }

    static async getTaskTypeOptions(){
        return [
            {text: "Action", value: "Action"},
            {text: "Informative", value: "Informative"},
           
        ]
    }

    static async getCaseStatusOptions(){
        return [
            {text: "New", value: "New"},
            {text: "In progress", value: "In progress"},
           
        ]
    }

    static async getCaseSourceOptions(){
        return [
            {text: "Email", value: "Email"},
            {text: "Phone", value: "Phone"},
        ]
    }

    static async getCaseSeverityOptions(){
        return [
            {text: "1", value: "1"},
            {text: "2", value: "2"},
           
        ]
    }

    static async getCaseReasonOptions(){
        return [
            {text: "support", value: "support"},
            {text: "communication", value: "communication"},
           
        ]
    }

    static async getCaseCategoryOptions(){
        return [
            {text: "customer experience", value: "customer experience"},
            {text: "sales", value: "sales"},
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

    static async getSingleRecordComplete(objectName, recordId){
        const request = RequestConstructor.getEntitySingleRecordCompleteRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, objectName.toLowerCase(), recordId);
    
        const response = await RequestUtil.makeHttpRequest(request);
        return response.data;
    }

    static async getLastModifiedRecords(objectName, limitNumber, orderByField, orderType){
        const request = RequestConstructor.getEntityRecordsRequestLimit(this.IP_ADDRESS, this.PORT, this.PROTOCOL, objectName, limitNumber, orderByField, orderType);
        const response = await RequestUtil.makeHttpRequest(request);
        return response.data;
    }

    static async sendCreateEntry(objectName, entry){
        const request = RequestConstructor.getEntityCreateRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, objectName);
        Logger.log(`create req = ${request}`)
        const response = await RequestUtil.makeHttpRequest(request, "POST", entry);
        return response;
    }

    static async sendUpdateEntry(objectName, entry){
        const request = RequestConstructor.getEntityUpdateRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, objectName, entry.id);
        Logger.log(`update req = ${request}`)
        const response = await RequestUtil.makeHttpRequest(request, "PUT", entry);
        return response;
    }

    static async sendDeleteEntry(objectName, entry){
        const request = RequestConstructor.getEntityDeleteRequest(this.IP_ADDRESS, this.PORT, this.PROTOCOL, objectName, entry.id);
        Logger.log(`del req = ${request}`)
        const response = await RequestUtil.makeHttpRequest(request, "DELETE");
        return response;
    }
}

export default RequestService;