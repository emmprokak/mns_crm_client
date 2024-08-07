import { Table, TableBody, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import LabelMapper from "../../labels/LabelMapper";
import TabularCell from "../TabularCell";
import { Logger } from "../../service/Logger";
import { useEffect, useState } from "react";
import EventGenerator from "../../events/EventGenerator";

function RelatedEntriesTable({entityName, recordList, originEntityName, relatedRecordClicked, relationshipName}){
    const [fields, setFields] = useState([]);

    const relatedDisplayableFields = ["companyName", "firstName", "lastName", "title", "status", "name", "customerPhone", "role", "type", "dueDate", "category", "creationDate", "agentName"];

    useEffect(() => {
        prepareFields();
    }, []);

    function prepareFields(){
        if(!recordList || recordList.length <= 0){
            return;
        }

        const fieldCollection = [];
        const demoRecord = recordList[0];

        for(let field in demoRecord){
            if(relatedDisplayableFields.includes(field)){
                fieldCollection.push(field);
            }
        }

        setFields(fieldCollection);
    }

    function relatedRecordSelected(event){
        relatedRecordClicked(EventGenerator.getRelatedLinkEvent(event.target.id.split(":")[1], parseRelationshipEntryEntityName(relationshipName)));
    }

    function parseRelationshipEntryEntityName(name){
        if(name.toLowerCase() === "opportunities"){
            return "Opportunity";
        }

        return relationshipName.slice(0, -1);
    }

    return(
        <div>
            <Table celled color="red">
                <TableHeader>
                    <TableRow>
                        {fields.map(field => (
                            <TableHeaderCell key={"h" + field}>{LabelMapper.fieldNameToLabelMap[field]}</TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                
                <TableBody>

                {recordList?.map(row => (
                    <Table.Row key={"tRow" + row.id}>

                        {fields.map(col => (
                            <Table.Cell
                                collapsing={false}
                                textAlign="center"
                                verticalAlign="middle"
                                key={"rec" + row["id"] + col}
                            >                                

                                <TabularCell recordObject={row} fieldName={col} cellClicked={relatedRecordSelected} entityName={entityName}/>
                                    
                            </Table.Cell>
                            ))
                        }

                    </Table.Row>
                    ))
                }

                </TableBody>

            </Table>
        </div>
    )
}

export default RelatedEntriesTable;