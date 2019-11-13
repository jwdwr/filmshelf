import rp from 'request-promise';
import config from 'config';
import { IFilm } from '../models/film';

class OMDBController {
  apiUri = config.get('omdb.apiUri');
  apiKey = config.get('omdb.apiKey');

  /**
   * Search the IMDB database through the OMDB interface
   */
  search(query: {title: string, year?: number}, page: number = 1) {
    let searchUri = `${this.apiUri}?apikey=${this.apiKey}&s=${query.title}&page=${page}`;
    if (query.year) {
      searchUri += `&y=${query.year}`;
    }

    return rp.get({uri: searchUri, json: true})
      .then(result => {
        if (result.Response === 'False') {
          return [];
        } else {
          return result.Search.map((film: any) => ({title: film.Title, year: film.Year, imdbID: film.imdbID}))
        }
      });
  }

  /**
   * Get an IMDB film by ID
   * @param imdbID IMDB ID of the film you're getting
   */
  get(imdbID: string): Promise<any> {
    const getUri = `${this.apiUri}?apikey=${this.apiKey}&i=${imdbID}`;

    return rp.get({ uri: getUri, json: true })
      .then(result => {
        if (result.Response === 'False') {
          return null;
        } else {
          return {title: result.Title, year: result.year, length: result.length};
        }
      });
  }
}