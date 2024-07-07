import { TableCell, TableRow } from "semantic-ui-react";

function TabularRow({record}){

    const fields = parseFields(record);

    function parseFields(record){
        const result = [];

        for(let property in record){
            if(property.toLowerCase() === "id"){
                continue;
            }
            result.push(property);
        }

        return result;
    }

    return (
        <div>
             <TableRow>

            {
                fields.map(col => (
                    <TableCell collapsing={false} textAlign="center" verticalAlign="middle" width={2} key={"rec" + record["id"]}>{record[col]}</TableCell>
                ))
            }
                    

            </TableRow>

        </div>
    )
}

export default TabularRow;