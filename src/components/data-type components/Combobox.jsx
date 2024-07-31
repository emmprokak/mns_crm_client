import { Select } from "semantic-ui-react";
import { Logger } from "../../service/Logger";
import EventGenerator from "../../events/EventGenerator";

function Combobox({options, bubbleUpUpdate, dataId, actionName}){

    function optionSelected(event){
        bubbleUpUpdate(EventGenerator.getEvent(actionName, dataId, event.target.innerText));
    }

    return (
        <div>
             <Select placeholder='Select your country' options={options} onChange={optionSelected} />
        </div>
    )
}

export default Combobox;