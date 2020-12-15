import UserRank from "./view/user-rank";
import MainMenu from "./view/main-menu";
import ShowMoreButton from "./view/show-more";
import FilmsSection from "./view/films";
import Film from "./view/film-card";
import FooterStat from "./view/footer-stat";
import FilmsEmptySection from "./view/films-empty";
import FilmPopup from "./view/film-card-popup";
import FilmsSort from "./view/films-sort";
// import {createStatistic} from "./view/statistic";
// import {createExtraSections} from "./view/extra";
import {generateFilm} from "./mock/film";
import {generatePopup} from "./mock/film-popup";
import {generateUserRank} from "./mock/rank";
import {remove, render, RenderPosition} from "./util/render";

const MOCKS_AMOUNT = 19;
const FILMS_COUNT_PER_STEP = 5;

const films = new Array(MOCKS_AMOUNT).fill().map(generateFilm);
const userRank = generateUserRank();

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const filmStatistic = pageFooter.querySelector(`.footer__statistics`);

const renderFilm = (filmsListContainer, film) => {
  const filmComponent = new Film(film);
  render(filmsListContainer, filmComponent, RenderPosition.BEFOREEND);

  filmComponent.setClickHandlers(() => {
    renderFilmPopup(film);
  });
};

const renderFilmPopup = (film) => {
  const deletePopup = () => {
    document.body.removeChild(document.querySelector(`.film-details`));
    document.removeEventListener(`keydown`, onEscPopupPress);
    document.body.classList.remove(`hide-overflow`);
  };

  const onEscPopupPress = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      deletePopup();
    }
  };

  if (document.body.contains(document.querySelector(`.film-details`))) {
    deletePopup();
  }

  const filmPopup = new FilmPopup(generatePopup(film));
  document.body.appendChild(filmPopup.getElement());
  document.body.classList.add(`hide-overflow`);

  filmPopup.setClickHandler(deletePopup);
  document.addEventListener(`keydown`, onEscPopupPress);
};

const renderFilmSection = (container, films) => {
  if (films.length === 0) {
    render(container, new FilmsEmptySection(), RenderPosition.BEFOREEND);
    return;
  }
  render(container, new FilmsSort(), RenderPosition.BEFOREEND);

  const filmSectionComponent = new FilmsSection();
  render(container, filmSectionComponent, RenderPosition.BEFOREEND);

  const filmsListContainer = filmSectionComponent.getElement().querySelector(`.films-list__container`);

  for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
    renderFilm(filmsListContainer, films[i]);
  }

  if (films.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmsCount = FILMS_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButton();
    render(filmSectionComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsListContainer, film));

      renderedFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        remove(showMoreButtonComponent);
      }
    });
  }
};

render(pageHeader, new UserRank(userRank), RenderPosition.BEFOREEND);
render(pageMain, new MainMenu(films), RenderPosition.BEFOREEND);
renderFilmSection(pageMain, films);
render(filmStatistic, new FooterStat(films.length), RenderPosition.BEFOREEND);

// до лучших времен
// const EXTRA_FILMS_AMOUNT = 2;
// renderTemplate(filmsSection, createExtraSections(), `beforeend`);
//
// const extraSections = document.querySelectorAll(`.films-list--extra`);
//
// const topRatedListContainer = extraSections[0].querySelector(`.films-list__container`);
// const mostCommentedListContainer = extraSections[1].querySelector(`.films-list__container`);
//
// for (let i = 0; i < EXTRA_FILMS_AMOUNT; i++) {
//   renderTemplate(topRatedListContainer, createFilmCard(films[i]), `beforeend`);
//   renderTemplate(mostCommentedListContainer, createFilmCard(films[i]), `beforeend`);
// };
