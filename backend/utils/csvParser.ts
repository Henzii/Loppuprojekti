import fs from 'fs/promises';
import gameService, { Game } from '../services/gameService';
import { makeConnection } from './mySqlHelpers';

export const parseCsv = async (fileName: string) => {

    const rawFile = await fs.readFile(fileName, 'utf-8') as unknown as string;

    const [, ...rivit] = rawFile.split('\n');
    
    let gameData: Game | undefined;
    let addedGames = 0;
    const dbConnection = await makeConnection();
    dbConnection.query('BEGIN');
    for (const rivi of rivit) {
        const [player, course, layout, date, total, plusminus, ...scores] = rivi.split(',');
        
        // Rata vaihtuu -> uusi peli!
        if (player === 'Par') {
            if (gameData) {
                const iidee = await gameService.addGame(gameData, dbConnection);
                if (!iidee) {
                    console.log(`Peliä ${gameData.course} @ ${gameData.date} ei lisätty!`);
                }
                else { 
                    console.log(`Lisätty ${gameData.course}, id: ${iidee}`);
                    addedGames++;
                }
            }
            gameData = {
                course,
                layout,
                date: date as unknown as Date,
                par: +total,
                players: []
            }
        } else if (gameData) {
            gameData.players.push( {
                name: player,
                total: +total,
                scores: scores.map(s => parseInt(s)).filter(s => !isNaN(s)),
            })
        }
    }
    await dbConnection.query('COMMIT');
    dbConnection.end();
    console.log('\nPelejä lisätty: ', addedGames);
}

