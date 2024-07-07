class RequestConstructor{
    static getEntityAllRecordsRequest(ipAddress, port, protocol, entityName){
        return `${protocol}://${ipAddress}:${port}/api/${entityName}/all`;
    }
}

export default RequestConstructor;