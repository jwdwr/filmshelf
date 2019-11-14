import { Document, Schema, model } from "mongoose";
import { IOMDBFilmInfo, OMDBFilmInfoSchema } from "./omdb";

// film interface
export interface IFilm extends Document {
  title: string;
  year: number;
  length?: number;
  rating?: number;
  format?: string;
  omdbFilmInfo?: IOMDBFilmInfo;
};

// mongoose schema for film
export const FilmSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 500
  },
  year: {
    type: Number,
    required: true,
    min: 1800,
    max: 2100
  },
  length: {
    type: Number,
    min: 0,
    max: 500
  },
  format: {
    type: String,
    enum: ["VHS", "DVD", "Streaming"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  omdbFilmInfo: OMDBFilmInfoSchema
});

export const Film = model<IFilm>("Film", FilmSchema);