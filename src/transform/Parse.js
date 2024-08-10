import { Logger } from "../service/Logger";

class Parse {
    static parseTableValue(val, fieldName, entityName){
        if(!val){
            return "-";
        }

        if(typeof val === "object"){
            if((entityName === "Contact" || entityName === "Account") && fieldName === "parent"){
                return val["companyName"];
            }

            if(entityName === "Opportunity" && fieldName === "relatedAccount"){
                return val["companyName"];
            }

            if(entityName === "Case" && fieldName === "relatedAccount"){
                return val["companyName"];
            }

            if(entityName === "Case" && fieldName === "relatedContact"){
                return val["firstName"] + " " + val["lastName"];
            }

            if(entityName === "Task" && fieldName === "relatedLead"){
                return val["companyName"];
            }

            if(entityName === "Task" && fieldName === "relatedOpportunity"){
                return val["title"];
            }

            if(entityName === "Call" && fieldName === "relatedAccount"){
                return val["companyName"];
            }

            if(entityName === "Call" && fieldName === "relatedCase"){
                return val["title"];
            }

            if(entityName === "Account" && fieldName === "parentLead"){
                return val["companyName"];
            }

            return "object";
        }

        if(fieldName === "active"){
            return val ? "yes" : "no";
        }

        if(fieldName === "birthdate" || fieldName === "dueDate" || fieldName === "createdDate" || fieldName === "closedDate" || fieldName === "callDate"){
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

        if(entityName === "Case" && fieldName === "relatedAccount"){
            return [val["id"], val["companyName"]];
        }

        if(entityName === "Case" && fieldName === "relatedContact"){
            return [val["id"], val["firstName"] + " " + val["lastName"]];
        }

        if(entityName === "Call" && fieldName === "relatedAccount"){
            return [val["id"], val["companyName"]];
        }

        if(entityName === "Call" && fieldName === "relatedCase"){
            return [val["id"], val["title"]];
        }

        if(entityName === "Account" && fieldName === "parentLead"){
            return [val["id"], val["companyName"]];
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

    static parseComboboxOptions(optionList){
        const result = [];
        for(let option of optionList){
            result.push({"text" : option.displayText, "value" : option.apiValue});
        }

        return result;
    }
}

export default Parse;