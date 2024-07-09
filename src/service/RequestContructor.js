class RequestConstructor{
    static getEntityAllRecordsRequest(ipAddress, port, protocol, entityName){
        return `${protocol}://${ipAddress}:${port}/api/${entityName}/all`;
    }

    static getEntitySingleRecordRequest(ipAddress, port, protocol, entityName, recordId){
        return `${protocol}://${ipAddress}:${port}/api/${entityName}/${recordId}`;
    }
}

export default RequestConstructor;