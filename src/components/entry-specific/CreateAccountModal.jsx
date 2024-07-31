import { Grid, Header, Input, Segment } from "semantic-ui-react";
import Combobox from "../data-type components/Combobox";
import { useEffect, useState } from "react";
import RequestService from "../../service/RequestService";
import { Logger } from "../../service/Logger";
import Checkbox from "../data-type components/Checkbox";

function CreateAccountModal({acc}){
    const [industryOptions, setIndustryOptions] = useState([]);
    const [accountTypeOptions, setAccountTypeOptions] = useState([]);

    const UPDATE_ACCOUNT_ACTION = "updateAccount";

    useEffect(() => {
        const retrieveConfig = async () => {
            const options = await RequestService.getIndustryOptions();
            if(options){
                setIndustryOptions(options);
            }

            const accounTypes = await RequestService.getAccountTypes();
            if(accounTypes){
                setAccountTypeOptions(accounTypes);
            }

        };

        retrieveConfig();
       
    }, []);

    function updateAccount(updateEvent){
        Logger.log(updateEvent);
    }


    return (
        <div style={{padding: "20px 20px 20px 40px", width: "70%"}}>
            <Header as='h3' content='Add values' textAlign='center' />
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column > 
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Company Name</label>
                            <Input placeholder='Company Name' style={{border: "1px solid black", borderRadius: "5px"}}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Industry</label>
                            {/* <Input placeholder='Industry' style={{border: "1px solid black", borderRadius: "5px"}}/> */}
                            <Combobox options={industryOptions} bubbleUpUpdate={updateAccount} 
                                dataId="industry" actionName={UPDATE_ACCOUNT_ACTION}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Is Active</label>
                            <Checkbox bubbleUpUpdate={updateAccount} 
                                displayText="Active" defaultValue={false} dataId="active" actionName={UPDATE_ACCOUNT_ACTION}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Revenue</label>
                            <Input placeholder='Revenue' style={{border: "1px solid black", borderRadius: "5px"}}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Billing Address</label>
                            <Input placeholder='Billing Address' style={{border: "1px solid black", borderRadius: "5px"}}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Description</label>
                            <Input placeholder='Description' style={{border: "1px solid black", borderRadius: "5px"}}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Type</label>
                            <Combobox options={accountTypeOptions} bubbleUpUpdate={updateAccount} 
                                dataId="type" actionName={UPDATE_ACCOUNT_ACTION}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Website</label>
                            <Input placeholder='Website' style={{border: "1px solid black", borderRadius: "5px"}}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row>
                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>Client Rating</label>
                            <Input placeholder='Client Rating' style={{border: "1px solid black", borderRadius: "5px"}}/>
                        </div>
                    </Grid.Column>

                    <Grid.Column>
                        <div>
                            <label htmlFor="" style={{display: "block", paddingLeft: "5px"}}>VAT</label>
                            <Input placeholder='VAT' style={{border: "1px solid black", borderRadius: "5px"}}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </div>
    )
}

export default CreateAccountModal;