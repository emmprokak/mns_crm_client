import { Grid, Header, Segment } from "semantic-ui-react";
import Combobox from "../data-type components/Combobox";
import { useEffect, useState } from "react";
import RequestService from "../../service/RequestService";
import { Logger } from "../../service/Logger";
import Checkbox from "../data-type components/Checkbox";
import TextInput from "../data-type components/TextInput";

function CreateAccountModal({entry, bubbleUpFinalEntry, actionType}){
    const [industryOptions, setIndustryOptions] = useState([]);
    const [accountTypeOptions, setAccountTypeOptions] = useState([]);
    const [accDetails, setAccDetails] = useState({});
    // const [prevAccountDetails, setPrevAccountDetails] = useState({
    //     companyName : "",
    //     industry : "",
    //     active : "",
    //     billingAddress : "",
    //     revenue : "",
    //     description : "",
    //     type : "",
    //     website : "",
    //     clientRating : "",
    //     vat : ""
    // })

    const UPDATE_ACCOUNT_ACTION = "updateAccount";

    useEffect(() => {
        const retrieveConfig = async () => {
            const options = await RequestService.getIndustryOptions();
            if(options){
                setIndustryOptions(options);
            }

            const accountTypes = await RequestService.getAccountTypes();
            if(accountTypes){
                setAccountTypeOptions(accountTypes);
            }
        };

        const fillInValues = () => {
            const accValues = {};
            for(let field in entry){
                accValues[field] = entry[field];
            }

            setAccDetails(accValues);
        };

        retrieveConfig();
        if(actionType === "update"){
            fillInValues();
        }
    }, []);


    function updateAccount(updateEvent){
        let dataObject = JSON.parse(JSON.stringify(accDetails));
        dataObject[updateEvent.source] = updateEvent.value;
        setAccDetails(dataObject);
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
                            <TextInput placeholder='Company Name'  dataId="companyName" bubbleUpUpdate={updateAccount}
                                value={accDetails.companyName}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Industry</label>
                            <Combobox options={industryOptions} bubbleUpUpdate={updateAccount} 
                                dataId="industry" actionName={UPDATE_ACCOUNT_ACTION} value={accDetails.industry}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Is Active</label>
                            <Checkbox bubbleUpUpdate={updateAccount} 
                                displayText="Active" defaultValue={false} dataId="active" 
                                actionName={UPDATE_ACCOUNT_ACTION} value={accDetails.active}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Revenue</label>
                            <TextInput placeholder='Revenue' bubbleUpUpdate={updateAccount} dataId="revenue"
                                value={accDetails.revenue}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Billing Address</label>
                            <TextInput placeholder='Billing Address' bubbleUpUpdate={updateAccount} dataId="billingAddress"
                                value={accDetails.billingAddress}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Description</label>
                            <TextInput placeholder='Description' bubbleUpUpdate={updateAccount} dataId="description"
                                value={accDetails.description}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Type</label>
                            <Combobox options={accountTypeOptions} bubbleUpUpdate={updateAccount} 
                                dataId="type" actionName={UPDATE_ACCOUNT_ACTION} value={accDetails.type}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Website</label>
                            <TextInput placeholder='Website' bubbleUpUpdate={updateAccount} dataId="website"
                                value={accDetails.website}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Client Rating</label>
                            <TextInput placeholder='Client Rating' bubbleUpUpdate={updateAccount} dataId="clientRating"
                                value={accDetails.clientRating}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>VAT</label>
                            <TextInput placeholder='VAT' bubbleUpUpdate={updateAccount} dataId="vat" value={accDetails.vat}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </div>
    )
}

export default CreateAccountModal;