import AbstractControllerError from "../error/abstractControllerError.js";
import AbstractController from "../abstractController.js";

describe("AbstractController", () => {
  test("Should throw AbstractControllerError when AbstractController is instantiated", () => {
    let controllerInstance;

    try {
      controllerInstance = new AbstractController();
    } catch (error) {
      expect(error).toBeInstanceOf(AbstractControllerError);
    } finally {
      expect(controllerInstance).toBeUndefined();
    }
  });

  test("Should create a new instance which inherits from AbstractController", () => {
    const ConcreteController = class extends AbstractController {};
    const controllerInstance = new ConcreteController();

    expect(controllerInstance).toBeInstanceOf(AbstractController);
    expect(controllerInstance).toBeInstanceOf(ConcreteController);
  });
});
