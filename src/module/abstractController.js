import AbstractControllerError from "./error/abstractControllerError.js";

class AbstractController {
  constructor() {
    if (new.target === AbstractController) {
      throw new AbstractControllerError();
    }
  }
}

export default AbstractController;
