import { useEffect, useState } from "react";
import EntityPageField from "./EntityPageField";
import CreateAccountModal from "./entry-specific/CreateUpdateAccountModal";
import { Logger } from "../service/Logger";
import DeleteModal from "./DeleteModal";
import CreateUpdateContactModal from "./entry-specific/CreateUpdateContactModal";
import CreateUpdateLeadModal from "./entry-specific/CreateUpdateLeadModal";
import CreateUpdateOpportunityModal from "./entry-specific/CreateUpdateOpportunityModal";
import CreateUpdateTaskModal from "./entry-specific/CreateUpdateTaskModal";
import CreateUpdateCaseModal from "./entry-specific/CreateUpdateCaseModal";
import CreateUpdateVoiceCallModal from "./entry-specific/CreateUpdateVoiceCallModal";

function ModalContentHandler({entry, actionType, entryName, bubbleUpFinalEntry}){
    const [createOrUpdateAccount, setCreateOrUpdateAccount] = useState(false);
    const [createOrUpdateContact, setCreateOrUpdateContact] = useState(false);
    const [createOrUpdateLead, setCreateOrUpdateLead] = useState(false);
    const [createOrUpdateOpportunity, setCreateOrUpdateOpportunity] = useState(false);
    const [createOrUpdateTask, setCreateOrUpdateTask] = useState(false);
    const [createOrUpdateCase, setCreateOrUpdateCase] = useState(false);
    const [createOrUpdateVoiceCall, setCreateOrUpdateVoiceCall] = useState(false);
    const [genericDelete, setGenericDelete] = useState(false);

    useEffect(() => {
        updateContentType();
    }, [])

    function updateContentType(){
        resetModalContentFlags();
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

        if((actionType === "create" || actionType === "update") && entryName === "Case"){
            setCreateOrUpdateCase(true);
            return;
        }

        if((actionType === "create" || actionType === "update") && entryName === "Call"){
            setCreateOrUpdateVoiceCall(true);
            return;
        }


        if(actionType === "delete"){
            setGenericDelete(true);
            return;
        }
    }

    function resetModalContentFlags(){
        setCreateOrUpdateAccount(false);
        setCreateOrUpdateContact(false);
        setCreateOrUpdateLead(false);
        setCreateOrUpdateOpportunity(false);
        setCreateOrUpdateTask(false);
        setCreateOrUpdateCase(false);
        setCreateOrUpdateVoiceCall(false);
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
                createOrUpdateCase ? 
                <CreateUpdateCaseModal entry={entry} bubbleUpFinalEntry={bubbleUpFinalEntry} actionType={actionType}/>
                :
                <div></div>
            }

            {       
                createOrUpdateVoiceCall ? 
                <CreateUpdateVoiceCallModal entry={entry} bubbleUpFinalEntry={bubbleUpFinalEntry} actionType={actionType}/>
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