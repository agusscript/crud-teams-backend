import TeamNotDefinedError from "./error/teamNotDefinedError.js";
import TeamIdNotDefinedError from "./error/teamIdNotDefinedError.js";
import Team from "../entity/team.js";

class Service {
  constructor(teamRepository) {
    this.teamRepository = teamRepository;
  }

  async getAll() {
    return this.teamRepository.getAll();
  }

  async getById(id) {
    if (id === undefined) {
      throw new TeamIdNotDefinedError();
    }

    return this.teamRepository.getById(id);
  }

  async save(team) {
    if (team === undefined) {
      throw new TeamNotDefinedError();
    }

    return this.teamRepository.save(team);
  }

  async delete(team) {
    if (!(team instanceof Team)) {
      throw new TeamNotDefinedError();
    }

    return this.teamRepository.delete(team);
  }
}

export default Service;
