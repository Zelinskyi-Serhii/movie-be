import MovieModel, { IMovieModel } from "./entity";
import { MovieQueryParams } from "./types";

const getAll = async ({ title, page = 1, limit = 4 }: MovieQueryParams) => {
  try {
    const query: Record<string, unknown> = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const movies = await MovieModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await MovieModel.countDocuments(query);

    return {
      movies,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    throw new Error("Error fetching movies");
  }
};

const getOneById = async (id: string) => {
  try {
    const movie = await MovieModel.findById(id);

    if (!movie) {
      throw new Error("Movie not found");
    }

    return movie;
  } catch (error) {
    throw new Error("Error fetching movie");
  }
};

const createOne = async (movie: IMovieModel) => {
  try {
    const newMovie = new MovieModel(movie);
    const savedMovie = await newMovie.save();

    return savedMovie;
  } catch (error) {
    throw new Error("Error creating movie");
  }
};

const updateOne = async (id: string, movie: IMovieModel) => {
  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(id, movie);

    return updatedMovie;
  } catch (error) {
    throw new Error("Error updating movie");
  }
};

const toggleFavoriteStatus = async (id: string) => {
  try {
    const movie = await MovieModel.findById(id);

    if (!movie) {
      throw new Error("Movie not found");
    }

    movie.isFavorite = !movie.isFavorite;
    await movie.save();

    return movie;
  } catch (error) {
    throw new Error("Error toggling favorite status");
  }
};

const getFavorite = async () => {
  try {
    const favoriteMovies = await MovieModel.find({ isFavorite: true });

    return favoriteMovies;
  } catch (error) {
    throw new Error("Error fetching favorite movies");
  }
};

const deleteById = async (id: string) => {
  try {
    const deletedMovie = await MovieModel.findByIdAndDelete(id);
    return deletedMovie;
  } catch (error) {
    throw new Error("Error deleting movie");
  }
};

export const movieService = {
  getAll,
  getOneById,
  createOne,
  deleteById,
  updateOne,
  toggleFavoriteStatus,
  getFavorite,
};
