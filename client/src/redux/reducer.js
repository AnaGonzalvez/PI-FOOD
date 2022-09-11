import {
  GET_ALL_RECIPES,
  FILTER_BY_DIET,
  SORT_BY_ALPHABET,
  SORT_BY_HEALTHSCORE,
} from "./actions";

const initialState = {
 recipes: [],
 recipesCopy: [],
 recipeDetail: {},
 diets: []
}


function Reducer(state = initialState, action){
 switch (action.type) {
   case GET_ALL_RECIPES:
     return {
       ...state,
       recipes: action.payload,
     };
   case FILTER_BY_DIET:
     const allRecipes = state.recipesCopy;
     const recipesFiltered =
       action.payload === "All"
         ? allRecipes
         : allRecipes.filter((e) => e.diets === action.payload);
     return {
       ...state,
       recipes: recipesFiltered,
     };
   case SORT_BY_ALPHABET:
    let sortedRecipes = state.recipes;
    sortedRecipes = action.payload === 'Asc' ? 
     state.recipes.sort((a,b) =>{
     if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
     if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
     return 0;
    }) : state.recipes.sort((a,b) =>{
     if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
     if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
     return 0;
    });
     return {
      ...state,
      recipes: sortedRecipes
     };
   case SORT_BY_HEALTHSCORE:
    let sortedHealthscore = state.recipes;
    sortedHealthscore = action.payload === 'LowToHigh'?
    state.recipes.sort((a,b) =>{
     if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
     if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
     return 0;
    }) : state.recipes.sort((a,b) =>{
     if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
     if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
     return 0;
    });
     return {
      ...state,
      recipes: sortedHealthscore
     };
   default:
     return state;
 }
}

export default Reducer;