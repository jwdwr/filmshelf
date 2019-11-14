import { IFilm } from "../models/film";
import { omdb, IOMDBFilmInfo } from "../models/omdb";
import filmController from '../controllers/film';

class OMDBController {
  /**
   * Search for a film in the OMDB database
   * @param title film title to search for
   * @param year film year to search for
   * @param page page of results
   */
  async search(title: string, year: number, page: number = 1): Promise<{ films: IOMDBFilmInfo[]; total: number }> {
    const result = await omdb.search(title, year, page);

    let films: IOMDBFilmInfo[];
    let total: number;

    if (result.Response === "False") {
      films = [];
      total = 0;
    } else {
      films = result.Search;
      total = 0;
    }

    return { films, total };
  }

  async get(imdbID: string): Promise<IOMDBFilmInfo> {
    const result = await omdb.get(imdbID);

    if (result.Response === 'False') {
      return null;
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
  async addFilmFromOMDB(imdbId: string): Promise<IFilm> {
    const omdbFilmInfo = await this.get(imdbId);

    const filmInfo = {
      title: omdbFilmInfo.Title,
      year: Number(omdbFilmInfo.Year),
      length: this.getLengthFromRuntime(omdbFilmInfo.Runtime),
      omdbFilmInfo
    } as IFilm;

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