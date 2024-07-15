import { Button } from "semantic-ui-react";
import { Logger } from "../service/Logger";
import { useEffect } from "react";

function EntityAction({actionLabel, objectName, entryId, actionClicked}){

    // useEffect(() => {
    //     setActionToBePerformed();
    // }, []);

    function performAction(){
        const createNewEntry = () => {
            actionClicked("create");
        };

        const editEntry = () => {
            actionClicked("edit");
        };

        const deleteEntry = () => {
            actionClicked("delete");
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