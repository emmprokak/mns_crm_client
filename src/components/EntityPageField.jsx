import LabelMapper from '../labels/LabelMapper';
import './css/EntityPage.css';

function EntityPageField({fieldName, fieldValue}){
    return(
        <div className="field-container">
            <label htmlFor={fieldName} className='field-label'>{LabelMapper.fieldNameToLabelMap[fieldName]}</label>
            <br/>
            <div>
                <span className='field-value'>{fieldValue}</span>
            </div>
        </div>
    )
}

export default EntityPageField;