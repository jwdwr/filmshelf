import pino from 'pino';
const logger = pino();
import Film, {IFilm} from '../models/film';

class FilmController {
  async addFilm(filmInfo: IFilm): Promise<IFilm> {
    try {
      const film = new Film(filmInfo);
      return await film.save();
    } catch (error) {
      this.onError(error);
    }
  }

  async getFilm(filmId: string): Promise<IFilm> {
    try {
      return await Film.findById(filmId);
    } catch (error) {
      this.onError(error);
    }
  }

  async editFilm(filmId: string, filmInfo: IFilm): Promise<IFilm> {
    try {
      return await Film.findOneAndUpdate({_id: filmId}, filmInfo, {new: true});
    } catch (error) {
      this.onError(error);
    }
  }

  async deleteFilm(filmId: string): Promise<boolean> {
    try {
      await Film.deleteOne({ _id: filmId });
      return true;
    } catch (error) {
      this.onError(error);
    }
  }

  async listFilms(): Promise<IFilm[]> {
    try {
      return await Film.find();
    } catch (error) {
      this.onError(error);
    }
  }

  onError(error: any) {
    logger.error(error);
    return error;
  }
}

export default new FilmController();