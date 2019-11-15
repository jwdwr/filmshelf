import Joi from "@hapi/joi";
import ValidationError from "../../errors/validation-error";

class OMDBValidator {
  async validateSearch(search: {title: string, year: number, page: number}): Promise<void> {
    try {
      const searchSchema = Joi.object({
        title: Joi.string().required(),
        year: Joi.number().min(1800).max(2100).allow(null),
        page: Joi.number().min(1)
      });
      await searchSchema.validateAsync(search);
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }
  /**
   * Validate an IMDB ID
   * @param imdbID IMDB ID to validate
   */
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