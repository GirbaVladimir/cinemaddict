import FilmsSort from "../view/films-sort";
import FilmsEmptySection from "../view/films-empty";
import FilmsSection from "../view/films";
import ShowMoreButton from "../view/show-more";
import {remove, render, RenderPosition} from "../util/render";
import FilmPresenter from "./film";
import {updateItem} from "../util/common";
import {SortType} from "../const";
import {sortFilmByRating, sortFilmByReleaseYear} from "../util/sort";

const FILMS_COUNT_PER_STEP = 5;

export default class FilmSectionPresenter {
  constructor(filmSectionContainer) {
    this._filmSectionContainer = filmSectionContainer;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._filmsSortComponent = new FilmsSort();
    this._filmsEmptySection = new FilmsEmptySection();
    this._filmSectionComponent = new FilmsSection();
    this._showMoreButtonComponent = new ShowMoreButton();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleCloseActivePopup = this._handleCloseActivePopup.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._defaultSortFilms = films.slice();
    this._renderFilmSection();
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmSectionComponent, this._handleFilmChange, this._handleCloseActivePopup);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => {
        this._renderFilm(film);
      });
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleCloseActivePopup() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.deleteFilmPopup());
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmByReleaseYear);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmByRating);
        break;
      default:
        this._films = this._defaultSortFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    render(this._filmSectionContainer, this._filmsSortComponent, RenderPosition.BEFOREEND);
    this._filmsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmEmptySection() {
    render(this._filmSectionContainer, this._filmsEmptySection, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmSectionContainer, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));
    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmSection() {
    if (this._films.length === 0) {
      this._renderFilmEmptySection();
      return;
    }

    this._renderSort();
    render(this._filmSectionContainer, this._filmSectionComponent, RenderPosition.BEFOREEND);
    this._renderFilmList();
  }
}
