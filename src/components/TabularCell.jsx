function TabularCell({recordObject, fieldName, cellClicked}){

    const linkableFields = ["companyName", "firstName", "lastName"];
    return (
        <div>
                {
                    linkableFields.includes(fieldName) ? <a id={`${fieldName}:${recordObject.id}`} style={{cursor : "pointer"}} onClick={cellClicked}>{recordObject[fieldName]}</a> : recordObject[fieldName]
                }
        </div>
    )
}

export default TabularCell;