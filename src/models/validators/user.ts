import Joi = require("@hapi/joi");
import { IUser } from "../user";
import ValidationError from "../../errors/validation-error";

class UserValidator {
  async validateUser(user: {username: string, password: string}) {
    try {
      const userSchema = Joi.object({
        username: Joi.string().min(2).max(20),
        password: Joi.string().min(8)
      });

      await userSchema.validateAsync(user);
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }
}

export default new UserValidator();