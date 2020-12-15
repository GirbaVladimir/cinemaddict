import {getRandomInteger} from "../util/common";

const generateText = () => {
  const commentsText = [
    `great`,
    `amazing`,
    `super`,
    `bad`
  ];

  return commentsText[getRandomInteger(0, commentsText.length - 1)];
};

const generateEmoji = () => {
  const emoji = [
    `smile`,
    `sleeping`,
    `puke`,
    `angry`
  ];

  return emoji[getRandomInteger(0, emoji.length - 1)];
};

const generateAuthor = () => {
  const authors = [
    `Dodo Abashidze`,
    `George Abbott`,
    `J. J. Abrams`,
    `Abiola Abrams`
  ];

  return authors[getRandomInteger(0, authors .length - 1)];
};

const generateCommentDate = () => {
  const commentDate = new Date(
      getRandomInteger(1900, 2020),
      getRandomInteger(0, 12),
      getRandomInteger(1, 32));

  return `${commentDate.getFullYear()}/${commentDate.getMonth()}/${commentDate.getDate()} ${commentDate.getHours()}:${commentDate.getUTCMinutes()}`;
};

export const generateComments = () => {
  return {
    text: generateText(),
    emoji: generateEmoji(),
    author: generateAuthor(),
    date: generateCommentDate()
  };
};
