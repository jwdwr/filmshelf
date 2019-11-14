import rp from 'request-promise';
import config from 'config';
import { Document, Schema, model } from "mongoose";

// the film structure used by the OMDB API

export interface IOMDBFilmInfo extends Document {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Runtime?: string;
  Rated?: string;
  Released?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: {
    Source: string;
    Value: string;
  }[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  totalSeasons?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

export const OMDBFilmInfoSchema = new Schema({
  imdbID: String,
  Title: String,
  Year: String,
  Type: String,
  Poster: String,
  Runtime: String,
  Rated: String,
  Released: String,
  Genre: String,
  Director: String,
  Writer: String,
  Actors: String,
  Plot: String,
  Language: String,
  Country: String,
  Awards: String,
  Ratings: [new Schema({
    Source: String,
    Value: String,
  }, {_id: false})],
  Metascore: String,
  imdbRating: String,
  imdbVotes: String,
  totalSeasons: String,
  DVD: String,
  BoxOffice: String,
  Production: String,
  Website: String
}, {_id: false});

export const OMDBFilmInfo = model<IOMDBFilmInfo>("OMDBFilmInfo", OMDBFilmInfoSchema);

export interface IOMDBSearchResponse {
  Response: string;
  totalResults: string;
  Search: IOMDBFilmInfo[];
}

export interface IOMDBGetResponse extends IOMDBFilmInfo {
  Response: string;
}

class OMDBAPI {
  private apiUri = config.get('omdb.apiUri');
  private apiKey = config.get('omdb.apiKey');

  /**
   * Search the IMDB database through the OMDB interface
   * @param title film title to search for
   * @param year film year to search for
   * @param page page of results
   */
  async search(title: string, year: number, page: number = 1): Promise<IOMDBSearchResponse> {
    let searchUri = `${this.apiUri}?apikey=${this.apiKey}&s=${title}&page=${page}&type=movie`;
    if (year) {
      searchUri += `&y=${year}`;
    }

    return await rp.get({uri: searchUri, json: true});
  }

  /**
   * Get an IMDB film by ID
   * @param imdbID IMDB ID of the film you're getting
   */
  async get(imdbID: string): Promise<IOMDBGetResponse> {
    const getUri = `${this.apiUri}?apikey=${this.apiKey}&i=${imdbID}`;

    return await rp.get({ uri: getUri, json: true })
  }
}

export const omdb = new OMDBAPI();