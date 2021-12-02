
export const checkEnvVars = () => {
    let tuloste = '';
    const muuttujat = [
        'DB_HOST',
        'DB_USER',
        'DB_PASS',
        'TOKEN_KEY',
    ]
    tuloste = muuttujat.reduce((p, c) => {
        if (!process.env[c]) return p += varia(c, ' = undefined!\n');
        return p;
    }, '')
    if (tuloste !== '') {

        console.log('\n🔥\x1b[41m\x1b[37mKaikkia ympäristömuuttujia ei ole määritelty!\x1b[0m🔥\n')
        console.log(`\n${tuloste}`);
        console.log(`😥`)
    }
    console.log('\x1b[0m'); // Resetoi värin
}
const varia = (env: string, text: string): string => {
    return `\x1b[36m${env} \t\x1b[31m${text}`;
}