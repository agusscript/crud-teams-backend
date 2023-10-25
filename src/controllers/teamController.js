const teamService = require("../services/teamService");
const { v4: uuid } = require("uuid");
const Team = require("../entities/team");
const Area = require("../entities/area");

function getAllTeams(req, res) {
  try {
    const allTeams = teamService.getAllTeams();
    res.send({ status: "OK", data: allTeams });
  } catch (error) {
    res.status(500).send({ status: "ERROR", data: error });
  }
}

function getOneTeam(req, res) {
  try {
    const {
      params: { id },
    } = req;

    if (!id) {
      res
        .status(400)
        .send({ status: "ERROR", data: { error: "The team id param is invalid" } });
    }

    const team = teamService.getOneTeam(id);
    res.send({ status: "OK", data: team });
  } catch (error) {
    res.status(500).send({ status: "ERROR", data: error });
  }
}

function createNewTeam(req, res) {
  try {
    const { body } = req;

    const randomId = uuid();
    const area = new Area(2072, body.country);
    const lastUpdated = new Date().toISOString();

    const newTeam = new Team(
      randomId,
      area,
      body.name,
      body.shortName,
      body.tla,
      body.crestUrl,
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
  } catch (error) {
    res.status(500).send({ status: "ERROR", data: error });
  }
}

function updateTeam(req, res) {
  try {
    const {
      body,
      params: { id },
    } = req;

    if (!id) {
      res
        .status(400)
        .send({ status: "ERROR", data: { error: "The team id param is invalid" } });
    }

    const updatedTeam = teamService.updateTeam(id, body);
    res.send({ status: "OK", data: updatedTeam });
  } catch (error) {
    res.status(500).send({ status: "ERROR", data: error });
  }
}

function deleteTeam(req, res) {
  try {
    const {
      params: { id },
    } = req;

    if (!id) {
      res
        .status(400)
        .send({ status: "ERROR", data: { error: "The team id param is invalid" } });
    }

    teamService.deleteTeam(id);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res.status(500).send({ status: "ERROR", data: error });
  }
}

module.exports = {
  getAllTeams,
  getOneTeam,
  createNewTeam,
  updateTeam,
  deleteTeam,
};
