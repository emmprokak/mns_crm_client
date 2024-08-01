class RequestConstructor{
    static getEntityAllRecordsRequest(ipAddress, port, protocol, entityName){
        return `${protocol}://${ipAddress}:${port}/api/${entityName}/all`;
    }

    static getEntitySingleRecordRequest(ipAddress, port, protocol, entityName, recordId){
        return `${protocol}://${ipAddress}:${port}/api/${entityName}/${recordId}`;
    }

    static getEntityCreateRequest(ipAddress, port, protocol, entityName){
        return `${protocol}://${ipAddress}:${port}/api/${entityName}/new`;
    }

    static getEntityUpdateRequest(ipAddress, port, protocol, entityName, recordId){
        return `${protocol}://${ipAddress}:${port}/api/${entityName}/${recordId}`;
    }

    static getEntityDeleteRequest(ipAddress, port, protocol, entityName, recordId){
        return `${protocol}://${ipAddress}:${port}/api/${entityName}/${recordId}`;
    }
}

export default RequestConstructor;