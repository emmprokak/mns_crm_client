import { useEffect, useState } from "react";
import EntityPageField from "./EntityPageField";
import CreateAccountModal from "./entry-specific/CreateUpdateAccountModal";
import { Logger } from "../service/Logger";
import DeleteModal from "./DeleteModal";
import CreateUpdateContactModal from "./entry-specific/CreateUpdateContactModal";
import CreateUpdateLeadModal from "./entry-specific/CreateUpdateLeadModal";
import CreateUpdateOpportunityModal from "./entry-specific/CreateUpdateOpportunityModal";
import CreateUpdateTaskModal from "./entry-specific/CreateUpdateTaskModal";

function ModalContentHandler({entry, actionType, entryName, bubbleUpFinalEntry}){
    const [createOrUpdateAccount, setCreateOrUpdateAccount] = useState(false);
    const [createOrUpdateContact, setCreateOrUpdateContact] = useState(false);
    const [createOrUpdateLead, setCreateOrUpdateLead] = useState(false);
    const [createOrUpdateOpportunity, setCreateOrUpdateOpportunity] = useState(false);
    const [createOrUpdateTask, setCreateOrUpdateTask] = useState(false);
    const [genericDelete, setGenericDelete] = useState(false);

    useEffect(() => {
        updateContentType();
    }, [])

    function updateContentType(){
        Logger.log(`${actionType} ^ ${entryName}`);
        if((actionType === "create" || actionType === "update") && entryName === "Account"){
            setCreateOrUpdateAccount(true);
            return;
        }

        if((actionType === "create" || actionType === "update") && entryName === "Contact"){
            setCreateOrUpdateContact(true);
            return;
        }

        if((actionType === "create" || actionType === "update") && entryName === "Lead"){
            setCreateOrUpdateLead(true);
            return;
        }

        if((actionType === "create" || actionType === "update") && entryName === "Opportunity"){
            setCreateOrUpdateOpportunity(true);
            return;
        }

        if((actionType === "create" || actionType === "update") && entryName === "Task"){
            setCreateOrUpdateTask(true);
            return;
        }

        if(actionType === "delete"){
            setGenericDelete(true);
            return;
        }

        setCreateOrUpdateAccount(false);
        setGenericDelete(false);
    }

    return (
        <div>

            {
                createOrUpdateAccount ? 
                <CreateAccountModal entry={entry} bubbleUpFinalEntry={bubbleUpFinalEntry} actionType={actionType}/>
                :
                <div></div>
            }

            {
                createOrUpdateContact ? 
                <CreateUpdateContactModal entry={entry} bubbleUpFinalEntry={bubbleUpFinalEntry} actionType={actionType}/>
                :
                <div></div>
            }

            {       
                createOrUpdateLead ? 
                <CreateUpdateLeadModal entry={entry} bubbleUpFinalEntry={bubbleUpFinalEntry} actionType={actionType}/>
                :
                <div></div>
            }

            {       
                createOrUpdateOpportunity ? 
                <CreateUpdateOpportunityModal entry={entry} bubbleUpFinalEntry={bubbleUpFinalEntry} actionType={actionType}/>
                :
                <div></div>
            }

            {       
                createOrUpdateTask ? 
                <CreateUpdateTaskModal entry={entry} bubbleUpFinalEntry={bubbleUpFinalEntry} actionType={actionType}/>
                :
                <div></div>
            }

            {
                genericDelete ? 
                <DeleteModal entry={entry} entityName={entryName}/>
                :
                <div></div>
            }
                  
        </div>
    )
}

export default ModalContentHandler;