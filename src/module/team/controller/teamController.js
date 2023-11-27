import fromDataToEntity from "../mapper/teamMapper.js";
import TeamIdNotDefinedError from "./error/teamIdNotDefinedError.js";
import AbstractController from "../../abstractController.js";

class TeamController extends AbstractController {
  constructor(teamService) {
    super();
    this.ROUTE_BASE = "/teams";
    this.teamService = teamService;
  }

  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(ROUTE, this.getAll.bind(this));
    app.get(`${ROUTE}/:id`, this.getOne.bind(this));
    app.post(ROUTE, this.create.bind(this));
    app.patch(`${ROUTE}/:id`, this.update.bind(this));
    app.delete(`${ROUTE}/:id`, this.delete.bind(this));
  }

  async getAll(req, res) {
    const teams = await this.teamService.getAll();
    const { errors, messages } = req.session;
    res.send({ status: "OK", data: teams, messages, errors });
    req.session.errors = [];
    req.session.messages = [];
  }

  async getOne(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new TeamIdNotDefinedError();
    }

    try {
      const team = await this.teamService.getById(id);
      res.send({ status: "OK", data: team });
    } catch (error) {
      req.session.errors = [error.message, error.stack];
      res.status(500).send({ status: "ERROR", data: error.message });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      const team = fromDataToEntity(body);
      const savedTeam = await this.teamService.create(team);

      req.session.messages = [`The team with id ${savedTeam.id} was created correctly`];
      res.send({ status: "OK", data: savedTeam });
    } catch (error) {
      req.session.errors = [error.message, error.stack];
      res.status(500).send({ status: "ERROR", data: error });
    }
  }

  async update(req, res) {
    try {
      const {
        body,
        params: { id },
      } = req;

      const savedTeam = await this.teamService.update(id, body);

      req.session.messages = [`The team with id ${id} was updated correctly`];
      res.send({ status: "OK", data: savedTeam });
    } catch (error) {
      req.session.errors = [error.message, error.stack];
      res.status(500).send({ status: "ERROR", data: error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const team = await this.teamService.getById(id);
      await this.teamService.delete(id);
      req.session.messages = [
        `The team ${team.name} with id ${id} was deleted correctly`,
      ];
      res.status(204).send({ status: "OK" });
    } catch (error) {
      req.session.errors = [error.message, error.stack];
      res.status(500).send({ status: "ERROR", data: error });
    }
  }
}

export default TeamController;
