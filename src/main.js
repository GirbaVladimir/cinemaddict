import {createUserRank} from "./view/user-rank";
import {createMainMenu} from "./view/main-menu";
import {createShowMoreButton} from "./view/show-more";
import {createExtraSections} from "./view/extra";
import {createFilmsSection} from "./view/films";
import {createFilmCard} from "./view/film-card";
import {createFooterStat} from "./view/footer-stat";
import {createFilmCardPopup} from "./view/film-card-popup";
import {createStatistic} from "./view/statistic";

const FILMS_AMOUNT = 5;
const EXTRA_FILMS_AMOUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);

render(pageHeader, createUserRank(), `beforeend`);
render(pageMain, createMainMenu(), `beforeend`);

// render(pageMain, createStatistic(), `beforeend`); // статистика рендерится

render(pageMain, createFilmsSection(), `beforeend`);


const filmsSection = document.querySelector(`.films`);
const filmsListContainer = filmsSection.querySelector(`.films-list__container`)
for (let i = 0; i < FILMS_AMOUNT; i++) {
  render(filmsListContainer, createFilmCard(), `beforeend`)
}

render(filmsSection, createShowMoreButton(), `beforeend`);
render(filmsSection, createExtraSections(), `beforeend`);

const extraSections = document.querySelectorAll(`.films-list--extra`);

const topRatedListContainer = extraSections[0].querySelector(`.films-list__container`);
const mostCommentedListContainer = extraSections[1].querySelector(`.films-list__container`)

for (let i = 0; i < EXTRA_FILMS_AMOUNT; i++) {
  render(topRatedListContainer, createFilmCard(), `beforeend`);
  render(mostCommentedListContainer, createFilmCard(), `beforeend`);
}

const pageFooter = document.querySelector(`.footer`);
const filmStatistic = pageFooter.querySelector(`.footer__statistics`);

render(filmStatistic, createFooterStat(),`beforeend`);

render(pageFooter, createFilmCardPopup(), `afterend`);

document.querySelector(`.film-details`)
  .classList.add(`visually-hidden`); // закоментирйте это чтобы посмотреть попап
