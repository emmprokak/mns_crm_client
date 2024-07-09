import { useEffect, useState } from "react";
import RequestService from "../service/RequestService";
import EntityPageField from "./EntityPageField";
import EntityHeader from "./EntityHeader";


function EntityPage({objectName, entryId}){

    const [entry, setEntry] = useState({});
    const [firstColFields, setFirstColFields] = useState([]);
    const [secondColFields, setSecondColFields] = useState([]);
    const [fieldTotal, setFieldTotal] = useState([]);

    const nonRenderableFields = ["id"];

    useEffect(() => {
        const loadData = async () => {
            const result = await RequestService.getSingleRecord(objectName, entryId);
            console.log(entry)
            setEntry(result);
        };

        loadData();
    }, []);

    useEffect(() => {
        seperateFieldsIntoTwoGroups();
    }, [entry])

    function seperateFieldsIntoTwoGroups(){
        if(!entry){
            return;
        }

        let idx = 0;
        const leftList = [];
        const rightList = [];
        const total = [];

        for(let field of Object.keys(entry)){
            if(nonRenderableFields.includes(field)){
                continue;
            }

            if(idx % 2 === 0){
                leftList.push(field);
            }else{
                rightList.push(field);
            }
            
            total.push(field);
            idx++;
        }

        setFirstColFields(leftList)
        setSecondColFields(rightList);
        setFieldTotal(total);
    }

    return(
        <div>
            <div>
                <EntityHeader objectName={objectName} record={entry} fieldCollection={fieldTotal}/>
            </div>
            <div className="field-group-container">
                <div className="left-div">
                    {
                        firstColFields.map(field => (
                            <EntityPageField key={field} fieldName={field} fieldValue={entry[field]} />
                        ))
                    }
                </div>

                <div className="right-div">
                    {
                        secondColFields.map(field => (
                            <EntityPageField key={field} fieldName={field} fieldValue={entry[field]} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default EntityPage;