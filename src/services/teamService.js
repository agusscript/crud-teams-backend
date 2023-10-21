const team = require("../database/team.js");

function getAllTeams() {
  const allTeams = team.getAllTeams();
  return allTeams;
}

function getOneTeam(id) {
  const selectedTeam = team.getOneTeam(id);
  return selectedTeam;
}

function createNewTeam(newTeam) {
  const createdTeam = team.createNewTeam(newTeam);
  return createdTeam;
}

function updateTeam() {
  return;
}

function deleteTeam() {
  return;
}

module.exports = {
  getAllTeams,
  getOneTeam,
  createNewTeam,
  updateTeam,
  deleteTeam,
};
