import { useEffect, useState } from "react";
import { FormCheckbox } from "semantic-ui-react";
import EventGenerator from "../../events/EventGenerator";
import { Logger } from "../../service/Logger";

function Checkbox({displayText, bubbleUpUpdate, defaultValue = false, dataId, actionName, value}){
    const [checked, setChecked] = useState(defaultValue);

    useEffect(() => {
        setChecked(value);
    }, [value]);

    function checkBoxStateChanged(){
        const newValue = !checked;
        setChecked(newValue);
        bubbleUpUpdate(EventGenerator.getEvent(actionName, dataId, newValue))
    }

    return (
        <div>
            <FormCheckbox label={displayText} checked={checked} onChange={checkBoxStateChanged}/>
        </div>
    )
}

export default Checkbox;