import { IMovieModel } from "../entity";

export const isValidMovieData = (data: IMovieModel) => {
  const {
    title,
    image,
    rating,
    releaseDate,
    description,
    actors,
    director,
    genre,
  } = data;

  const trimmedTitle = title?.trim();
  const trimmedImage = image?.trim();
  const trimmedDescription = description?.trim();
  const trimmedDirector = director?.trim();
  const trimmedGenre = genre?.trim();
  const trimmedActors = actors.map(actor => actor.trim());

  if (
    !trimmedTitle ||
    !trimmedImage ||
    !rating ||
    !releaseDate ||
    !trimmedDescription ||
    !trimmedActors.length ||
    !trimmedDirector ||
    !trimmedGenre
  ) {
    return false;
  }

  return true;
};
