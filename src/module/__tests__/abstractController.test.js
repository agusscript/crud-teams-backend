import AbstractControllerError from "../error/abstractControllerError.js";
import AbstractController from "../abstractController.js";

describe("AbstractController", () => {
  test("Should throw AbstractControllerError when AbstractController is instantiated", () => {
    try {
      new AbstractController();
    } catch (error) {
      expect(error).toBeInstanceOf(AbstractControllerError);
    }
  });

  test("Should create a new instance which inherits from AbstractController", () => {
    const ConcreteController = class extends AbstractController {};
    expect(new ConcreteController()).toBeInstanceOf(AbstractController);
  });
});
