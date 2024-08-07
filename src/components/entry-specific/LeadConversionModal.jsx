import { Header } from "semantic-ui-react";
import LeadConversionResult from "./LeadConversionResult";

function LeadConversionModal({leadEntry, showResult, conversionResultList, relatedEntrySelected}){

    return(
        <div>
            {
                !showResult ?
                <div>
                    <Header as='h3'>Are you sure you want to convert Lead  {"\"" + leadEntry["companyName"] + "\""}</Header>
                    <Header as='h5'>An Account, Contact and Opportunity will be created based on Lead data.</Header>
                </div>

                :
                <div>
                    <LeadConversionResult leadEntry={leadEntry} conversionResultList={conversionResultList}
                    relatedEntrySelected={relatedEntrySelected}/>
                </div>
            }
           
        </div>
    )
}

export default LeadConversionModal;