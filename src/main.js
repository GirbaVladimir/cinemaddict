import {createUserRank} from "./view/user-rank";
import {createMainMenu} from "./view/main-menu";
import {createShowMoreButton} from "./view/show-more";
import {createExtraSections} from "./view/extra";
import {createFilmsSection} from "./view/films";
import {createFilmCard} from "./view/film-card";
import {createFooterStat} from "./view/footer-stat";
import {createFilmCardPopup} from "./view/film-card-popup";
import {createStatistic} from "./view/statistic";
import {generateFilm} from "./mock/film";
import {generatePopup} from "./mock/film-popup";
import {generateUserRank} from "./mock/rank";

const MOCKS_AMOUNT = 20;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_AMOUNT = 2;

const films = new Array(MOCKS_AMOUNT).fill().map(generateFilm);

const userRank = generateUserRank();
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);

render(pageHeader, createUserRank(userRank), `beforeend`);
render(pageMain, createMainMenu(films), `beforeend`);

// render(pageMain, createStatistic(), `beforeend`); // статистика рендерится

render(pageMain, createFilmsSection(films.length), `beforeend`);


const filmsSection = document.querySelector(`.films`);
const filmsListContainer = filmsSection.querySelector(`.films-list__container`)
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmsListContainer, createFilmCard(films[i]), `beforeend`)
};

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  render(filmsSection, createShowMoreButton(), `beforeend`);

  const showMoreButton = document.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainer, createFilmCard(film), `beforeend`));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    };
  });
}

render(filmsSection, createExtraSections(), `beforeend`);

const extraSections = document.querySelectorAll(`.films-list--extra`);

const topRatedListContainer = extraSections[0].querySelector(`.films-list__container`);
const mostCommentedListContainer = extraSections[1].querySelector(`.films-list__container`);

for (let i = 0; i < EXTRA_FILMS_AMOUNT; i++) {
  render(topRatedListContainer, createFilmCard(films[i]), `beforeend`);
  render(mostCommentedListContainer, createFilmCard(films[i]), `beforeend`);
};

const pageFooter = document.querySelector(`.footer`);
const filmStatistic = pageFooter.querySelector(`.footer__statistics`);

render(filmStatistic, createFooterStat(films.length),`beforeend`);

const firstFilmPopup = generatePopup(films[0]);
render(pageFooter, createFilmCardPopup(firstFilmPopup), `afterend`);

document.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
  document.querySelector(`.film-details`).classList.add(`visually-hidden`);
}); // временный костыль)

