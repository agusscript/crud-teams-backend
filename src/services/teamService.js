const team = require("../database/team.js");

function getAllTeams() {
  const allTeams = team.getAllTeams();
  return allTeams;
}

function getOneTeam(id) {
  const selectedTeam = team.getOneTeam(id);
  return selectedTeam;
}

function createNewTeam(req, res) {
  return;
}

function updateTeam(req, res) {
  return;
}

function deleteTeam(req, res) {
  return;
}

module.exports = {
  getAllTeams,
  getOneTeam,
  createNewTeam,
  updateTeam,
  deleteTeam,
};
