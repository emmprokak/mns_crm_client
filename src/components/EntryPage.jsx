import { act, useEffect, useState } from "react";
import RequestService from "../service/RequestService";
import EntityPageField from "./EntityPageField";
import EntityHeader from "./EntityHeader";
import { Logger } from "../service/Logger";
import ModalController from "./ModalController";


function EntityPage({objectName, entryId, bubbleUpEntryIdChange}){

    const [entry, setEntry] = useState({});
    const [firstColFields, setFirstColFields] = useState([]);
    const [secondColFields, setSecondColFields] = useState([]);
    const [fieldTotal, setFieldTotal] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalKey, setModalKey] = useState(0);
    const [chosenActionType, setChosenActionType] = useState("");


    const nonRenderableFields = ["id", "parentId", "account"];

    useEffect(() => {
        const loadData = async () => {
            const result = await RequestService.getSingleRecord(objectName, entryId);
            console.log(entry)
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

        for(let field of Object.keys(entry)){
            if(nonRenderableFields.includes(field)){
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
    }

    function actionClicked(objectName, entry, actionType){
        setChosenActionType(actionType);
        setShowModal(true);
        setModalKey(modalKey + 1);
    }

    function childModalClosed(actionResponse){
        setEntry(actionResponse);
        bubbleUpEntryIdChange(actionResponse.id);
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
                />
                :
                <div></div>
            }

            <div>
                <div>
                    <EntityHeader objectName={objectName} record={entry} fieldCollection={fieldTotal} entryActionClicked={actionClicked}/>
                </div>
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
            </div>
        </div>
           
    )
}

export default EntityPage;