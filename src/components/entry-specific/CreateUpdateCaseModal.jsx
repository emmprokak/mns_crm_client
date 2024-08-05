import { Grid, Header, Segment } from "semantic-ui-react";
import Combobox from "../data-type components/Combobox";
import { useEffect, useState } from "react";
import RequestService from "../../service/RequestService";
import { Logger } from "../../service/Logger";
import Checkbox from "../data-type components/Checkbox";
import TextInput from "../data-type components/TextInput";
import EntryPointer from "../data-type components/EntryPointer";

function CreateUpdateCaseModal({entry, bubbleUpFinalEntry, actionType}){
    const [statusOptions, setStatusOptions] = useState([]);
    const [reasonOptions, setReasonOptions] = useState([]);
    const [sourceOptions, setSourceOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [severityOptions, setSeverityOptions] = useState([]);
    const [caseDetails, setCaseDetails] = useState({});

    const UPDATE_CASE_ACTION = "updateCase";

    useEffect(() => {
        const retrieveConfig = async () => {
            const statusOptions = await RequestService.getCaseStatusOptions();
            if(statusOptions){
                setStatusOptions(statusOptions);
            }

            const reasonOptions = await RequestService.getCaseReasonOptions();
            if(reasonOptions){
                setReasonOptions(reasonOptions);
            }

            const sourceOptions = await RequestService.getCaseSourceOptions();
            if(sourceOptions){
                setSourceOptions(sourceOptions);
            }

            const categoryOptions = await RequestService.getCaseCategoryOptions();
            if(categoryOptions){
                setCategoryOptions(categoryOptions);
            }

            const severityOptions = await RequestService.getCaseSeverityOptions();
            if(severityOptions){
                setSeverityOptions(severityOptions);
            }

        };

        const fillInValues = () => {
            const conValues = {};
            for(let field in entry){
                conValues[field] = entry[field];
            }
            Logger.log(conValues)
            setCaseDetails(conValues);
        };

        retrieveConfig();

        if(actionType === "update"){
            fillInValues();
        }
    }, []);


    function updateCase(updateEvent){
        let dataObject = JSON.parse(JSON.stringify(caseDetails));
        dataObject[updateEvent.source] = updateEvent.value;

        dataObject["relatedAccount"] = null;
        dataObject["relatedContact"] = null;

        Logger.log(dataObject);
        setCaseDetails(dataObject);
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
                            <TextInput placeholder='Title'  dataId="title" bubbleUpUpdate={updateCase}
                                value={caseDetails.title}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Status</label>
                            <Combobox options={statusOptions} bubbleUpUpdate={updateCase} 
                                dataId="status" actionName={UPDATE_CASE_ACTION} value={caseDetails.status}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Reason</label>
                            <Combobox options={reasonOptions} bubbleUpUpdate={updateCase} 
                                dataId="reason" actionName={UPDATE_CASE_ACTION} value={caseDetails.reason}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Source</label>
                            <Combobox options={sourceOptions} bubbleUpUpdate={updateCase} 
                                dataId="source" actionName={UPDATE_CASE_ACTION} value={caseDetails.source}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Category</label>
                            <Combobox options={categoryOptions} bubbleUpUpdate={updateCase} 
                                dataId="category" actionName={UPDATE_CASE_ACTION} value={caseDetails.category}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Severity</label>
                            <Combobox options={severityOptions} bubbleUpUpdate={updateCase} 
                                dataId="severity" actionName={UPDATE_CASE_ACTION} value={caseDetails.severity}/>
                        </div>
                    </Grid.Column>
                    

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Related Account</label>
                            <EntryPointer entryId={caseDetails.id} entityName="account" bubbleUpUpdate={updateCase}
                             actionName={UPDATE_CASE_ACTION} dataId="relatedAccountId" value={caseDetails.relatedAccountId}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Related Contact</label>
                            <EntryPointer entryId={caseDetails.id} entityName="contact" bubbleUpUpdate={updateCase}
                             actionName={UPDATE_CASE_ACTION} dataId="relatedContactId" value={caseDetails.relatedContactId}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </div>
    )
}

export default CreateUpdateCaseModal;