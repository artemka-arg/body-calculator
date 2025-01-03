const formEl = document.getElementById('parameters');
const lbmEl = document.getElementById('lbm');
const proteinEls = {
  inactive: document.querySelector('[data-protein="inactive"]'),
  cardio: document.querySelector('[data-protein="cardio"]'),
  strength: document.querySelector('[data-protein="strength"]'),
};

const parameters = {};
const proteinRatio = {
  inactive: 2.75,
  cardio: 3.3,
  strength: 4.4,
};

const getLbm = (params) => {
  const { weight, fat } = params;
  const lbm = weight - (fat * weight / 100);
  parameters.lbm = lbm.toFixed(1);
};

const getProtein = (params, ratio) => {
  const { lbm } = params;
  params.protein = {
    inactive: Math.ceil(lbm * ratio['inactive']),
    cardio: Math.ceil(lbm * ratio['cardio']),
    strength: Math.ceil(lbm * ratio['strength']),
  }

  for (const key in params.protein) {
    proteinEls[key].textContent = params.protein[key];
  }

  // proteinEls.inactive.textContent = params.protein.inactive;
  // proteinEls.cardio.textContent = params.protein.cardio;
};

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  parameters.weight = formData.get('weight');
  parameters.fat = formData.get('fat');

  getLbm(parameters);
  lbmEl.innerText = `${parameters.lbm} кг`;

  getProtein(parameters, proteinRatio);

  console.log(parameters);
});