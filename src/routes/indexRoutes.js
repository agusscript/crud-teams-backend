const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/teams", teamController.getAllTeams);

router.get("/teams/:id", teamController.getOneTeam);

router.post("/teams", teamController.createNewTeam);

router.patch("/teams/:id", teamController.updateTeam);

router.delete("/teams/:id", teamController.deleteTeam);

module.exports = router;
