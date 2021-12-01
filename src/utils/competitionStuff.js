export default function calculateRanks(comp) {
  const { players } = comp;
  players.sort((a, b) => a.hcTotal - b.hcTotal);
  let prevRank = 1;
  const ret = players.map((c, i) => {
    if (i === 0) return { ...c, rank: 1, points: 5 };
    if (c.hcTotal > players[i - 1].hcTotal) prevRank += 1;
    return {
      ...c,
      rank: prevRank,
      points: (prevRank <= 5) ? (6 - prevRank) : 0,
    };
  });
  return { ...comp, players: ret };
}
