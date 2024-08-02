import { useEffect } from "react";

function RelatedEntriesGroup({entityName, entryId, relatedEntriesList, pointerToParentName, relatedEntriesDisplayField}){

    useEffect(() => {

    }, [entryId])

    return (
        <div>
            <div>
                <span style={{color: "blue"}}>{entityName}</span>
            </div>
        </div>
    )
}

export default RelatedEntriesGroup;