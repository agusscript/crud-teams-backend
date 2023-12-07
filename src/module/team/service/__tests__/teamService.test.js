import TeamIdNotDefinedError from "../error/teamIdNotDefinedError.js";
import TeamNotDefinedException from "../error/teamNotDefinedError.js";
import TeamService from "../teamService.js";
import { jest } from "@jest/globals";

const repositoryMock = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const service = new TeamService(repositoryMock);

describe("TeamService", () => {
  test("Call getAll method from repository one time", () => {
    service.getAll();
    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
  });

  test("Call getById method without id parameter should throw specific error", () => {
    expect(async () => {
      await service.getById();
    }).rejects.toThrow(TeamIdNotDefinedError);
    expect(repositoryMock.getById).not.toHaveBeenCalled();
  });

  test("Call getById method from repository one time", () => {
    service.getById(1);
    expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
  });

  test("Call create method without team parameter should throw specific error", () => {
    expect(async () => {
      await service.create();
    }).rejects.toThrow(TeamNotDefinedException);
    expect(repositoryMock.create).not.toHaveBeenCalled();
  });

  test("Call create method from repository to save a new team one time", () => {
    service.create({ name: "new team" });
    expect(repositoryMock.create).toHaveBeenCalledTimes(1);
  });

  test("Call update method without id parameter should throw specific error", () => {
    expect(async () => {
      await service.update(undefined, { name: "new team" });
    }).rejects.toThrow(TeamIdNotDefinedError);
    expect(repositoryMock.update).not.toHaveBeenCalled();
  });

  test("Call update method without team parameter should throw specific error", () => {
    expect(async () => {
      await service.update(1);
    }).rejects.toThrow(TeamNotDefinedException);
    expect(repositoryMock.update).not.toHaveBeenCalled();
  });

  test("Call update method from repository to edit and save a team one time", () => {
    service.update(1, { name: "new team" });
    expect(repositoryMock.update).toHaveBeenCalledTimes(1);
  });

  test("Call delete method without id parameter should throw specific error", () => {
    expect(async () => {
      await service.delete();
    }).rejects.toThrow(TeamIdNotDefinedError);
    expect(repositoryMock.delete).not.toHaveBeenCalled();
  });

  test("Call delete method to remove a team one time", () => {
    service.delete(1);
    expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
  });
});
