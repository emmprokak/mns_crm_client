import { Logger } from "../service/Logger";
import Parse from "../transform/Parse";
import "../App.css";

function TabularCell({recordObject, fieldName, cellClicked, entityName}){

    const linkableFields = ["companyName", "firstName", "lastName", "title", "name", "sourceLead"];

    function renderFieldValue(){
        if(linkableFields.includes(fieldName)){
            return <a id={`${fieldName}:${recordObject.id}`} className="tabular-clickable-field"
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