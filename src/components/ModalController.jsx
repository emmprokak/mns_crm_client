import React, { useEffect, useState } from 'react'
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Icon,
  Image,
  Modal,
} from 'semantic-ui-react'
import Parse from '../transform/Parse';
import ModalContentHandler from './ModalContentHandler';
import { Logger } from '../service/Logger';
import RequestService from '../service/RequestService';


function ModalController({modalClosed, triggerButton, objectName, entry, actionType}){
    const [open, setOpen] = useState(true)
    const [finalEntry, setFinalEntry] = useState(null);
    const [actionResponse, setActionResponse] = useState(null); // TODO: eval if needed

    const buttonConfig = {
      "create" : "blue",
      "delete" : "red",
      "update" : "orange"
    }

    async function performAction(){
      let action = () => Logger.log("invalid operation selected");

      switch(actionType){
        case "create":
          action = createEntry;
          break;
        case "update":
          action = updateEntry;
          break;
        case "delete":
          action = deleteEntry;
          break;
      }

      const entryDetails = actionType === "delete" ? entry : finalEntry;
      Logger.log("sending request for ");
      Logger.log(entryDetails);
      const response = await action(objectName.toLowerCase(), entryDetails);

      Logger.log(response);

      setActionResponse(response.data);
      modalClosed(response.data);
      setOpen(false);
    }

    async function createEntry(objName, finalEntry){
      return await RequestService.sendCreateEntry(objName, finalEntry)
    }

    async function updateEntry(objName, finalEntry){
      return await RequestService.sendUpdateEntry(objName, finalEntry)
    }

    async function deleteEntry(objName, finalEntry){
      return await RequestService.sendDeleteEntry(objName, finalEntry)
    }

    function getUpdatedEntry(entryRecord){
      setFinalEntry(entryRecord);
    }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={triggerButton}
    >
      <ModalHeader>{`${Parse.firstLetterCapital(actionType)} ${objectName}`}</ModalHeader>
      <ModalContent image scrolling>
        
        <ModalContentHandler entry={entry} actionType={actionType} entryName={objectName} bubbleUpFinalEntry={getUpdatedEntry}/>
       
      </ModalContent>

      <div style={{border : "1px solid gray", borderRadius: "10px", padding: "20px 10px", textAlign: "right"}}>
        <ModalActions>
          <Button onClick={() => setOpen(false)}  color='gray'>
            Cancel 
          </Button>

          <Button onClick={performAction}  color={buttonConfig[actionType]}>
            {Parse.firstLetterCapital(actionType)}
          </Button>
        </ModalActions>
      </div>
      
    </Modal>
  )
}

export default ModalController;