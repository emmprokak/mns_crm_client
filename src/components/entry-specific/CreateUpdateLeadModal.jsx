import { Grid, Header, Segment } from "semantic-ui-react";
import Combobox from "../data-type components/Combobox";
import { useEffect, useState } from "react";
import RequestService from "../../service/RequestService";
import { Logger } from "../../service/Logger";
import Checkbox from "../data-type components/Checkbox";
import TextInput from "../data-type components/TextInput";
import EntryPointer from "../data-type components/EntryPointer";

function CreateUpdateLeadModal({entry, bubbleUpFinalEntry, actionType}){
    const [prefixOptions, setPrefixOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);
    const [industryOptions, setIndustryOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [leadDetails, setContactDetails] = useState({});

    const UPDATE_LEAD_ACTION = "updateLead";

    useEffect(() => {
        const retrieveConfig = async () => {
            const options = await RequestService.getIndustryOptions();
            if(options){
                setIndustryOptions(options);
            }


            const prefixOptions = await RequestService.getPrefixOptions();
            if(prefixOptions){
                setPrefixOptions(prefixOptions);
            }

            const roleOptions = await RequestService.getRoleOptions();
            if(roleOptions){
                setRoleOptions(roleOptions);
            }

            const statusOptions = await RequestService.getLeadStatusOptions();
            if(statusOptions){
                setStatusOptions(statusOptions);
            }
        };

        const fillInValues = () => {
            const conValues = {};
            for(let field in entry){
                conValues[field] = entry[field];
            }
            Logger.log(conValues)
            setContactDetails(conValues);
        };

        retrieveConfig();

        if(actionType === "update"){
            fillInValues();
        }
    }, []);


    function updateLead(updateEvent){
        let dataObject = JSON.parse(JSON.stringify(leadDetails));
        dataObject[updateEvent.source] = updateEvent.value;


        Logger.log(dataObject);
        setContactDetails(dataObject);
        bubbleUpFinalEntry(dataObject);
    }

    return (
        <div style={{padding: "20px 20px 20px 40px", width: "70%"}}>
            <Header as='h3' content='Add values' textAlign='center' />
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Company Name</label>
                            <TextInput placeholder='Company Name'  dataId="companyName" bubbleUpUpdate={updateLead}
                                value={leadDetails.companyName}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Company Address</label>
                            <TextInput placeholder='Company Address'  dataId="companyAddress" bubbleUpUpdate={updateLead}
                                value={leadDetails.companyAddress}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Company Industry</label>
                            <Combobox options={industryOptions} bubbleUpUpdate={updateLead} 
                                dataId="companyIndustry" actionName={UPDATE_LEAD_ACTION} value={leadDetails.companyIndustry}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Contact Person</label>
                            <TextInput placeholder='Contact Person'  dataId="contactPerson" bubbleUpUpdate={updateLead}
                                value={leadDetails.contactPerson}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Contact Prefix</label>
                            <Combobox options={prefixOptions} bubbleUpUpdate={updateLead} 
                                dataId="contactPrefix" actionName={UPDATE_LEAD_ACTION} value={leadDetails.contactPrefix}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Status</label>
                            <Combobox options={statusOptions} bubbleUpUpdate={updateLead} 
                                dataId="status" actionName={UPDATE_LEAD_ACTION} value={leadDetails.status}/>
                        </div>
                    </Grid.Column>
                    

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Contact Role</label>
                            <Combobox options={roleOptions} bubbleUpUpdate={updateLead} 
                                dataId="contactRole" actionName={UPDATE_LEAD_ACTION} value={leadDetails.contactRole}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Contact Email</label>
                            <TextInput placeholder='Contact Email'  dataId="contactEmail" bubbleUpUpdate={updateLead}
                                value={leadDetails.contactEmail}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Contact Phone</label>
                            <TextInput placeholder='Contact Phone'  dataId="contactPhone" bubbleUpUpdate={updateLead}
                                value={leadDetails.contactPhone}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Contact Mobile</label>
                            <TextInput placeholder='Contact Mobile'  dataId="contactMobile" bubbleUpUpdate={updateLead}
                                value={leadDetails.contactMobile}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>
        
            </Grid>
        </div>
    )
}

export default CreateUpdateLeadModal;