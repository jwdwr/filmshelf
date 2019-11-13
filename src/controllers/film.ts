import pino from 'pino';
const logger = pino();
import Film, {IFilm} from '../models/film';

class FilmController {
  addFilm(filmInfo: IFilm) {
    const film = new Film(filmInfo);
    return film.save()
    .then(savedFilm => savedFilm, error => {
      logger.error(error);
      return error;
    })
  }
}

export default new FilmController();