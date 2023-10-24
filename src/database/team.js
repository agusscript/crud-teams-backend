const DB = require("./teams.json");
const { saveToDatabase } = require("./utils");

function getAllTeams() {
  return DB;
}

function getOneTeam(id) {
  const selectedTeam = DB.find((team) => team.id == id);

  if (!selectedTeam) {
    console.log("Team not found");
    return;
  }

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
  return newTeam;
}

function updateTeam(teamId, changes) {
  const selectedTeamId = DB.findIndex((team) => team.id == teamId);

  if (selectedTeamId === -1) {
    console.log("Team not found");
    return;
  }

  const updatedTeam = {
    ...DB[selectedTeamId],
    ...changes,
    lastUpdated: new Date().toISOString(),
  };

  DB[selectedTeamId] = updatedTeam;
  saveToDatabase(DB);
  return updatedTeam;
}

function deleteTeam(teamId) {
  const selectedTeamId = DB.findIndex((team) => team.id == teamId);

  if (selectedTeamId === -1) {
    console.log("Team not found");
    return;
  }

  DB.splice(selectedTeamId, 1);
  saveToDatabase(DB);
}

module.exports = { getAllTeams, getOneTeam, createNewTeam, updateTeam, deleteTeam };
