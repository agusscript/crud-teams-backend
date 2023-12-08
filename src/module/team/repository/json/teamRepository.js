import AbstractTeamRepository from "../abstractTeamRepository.js";
import TeamNotFoundError from "../error/teamNotFoundError.js";
import TeamIdNotDefinedError from "../error/teamIdNotDefinedError.js";

class TeamRepository extends AbstractTeamRepository {
  constructor(uuid, fileSystem, dbFilePath) {
    super();
    this.uuid = uuid;
    this.fileSystem = fileSystem;
    this.dbFilePath = dbFilePath;
  }

  async getAll() {
    return this.getData();
  }

  async getById(id) {
    const teams = await this.getData();

    const team = teams.find((team) => team.id == id);

    if (!team) {
      throw new TeamNotFoundError(`The team with id ${id} has not been found`);
    }

    return team;
  }

  async create(team) {
    const teams = await this.getData();
    const createdAt = new Date().toISOString();
    const newTeam = { ...team, ...{ id: this.uuid }, ...{ lastUpdated: createdAt } };
    teams.push(newTeam);
    this.saveData(teams);
    return newTeam;
  }

  async update(id, changes) {
    const teams = await this.getData();
    const teamIndex = teams.findIndex((team) => team.id == id);
    const updatedAt = new Date().toISOString();

    const updatedTeam = {
      ...teams[teamIndex],
      ...changes,
      lastUpdated: updatedAt,
    };

    teams[teamIndex] = updatedTeam;
    this.saveData(teams);
    return updatedTeam;
  }

  async delete(id) {
    if (!id) {
      throw new TeamIdNotDefinedError("The team Id is not defined");
    }

    const teams = await this.getData();
    const teamIndex = teams.findIndex((prevTeam) => prevTeam.id == id);
    teams.splice(teamIndex, 1);

    this.saveData(teams);

    return true;
  }

  getData() {
    let parsedContent;
    
    try {
      const content = this.fileSystem.readFileSync(this.dbFilePath, { encoding: "utf-8" });
      parsedContent = JSON.parse(content);
    } catch (error) {
      parsedContent = [];
    }

    return parsedContent;
  }

  async saveData(content) {
    await this.fileSystem.writeFileSync(
      this.dbFilePath,
      JSON.stringify(content, null, 2)
    );
  }
}

export default TeamRepository;
