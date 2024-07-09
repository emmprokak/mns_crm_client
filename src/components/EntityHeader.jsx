import "./css/EntityPage.css";
import EntityAction from "./EntityAction";

function EntityHeader({objectName, record, fieldCollection}){

    const viewableFields = ["companyName", "description", "website", "firstName", "lastName", "contactPerson", "status"];
    const standardActions = ["Create", "Edit", "Delete"];

    return (
        <div className="header-top-container">
            <div className="entity-header">
                <div className="entity-header-object">
                    {objectName} <span style={{fontSize: "0.7em"}}>({record["id"]})</span> 
                </div>

                <div className="entity-header-preview-fields">
                    {
                        fieldCollection.map(field => (
                            viewableFields.includes(field) ?
                            <div key={"headd-" + field}  style={{marginRight: "20px;"}}>
                                <span key={"head-" + field}>{record[field]}</span> 
                                <br/>
                            </div>
                            :
                            <span key={"head-" + field}></span>
                        ))
                    }
                </div>
            </div>

            <div className="actions-container">
                {
                    standardActions.map(act => (
                        <EntityAction key={act} objectName={objectName} entryId={record["id"]} actionLabel={act}/>
                    ))
                }
            </div>
        </div>
    )
}

export default EntityHeader;