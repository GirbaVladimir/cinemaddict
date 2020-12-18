export const sortFilmByRating = (filmA, filmB) => {
  if (filmA.rating > filmB.rating) {
    return -1;
  }
  if (filmB.rating > filmA.rating) {
    return 1;
  }

  return 0;
};

export const sortFilmByReleaseYear = (filmA, filmB) => {
  if (filmA.releaseYear.getFullYear() > filmB.releaseYear.getFullYear()) {
    return -1;
  }
  if (filmB.releaseYear.getFullYear() > filmA.releaseYear.getFullYear()) {
    return 1;
  }

  return 0;
};

