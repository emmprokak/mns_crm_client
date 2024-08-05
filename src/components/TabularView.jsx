import { Button, Tab, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { Logger } from "../service/Logger";
import TabularRow from "./TabularRow";
import TabularCell from "./TabularCell";
import { useEffect, useState } from "react";
import LabelMapper from "../labels/LabelMapper";
import Parse from "../transform/Parse";
import ModalController from "./ModalController";
import TabularModal from "./TabularModal";

function TabularView({recordList, objectName, recordSelected}){
    const [noRecordModalOpen, setNoRecordModalOpen] = useState(false);
    const [modalKey, setModalKey] = useState(0);

    if(!recordList){
        return;
    }

    const nonRenderableFields = ["id", "account", "parentId", "accountId", "relatedAccountId", "relatedLeadId", "relatedOpportunityId", "relatedContactId"];
    const fields = parseFields(recordList[0]);

    function parseFields(demoRecord){
        const result = [];

        for(let field in demoRecord){
            if(nonRenderableFields.includes(field)){
                continue;
            }
            result.push(field);
        }

        return result;
    }

    function fieldClicked(event){
        Logger.log(event.target.id);
        const compositeValue = event.target.id;
        const fieldName = compositeValue.split(":")[0];
        const recordId = compositeValue.split(":")[1];
        Logger.log(`record selected with values = ${fieldName}, ${objectName}, ${recordId}`)
        recordSelected(fieldName, objectName, recordId);
    }

    function modalButtonPressed(){
        setModalKey(modalKey + 1);
        setNoRecordModalOpen(true);
    }

    function modalClosed(event){
        setModalKey(modalKey + 1);
        setNoRecordModalOpen(false);
        recordSelected(null, objectName, event.id);
    }

    return (

        <div>
            <span>{objectName}</span>

            {
                recordList?.length > 0 ? 
                <Table celled color="red">
                <TableHeader>
                    <TableRow>
                        {fields.map(field => (
                            <TableHeaderCell key={"h" + field}>{LabelMapper.fieldNameToLabelMap[field]}</TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                
                <TableBody>

                {recordList.map(row => (
                    <Table.Row key={"tRow" + row.id}>

                        {fields.map(col => (
                            <Table.Cell
                                collapsing={false}
                                textAlign="center"
                                verticalAlign="middle"
                                key={"rec" + row["id"] + col}
                            >                                

                                <TabularCell recordObject={row} fieldName={col} cellClicked={fieldClicked} entityName={objectName}/>
                                    
                            </Table.Cell>
                            ))
                        }

                    </Table.Row>
                    ))
                }

                </TableBody>

            </Table>

            :

            <div>
                <div>

                <span>No records where found</span>
                    <Button onClick={modalButtonPressed} style={{marginLeft: "20px"}}>Create a {objectName}?</Button>
                </div>

                <div>
                    <TabularModal entityName={objectName} 
                        childModalClosed={modalClosed} showModal={noRecordModalOpen} modalKey={modalKey}/>
                </div>
                
            </div>

            }
            
           

        </div>
    )
}

export default TabularView