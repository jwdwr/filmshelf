import mongoose from "mongoose";

// film interface
export interface IFilm extends mongoose.Document {
  title: string;
  format: string;
  length: number;
  year: number;
  rating: number;
};

// mongoose schema for film
export const FilmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 500
  },
  format: {
    type: String,
    required: true,
    enum: ["VHS", "DVD", "Streaming"]
  },
  length: {
    type: Number,
    required: true,
    min: 0,
    max: 500
  },
  year: {
    type: Number,
    required: true,
    min: 1800,
    max: 2100
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

const Film = mongoose.model<IFilm>("Film", FilmSchema);
export default Film;