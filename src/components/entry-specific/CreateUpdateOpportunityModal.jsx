import { Grid, Header, Segment } from "semantic-ui-react";
import Combobox from "../data-type components/Combobox";
import { useEffect, useState } from "react";
import RequestService from "../../service/RequestService";
import { Logger } from "../../service/Logger";
import Checkbox from "../data-type components/Checkbox";
import TextInput from "../data-type components/TextInput";
import EntryPointer from "../data-type components/EntryPointer";
import Parse from "../../transform/Parse";

function CreateUpdateOpportunityModal({entry, bubbleUpFinalEntry, actionType}){
    const [opptyStatusOptions, setOpptyStatusOptions] = useState([]);
    const [opptyTypeOptions, setOpptyTypeOptions] = useState([]);
    const [opptyDetails, setOpptyDetails] = useState({});

    const UPDATE_OPPTY_ACTION = "updateOpportunity";

    useEffect(() => {
        const retrieveConfig = async () => {
            const statusOptions = await RequestService.getConfigOptionsByType("opptyStatus");
            if(statusOptions){
                setOpptyStatusOptions(Parse.parseComboboxOptions(statusOptions));
            }


            const typeOptions = await RequestService.getConfigOptionsByType("opptyType");
            if(typeOptions){
                setOpptyTypeOptions(Parse.parseComboboxOptions(typeOptions));
            }

        };

        const fillInValues = () => {
            const conValues = {};
            for(let field in entry){
                conValues[field] = entry[field];
            }
            Logger.log(conValues)
            setOpptyDetails(conValues);
        };

        retrieveConfig();

        if(actionType === "update"){
            fillInValues();
        }
    }, []);


    function updateOpportunity(updateEvent){
        let dataObject = JSON.parse(JSON.stringify(opptyDetails));
        dataObject[updateEvent.source] = updateEvent.value;

        dataObject["relatedAccount"] = null;

        Logger.log(dataObject);
        setOpptyDetails(dataObject);
        bubbleUpFinalEntry(dataObject);
    }

    return (
        <div style={{padding: "20px 20px 20px 40px", width: "70%"}}>
            <Header as='h3' content='Add values' textAlign='center' />
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Title</label>
                            <TextInput placeholder='Title'  dataId="title" bubbleUpUpdate={updateOpportunity}
                                value={opptyDetails.title}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Status</label>
                            <Combobox options={opptyStatusOptions} bubbleUpUpdate={updateOpportunity} 
                                dataId="status" actionName={UPDATE_OPPTY_ACTION} value={opptyDetails.status}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Type</label>
                            <Combobox options={opptyTypeOptions} bubbleUpUpdate={updateOpportunity} 
                                dataId="type" actionName={UPDATE_OPPTY_ACTION} value={opptyDetails.type}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Description</label>
                            <TextInput placeholder='Description'  dataId="description" bubbleUpUpdate={updateOpportunity}
                                value={opptyDetails.description}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Comments</label>
                            <TextInput placeholder='Comments'  dataId="comments" bubbleUpUpdate={updateOpportunity}
                                value={opptyDetails.comments}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Expected Revenue</label>
                            <TextInput placeholder='Expected Revenue'  dataId="expectedRevenue" bubbleUpUpdate={updateOpportunity}
                                value={opptyDetails.expectedRevenue}/>
                        </div>
                    </Grid.Column>
                    

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Related Account</label>
                            <EntryPointer entryId={opptyDetails.id} entityName="account" bubbleUpUpdate={updateOpportunity}
                             actionName={UPDATE_OPPTY_ACTION} dataId="relatedAccountId" value={opptyDetails.relatedAccountId}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </div>
    )
}

export default CreateUpdateOpportunityModal;