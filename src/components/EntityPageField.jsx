import LabelMapper from '../labels/LabelMapper';
import { Logger } from '../service/Logger';
import Parse from '../transform/Parse';
import './css/EntityPage.css';

function EntityPageField({fieldName, fieldValue, entityName, relatedEntrySelected}){

    function renderFieldValue(){
        if(typeof fieldValue === 'object'){
            const [id, displayValue] = Parse.handleObjectValue(fieldValue, fieldName, entityName)
            return <a onClick={entryObjectSelected} data-id={id} style={{cursor : "pointer"}}>{displayValue}</a>;
        }

        return Parse.parseTableValue(fieldValue, fieldName);
    }

    function entryObjectSelected(event){
        relatedEntrySelected(event.target.dataset.id);
    }

    return(
        <div className="field-container">
            <label htmlFor={fieldName} className='field-label'>{LabelMapper.fieldNameToLabelMap[fieldName]}</label>
            <br/>
            <div>
                <span className='field-value'>
                    {renderFieldValue()}
                </span>
            </div>
        </div>
    )
}

export default EntityPageField;