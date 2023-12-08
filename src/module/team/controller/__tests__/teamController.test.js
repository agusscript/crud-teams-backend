import TeamIdNotDefinedError from "../error/teamIdNotDefinedError.js";
import TeamController from "../teamController.js";
import { jest } from "@jest/globals";

const serviceMock = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const controller = new TeamController(serviceMock);

describe("TeamController", () => {
  test("Call getAll method from service one time", async () => {
    const req = {
      session: {
        errors: [],
        messages: [],
      },
    };

    const res = {
      send: jest.fn(),
    };

    await controller.getAll(req, res);
    expect(serviceMock.getAll).toHaveBeenCalledTimes(1);
  });

  test("Call getById method without id parameter should throw specific error", () => {
    const req = {
      params: { id: undefined },
    };

    const res = {
      send: jest.fn(),
    };

    expect(async () => {
      await controller.getOne(req, res);
    }).rejects.toThrow(TeamIdNotDefinedError);
    expect(serviceMock.getById).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test("Call getById method from service one time", async () => {
    const req = {
      params: { id: 1 },
    };

    const res = {
      send: jest.fn(),
    };

    await controller.getOne(req, res);
    expect(serviceMock.getById).toHaveBeenCalledTimes(1);
  });

  test("Call create method from service one time to save a new team", async () => {
    const req = {
      body: { id: 1, name: "new team" },
      session: {
        errors: [],
        messages: [],
      },
    };

    const res = {
      send: jest.fn(),
      status: jest.fn(),
    };

    await controller.create(req, res);
    expect(serviceMock.create).toHaveBeenCalledTimes(1);
  });

  test("Call update method without id parameter should throw specific error", () => {
    const req = {
      body: { id: 1, name: "edit team" },
      params: { id: undefined },
      session: {
        errors: [],
        messages: [],
      },
    };

    const res = {
      send: jest.fn(),
      status: jest.fn(),
    };

    expect(async () => {
      await controller.update(req, res);
    }).rejects.toThrow(TeamIdNotDefinedError);
    expect(serviceMock.update).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test("Call update method from service one time to edit a team", async () => {
    const req = {
      body: { id: 1, name: "edit team" },
      params: { id: 1 },
      session: {
        errors: [],
        messages: [],
      },
    };

    const res = {
      send: jest.fn(),
      status: jest.fn(),
    };

    await controller.update(req, res);
    expect(serviceMock.update).toHaveBeenCalledTimes(1);
  });

  test("Call delete method without id parameter should throw specific error", () => {
    const req = {
      params: { id: undefined },
      session: {
        errors: [],
        messages: [],
      },
    };

    const res = {
      send: jest.fn(),
      status: jest.fn(),
    };

    expect(async () => {
      await controller.delete(req, res);
    }).rejects.toThrow(TeamIdNotDefinedError);
    expect(serviceMock.delete).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test("Call delete method to remove a team one time", async () => {
    const req = {
      params: { id: 1 },
      session: {
        errors: [],
        messages: [],
      },
    };

    const res = {
      send: jest.fn(),
      status: jest.fn(),
    };

    await controller.delete(req, res);
    expect(serviceMock.delete).toHaveBeenCalledTimes(1);
  });
});
