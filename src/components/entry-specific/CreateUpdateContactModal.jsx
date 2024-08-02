import { Grid, Header, Segment } from "semantic-ui-react";
import Combobox from "../data-type components/Combobox";
import { useEffect, useState } from "react";
import RequestService from "../../service/RequestService";
import { Logger } from "../../service/Logger";
import Checkbox from "../data-type components/Checkbox";
import TextInput from "../data-type components/TextInput";
import EntryPointer from "../data-type components/EntryPointer";

function CreateUpdateContactModal({entry, bubbleUpFinalEntry, actionType}){
    const [prefixOptions, setPrefixOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);
    const [contactDetails, setContactDetails] = useState({});

    const UPDATE_CONTACT_ACTION = "updateContact";

    useEffect(() => {
        const retrieveConfig = async () => {
            const prefixOptions = await RequestService.getPrefixOptions();
            if(prefixOptions){
                setPrefixOptions(prefixOptions);
            }

            const roleOptions = await RequestService.getRoleOptions();
            if(roleOptions){
                setRoleOptions(roleOptions);
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


    function updateContact(updateEvent){
        let dataObject = JSON.parse(JSON.stringify(contactDetails));
        dataObject[updateEvent.source] = updateEvent.value;

        dataObject["account"] = null;
        dataObject["parent"] = null;

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
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>First Name</label>
                            <TextInput placeholder='First name'  dataId="firstName" bubbleUpUpdate={updateContact}
                                value={contactDetails.firstName}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Last Name</label>
                            <TextInput placeholder='Last name'  dataId="lastName" bubbleUpUpdate={updateContact}
                                value={contactDetails.lastName}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Email</label>
                            <TextInput placeholder='Email'  dataId="email" bubbleUpUpdate={updateContact}
                                value={contactDetails.email}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Phone</label>
                            <TextInput placeholder='Phone'  dataId="phone" bubbleUpUpdate={updateContact}
                                value={contactDetails.phone}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Is Active</label>
                            <Checkbox bubbleUpUpdate={updateContact} 
                                displayText="Active" defaultValue={false} dataId="active" 
                                actionName={UPDATE_CONTACT_ACTION} value={contactDetails.active}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Mobile</label>
                            <TextInput placeholder='Mobile'  dataId="mobile" bubbleUpUpdate={updateContact}
                                value={contactDetails.mobile}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Parent Account</label>
                            <EntryPointer entryId={contactDetails.id} entityName="account" bubbleUpUpdate={updateContact}
                             actionName={UPDATE_CONTACT_ACTION} dataId="accountId" value={contactDetails.accountId}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Prefix</label>
                            <Combobox options={prefixOptions} bubbleUpUpdate={updateContact} 
                                dataId="prefix" actionName={UPDATE_CONTACT_ACTION} value={contactDetails.prefix}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Birthdate</label>
                            <TextInput placeholder='XXXX-XX-XX'  dataId="birthdate" bubbleUpUpdate={updateContact}
                                value={contactDetails.birthdate}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Department</label>
                            <TextInput placeholder='Department'  dataId="department" bubbleUpUpdate={updateContact}
                                value={contactDetails.department}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
        
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Role</label>
                            <Combobox options={roleOptions} bubbleUpUpdate={updateContact} 
                                dataId="role" actionName={UPDATE_CONTACT_ACTION} value={contactDetails.role}/>
                        </div>
                    </Grid.Column>

                </Grid.Row>
        
            </Grid>
        </div>
    )
}

export default CreateUpdateContactModal;