import { act, useEffect, useState } from "react";
import RequestService from "../service/RequestService";
import EntityPageField from "./EntityPageField";
import EntityHeader from "./EntityHeader";
import { Logger } from "../service/Logger";
import ModalController from "./ModalController";
import RelatedEntriesGroup from "./related-entries/RelatedEntriesGroup";
import EventGenerator from "../events/EventGenerator";


function EntityPage({objectName, entryId, bubbleUpEntryIdChange}){

    const [entry, setEntry] = useState({});
    const [firstColFields, setFirstColFields] = useState([]);
    const [secondColFields, setSecondColFields] = useState([]);
    const [fieldTotal, setFieldTotal] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalKey, setModalKey] = useState(0);
    const [chosenActionType, setChosenActionType] = useState("");
    const [relationshipFields, setRelationshipFields] = useState([]);

    const nonRenderableFields = ["id", "parentId", "account", "accountId", "relatedAccountId", "relatedLeadId", "relatedOpportunityId", "relatedContactId", "relatedCaseId"];

    useEffect(() => {
        const loadData = async () => {
            const result = await RequestService.getSingleRecordComplete(objectName, entryId);
            Logger.log(entry);
            setEntry(result);
        };

        loadData();
    }, [entryId]);

    useEffect(() => {
        seperateFieldsIntoTwoGroups();
    }, [entry])

    function seperateFieldsIntoTwoGroups(){
        if(!entry){
            return;
        }

        let idx = 0;
        const leftList = [];
        const rightList = [];
        const total = [];

        const relFields = [];

        for(let field of Object.keys(entry)){
            if(nonRenderableFields.includes(field)){
                continue;
            }

            // related entry arrays
            if(Array.isArray(entry[field])){
                Logger.log("added to rel fields");

                Logger.log(field);
                relFields.push(field);
                continue;   
            }

            if(idx % 2 === 0){
                leftList.push(field);
            }else{
                rightList.push(field);
            }

            total.push(field);
            idx++;
        }

        setFirstColFields(leftList)
        setSecondColFields(rightList);
        setFieldTotal(total);
        setRelationshipFields(relFields);
        Logger.log(relFields);
    }

    function actionClicked(objectName, entry, actionType){
        setChosenActionType(actionType);
        setShowModal(true);
        setModalKey(modalKey + 1);
    }

    function childModalClosed(actionResponse){
        Logger.log('received on entity page');
        Logger.log(actionResponse)
        setEntry(actionResponse);
        bubbleUpEntryIdChange(EventGenerator.getRelatedLinkEvent(actionResponse.id, objectName));
        setShowModal(false);
        setModalKey(modalKey + 1);
    }

    function relatedRecordSelected(relatedEntrySelectedEvent){
        bubbleUpEntryIdChange(relatedEntrySelectedEvent);
    }

    return(
        <div>
            {
                showModal ? 
                <ModalController modalClosed={childModalClosed}
                 triggerButton={null}
                 objectName={objectName}
                 entry={entry}
                 actionType={chosenActionType}
                 key={modalKey}
                 entrySelected={relatedRecordSelected}
                />
                :
                <div></div>
            }

            <div>
                <div>
                    <EntityHeader objectName={objectName} record={entry} fieldCollection={fieldTotal} entryActionClicked={actionClicked}/>
                </div>

                <div className="main-record-data-container">
                    <div className="field-group-container">
                        <div className="left-div">
                            {
                                firstColFields.map(field => (
                                    <EntityPageField key={field} fieldName={field} fieldValue={entry[field]} entityName={objectName} relatedEntrySelected={relatedRecordSelected}/>
                                ))
                            }
                        </div>

                        <div className="right-div">
                            {
                                secondColFields.map(field => (
                                    <EntityPageField key={field} fieldName={field} fieldValue={entry[field]} entityName={objectName} relatedEntrySelected={relatedRecordSelected}/>
                                ))
                            }
                        </div>
                    </div>

                    {
                        relationshipFields?.length > 0 ?
                            <div className="related-records-area">
                                    {
                                        relationshipFields.map(field => (
                                            <RelatedEntriesGroup key={"rel" + field} entityName={objectName} relationshipName={field} entryId={entryId} relatedEntriesList={entry[field]}
                                                relatedEntrySelected={relatedRecordSelected} />
                                        ))
                                    }
                            </div>
                            :
                            <div></div>
                    }

                    
                </div>


                
            </div>
        </div>
           
    )
}

export default EntityPage;