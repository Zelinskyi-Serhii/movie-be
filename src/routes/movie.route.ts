import express from "express";
import { movieController } from "../modules/movie/controller";

export const movieRoute = express.Router();

movieRoute.get("/", movieController.getAll);
movieRoute.get("/favorite", movieController.getFavorite);
movieRoute.get("/:id", movieController.getOneById);
movieRoute.post("/", movieController.createOne);
movieRoute.patch("/favorite/:id", movieController.toggleFavoriteStatus);
movieRoute.patch("/:id", movieController.updateOne);
movieRoute.delete("/:id", movieController.deleteById);
movieRoute.post("/initial", movieController.createInitialData);
