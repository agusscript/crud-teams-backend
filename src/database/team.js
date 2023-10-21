const DB = require("./teams.json");
const { saveToDatabase } = require("./utils");

function getAllTeams() {
  return DB;
}

function getOneTeam(id) {
  const selectedTeam = DB.find((team) => team.id == id);
  return selectedTeam;
}

function createNewTeam(newTeam) {
  const isAlreadeAdded = DB.findIndex((team) => team.id == newTeam.id);

  if (isAlreadeAdded !== -1) {
    console.log("Team already exists");
    return;
  }

  DB.push(newTeam);
  saveToDatabase(DB);
}

module.exports = { getAllTeams, getOneTeam, createNewTeam };
