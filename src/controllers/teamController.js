function getAllTeams(req, res) {
  res.send("<h1>Get all teams</h1>");
}

function getOneTeam(req, res) {
  res.send(`<h1>Get ${req.params.id} team</h1>`);
}

function createNewTeam(req, res) {
  res.send("<h1>Create a new team</h1>");
}

function updateTeam(req, res) {
  res.send(`<h1>Update ${req.params.id} team</h1>`);
}

function deleteTeam(req, res) {
  res.send(`<h1>Delete ${req.params.id} team</h1>`);
}

module.exports = {
  getAllTeams,
  getOneTeam,
  createNewTeam,
  updateTeam,
  deleteTeam,
};
