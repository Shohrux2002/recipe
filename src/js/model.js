import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: {},
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(API_URL + id);
    const obj = data.data.recipe;
    state.recipe = {
      id: obj.id,
      image: obj.image_url,
      publisher: obj.publisher,
      ingredients: obj.ingredients,
      title: obj.title,
      servings: obj.servings,
      url: obj.source_url,
      time: obj.cooking_time,
    };
    return state;
  } catch (error) {
    throw error;
  }
};

export const seachResults = async function (searchkey) {
  try {
    const data = await getJSON(API_URL + `?search=${searchkey}`);
    const getArr = data.data.recipes;
    state.search.results = getArr.map(val => {
      return {
        id: val.id,
        image: val.image_url,
        publisher: val.publisher,
        title: val.title,
      };
    });
    console.log(data.data.recipes);
  } catch (error) {
    throw error;
  }
};
