import { Logger } from "../service/Logger";
import Parse from "../transform/Parse";

function TabularCell({recordObject, fieldName, cellClicked, entityName}){

    //TODO: fix lookups
    const linkableFields = ["companyName", "firstName", "lastName"];

    function renderFieldValue(){
        if(linkableFields.includes(fieldName)){
            return <a id={`${fieldName}:${recordObject.id}`} style={{cursor : "pointer"}}
                        onClick={cellClicked}>
                            {Parse.parseTableValue(recordObject[fieldName], fieldName, entityName) }
                    </a>;
        }
        return Parse.parseTableValue(recordObject[fieldName], fieldName, entityName);
    }

    return (
        <div>
            {renderFieldValue()}
        </div>
    )
}

export default TabularCell;