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
import {render, RenderPosition} from "./util";

const MOCKS_AMOUNT = 19;
const FILMS_COUNT_PER_STEP = 5;

const films = new Array(MOCKS_AMOUNT).fill().map(generateFilm);
const userRank = generateUserRank();

const renderFilm = (filmsListContainer, film) => {
  const filmComponent = new Film(film);
  render(filmsListContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);

  filmComponent.getElement().querySelector(`.film-card__title`)
    .addEventListener(`click`, () => {
      renderFilmPopup(film);
    });

  filmComponent.getElement().querySelector(`.film-card__poster`)
    .addEventListener(`click`, () => {
      renderFilmPopup(film);
    });

  filmComponent.getElement().querySelector(`.film-card__comments`)
    .addEventListener(`click`, () => {
      renderFilmPopup(film);
    });
};

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

const renderFilmPopup = (film) => {
  if (document.body.contains(document.querySelector(`.film-details`))) {
    deletePopup();
  }

  const filmPopup = new FilmPopup(generatePopup(film));
  document.body.appendChild(filmPopup.getElement());
  document.body.classList.add(`hide-overflow`);

  filmPopup.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, deletePopup);

  document.addEventListener(`keydown`, onEscPopupPress);
};

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);

render(pageHeader, new UserRank(userRank).getElement(), RenderPosition.BEFOREEND);
render(pageMain, new MainMenu(films).getElement(), RenderPosition.BEFOREEND);

if (films.length === 0) {
  render(pageMain, new FilmsEmptySection().getElement(), RenderPosition.BEFOREEND);
} else {
  render(pageMain, new FilmsSort().getElement(), RenderPosition.BEFOREEND);

  const filmSectionComponent = new FilmsSection();
  render(pageMain, filmSectionComponent.getElement(), RenderPosition.BEFOREEND);

  const filmsListContainer = filmSectionComponent.getElement().querySelector(`.films-list__container`);

  for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
    renderFilm(filmsListContainer, films[i]);
  }

  if (films.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmsCount = FILMS_COUNT_PER_STEP;
    const showMoreButtonComponent = new ShowMoreButton();

    render(filmSectionComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsListContainer, film));

      renderedFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }
}

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

const pageFooter = document.querySelector(`.footer`);
const filmStatistic = pageFooter.querySelector(`.footer__statistics`);

render(filmStatistic, new FooterStat(films.length).getElement(), RenderPosition.BEFOREEND);
