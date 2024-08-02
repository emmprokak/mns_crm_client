import { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import RequestService from "../../service/RequestService";
import { Logger } from "../../service/Logger";
import EventGenerator from "../../events/EventGenerator";
import Parse from "../../transform/Parse";

function EntryPointer({entryId, entryFieldToDisplay, entityName, dataId, bubbleUpUpdate, actionName, value}){
    const [optionRecords, setOptionRecords] = useState([]);
    const [entrySelection, setEntrySelection] = useState({});
    const [loading, setLoading] = useState(false);
    const [placeholderText, setPlaceholderText] = useState("");


    useEffect(() => { 
       setPlaceholderText(`Select ${Parse.firstLetterCapital(entityName)}`);

       // TODO; fix in  sec
        // if(entryId){
        //     setEntrySelection(entryId);
        // }

        setLoading(true);

        const fetchSampleRecords = async () => {
            const records = await RequestService.getLastModifiedRecords(entityName, 5, "modified", "desc");
            if(records){
                parseOptions(records);
                setLoading(false);
            }
        };

        const fetchParentRecord = async () => {
            const parentRecord = await RequestService.getSingleRecord(entityName, value);
            appendOption(parentRecord);
            setLoading(false);
        }

        Logger.log("received parent=" + value);

        fetchSampleRecords();

        if(value){
            fetchParentRecord();
        }
            

    }, [entryId]);

    function parseOptions(records){
        const comboboxOptions = [{key: "None", value: null, text: "None"}]; // default value
        for(let record of records){
            if(record.id !== entryId){
                comboboxOptions.push({key: record.id, value: record.id, text: record.companyName})
            }
        }

        setOptionRecords(comboboxOptions);
    }

    function appendOption(singleRecord){
        //TODO: dynamic label field for lookup to non account entry
        const comboboxOptions = [...optionRecords, {key: singleRecord.id, value: singleRecord.id, text: singleRecord.companyName}];
        setOptionRecords(comboboxOptions);
    }

    function sendUpdate(event, {name, value}){
        bubbleUpUpdate(EventGenerator.getEvent(actionName, dataId, value));
    }

    return (
        <div>
             <Dropdown
                placeholder={placeholderText}
                fluid
                search
                selection
                options={optionRecords}
                onChange={sendUpdate}
                loading={loading}
                value={value}
                style={{border: "1px solid black"}}
            />
        </div>
    )
}

export default EntryPointer;