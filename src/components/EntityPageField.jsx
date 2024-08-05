import EventGenerator from '../events/EventGenerator';
import LabelMapper from '../labels/LabelMapper';
import { Logger } from '../service/Logger';
import Parse from '../transform/Parse';
import './css/EntityPage.css';

function EntityPageField({fieldName, fieldValue, entityName, relatedEntrySelected}){

    function getRelatedObjectType(entry){
        if(!entry){
            return;
        }

        if("clientRating" in entry){
            return "Account";
        }

        if("companyIndustry" in entry){
            return "Lead";
        }

        if("role" in entry){
            return "Contact";
        }

        if("dueDate" in entry){
            return "Task";
        }

        if("expectedRevenue" in entry){
            return "Opportunity";
        }
    }

    function renderFieldValue(){
        if(typeof fieldValue === 'object'){
            const [id, displayValue] = Parse.handleObjectValue(fieldValue, fieldName, entityName)
            const relatedObjectType = getRelatedObjectType(fieldValue);
            return <a onClick={entryObjectSelected} data-id={id} data-object={relatedObjectType} style={{cursor : "pointer"}}>{displayValue}</a>;
        }

        return Parse.parseTableValue(fieldValue, fieldName);
    }

    function entryObjectSelected(event){
        relatedEntrySelected(EventGenerator.getRelatedLinkEvent(event.target.dataset.id, event.target.dataset.object))
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