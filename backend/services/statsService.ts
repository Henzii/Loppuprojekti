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
const getCompetitions = async () => {
    const con = await makeConnection();
    const queryString = `
    #Hakee kilpailut tietokannasta
    SELECT game, game.date as 'paivays', course.name, course.layout, course.par, playerName, total, (
        ### Hakee 10 edellistä kierrosta kyseiseltä radalta ###
        select group_concat(tulos) from (
            select total as 'tulos' from scorecard s1
            inner join game on game = game.id
            where playerName = s2.playerName and s1.course = s2.course and game.date < paivays
            order by game.date desc
            limit 10
        ) tenLates
    ) as 'tenLatestRounds'
        ### --------- ###
    FROM scorecard s2
    INNER JOIN game ON s2.game = game.id
    INNER JOIN course on s2.course = course.id
    WHERE game IN (	
        ######## Listaa pelit joissa min 5 aliakset-taulusta löytyvää pelaajaa
        SELECT s.game from scorecard s
        INNER JOIN game on s.game = game.id
        WHERE playerName IN (
            SELECT alias from alias
        ) AND game.date > (SELECT ignoreMatchBefore FROM setup)
        GROUP BY game
        HAVING count(*) >= (SELECT minPlayersForMatch FROM setup)
        ######## --------- ##########
    ) AND playerName IN (SELECT alias from alias)
    `;
    const [result] = await con.query(queryString);
    return result;
}
export default { getSimpleCourseStats, getCompetitions };