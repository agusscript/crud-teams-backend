import AbstractTeamRepository from "../abstractTeamRepository.js";
import TeamNotFoundError from "../error/teamNotFoundError.js";
import TeamIdNotDefinedError from "../error/teamIdNotDefinedError.js";
import Team from "../../entity/team.js";

class TeamRepository extends AbstractTeamRepository {
  constructor(uuid, fileSystem, dbFilePath) {
    super();
    this.uuid = uuid;
    this.fileSystem = fileSystem;
    this.dbFilePath = dbFilePath;
  }

  async getAll() {
    return this.getData().map((teamData) => new Team(teamData));
  }

  async getById(id) {
    const teams = await this.getData();

    const team = teams.find((team) => team.id == id);

    if (!team) {
      throw new TeamNotFoundError(`The team with id ${id} has not been found`);
    }

    return new Team(team);
  }

  async save(team) {
    const teams = await this.getData();
    let teamToSave;

    if (team.id) {
      const teamIndex = teams.findIndex((prevTeam) => prevTeam.id == team.id);

      if (teamIndex === -1) {
        throw new TeamNotFoundError(`The team with id ${team.id} could not be updated`);
      }

      teams[teamIndex] = team;
      teamToSave = team;
    } else {
      teamToSave = { ...team, ...{ id: this.uuid() } };
    }

    this.saveData(teams);
    return new Team(teamToSave);
  }

  async delete(team) {
    if (!team || team.id) {
      throw new TeamIdNotDefinedError("The team Id is not defined");
    }

    const teams = await this.getData();
    const teamIndex = teams.findIndex((prevTeam) => prevTeam.id == team.id);
    teams.splice(teamIndex, 1);

    this.saveData(teams);

    return true;
  }

  getData() {
    const content = this.fileSystem.readFileSync(this.dbFilePath, { encoding: "utf-8" });
    let parsedContent;

    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      parsedContent = [];
    }

    return parsedContent;
  }

  saveData(content) {
    this.fileSystem.writeFileSync(this.dbFilePath, JSON.stringify(content));
  }
}

export default TeamRepository;
