import UserRank from "./view/user-rank";
import MainMenu from "./view/main-menu";
import FooterStat from "./view/footer-stat";
import {generateFilm} from "./mock/film";
import {generateUserRank} from "./mock/rank";
import {render, RenderPosition} from "./util/render";
import FilmSectionPresenter from "./presenter/film-section";

const MOCKS_AMOUNT = 19;

const films = new Array(MOCKS_AMOUNT).fill().map(generateFilm);
const userRank = generateUserRank();

const pageHeader = document.querySelector(`.header`);
const pageMain = document.querySelector(`.main`);
const pageFooter = document.querySelector(`.footer`);
const filmStatistic = pageFooter.querySelector(`.footer__statistics`);

render(pageHeader, new UserRank(userRank), RenderPosition.BEFOREEND);
render(pageMain, new MainMenu(films), RenderPosition.BEFOREEND);
render(filmStatistic, new FooterStat(films.length), RenderPosition.BEFOREEND);

const filmSectionPresenter = new FilmSectionPresenter(pageMain);
filmSectionPresenter.init(films);
