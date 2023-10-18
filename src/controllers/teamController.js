const teamService = require("../services/teamService");

function getAllTeams(req, res) {
  const allTeams = teamService.getAllTeams();
  res.send({status: "OK", data: allTeams});
}

function getOneTeam(req, res) {
  const team = teamService.getOneTeam(req.params.id);
  res.send({status: "OK", data: team});
}

function createNewTeam(req, res) {
  const newTeam = teamService.createNewTeam(req.body);
  res.send("<h1>Create a new team</h1>");
}

function updateTeam(req, res) {
  const updatedTeam = teamService.updateTeam(req.body);
  res.send(`<h1>Update ${req.params.id} team</h1>`);
}

function deleteTeam(req, res) {
  teamService.deleteTeam(req.params.id);
  res.send(`<h1>Delete ${req.params.id} team</h1>`);
}

module.exports = {
  getAllTeams,
  getOneTeam,
  createNewTeam,
  updateTeam,
  deleteTeam,
};
