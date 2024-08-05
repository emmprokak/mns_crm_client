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

            if(objectName === "Opportunity" && fieldName === "relatedAccount"){
                return val["companyName"];
            }

            if(objectName === "Task" && fieldName === "relatedLead"){
                return val["companyName"];
            }

            if(objectName === "Task" && fieldName === "relatedOpportunity"){
                return val["title"];
            }

            return "object";
        }

        if(fieldName === "active"){
            return val ? "yes" : "no";
        }

        if(fieldName === "birthdate" || fieldName === "dueDate"){
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

        if(entityName === "Opportunity" && fieldName === "relatedAccount"){
            return [val["id"], val["companyName"]];
        }

        if(entityName === "Task" && fieldName === "relatedLead"){
            return [val["id"], val["companyName"]];
        }

        if(entityName === "Task" && fieldName === "relatedOpportunity"){
            return [val["id"], val["title"]];
        }


        return ["invalid relationship object handling", ""];
    }

    static firstLetterCapital(inputStr){
        if(!inputStr){
            return;
        }
        
        const firstLetter = inputStr.charAt(0)

        const firstLetterCap = firstLetter.toUpperCase()

        const remainingLetters = inputStr.slice(1)

        return firstLetterCap + remainingLetters;
    }
}

export default Parse;