import { useEffect } from "react";
import { Logger } from "../../service/Logger";
import RelatedEntriesTable from "./RelatedEntriesTable";

function RelatedEntriesGroup({entityName, relationshipName, entryId, relatedEntriesList, pointerToParentName, relatedEntriesDisplayField, relatedEntrySelected}){

    useEffect(() => {
    }, [entryId])

    return (
        <div>
            <div style={{margin: "10px 0"}}>
                <span style={{color: "blue", fontSize: "1.4em"}}> {relationshipName} ({relatedEntriesList?.length})</span>
            </div>

            <div>
                <RelatedEntriesTable relationshipName={relationshipName} originEntityName={entityName} recordList={relatedEntriesList} relatedRecordClicked={relatedEntrySelected}/>
            </div>
        </div>
    )
}

export default RelatedEntriesGroup;