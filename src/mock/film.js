import {getRandomInteger} from "../util";
import {generateComments} from "./film-comments";

const generateFilmName = () => {
  const filmNames = [
    `Форсаж`,
    `Шрек`,
    `Как приручить дракона`,
    `Угнать за 60 секунд`
  ];

  return filmNames[getRandomInteger(0, filmNames.length - 1)];
};

const generatePoster = () => {
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];

  return posters[getRandomInteger(0, posters.length - 1)];
};

const generateDescription = () => {
  const fullDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus. `;
  const result = [];

  const descriptionArray = fullDescription.split(`. `);
  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    result.push(descriptionArray[getRandomInteger(0, descriptionArray.length - 1)]);
  }

  return result.join(`. `);
};

const generateDuration = () => {
  return `${getRandomInteger(0, 24)}h ${getRandomInteger(0, 60)}m`;
};

const generateGenres = () => {
  const genres = [
    `Action`,
    `Comedy`,
    `Drama`,
    `Horror`,
    `War`,
    `Western`
  ];

  return genres.sort(() => Math.random() - 0.5).splice(1, getRandomInteger(1, genres.length - 1));
};

const generateReleaseDate = () => {
  return new Date(
      getRandomInteger(1900, 2020),
      getRandomInteger(1, 12),
      getRandomInteger(1, 31));
};

export const generateFilm = () => {
  return {
    name: generateFilmName(),
    poster: generatePoster(),
    description: generateDescription(),
    rating: getRandomInteger(1, 100),
    comments: new Array(getRandomInteger(0, 5)).fill().map(generateComments),
    releaseYear: generateReleaseDate(),
    genres: generateGenres(),
    duration: generateDuration(),
    isNeedToWatch: getRandomInteger(0, 1),
    isWatched: getRandomInteger(0, 1),
    isFavorite: getRandomInteger(0, 1)
  };
};
