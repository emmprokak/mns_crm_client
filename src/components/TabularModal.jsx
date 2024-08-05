import { useEffect, useState } from "react";
import ModalController from "./ModalController";
import { Logger } from "../service/Logger";

function TabularModal({childModalClosed, entityName, showModal, modalKey}){

    // useEffect(() => {
    //     setModalKey(modalKey => modalKey + 1);
    //     Logger.log(`modal changed to ${modalKey}`)
    // }, [showModal])

    function tabularModalClosed(event){
        // setModalKey(modalKey + 1);
        childModalClosed(event);
    }

    return (
        <div>
            {
                showModal ?
                <ModalController modalClosed={tabularModalClosed}
                 triggerButton={null}
                 objectName={entityName}
                 entry={null}
                 actionType="create"
                 key={modalKey}
                />
                :
                <div></div>
            }
            
        </div>
    )
}

export default TabularModal;