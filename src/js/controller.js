const { async } = require('regenerator-runtime');

import { loadRecipe, state, seachResults } from './model.js';
import resipeView from './views/resipeView.js';
import searchView from './views/searchView.js';
import resipeView from './views/resipeView.js';
import resultView from './views/resultView.js';
// console.log(icons);

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    resipeView.loadingSpinner();
    await loadRecipe(id);
    const data = state.recipe;

    resipeView.render(data);
  } catch (error) {
    throw error;
  }
};

const searchController = async function () {
  const inputValue = searchView.getQuery();
  await seachResults(inputValue);
  resultView.render(state.search.results);
  console.log(inputValue);
};
searchView.addHandlerEvent(searchController);
resipeView.addHandlerEvent(showRecipe);
