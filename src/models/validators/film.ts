import Joi from "@hapi/joi";
import { IFilm } from '../film';
import ValidationError from "../../errors/validation-error";


class FilmValidator {
  /**
   * Validate film info before sending to DB
   * @param filmInfo the film info to validate
   * @param edit true if editing a film, false if adding
   */
  async validateFilmInfo(filmInfo: IFilm, edit: boolean = false): Promise<void> {
    try {
      const filmInfoObject = {
        title: Joi.string().min(1).max(500),
        year: Joi.number().min(1800).max(2100),
        length: Joi.number().min(0).max(500),
        format: Joi.string().pattern(/VHS|DVD|Streaming/),
        rating: Joi.number().min(1).max(5),
        omdbFilmInfo: Joi.any()
      };

      if (!edit) {
        // new entries require title/year
        filmInfoObject.title = filmInfoObject.title.required();
        filmInfoObject.year = filmInfoObject.year.required();
      } else {
        // users can't edit OMDB film info
        delete filmInfoObject.omdbFilmInfo;
      }

      const filmInfoSchema = Joi.object(filmInfoObject);
      await filmInfoSchema.validateAsync(filmInfo);
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }

  /**
   * Validate a film ID
   * @param filmId Film ID to validate
   */
  async validateFilmId(filmId: string): Promise<void> {
    try {
      const filmIdSchema = Joi.string().pattern(/^[a-fA-F0-9]{24}$/);
      await filmIdSchema.validateAsync(filmId);
    } catch (error) {
      throw new ValidationError("Invalid Film ID");
    }
  }

  async validateFilmSort(filmSort: {sortBy: string, sortDir: string}): Promise<void> {
    try {
      const sortSchema = Joi.object({
        sortBy: Joi.string().pattern(/^(title|year|length|format|rating)$/),
        sortDir: Joi.string().pattern(/^(asc|desc)$/)
      });

      await sortSchema.validateAsync(filmSort);
    } catch (error) {
      throw new ValidationError(error.message);
    }
  }
}

export default new FilmValidator();
