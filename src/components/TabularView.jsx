import { Tab, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { Logger } from "../service/Logger";
import TabularRow from "./TabularRow";
import TabularCell from "./TabularCell";
import { useEffect } from "react";
import LabelMapper from "../labels/LabelMapper";
import Parse from "../transform/Parse";

function TabularView({recordList, objectName, recordSelected}){

    if(!recordList){
        return;
    }

    const nonRenderableFields = ["id", "parentId"];
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

    return (

        <div>
            <span>{objectName}</span>
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

                                <TabularCell recordObject={row} fieldName={col} cellClicked={fieldClicked}/>
                                    
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

export default TabularView