const teamService = require("../services/teamService");
const { v4: uuid } = require("uuid");
const Team = require("../entities/team");
const Area = require("../entities/area");

function getAllTeams(req, res) {
  const allTeams = teamService.getAllTeams();
  res.send({ status: "OK", data: allTeams });
}

function getOneTeam(req, res) {
  const team = teamService.getOneTeam(req.params.id);
  res.send({ status: "OK", data: team });
}

function createNewTeam(req, res) {
  const { body } = req;
  const randomId = uuid();
  const area = new Area(2072, body.country);
  const crestUrl = req.file && "http://localhost:8080/uploads/img/" + req.file.filename;
  const lastUpdated = new Date().toISOString();

  const newTeam = new Team(
    randomId,
    area,
    body.name,
    body.shortName,
    body.tla,
    crestUrl,
    body.address,
    body.phone,
    body.website,
    body.email,
    body.founded,
    body.clubColors,
    body.venue,
    lastUpdated
  );

  const createdTeam = teamService.createNewTeam(newTeam);
  res.status(201).send({ status: "OK", data: createdTeam });
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
