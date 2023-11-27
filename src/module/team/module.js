import TeamController from "./controller/teamController.js";
import TeamRepository from "./repository/json/teamRepository.js";
import TeamService from "./service/teamService.js";

function init(app, container) {
  const controller = container.get("teamController");
  controller.configureRoutes(app);
}

export { init, TeamController, TeamRepository, TeamService };
