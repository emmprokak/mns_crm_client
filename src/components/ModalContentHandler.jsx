import { useEffect, useState } from "react";
import EntityPageField from "./EntityPageField";
import CreateAccountModal from "./entry-specific/CreateAccountModal";
import { Logger } from "../service/Logger";

function ModalContentHandler({entry, actionType, entryName}){
    const [createAccount, setCreateAccount] = useState(false);

    useEffect(() => {
        updateContentType();
    }, [])

    function updateContentType(){
        Logger.log(`${actionType} ^ ${entryName}`);
        if(actionType === "create" && entryName === "Account"){
            setCreateAccount(true);
            return;
        }

        setCreateAccount(false);
    }

    return (
        <div>

            {
                createAccount ? 
                <CreateAccountModal entry={entry}/>
                :
                <div></div>
            }
                  
        </div>
    )
}

export default ModalContentHandler;