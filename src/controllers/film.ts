import { Film, IFilm } from '../models/film';

class FilmController {
  /**
   * Add a film to the collection
   * @param filmInfo - Info about the film to add
   * @return The saved film
   */
  async addFilm(filmInfo: IFilm): Promise<IFilm> {
    const film = new Film(filmInfo);
    return await film.save();
  }

  /**
   * Get info about a particular film in the collection
   * @param filmId The ID of the film to retrieve
   * @return Info about that film
   */
  async getFilm(filmId: string): Promise<IFilm> {
    return await Film.findById(filmId);
  }

  /**
   * Edit some film in the collection
   * @param filmId ID of the film to edit
   * @param filmInfo The fields you want to edit, with their new values
   * @return The film info after applying the edits
   */
  async editFilm(filmId: string, filmInfo: IFilm): Promise<IFilm> {
    return await Film.findOneAndUpdate({_id: filmId}, filmInfo, {new: true});
  }

  /**
   * Delete a film from the collection
   * @param filmId ID of the film to delete
   * @return Success
   */
  async deleteFilm(filmId: string): Promise<boolean> {
    await Film.deleteOne({ _id: filmId });
    return true;
  }

  /**
   * Get a list of all the films in the collection
   * @return All the films
   */
  async listFilms(): Promise<IFilm[]> {
    return await Film.find();
  }
}

export default new FilmController();