import { useState } from "react";
import { FormCheckbox } from "semantic-ui-react";
import EventGenerator from "../../events/EventGenerator";

function Checkbox({displayText, bubbleUpUpdate, defaultValue = false, dataId, actionName}){
    const [checked, setChecked] = useState(defaultValue);

    function checkBoxStateChanged(){
        const newValue = !checked;
        setChecked(newValue);
        bubbleUpUpdate(EventGenerator.getEvent(actionName, dataId, newValue))
    }

    return (
        <div>
            <FormCheckbox label={displayText} value={checked} onChange={checkBoxStateChanged}/>
        </div>
    )
}

export default Checkbox;