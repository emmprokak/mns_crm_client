import { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import RequestService from "../../service/RequestService";
import { Logger } from "../../service/Logger";
import EventGenerator from "../../events/EventGenerator";
import Parse from "../../transform/Parse";

function EntryPointer({entryId, entryFieldToDisplay, entityName, dataId, bubbleUpUpdate, actionName, value}){
    const [optionRecords, setOptionRecords] = useState([{key: "None", value: null, text: "None"}]);
    const [entrySelection, setEntrySelection] = useState({});
    const [loading, setLoading] = useState(false);
    const [placeholderText, setPlaceholderText] = useState("");


    useEffect(() => { 
       setPlaceholderText(`Select ${Parse.firstLetterCapital(entityName)}`);
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


    /* use functional form of state update to avoid race conditions,
        react state updates are batched and asynchronous */
    function parseOptions(records){
        setOptionRecords(prevOptions => {
            const existingIds = new Set(prevOptions.map(option => option.key));
            const newOptions = records.filter(record => !existingIds.has(record.id))
                                    .map(record => (
                                            { 
                                                key: record.id,
                                                value: record.id,
                                                text: getComboboxOptionDisplayLabel(record)
                                            }
                                        )
                                    );
            
            return [
                ...prevOptions,
                ...newOptions
            ];
        });

    }

    /* use functional form of state update to avoid race conditions,
        react state updates are batched and asynchronous */
    function appendOption(singleRecord){
        setOptionRecords(prevOptions => {
            if (prevOptions.some(option => option.key === singleRecord.id)) {
                return prevOptions;
            }

            return [
                ...prevOptions,
                { key: singleRecord.id, value: singleRecord.id, text: getComboboxOptionDisplayLabel(singleRecord) }
            ];
        });
    }

    function getComboboxOptionDisplayLabel(entry){
        if(entityName === "opportunity"){
            return entry["title"];
        }

        if(entityName === "contact"){
            return entry["firstName"] + " " + entry["lastName"];
        }

        if(entityName === "case"){
            return entry["title"];
        }

        return entry["companyName"];
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