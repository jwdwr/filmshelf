import { IFilm } from "../models/film";
import filmController from "../controllers/film";
import { omdb, IOMDBFilmInfo } from "../models/omdb";
import omdbValidator from "../models/validators/omdb";
import pino from "pino";
import NotFoundError from "../errors/not-found-error";
const logger = pino();

class OMDBController {
  /**
   * Search for a film in the OMDB database
   * @param title film title to search for
   * @param year film year to search for
   * @param page page of results
   */
  async search(title: string, year: number, page: number = 1): Promise<{ films: IOMDBFilmInfo[]; total: number }> {
    logger.info({page});
    await omdbValidator.validateSearch({title, year, page});

    const result = await omdb.search(title, year, page);

    let films: IOMDBFilmInfo[];
    let total: number;

    if (result.Response === "False") {
      films = [];
      total = 0;
    } else {
      films = result.Search;
      total = Number(result.totalResults);
    }

    return { films, total };
  }

  async get(imdbID: string): Promise<IOMDBFilmInfo> {
    await omdbValidator.validateImdbID(imdbID);

    const result = await omdb.get(imdbID);

    if (result.Response === 'False') {
      throw new NotFoundError('Could not find film in OMDB');
    } else {
      delete result.Response;
      return result;
    }
  }

  /**
   * Add a film to the collection by IMDB ID
   * @param imdbId IMDB film ID
   * @return The added film
   */
  async addFilmFromOMDB(imdbID: string): Promise<IFilm> {
    await omdbValidator.validateImdbID(imdbID);

    const omdbFilmInfo = await this.get(imdbID);

    const filmInfo = {
      title: omdbFilmInfo.Title,
      year: Number(omdbFilmInfo.Year),
      omdbFilmInfo
    } as IFilm;

    const length = this.getLengthFromRuntime(omdbFilmInfo.Runtime);
    if (length) {
      filmInfo.length = length;
    }

    return filmController.addFilm(filmInfo);
  }

  /**
   * Transform OMDB runtime string into a number
   * @param runtime runtime string from OMDB
   * @return numeric runtime in minutes, or null
   */
  private getLengthFromRuntime(runtime: string) {
    const matches = runtime.match(/^(\d+)( min)?$/);
    if (matches) {
      return Number(matches[1]);
    } else {
      return null;
    }
  }
}

export default new OMDBController();