import { Button } from "semantic-ui-react";
import { Logger } from "../service/Logger";
import { useEffect } from "react";

function EntityAction({actionLabel, objectName, entryId}){

    // useEffect(() => {
    //     setActionToBePerformed();
    // }, []);

    function performAction(){
        const createNewEntry = () => {
            Logger.log("create");
        };

        const editEntry = () => {
            Logger.log("edit");
        };

        const deleteEntry = () => {
            Logger.log("delete");
        };

       switch(actionLabel){
        case "Create":
            createNewEntry();
            break;
        case "Edit":
            editEntry();
            break;
        case "Delete":
            deleteEntry();
            break;
       }
    }


    return (
        <div>
            <Button color='blue' onClick={performAction}>{`${actionLabel} ${objectName}`}</Button>

        </div>
    )
}

export default EntityAction;