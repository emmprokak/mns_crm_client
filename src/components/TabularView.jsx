import { Tab, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { Logger } from "../service/Logger";
import TabularRow from "./TabularRow";
import { useEffect } from "react";
import LabelMapper from "../labels/LabelMapper";

function TabularView({recordList, objectName}){

    if(!recordList){
        return;
    }

    const fields = parseFields(recordList[0]);

    function parseFields(demoRecord){
        const result = [];

        for(let field in demoRecord){
            if(field.toLowerCase() === "id"){
                continue;
            }
            result.push(field);
        }

        return result;
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
                                {row[col]}
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