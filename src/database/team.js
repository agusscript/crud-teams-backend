const DB = require("./teams.json");

function getAllTeams() {
  return DB;
}

function getOneTeam(id) {
  const selectedTeam = DB.find((team) => team.id == id);
  return selectedTeam;
}

module.exports = { getAllTeams, getOneTeam };
