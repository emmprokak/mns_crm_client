import React from 'react'
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
import Parse from '../../transform/Parse';
import ModalContentHandler from '../ModalContentHandler';


function ModalController({modalClosed, triggerButton, objectName, entry, actionType}){
    const [open, setOpen] = React.useState(true)

    function currentModalClosed(){
      setOpen(false);
      modalClosed();
    }

    // TODO: evaluate if needed
    function getStandardButtons(){
      return (
        <div>

        </div>
      )
    }

  return (
    <Modal
      open={open}
      onClose={currentModalClosed}
      onOpen={() => setOpen(true)}
      trigger={triggerButton}
    >
      <ModalHeader>{`${Parse.firstLetterCapital(actionType)} ${objectName}`}</ModalHeader>
      <ModalContent image scrolling>
        
        <ModalContentHandler entry={entry} actionType={actionType} entryName={objectName} />
       
      </ModalContent>

      <div style={{border : "1px solid gray", borderRadius: "10px", padding: "20px 10px", textAlign: "right"}}>
        <ModalActions>
          <Button onClick={() => setOpen(false)}  color='gray'>
            Cancel 
          </Button>

          <Button onClick={() => setOpen(false)}  color='blue'>
            Create
          </Button>
        </ModalActions>
      </div>
      
    </Modal>
  )
}

export default ModalController;