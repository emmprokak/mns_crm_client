import { act, useEffect, useState } from "react";
import RequestService from "../service/RequestService";
import EntityPageField from "./EntityPageField";
import EntityHeader from "./EntityHeader";
import { Logger } from "../service/Logger";
import CreateAccount from "./entry-specific/ModalController";
import ModalController from "./entry-specific/ModalController";


function EntityPage({objectName, entryId}){

    const [entry, setEntry] = useState({});
    const [firstColFields, setFirstColFields] = useState([]);
    const [secondColFields, setSecondColFields] = useState([]);
    const [fieldTotal, setFieldTotal] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [chosenActionType, setChosenActionType] = useState("");


    const nonRenderableFields = ["id"];

    useEffect(() => {
        const loadData = async () => {
            const result = await RequestService.getSingleRecord(objectName, entryId);
            console.log(entry)
            setEntry(result);
        };

        loadData();
    }, []);

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
        Logger.log(`${objectName}, ${entry}, ${actionType}`);
        setChosenActionType(actionType);
        setShowModal(true);
    }

    return(
        <div>
            {
                showModal ? 
                <ModalController modalClosed={() => {setShowModal(false)}}
                 triggerButton={null}
                 objectName={objectName}
                 entry={entry}
                 actionType={chosenActionType}
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
                                <EntityPageField key={field} fieldName={field} fieldValue={entry[field]} />
                            ))
                        }
                    </div>

                    <div className="right-div">
                        {
                            secondColFields.map(field => (
                                <EntityPageField key={field} fieldName={field} fieldValue={entry[field]} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
           
    )
}

export default EntityPage;