import { Grid, Header, Segment } from "semantic-ui-react";
import Combobox from "../data-type components/Combobox";
import { useEffect, useState } from "react";
import RequestService from "../../service/RequestService";
import { Logger } from "../../service/Logger";
import Checkbox from "../data-type components/Checkbox";
import TextInput from "../data-type components/TextInput";
import EntryPointer from "../data-type components/EntryPointer";

function CreateUpdateVoiceCallModal({entry, bubbleUpFinalEntry, actionType}){
    const [voiceCallDetails, setVoiceCallDetails] = useState({});

    const UPDATE_VOICE_CALL_ACTION = "updateVoiceCall";

    useEffect(() => {
       
        const fillInValues = () => {
            const conValues = {};
            for(let field in entry){
                conValues[field] = entry[field];
            }
            Logger.log(conValues)
            setVoiceCallDetails(conValues);
        };

        if(actionType === "update"){
            fillInValues();
        }
    }, []);


    function updateTask(updateEvent){
        let dataObject = JSON.parse(JSON.stringify(voiceCallDetails));
        dataObject[updateEvent.source] = updateEvent.value;

        dataObject["relatedAccount"] = null;
        dataObject["relatedCase"] = null;

        Logger.log(dataObject);
        setVoiceCallDetails(dataObject);
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
                            <TextInput placeholder='Name'  dataId="title" bubbleUpUpdate={updateTask}
                                value={voiceCallDetails.title}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Customer Phone</label>
                            <TextInput placeholder='Customer Phone'  dataId="customerPhone" bubbleUpUpdate={updateTask}
                                value={voiceCallDetails.customerPhone}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Agent Name</label>
                            <TextInput placeholder='Agent Name'  dataId="agentName" bubbleUpUpdate={updateTask}
                                value={voiceCallDetails.agentName}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Call Date</label>
                            <TextInput placeholder='Call Date'  dataId="callDate" bubbleUpUpdate={updateTask}
                                value={voiceCallDetails.callDate}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Related Account</label>
                            <EntryPointer entryId={voiceCallDetails.id} entityName="account" bubbleUpUpdate={updateTask}
                             actionName={UPDATE_VOICE_CALL_ACTION} dataId="relatedAccountId" value={voiceCallDetails.relatedAccountId}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Related Case</label>
                            <EntryPointer entryId={voiceCallDetails.id} entityName="case" bubbleUpUpdate={updateTask}
                             actionName={UPDATE_VOICE_CALL_ACTION} dataId="relatedCaseId" value={voiceCallDetails.relatedCaseId}/>
                        </div>
                    </Grid.Column>
                    

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Duration (in secs)</label>
                            <TextInput placeholder='Duration'  dataId="duration" bubbleUpUpdate={updateTask}
                                value={voiceCallDetails.duration}/>
                        </div>
                    </Grid.Column>

            

                </Grid.Row>

              
        
            </Grid>
        </div>
    )
}

export default CreateUpdateVoiceCallModal;