import FilmPopup from "../view/film-card-popup";
import {generatePopup} from "../mock/film-popup";
import Film from "../view/film-card";
import {remove, render, RenderPosition, replace} from "../util/render";

export default class FilmPresenter {
  constructor(filmContainer, changeData, closeActivePopup) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._closeActivePopup = closeActivePopup;

    this._filmComponent = null;

    this._renderFilmPopup = this._renderFilmPopup.bind(this);
    this.deleteFilmPopup = this.deleteFilmPopup.bind(this);
    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._onEscPopupPressHandler = this._onEscPopupPressHandler.bind(this);

    this._handleNeedToWatchClick = this._handleNeedToWatchClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._filmsListContainer = this._filmContainer.getElement().querySelector(`.films-list__container`);
    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new Film(this._film);

    this._filmComponent.setClickHandlers(this._renderFilmPopup);
    this._filmComponent.setNeedToWatchClickHandler(this._handleNeedToWatchClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmComponent === null) {
      render(this._filmsListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmContainer.getElement().querySelector(`.films-list__container`).contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmComponent);
  }

  _onEscPopupPressHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this.deleteFilmPopup();
    }
  }

  deleteFilmPopup() {
    if (document.body.contains(document.querySelector(`.film-details`))) {
      if (+document.querySelector(`.film-details`).dataset.id === this._film.id) {
        document.body.removeChild(document.querySelector(`.film-details`));
        document.body.classList.remove(`hide-overflow`);
        document.removeEventListener(`keydown`, this._onEscPopupPressHandler);
      }
    }
  }

  _handleOpenClick() {
    this.deleteFilmPopup();
  }

  _renderFilmPopup() {
    this._closeActivePopup();
    this._filmPopupComponent = new FilmPopup(generatePopup(this._film));

    document.body.appendChild(this._filmPopupComponent.getElement());
    document.body.classList.add(`hide-overflow`);
    this._filmPopupComponent.setClickHandler(this._handleOpenClick);
    document.addEventListener(`keydown`, this._onEscPopupPressHandler);
    this._filmPopupComponent.setNeedToWatchClickHandler(this._handleNeedToWatchClick);
    this._filmPopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmPopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
  }

  _handleNeedToWatchClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isNeedToWatch: !this._film.isNeedToWatch
            })
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            })
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            })
    );
  }
}
