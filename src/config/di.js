import { TeamController, TeamService, TeamRepository } from "../module/team/module.js";
import { v4 as uuidv4 } from "uuid";
import { DIContainer } from "rsdi";
import fs from "fs";

const JSONDB_PATH = "./data/teams.json";

function configureUuid() {
  return uuidv4;
}

function addCommonDefinitions(container) {
  container.add("fs", () => fs);
  container.add("uuid", configureUuid());
  container.add("JSONDatabase", () => JSONDB_PATH);
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
