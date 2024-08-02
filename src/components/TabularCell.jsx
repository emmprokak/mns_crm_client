import Parse from "../transform/Parse";

function TabularCell({recordObject, fieldName, cellClicked}){

    //TODO: fix lookups
    const linkableFields = ["companyName", "firstName", "lastName", "parent"];

    function renderFieldValue(){
        if(linkableFields.includes(fieldName)){
            return <a id={`${fieldName}:${recordObject.id}`} style={{cursor : "pointer"}}
                        onClick={cellClicked}>
                            {Parse.parseTableValue(recordObject[fieldName], fieldName, recordObject) }
                    </a>;
        }

        return Parse.parseTableValue(recordObject[fieldName], fieldName, recordObject);
    }

    return (
        <div>
            {renderFieldValue()}
        </div>
    )
}

export default TabularCell;