const express = require("express");
const router = express.Router();

router.get("/teams", (req, res) => {
  res.send("<h1>Get all teams</h1>");
});

router.get("/teams/:id", (req, res) => {
  res.send("<h1>Get a team</h1>");
});

router.post("/teams/:id", (req, res) => {
  res.send("<h1>Create a new team</h1>");
});

router.patch("/teams/:id", (req, res) => {
  res.send("<h1>Update a team</h1>");
});

router.delete("/teams/:id", (req, res) => {
  res.send("<h1>Delete a team</h1>");
});

module.exports = router;
