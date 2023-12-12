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
    res.send({ status: "OK", data: teams });
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
      res.status(500);
      res.send({ status: "ERROR", data: error });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      const team = fromDataToEntity(body);
      const savedTeam = await this.teamService.create(team);
      res.send({ status: "OK", data: savedTeam });
    } catch (error) {
      res.status(500);
      res.send({ status: "ERROR", data: error });
    }
  }

  async update(req, res) {
    const {
      body,
      params: { id },
    } = req;

    if (!id) {
      throw new TeamIdNotDefinedError();
    }

    try {
      const savedTeam = await this.teamService.update(id, body);
      res.send({ status: "OK", data: savedTeam });
    } catch (error) {
      res.status(500);
      res.send({ status: "ERROR", data: error });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new TeamIdNotDefinedError();
    }

    try {
      await this.teamService.getById(id);
      await this.teamService.delete(id);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res.status(500);
      res.send({ status: "ERROR", data: error });
    }
  }
}

export default TeamController;
