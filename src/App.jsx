import { useState, useEffect } from 'react'
import './App.css'
import { Grid, GridColumn, Header, List, Menu, MenuItem } from 'semantic-ui-react';
import RequestService from './service/RequestService';
import TabularView from './components/TabularView';
import { Logger } from './service/Logger';
import 'semantic-ui-css/semantic.min.css';


function App() {
  const [activities, setActivities] = useState([]);
  const [activeItem, setActiveItem] = useState('Overview');

  useEffect(() => {
      const getData = async () => {
        try{
          const response = await RequestService.getAllAccounts();
          setActivities(response);

        }catch(err){
         Logger.log(err);
        }
          
      }
        
      getData();
  }, []);

  function getNavItems(){
    return [
      {key: '0', name : 'Overview', content : 'Overview'},
      {key: '1', name : 'Account', content : 'Account'},
      {key: '2', name : 'Contact', content : 'Contact'},
      {key: '3', name : 'Lead', content : 'Lead'}
    ];
  }

  function handleItemClick(event){
    setActiveItem(event.target.text);
    retrieveRecords(event.target.text);
  }

  async function retrieveRecords(objectType){
    let records = await RequestService.getAllRecords(objectType.toLowerCase());
    setActivities(records);

    // switch(objectType){
    //   case "Account":
    //     records = await RequestService.getAllAccounts();
    //     break;
    //   case "Contact":
    //     records = await RequestService.getAllContacts();
    //     break;    
    //   case "Lead":
    //     records = await RequestService.getAllLeads();
    //     break;  
    // }
  }
  
  return (
    <div>
      <Header as='h2' icon='users' content='MNS CRM'/>

      <Grid columns={4} doubling>
        <GridColumn>
          <Menu>
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

      {/* <List>
        {activities.map((act) => (
          <List.Item key={act.Id}>{act.companyName}</List.Item>
        ))}
      </List> */}

      {activeItem !== 'Overview' ? 
        <div className='tabular-view-container'>
          <TabularView recordList={activities} objectName={activeItem} />
        </div>
        :
        <div></div>
      }
    </div>
  )
}

export default App
