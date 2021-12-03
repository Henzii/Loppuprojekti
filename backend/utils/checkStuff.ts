import { makeConnection } from "./mySqlHelpers";

export const checkStuff = async () => {
    let tuloste = '';
    const muuttujat = [
        'DB_HOST',
        'DB_USER',
        'DB_PASS',
        'TOKEN_KEY',
    ]
    tuloste = muuttujat.reduce((p, c) => {
        if (process.env[c] === undefined) return p += varia(c, ' = undefined!\n');
        return p;
    }, '')
    if (tuloste !== '') {

        console.log('\n🔥\x1b[41m\x1b[33mKaikkia ympäristömuuttujia ei ole määritelty!\x1b[0m🔥')
        console.log(`\n${tuloste}`);
    }
    else console.log('\nYmpäristömuuttujat\t\t✔️');

    try {
        const con = await makeConnection();
        console.log('Tietokantayhteys\t\t✔️')
        con.end();
    } catch (e: unknown) {
        console.log('\x1b[31mTietokantavirhe!\t\t😥');
        if ((e as { code: string}).code ) console.log(' – Virhe: ', (e as { code: string}).code)
    }

    console.log('\x1b[0m'); // Resetoi värin
}
const varia = (env: string, text: string): string => {
    return `\x1b[36m${env} \t\x1b[31m${text}`;
}