import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_COMPETITIONS } from '../graphql/queries';

const groupCompetitionsData = (data) => data.reduce((p, c) => {
  let obj = p.find((x) => x.gameId === c.game);
  if (!obj) {
    obj = {
      gameId: c.game,
      date: new Date(+c.paivays).toLocaleString(),
      course: {
        name: c.name,
        layout: c.layout,
        par: c.par,
      },
      players: [],
    };
    p.push(obj);
  }
  obj.players.push({
    name: c.playerName,
    total: c.total,
    plusminus: c.total - c.par,
    hc: c.hc,
    hcTotal: c.total - c.hc,
    hcPlusminus: c.total - c.hc - c.par,
  });
  return p;
}, []);

const useGetCompetitions = () => {
  const compQuery = useQuery(GET_COMPETITIONS);
  const [competitions, setCompetitions] = useState(null);
  useEffect(() => {
    if (compQuery && !compQuery.loading) {
      setCompetitions(groupCompetitionsData(compQuery.data.getCompetitions));
    }
  }, [compQuery]);
  return competitions;
};
export default useGetCompetitions;
