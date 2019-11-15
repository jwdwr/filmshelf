import Joi = require("@hapi/joi");
import ValidationError from "../../errors/validation-error";

class UserValidator {
  /**
   * Validate an app user
   * @param user user info to validate
   * @param signup is this for a signup or just a login
   */
  async validateUser(user: {username: string, password: string}, signup = false) {
    try {
      const userObject = {
        username: Joi.string().required(),
        password: Joi.string().required()
      };

      if (signup) {
        userObject.username = userObject.username.min(2).max(20);
        userObject.password = userObject.password.min(8);
      }

      const userSchema = Joi.object(userObject);

      await userSchema.validateAsync(user);
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }
}

export default new UserValidator();