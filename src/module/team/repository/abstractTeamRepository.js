/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import AbstractTeamRepositoryError from "./error/abstractTeamRepositoryError.js";

class AbstractTeamRepository {
  constructor() {
    if (new.target === AbstractTeamRepository) {
      throw new AbstractTeamRepositoryError(
        "Abstract team repository cannot be instantiated"
      );
    }
  }

  async getAll() {}
  async getById(id) {}
  async create(team) {}
  async update(team) {}
  async delete(id) {}
}

export default AbstractTeamRepository;
