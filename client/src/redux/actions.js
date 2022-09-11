import axios from 'axios';
export const GET_ALL_RECIPES = 'GEL_ALL_RECIPES';
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const SORT_BY_ALPHABET = 'SORT_BY_ALPHABET';
export const SORT_BY_HEALTHSCORE = "SORT_BY_HEALTHSCORE";

export function getAllRecipes(){
 return async (dispatch)=>{
  let result = await axios.get("http://localhost:3001/recipes");
  return dispatch({
   type: GET_ALL_RECIPES,
   payload: result.data
  })
 }
};

export function filterByDiet(diet){
 return async (dispatch) =>{
  return dispatch({
   type: FILTER_BY_DIET,
   payload: diet
  })
 }
};

export function sortByAlphabet(name){
 return async (dispatch) =>{
  return dispatch({
   type: SORT_BY_ALPHABET,
   payload: name
  })
 }
};

export function sortByHealthscore(healthScore){
 return async (dispatch) =>{
  return dispatch({
   type: SORT_BY_HEALTHSCORE,
   payload: healthScore
  })
 }
};