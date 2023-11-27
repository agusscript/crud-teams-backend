import TeamNotDefinedError from "./error/teamNotDefinedError.js";
import TeamIdNotDefinedError from "./error/teamIdNotDefinedError.js";

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

  async create(team){
    if (team === undefined) {
      throw new TeamNotDefinedError();
    }

    return this.teamRepository.create(team);
  }

  async update(id, changes) {
    if (changes === undefined) {
      throw new TeamNotDefinedError();
    }

    return this.teamRepository.update(id, changes);
  }

  async delete(id) {
    if (id === undefined) {
      throw new TeamIdNotDefinedError();
    }

    return this.teamRepository.delete(id);
  }
}

export default Service;
