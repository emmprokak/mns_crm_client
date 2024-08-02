import { useEffect, useState } from "react";
import EntityPageField from "./EntityPageField";
import CreateAccountModal from "./entry-specific/CreateUpdateAccountModal";
import { Logger } from "../service/Logger";
import DeleteModal from "./DeleteModal";
import CreateUpdateContactModal from "./entry-specific/CreateUpdateContactModal";

function ModalContentHandler({entry, actionType, entryName, bubbleUpFinalEntry}){
    const [createOrUpdateAccount, setCreateOrUpdateAccount] = useState(false);
    const [createOrUpdateContact, setCreateOrUpdateContact] = useState(false);
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
                genericDelete ? 
                <DeleteModal entry={entry} entityName={entryName}/>
                :
                <div></div>
            }
                  
        </div>
    )
}

export default ModalContentHandler;