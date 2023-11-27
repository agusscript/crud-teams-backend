import { TeamController, TeamService, TeamRepository } from "../module/team/module.js";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import { DIContainer } from "rsdi";
import fs from "fs";

const JSONDB_PATH = "./data/teams.json";

function configureUuid() {
  return uuidv4;
}

function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sessionOptions = {
    secret: "secret-key",
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
    resave: false,
  };

  return session(sessionOptions);
}

function addCommonDefinitions(container) {
  container.add("fs", () => fs);
  container.add("uuid", configureUuid());
  container.add("JSONDatabase", () => JSONDB_PATH);
  container.add("Session", configureSession);
}

function addTeamModuleDefinitions(container) {
  container.add("teamController", ({ teamService }) => new TeamController(teamService));
  container.add("teamService", ({ teamRepository }) => new TeamService(teamRepository));
  container.add(
    "teamRepository",
    ({ uuid, fs, JSONDatabase }) => new TeamRepository(uuid, fs, JSONDatabase)
  );
}

function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addTeamModuleDefinitions(container);
  return container;
}

export default configureDI;
