export const createUserRank = (userRank) => {

  return `<section class="header__profile profile">
    ${userRank === 0 ? `` : `<p class="profile__rating">${userRank}</p>`}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
