const teamService = require("../services/teamService");
const { v4: uuid } = require("uuid");
const Team = require("../entities/team");
const Area = require("../entities/area");

function getAllTeams(req, res) {
  const allTeams = teamService.getAllTeams();
  res.send({ status: "OK", data: allTeams });
}

function getOneTeam(req, res) {
  const {
    params: { id },
  } = req;

  if (!id) {
    console.log("Team id is required");
    return;
  }

  const team = teamService.getOneTeam(id);
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
  const {
    body,
    params: { id },
  } = req;

  if (!id) {
    console.log("Team id is required");
    return;
  }

  const updatedTeam = teamService.updateTeam(id, body);
  res.send({ status: "OK", data: updatedTeam });
}

function deleteTeam(req, res) {
  const {
    params: { id },
  } = req;

  if (!id) {
    console.log("Team id is required");
    return;
  }

  teamService.deleteTeam(id);
  res.status(204).send({ status: "OK" });
}

module.exports = {
  getAllTeams,
  getOneTeam,
  createNewTeam,
  updateTeam,
  deleteTeam,
};
