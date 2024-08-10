import { Logger } from "../service/Logger";
import Parse from "../transform/Parse";
import "./css/EntityPage.css";
import EntityAction from "./EntityAction";

function EntityHeader({entityName, record, fieldCollection, entryActionClicked}){

    const viewableFields = ["companyName", "description", "website", "firstName", "lastName", "contactPerson", "status", "agentName", "customerPhone", "category"];
    const standardActions = ["Create", "Update", "Delete"];

    function actionClicked(actionType){
        entryActionClicked(entityName, record, actionType);
    }

    function renderLeadConversionAction(){
        if(entityName === "Lead" && record["status"] === "Success"){
            return <EntityAction key="leadConversion" entityName={entityName}
              entryId={record["id"]} actionLabel="Convert" actionClicked={actionClicked}/>;
        }

        return <div></div>;
    }


    return (
        <div className="header-top-container">
            <div className="entity-header">
                <div className="entity-header-object">
                    {Parse.firstLetterCapital(entityName)} <span style={{fontSize: "0.7em"}}>({record["id"]})</span> 
                </div>

                <div className="entity-header-preview-fields">
                    {
                        fieldCollection.map(field => (
                            viewableFields.includes(field) ?
                            <div key={"headd-" + field}  style={{marginRight: "20px"}}>
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
                        <EntityAction key={act} entityName={entityName} entryId={record["id"]} actionLabel={act} actionClicked={actionClicked}/>
                    ))
                }

                {
                    renderLeadConversionAction()
                }
            </div>
        </div>
    )
}

export default EntityHeader;