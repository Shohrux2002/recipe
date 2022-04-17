const { async } = require('regenerator-runtime');

import {
  loadRecipe,
  state,
  seachResults,
  paginationLogic,
  updateServings,
  addBookmark,
  deleteBookmarks,
} from './model.js';
import resipeView from './views/resipeView.js';
import searchView from './views/searchView.js';
import resipeView from './views/resipeView.js';
import resultView from './views/resultView.js';
import paginationView from './views/pagination.js';

const recipeContainer = document.querySelector('.recipe');

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    resipeView.loadingSpinner();
    await loadRecipe(id);
    const data = state.recipe;
    resipeView.render(data);
    controlServings();
    // controlBookmark();
    // controlServings();
  } catch (error) {
    console.log(error);
    resipeView.rendererror();
  }
};

const searchController = async function () {
  const inputValue = searchView.getQuery();

  await seachResults(inputValue);

  const data = paginationLogic();
  resultView.render(data);
  paginationView.render(state.search);
};

const controlServings = function (servingsNumber) {
  updateServings(servingsNumber);

  resipeView.render(state.recipe);
};
const controlBookmark = function () {
  if (state.recipe.bookmarked) {
    deleteBookmarks(state.bookmarks.id);
  } else {
    addBookmark(state.recipe);
  }
  resipeView.render(state.recipe);
};

const paginationController = async function (page) {
  try {
    const data = paginationLogic(page);
    paginationView.render(state.search);
    resultView.render(data);
  } catch (error) {
    alert(error);
  }
};

const init = function () {
  searchView.addHandlerEvent(searchController);
  resipeView.addHandlerEvent(showRecipe);
  paginationView.addHandlerEvent(paginationController);
  resipeView.addHandlerServings(controlServings);
  resipeView.addHandlerBookmars(controlBookmark);
};

init();
