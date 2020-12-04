import {getRandomInteger} from "../util";

const generateDirector = () => {
  const directors = [
    `Dodo Abashidze`,
    `George Abbott`,
    `J. J. Abrams`,
    `Abiola Abrams`
  ];

  return directors[getRandomInteger(0, directors.length - 1)];
};

const generateScreenWriters = () => {
  const screenwriters = [
    `Chantal Akerman`,
    `Hideaki Anno`,
    `Arnold Antonin`,
    `Abiola Abrams`,
    `Alfonso Aráu`
  ];

  return screenwriters.splice(0, getRandomInteger(0, screenwriters.length - 1));
};

const generateActors = () => {
  const actors = [
    `Barkhad Abdi`,
    `F. Murray Abraham`,
    `Isabelle Adjani`,
    `Abiola Abrams`,
    `Alfonso Aráu`,
    `Mahershala Ali`,
    `Jane Alexander`
  ];

  return actors.splice(1, getRandomInteger(1, actors.length - 1));
};

const generateCountry = () => {
  const countries = [
    `Russia`,
    `USA`,
    `Canada`,
    `France`,
    `England`
  ];

  return countries[getRandomInteger(0, countries.length - 1)];
};

const generateAgeRating = () => {
  const ageRatings = [
    `18+`,
    `16+`,
    `12+`,
    `6+`,
    `0+`
  ];

  return ageRatings[getRandomInteger(0, ageRatings.length - 1)];
};

export const generatePopup = (film) => {
  const {
    name,
    rating,
    releaseYear,
    duration,
    genres,
    poster,
    description,
    comments,
    isNeedToWatch,
    isWatched,
    isFavorite} = film;

  return {
    poster,
    name,
    originalName: name, // пока так
    rating,
    director: generateDirector(),
    screenWriters: generateScreenWriters(),
    actors: generateActors(),
    release: releaseYear,
    duration,
    country: generateCountry(),
    genres,
    description,
    ageRating: generateAgeRating(),
    comments,
    isNeedToWatch,
    isWatched,
    isFavorite
  };
};
