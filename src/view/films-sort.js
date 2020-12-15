import Abstract from "./abstract";

const createFilmsSort = () => {
  return `<ul class="sort">
    <li>
      <a href="#" class="sort__button">Sort by default</a>
    </li>
    <li>
      <a href="#" class="sort__button">Sort by date</a>
    </li>
    <li>
      <a href="#" class="sort__button">Sort by rating</a>
    </li>
  </ul>`;
};

export default class FilmsSort extends Abstract {
  getTemplate() {
    return createFilmsSort();
  }
}
