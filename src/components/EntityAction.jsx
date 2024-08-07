import { Button } from "semantic-ui-react";
import { Logger } from "../service/Logger";
import { useEffect } from "react";

function EntityAction({actionLabel, objectName, entryId, actionClicked}){

    function performAction(){
        const createNewEntry = () => {
            actionClicked("create");
        };

        const editEntry = () => {
            actionClicked("update");
        };

        const deleteEntry = () => {
            actionClicked("delete");
        };

        const convertLead = () => {
            actionClicked("convert");
        };

       switch(actionLabel){
        case "Create":
            createNewEntry();
            break;
        case "Update":
            editEntry();
            break;
        case "Delete":
            deleteEntry();
            break;
        case "Convert":
            convertLead();
            break;
       }
    }


    return (
        <div>
            <Button color='blue' onClick={performAction} style={{marginLeft: "10px"}}>{`${actionLabel} ${objectName}`}</Button>
        </div>
    )
}

export default EntityAction;