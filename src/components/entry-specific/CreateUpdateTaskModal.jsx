import { Grid, Header, Segment } from "semantic-ui-react";
import Combobox from "../data-type components/Combobox";
import { useEffect, useState } from "react";
import RequestService from "../../service/RequestService";
import { Logger } from "../../service/Logger";
import Checkbox from "../data-type components/Checkbox";
import TextInput from "../data-type components/TextInput";
import EntryPointer from "../data-type components/EntryPointer";

function CreateUpdateTaskModal({entry, bubbleUpFinalEntry, actionType}){
    const [taskStatusOptions, setTaskStatusOptions] = useState([]);
    const [taskTypeOptions, setTaskTypeOptions] = useState([]);
    const [taskDetails, setTaskDetails] = useState({});

    const UPDATE_TASK_ACTION = "updateTask";

    useEffect(() => {
        const retrieveConfig = async () => {
            const statusOptions = await RequestService.getTaskStatusOptions();
            if(statusOptions){
                setTaskStatusOptions(statusOptions);
            }

            const typeOptions = await RequestService.getTaskTypeOptions();
            if(typeOptions){
                setTaskTypeOptions(typeOptions);
            }
        
        };

        const fillInValues = () => {
            const conValues = {};
            for(let field in entry){
                conValues[field] = entry[field];
            }
            Logger.log(conValues)
            setTaskDetails(conValues);
        };

        retrieveConfig();

        if(actionType === "update"){
            fillInValues();
        }
    }, []);


    function updateTask(updateEvent){
        let dataObject = JSON.parse(JSON.stringify(taskDetails));
        dataObject[updateEvent.source] = updateEvent.value;


        Logger.log(dataObject);
        setTaskDetails(dataObject);
        bubbleUpFinalEntry(dataObject);
    }

    return (
        <div style={{padding: "20px 20px 20px 40px", width: "70%"}}>
            <Header as='h3' content='Add values' textAlign='center' />
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Name</label>
                            <TextInput placeholder='Name'  dataId="name" bubbleUpUpdate={updateTask}
                                value={taskDetails.name}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Reason</label>
                            <TextInput placeholder='Reason'  dataId="reason" bubbleUpUpdate={updateTask}
                                value={taskDetails.reason}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Status</label>
                            <Combobox options={taskStatusOptions} bubbleUpUpdate={updateTask} 
                                dataId="status" actionName={UPDATE_TASK_ACTION} value={taskDetails.status}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Due Date</label>
                            <TextInput placeholder='Due Date'  dataId="dueDate" bubbleUpUpdate={updateTask}
                                value={taskDetails.dueDate}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Type</label>
                            <Combobox options={taskTypeOptions} bubbleUpUpdate={updateTask} 
                                dataId="type" actionName={UPDATE_TASK_ACTION} value={taskDetails.type}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Related Lead</label>
                            <EntryPointer entryId={taskDetails.id} entityName="lead" bubbleUpUpdate={updateTask}
                             actionName={UPDATE_TASK_ACTION} dataId="relatedLeadId" value={taskDetails.relatedLeadId}/>
                        </div>
                    </Grid.Column>
                    

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Related Opportunity</label>
                            <EntryPointer entryId={taskDetails.id} entityName="opportunity" bubbleUpUpdate={updateTask}
                             actionName={UPDATE_TASK_ACTION} dataId="relatedOpportunityId" value={taskDetails.relatedOpportunityId}/>
                        </div>
                    </Grid.Column>

            

                </Grid.Row>

              
        
            </Grid>
        </div>
    )
}

export default CreateUpdateTaskModal;