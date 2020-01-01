const stats = require(`./leaderboards/${process.argv[2]}/day-31.json`);

const TOTAL_STARS = Object.values(stats.members).reduce(
  (acc, m) => acc + m.stars,
  0
);
const ALL_STARS = Object.values(stats.members).filter(m => m.stars === 50)
  .length;
const TEN_STARS = Object.values(stats.members).filter(m => m.stars >= 10)
  .length;
const TWENTY_STARS = Object.values(stats.members).filter(m => m.stars >= 20)
  .length;

const RANKED = Object.values(stats.members)
  .sort((m1, m2) => {
    // DESCENDING ORDER
    if (m1.local_score > m2.local_score) {
      return -1;
    } else if (m1.local_score === m2.local_score) {
      return 0;
    } else if (m1.local_score < m2.local_score) {
      return 1;
    }
  })
  .map(m => `${m.local_score}\t${m.stars}\t${m.name}`);

console.log(`
 * ${RANKED.length} people joined my leaderboard!
 * ${TEN_STARS} people got at least ten stars!
 * ${TWENTY_STARS} people got at least twenty stars!
 * ${ALL_STARS} people got all fifty stars!
 * ${TOTAL_STARS} stars obtained collectively!
`);

for (let r of RANKED) {
  console.log(r);
}
