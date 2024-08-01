import { useEffect, useState } from "react";
import EntityPageField from "./EntityPageField";
import CreateAccountModal from "./entry-specific/CreateAccountModal";
import { Logger } from "../service/Logger";
import DeleteModal from "./DeleteModal";

function ModalContentHandler({entry, actionType, entryName, bubbleUpFinalEntry}){
    const [createAccount, setCreateAccount] = useState(false);
    const [genericDelete, setGenericDelete] = useState(false);

    useEffect(() => {
        updateContentType();
    }, [])

    function updateContentType(){
        Logger.log(`${actionType} ^ ${entryName}`);
        if(actionType === "create" && entryName === "Account"){
            setCreateAccount(true);
            return;
        }

        if(actionType === "delete"){
            setGenericDelete(true);
            return;
        }

        setCreateAccount(false);
        setGenericDelete(false);
    }

    return (
        <div>

            {
                createAccount ? 
                <CreateAccountModal entry={entry} bubbleUpFinalEntry={bubbleUpFinalEntry}/>
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