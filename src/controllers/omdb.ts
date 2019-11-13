import { IFilm } from "../models/film";
import { omdb } from "../models/omdb";
import filmController from '../controllers/film';

class OMDBController {
  /**
   * Add a film to the collection by IMDB ID
   * @param imdbId IMDB film ID
   * @return The added film
   */
  async addFilmFromOMDB(imdbId: string): Promise<IFilm> {
    const omdbFilmInfo = await omdb.get(imdbId);

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