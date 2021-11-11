import mysql from 'mysql2/promise';
import { makeConnection } from "../utils/mySqlHelpers";

const getSimpleCourseStats = async (id: number) => {
    const con = await makeConnection();
    const queryString = `
        # Pelaajan kaikkien ratojen viimeisin, keskiarvo, min, max, 10 viim. kierrosta.
        SELECT 
            course as 'rataId',
            course.name as 'rata',
            course.layout,
            course.par,
            playerName as 'nimi',
            count(total) as 'games',
            min(total) as 'min',
            max(total) as 'max',
            avg(total) as 'avg',
            (
                SELECT group_concat(tulos) from (
                    SELECT total as 'tulos' from scorecard s1
                    inner join game on game = game.id
                    where playerName = nimi and s1.course = rataId
                    order by game.date desc
                    limit 10
                ) tenLates
            ) as 'tenLatestRounds'
        FROM scorecard
        INNER JOIN course on course = course.id
        WHERE playerName IN (
            SELECT alias from alias
            WHERE user = ?
        )
        GROUP BY course, playerName
    `;
    const [result] = await con.query(queryString, [id]);
    return result;
}

export default { getSimpleCourseStats };