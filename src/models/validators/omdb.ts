import Joi from "@hapi/joi";
import ValidationError from "../../errors/validation-error";

class OMDBValidator {
  async validateImdbID(imdbID: string): Promise<void> {
    try {
      const imdbIdSchema = Joi.string().pattern(/^tt\d{7,8}$/);
      await imdbIdSchema.validateAsync(imdbID);
    } catch (error) {
      throw new ValidationError("Invalid IMDB ID");
    }
  }
}

export default new OMDBValidator();