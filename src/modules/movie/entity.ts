import mongoose, { Schema, Document } from "mongoose";

export interface IMovieModel extends Document {
  title: string;
  image: string;
  rating: number;
  releaseDate: Date;
  description: string;
  actors: string[];
  director: string;
  genre: string;
  isFavorite: boolean;
}

const MovieSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  releaseDate: {
    type: Date,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  actors: {
    type: [String],
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  genre: {
    type: String,
    required: true,
  },

  isFavorite: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true});

const MovieModel = mongoose.model<IMovieModel>("Movie", MovieSchema);

export default MovieModel;
