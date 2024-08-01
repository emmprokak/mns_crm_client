import { Input } from "semantic-ui-react";
import EventGenerator from "../../events/EventGenerator";

function TextInput({placeholder, dataId, bubbleUpUpdate, actionName, value}){

    function handleUpdate(event){
        bubbleUpUpdate(EventGenerator.getEvent(actionName, dataId, event.target.value));
    }
    return (
        <div>
            <Input placeholder={placeholder} style={{border: "1px solid black", borderRadius: "5px"}}
              onChange={handleUpdate} value={value}/>
        </div>
    )
}

export default TextInput;