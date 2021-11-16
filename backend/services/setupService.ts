import { RowDataPacket } from "mysql2";
import { makeConnection } from "../utils/mySqlHelpers"
import { SetupArgs } from "../graphql/mutations";

const getSetup = async () => {
    const con = await makeConnection();
    const [result] = await con.query('SELECT * from setup') as RowDataPacket[];
    console.log(result[0]);
    con.end();
    return result[0];
}
const writeSetup = async ( variables: SetupArgs ) => {
    const con = await makeConnection();
    const query = `UPDATE setup SET${Object.keys(variables).map(k => ` ${k} = ?`)}`;
    const [res] = await con.query(query, Object.values(variables)) as RowDataPacket[];
    con.end();
    return res[0];
}

export default { getSetup, writeSetup }