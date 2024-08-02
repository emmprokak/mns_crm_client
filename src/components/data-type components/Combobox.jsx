import { Dropdown, Select } from "semantic-ui-react";
import { Logger } from "../../service/Logger";
import EventGenerator from "../../events/EventGenerator";
import { useEffect, useState } from "react";

function Combobox({options, bubbleUpUpdate, dataId, actionName, value}){
    const [selectedValue, setSelectedValue] = useState("");

    function optionSelected(event){
        bubbleUpUpdate(EventGenerator.getEvent(actionName, dataId, event.target.innerText));
    }

    useEffect(() => {
        if(!value){
            return;
        }
        // TODO eval if neede
        // if(options.include(value)){
            setSelectedValue(value);
        // }
    }, [value]);

    return (
        <div>
             {/* <Select placeholder='Select your country' options={options} onChange={optionSelected} value={selectedValue} /> */}
            <Dropdown
                fluid
                selection
                multiple={false}
                search={false}
                options={options}
                value={selectedValue}
                placeholder='None'
                onChange={optionSelected}
                disabled={false}
                style={{border: "1px solid black"}}
            />
        </div>
    )
}

export default Combobox;