import Abstract from "./abstract";

const createFooterStat = (amount) => {
  return `<p>${amount} movies inside</p>`;
};

export default class FooterStat extends Abstract {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createFooterStat(this._amount);
  }
}
