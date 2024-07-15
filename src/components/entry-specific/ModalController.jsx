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

  return (
    <Modal
      open={open}
      onClose={currentModalClosed}
      onOpen={() => setOpen(true)}
      trigger={triggerButton}
    >
      <ModalHeader>{`${Parse.firstLetterCapital(actionType)} ${objectName}`}</ModalHeader>
      <ModalContent image scrolling>
        
        <ModalContentHandler entry={entry} actionType={actionType} />
       
      </ModalContent>
      <ModalActions>
        <Button onClick={() => setOpen(false)} primary>
          Proceed <Icon name='chevron right' />
        </Button>
        <Button onClick={() => setOpen(false)} primary>
          Proceed <Icon name='chevron right' />
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default ModalController;