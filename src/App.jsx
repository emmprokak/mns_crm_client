import { useState, useEffect } from 'react'
import './App.css'
import { Container, Grid, GridColumn, Header, List, Menu, MenuItem } from 'semantic-ui-react';
import RequestService from './service/RequestService';
import TabularView from './components/TabularView';
import { Logger } from './service/Logger';
import 'semantic-ui-css/semantic.min.css';
import EntityPage from './components/EntryPage';
import Parse from './transform/Parse';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [records, setRecords] = useState([]);
  const [activeItem, setActiveItem] = useState('Overview');
  const [singleRecordView, setSingleRecordView] = useState(false);
  const [currentObjectName, setCurrentObjectName] = useState("");
  const [currentObjectId, setCurrentObjectId] = useState("");

  function getNavItems(){
    return [
      {key: '0', name : 'Overview', content : 'Overview'},
      {key: '1', name : 'Account', content : 'Account'},
      {key: '2', name : 'Contact', content : 'Contact'},
      {key: '3', name : 'Lead', content : 'Lead'},
      {key: '4', name : 'Opportunity', content : 'Opportunity'},
      {key: '5', name : 'Task', content : 'Task'},
      {key: '6', name : 'Case', content : 'Case'},
      {key: '7', name : 'Call', content : 'Voice Call'}
    ];
  }

  function handleItemClick(event){
    setActiveItem(event.target.text);
    retrieveRecords(event.target.text);
    setSingleRecordView(false);
    setCurrentObjectId("");
    setCurrentObjectName("");
  }

  async function retrieveRecords(objectType){
    const recordsCollection = await RequestService.getAllRecords(objectType.toLowerCase());
    setRecords(recordsCollection);
  }

  function recordClicked(fieldName, entityName, recordId){
    setSingleRecordView(true);
    setCurrentObjectId(recordId);
    setCurrentObjectName(entityName);
  }

  async function displayedRecordChanged(event){
    Logger.log(event);
    if(!event.entryId){
      setCurrentObjectName(Parse.firstLetterCapital(event.entityName));
      await retrieveRecords(event.entityName);
      setSingleRecordView(false);
      return;
    }
    recordClicked(null, Parse.firstLetterCapital(event.entityName), event.entryId);    
    setActiveItem(Parse.firstLetterCapital(event.entityName));
  }


  
  return (
    <div>
      <Header as='h2' icon='users' content='MNS CRM' style={{marginLeft: "10px", marginTop: "15px"}}/>

      <Grid columns="2">
        <GridColumn>
          <Menu style={{marginLeft: "10px"}}>
             {
              getNavItems().map((item) => (
                <MenuItem
                  key={item.name}
                  name={item.name}
                  active={activeItem === item.name}
                  onClick={handleItemClick}
                  className='nav-link'
                />
              ))
            }
          </Menu>
        </GridColumn>

      </Grid>


      {
        singleRecordView ? 
        <div>
          <EntityPage entityName={currentObjectName} entryId={currentObjectId} bubbleUpEntryIdChange={displayedRecordChanged}/>
        </div>
        :
        <div>

        </div>
      }


      {activeItem !== 'Overview' && !singleRecordView ? 
        <div className='tabular-view-container'>
          <TabularView recordList={records} entityName={activeItem} recordSelected={recordClicked}/>
        </div>
        :
        <div>
        </div>
      }

      {
        activeItem === "Overview" && !singleRecordView ?
        <div className='welcome-container'>
          <Header as="h1">Welcome to MNS CRM.</Header>
          <Header as="h2">An implementation made to benchmark Software Design Patterns in CRM systems.</Header>

          <div className='welcome-details-container'>
            <Container textAlign='start'>The back-end is powered by Java Springboot and the beautiful front-end here is made with ReactJS.</Container>
            <br />
            <Container textAlign='start'>This web app is complimentary to the back-end implementation and is intended to provide a visual interface for interacting with the business logic and entities.</Container>

            <br />
            <Container textAlign='start'>You can use it to navigate different Entities such as Accounts, Contacts, Leads, Opportunities, Cases, VoiceCalls and Tasks</Container>
     
            <br />
            <Container textAlign='start'>By clicking on the Entity names on the navbar, you can navigate to the Tabular View of each Entity. A table containing the relative data will be displayed.</Container>
           
            <br />
            <Container textAlign='start'>From the Tabular View, you can drill down to a specific entry by clicking the link-highlighted attribute. From inside the EntryPage of a specific entry, you
              will be able to view the entrys data, create a new entry, update the present entry or delete it. After deleting an entry, you will be redirected back the Tabular view for that Entity.
            </Container>
          
          </div>
        </div>
        :
        <div></div>
      }

      <div>
      <ToastContainer />
      </div>
    </div>
    
  )
}

export default App
