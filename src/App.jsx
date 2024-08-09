import { useState, useEffect } from 'react'
import './App.css'
import { Grid, GridColumn, Header, List, Menu, MenuItem } from 'semantic-ui-react';
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

  function recordClicked(fieldName, objectName, recordId){
    setSingleRecordView(true);
    setCurrentObjectId(recordId);
    setCurrentObjectName(objectName);
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
          <EntityPage objectName={currentObjectName} entryId={currentObjectId} bubbleUpEntryIdChange={displayedRecordChanged}/>
          {/* boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" */}
        </div>
        :
        <div>

        </div>
      }


      {activeItem !== 'Overview' && !singleRecordView ? 
        <div className='tabular-view-container'>
          <TabularView recordList={records} objectName={activeItem} recordSelected={recordClicked}/>
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
