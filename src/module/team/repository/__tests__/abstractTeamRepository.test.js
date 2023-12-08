import AbstractTeamRepository from "../abstractTeamRepository.js";
import AbstractTeamRepositoryError from "../error/abstractTeamRepositoryError.js";

describe("AbstractTeamRepository", () => {
  test("Should throw AbstractTeamRepositoryError when AbstractTeamRepository is instantiated", () => {
    let repositoryInstance;

    try {
      repositoryInstance = new AbstractTeamRepository();
    } catch (error) {
      expect(error).toBeInstanceOf(AbstractTeamRepositoryError);
    } finally {
      expect(repositoryInstance).toBeUndefined();
    }
  });

  test("Should create a new instance which inherits from AbstractTeamRepository", () => {
    const ConcreteRepository = class extends AbstractTeamRepository {};
    const repositoryInstance = new ConcreteRepository();

    expect(repositoryInstance).toBeInstanceOf(AbstractTeamRepository);
    expect(repositoryInstance).toBeInstanceOf(ConcreteRepository);
  });
});
