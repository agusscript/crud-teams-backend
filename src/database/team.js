const DB = require("./teams.json");
const { saveToDatabase } = require("./utils");

function getAllTeams() {
  return DB;
}

function getOneTeam(id) {
  const selectedTeam = DB.find((team) => team.id == id);

  if (!selectedTeam) {
    throw {
      status: 404,
      message: "Team not found",
    };
  }

  return selectedTeam;
}

function createNewTeam(newTeam) {
  try {
    const isAlreadeAdded = DB.findIndex((team) => team.id == newTeam.id);

    if (isAlreadeAdded !== -1) {
      throw {
        status: 400,
        message: `The team with id: ${newTeam.id} already exists`,
      };
    }

    DB.push(newTeam);
    saveToDatabase(DB);
    return newTeam;
  } catch (error) {
    throw {
      status: 500,
      message: error,
    };
  }
}

function updateTeam(teamId, changes) {
  try {
    const selectedTeamId = DB.findIndex((team) => team.id == teamId);

    if (selectedTeamId === -1) {
      throw {
        status: 404,
        message: "Team not found",
      };
    }

    const updatedTeam = {
      ...DB[selectedTeamId],
      ...changes,
      lastUpdated: new Date().toISOString(),
    };

    DB[selectedTeamId] = updatedTeam;
    saveToDatabase(DB);
    return updatedTeam;
  } catch (error) {
    throw {
      status: 500,
      message: error,
    };
  }
}

function deleteTeam(teamId) {
  try {
    const selectedTeamId = DB.findIndex((team) => team.id == teamId);

    if (selectedTeamId === -1) {
      throw {
        status: 404,
        message: "Team not found",
      };
    }

    DB.splice(selectedTeamId, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: 500,
      message: error,
    };
  }
}

module.exports = { getAllTeams, getOneTeam, createNewTeam, updateTeam, deleteTeam };
