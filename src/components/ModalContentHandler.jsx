import { useEffect, useState } from "react";
import EntityPageField from "./EntityPageField";

function ModalContentHandler({entry, actionType}){

    const [leftColFields, setLeftColFields] = useState([]);
    const [rightColFields, setRightColFields] = useState([]);

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
            // if(nonRenderableFields.includes(field)){
            //     continue;
            // }

            if(idx % 2 === 0){
                leftList.push(field);
            }else{
                rightList.push(field);
            }

            total.push(field);
            idx++;
        }

        setLeftColFields(leftList);
        setRightColFields(rightList);
    }
    
    return (
        <div>
              <div className="field-group-container">
                    <div className="left-div">
                        {
                            leftColFields.map(field => (
                                <EntityPageField key={field} fieldName={field} fieldValue={entry[field]} />
                            ))
                        }
                    </div>

                    <div className="right-div">
                        {
                            rightColFields.map(field => (
                                <EntityPageField key={field} fieldName={field} fieldValue={entry[field]} />
                            ))
                        }
                    </div>
                </div>

        </div>
    )
}

export default ModalContentHandler;