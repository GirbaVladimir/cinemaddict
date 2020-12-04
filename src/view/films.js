export const createFilmsSection = (filmsLength) => {
  return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title ${filmsLength === 0 ? `` : `visually-hidden`}">
        ${filmsLength === 0 ? `There are no movies in our database` : `All movies. Upcoming`}
      </h2>

      <div class="films-list__container">
      </div>
    </section>
  </section>`;
};


