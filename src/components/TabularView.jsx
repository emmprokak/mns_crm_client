import { Button, Header, Tab, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { Logger } from "../service/Logger";
import TabularRow from "./TabularRow";
import TabularCell from "./TabularCell";
import { useEffect, useState } from "react";
import LabelMapper from "../labels/LabelMapper";
import Parse from "../transform/Parse";
import ModalController from "./ModalController";
import TabularModal from "./TabularModal";

function TabularView({recordList, entityName, recordSelected}){
    const [noRecordModalOpen, setNoRecordModalOpen] = useState(false);
    const [modalKey, setModalKey] = useState(0);

    if(!recordList){
        return;
    }

    const nonRenderableFields = ["id", "account", "parentId", "accountId", "relatedAccountId", "relatedLeadId", "relatedOpportunityId", "relatedContactId", "relatedCaseId", "leadId"];
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
        const compositeValue = event.target.id;
        const fieldName = compositeValue.split(":")[0];
        const entryId = compositeValue.split(":")[1];
        recordSelected(fieldName, entityName, entryId);
    }

    function modalButtonPressed(){
        setModalKey(modalKey + 1);
        setNoRecordModalOpen(true);
    }

    function modalClosed(event){
        setModalKey(modalKey + 1);
        setNoRecordModalOpen(false);
        recordSelected(null, entityName, event.id);
    }

    return (

        <div>
            <Header as="h2">Viewing {entityName} entries </Header>

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

                                <TabularCell recordObject={row} fieldName={col} cellClicked={fieldClicked} entityName={entityName}/>
                                    
                            </Table.Cell>
                            ))
                        }

                    </Table.Row>
                    ))
                }
$
                </TableBody>

            </Table>

            :

            <div>
                <div>

                <span>No records where found</span>
                    <Button onClick={modalButtonPressed} style={{marginLeft: "20px"}}>Create a {entityName}?</Button>
                </div>

                <div>
                    <TabularModal entityName={entityName} 
                        childModalClosed={modalClosed} showModal={noRecordModalOpen} modalKey={modalKey}/>
                </div>
                
            </div>

            }
            
           

        </div>
    )
}

export default TabularView