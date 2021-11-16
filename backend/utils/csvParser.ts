import fs from 'fs/promises';
import gameService from '../services/gameService';
import { makeConnection } from './mySqlHelpers';
import log from '../services/logService';

import { Game } from '../types';

export const parseCsv = async (fileName: string, uploaderName = 'unknown') => {

    console.log(`Aloitetaan tiedoston ${fileName} parsiminen...`)
    const rawFile = await fs.readFile(`./upload/${fileName}`, 'utf8') as unknown as string;

    const [, ...rivit] = rawFile.split('\n');
    log('CsvParser', 'info', `Aloitetaan parsia käyttäjältä ${uploaderName} saatua csv-tiedostoa. Sislätö: ${rivit.length} riviä.`);
    let gameData: Game | undefined;
    let addedGames = 0;
    let totalGames = 0;
    const dbConnection = await makeConnection();
    dbConnection.query('BEGIN');
    for (const rivi of rivit) {
        const [player, course, layout, date, total, plusminus, ...scores] = rivi.split(',');

        // Rata vaihtuu -> uusi peli!
        if (player === 'Par' || player === '') {
            if (gameData) {
                // Lisätään peli tietokantaa. Jos !iidee, peli on jo tod. näk. tietokannassa
                const iidee = await gameService.addGame(gameData, dbConnection);
                if (!iidee) {
                    console.log(`Peliä ${gameData.course} @ ${gameData.date} ei lisätty!`);
                }
                else {
                    console.log(`Lisätty ${gameData.course}, id: ${iidee}`);
                    addedGames++;
                }
                totalGames++;
            }
            gameData = {
                course,
                layout,
                date: date as unknown as Date,
                par: +total,
                players: []
            }
        } else if (gameData) {
            gameData.players.push({
                name: player,
                total: +total,
                scores: scores.map(s => parseInt(s)).filter(s => !isNaN(s)),
            })
        }
    }
    await dbConnection.query('COMMIT');
    dbConnection.end();
    log('CsvParser', 'success', `Käyttäjän ${uploaderName} .csv tiedostosta löytyi ${totalGames} kierrosta joista ${addedGames} lisättiin tietokantaan`);
    console.log('Pelejä lisätty:', addedGames, '/', totalGames);

}

