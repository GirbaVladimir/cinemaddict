import {getRandomInteger} from "../util";

export const generateUserRank = () => {
  const rank = getRandomInteger(0, 30);
  if (rank > 0 && rank < 11) {
    return `novice`;
  } else if (rank > 10 && rank < 21) {
    return `fan`;
  } else if (rank > 20) {
    return `movie buff`;
  }

  return 0;
};
