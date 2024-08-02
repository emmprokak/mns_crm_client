import { Logger } from "../service/Logger";

class Parse {
    static parseTableValue(val, fieldName, objectName){
        if(!val){
            return "-";
        }

        if(typeof val === "object"){
            if((objectName === "Contact" || objectName === "Account") && fieldName === "parent"){
                return val["companyName"];
            }

            return "object";
        }

        if(fieldName === "active"){
            return val ? "yes" : "no";
        }

        if(fieldName === "birthdate"){
            return val.slice(0, 10);
        }

        if(fieldName === "created" || fieldName === "modified"){
            return `${val.slice(0,10)}  ${val.slice(11,16)}`
        }

        return val;
    }

    static handleObjectValue(val, fieldName, entityName){
        if(!val){
            return "";
        }

        if((entityName === "Account" || entityName === "Contact") && fieldName === "parent"){
            return [val["id"], val["companyName"]];
        }


        return ["invalid relationship object handling", ""];
    }

    static firstLetterCapital(inputStr){
        const firstLetter = inputStr.charAt(0)

        const firstLetterCap = firstLetter.toUpperCase()

        const remainingLetters = inputStr.slice(1)

        return firstLetterCap + remainingLetters;
    }
}

export default Parse;