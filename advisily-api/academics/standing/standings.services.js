const { query } = require("../../helpers/mysql");

module.exports = { getStandings };

async function getStandings() {
  const sql = "SELECT * from standings";

  const [standings, err] = await query(sql);
  if (err) throw "Error getting standings";

  return standings;
}
