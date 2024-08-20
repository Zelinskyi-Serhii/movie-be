import { Request, Response } from "express";
import { movieService } from "./service";
import { isValidMovieData } from "./dto/createMovie.dto";
import MovieModel from "./entity";
import { moviesData } from "../../utils/initialData";

const getAll = async (req: Request, res: Response) => {
  try {
    const { search, page, limit } = req.query;

    const movies = await movieService.getAll({
      title: search?.toString(),
      page: page ? parseInt(page.toString(), 10) : 1,
      limit: limit ? parseInt(limit.toString(), 10) : 4,
    });

    res.json(movies);
  } catch (error) {
    res.status(500).send("Error fetching movies");
  }
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movie = await movieService.getOneById(id);

    res.json(movie);
  } catch (error) {
    res.status(500).send("Error fetching movie");
  }
};

const createOne = async (req: Request, res: Response) => {
  const isValidData = isValidMovieData(req.body);

  try {
    if (!isValidData) {
      return res.status(400).send("Data is not valid");
    }

    const newMovie = await movieService.createOne(req.body);

    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).send("Error creating movie");
  }
};

const updateOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const isValidData = isValidMovieData(req.body);

  try {
    if (!isValidData) {
      return res.status(400).send("Data is not valid");
    }

    const updatedMovie = await movieService.updateOne(id, req.body);

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).send("Error updating movie");
  }
};

const toggleFavoriteStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const favoriteMovie = await movieService.toggleFavoriteStatus(id);

    res.json(favoriteMovie);
  } catch (error) {
    res.status(500).send("Error marking movie as favorite");
  }
};

const getFavorite = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getFavorite();

    res.json(movies);
  } catch (error) {
    res.status(500).send("Error fetching movies");
  }
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedMovie = await movieService.deleteById(id);

    res.json(deletedMovie);
  } catch (error) {
    res.status(500).send("Error deleting movie");
  }
};

const createInitialData = async () => {
  try {
    const savedMovies = await MovieModel.insertMany(moviesData);
    console.log("Movies inserted:", savedMovies);
  } catch (error) {
    console.log("Error inserting movies:", error);
  }
};

export const movieController = {
  getAll,
  getOneById,
  createOne,
  updateOne,
  toggleFavoriteStatus,
  deleteById,
  createInitialData,
  getFavorite,
};
