const formEl = document.getElementById('parameters');
const lbmEl = document.getElementById('lbm');
const stepsEl = document.getElementById('steps');
const workoutEl = document.getElementById('workout');

const proteinsEls = {
  inactive: document.querySelector('[data-proteins="inactive"]'),
  cardio: document.querySelector('[data-proteins="cardio"]'),
  strength: document.querySelector('[data-proteins="strength"]'),
};

const caloriesEls = {
  inactive: document.querySelector('[data-calories="inactive"]'),
  workout: document.querySelectorAll('[data-calories="workout"]')
}

const weightLossEls = {
  inactive: document.querySelector('[data-weight-loss="inactive"]'),
  workout: document.querySelectorAll('[data-weight-loss="workout"]')
}

const proteinRatio = {
  inactive: 2.75,
  cardio: 3.3,
  strength: 4.4,
};

const parameters = {};

// FUNCTIONS

const getLbm = (params) => {
  const { weight, fat } = params;
  const lbm = (weight - (fat * weight / 100)).toFixed(1);
  const lbmNum = Number(lbm);
  parameters.lbm = lbmNum === Math.trunc(lbmNum) ? Math.trunc(lbmNum) : lbmNum;
};

const getProteins = (params, ratio, elements) => {
  const { lbm } = params;
  params.protein = {
    inactive: Math.ceil(lbm * ratio['inactive']),
    cardio: Math.ceil(lbm * ratio['cardio']),
    strength: Math.ceil(lbm * ratio['strength']),
  }

  for (const key in params.protein) {
    elements[key].textContent = params.protein[key];
  }
};

const getCalories = (params, caloriesElements, weightLossElements) => {
  const { weight, lbm, steps, workout } = params;

  const bmr = 370 + (21.6 * lbm);
  const tef = bmr * 0.15;
  const caloriesPerSteps = steps * 0.025;
  const neat = bmr + tef + caloriesPerSteps;
  const caloriesPerWorkout = workout * weight * 0.05;

  params.calories = {
    inactive: Math.round(neat),
    workout: Math.round(neat + caloriesPerWorkout),
  };

  for (const key in params.calories) {
    if (key === 'workout') {
      caloriesElements[key].forEach((el) => el.textContent = params.calories[key]);
    } else {
      caloriesElements[key].textContent = params.calories[key];
    }
  }

  params.caloriesLoss = {
    inactive: Math.round(neat * 0.8),
    workout: Math.round((neat + caloriesPerWorkout) * 0.8),
  };
  
  for (const key in params.calories) {
    if (key === 'workout') {
      weightLossElements[key].forEach((el) => el.textContent = params.caloriesLoss[key]);
    } else {
      weightLossElements[key].textContent = params.caloriesLoss[key];
    }
  }
}

// EVENT SUBMIT

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  for (const key of formData.keys()) {
    parameters[key] = Number(formData.get(key)) || 0;
  }

  getLbm(parameters);
  lbmEl.innerText = `${parameters.lbm} кг`;

  getProteins(parameters, proteinRatio, proteinsEls);

  getCalories(parameters, caloriesEls, weightLossEls);
});