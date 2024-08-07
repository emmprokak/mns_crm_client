import { useEffect, useState } from "react";
import { Header } from "semantic-ui-react";
import EventGenerator from "../../events/EventGenerator";

function LeadConversionResult({leadEntry, conversionResultList, relatedEntrySelected}){
    const [accountEntry, setAccountEntry] = useState({});
    const [contactEntry, setContactEntry] = useState({});
    const [opptyEntry, setOpptyEntry] = useState({});

    useEffect(() => {
        setAccountEntry(conversionResultList[0]);
        setContactEntry(conversionResultList[1]);
        setOpptyEntry(conversionResultList[2]);

    }, [conversionResultList]);

    function recordSelected(event){
        relatedEntrySelected(EventGenerator.getRelatedLinkEvent(event.target.dataset.id, event.target.dataset.object))
    }

    return (
        <div style={{textAlign: "start", display: "block", width: "100%"}}>
            <Header as='h3'>Congratulations!</Header>
            <Header as='h4'>Lead {"\"" + leadEntry["companyName"] + "\""} was successfully converted</Header>

            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%"}}>
                <div style={{display: "inline-block", textAlign: "center", marginLeft: "50px"}}>
                    <span>
                        Created Account:
                    </span>

                    <div>
                        <a onClick={recordSelected} data-id={accountEntry["id"]} data-object="account" style={{cursor : "pointer"}}>{accountEntry["companyName"]}</a>
                    </div>
                </div>

                <div style={{display: "inline-block", textAlign: "center", marginLeft: "50px"}}>
                    <span>
                        Created Contact:
                    </span>

                    <div>
                        <a onClick={recordSelected} data-id={contactEntry["id"]} data-object="contact" style={{cursor : "pointer"}}>{contactEntry["firstName"] + " " + contactEntry["lastName"]}</a>
                    </div>
                </div>

                <div style={{display: "inline-block", textAlign: "center", marginLeft: "50px"}}>
                    <span>
                        Created Opportunity:
                    </span>

                    <div>
                        <a onClick={recordSelected} data-id={opptyEntry["id"]} data-object="opportunity" style={{cursor : "pointer"}}>{opptyEntry["title"]}</a>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default LeadConversionResult;