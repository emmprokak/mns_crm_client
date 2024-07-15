import LabelMapper from '../labels/LabelMapper';
import Parse from '../transform/Parse';
import './css/EntityPage.css';

function EntityPageField({fieldName, fieldValue}){
    return(
        <div className="field-container">
            <label htmlFor={fieldName} className='field-label'>{LabelMapper.fieldNameToLabelMap[fieldName]}</label>
            <br/>
            <div>
                <span className='field-value'>{typeof fieldValue === 'object' ? "-" :  Parse.parseTableValue(fieldValue, fieldName)}</span>
            </div>
        </div>
    )
}

export default EntityPageField;