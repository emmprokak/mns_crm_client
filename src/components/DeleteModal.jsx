import { Header } from "semantic-ui-react";

function DeleteModal({entityName, entry}){


    return(
        <div>
            <Header as='h3'>Are you sure you want to delete {entityName} with id: {entry.id}</Header>
        </div>
    )
}

export default DeleteModal;