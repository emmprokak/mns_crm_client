class Parse {
    static parseTableValue(val, fieldName, objectName){
        if(fieldName === "birthdate"){
            return val.slice(0, 10);
        }

        return val;
    }
}

export default Parse;