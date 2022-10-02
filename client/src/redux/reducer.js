import {
  GET_ALL_RECIPES,
  FILTER_BY_DIET,
  SORT_BY_ALPHABET,
  SORT_BY_HEALTHSCORE,
  SEARCH_RECIPE,
  GET_RECIPE_DETAIL,
  GET_ALL_DIETS,
  POST_RECIPE
} from "./actions";

const initialState = {
 recipes: [],
 recipesCopy: [],
 recipeDetail: {},
 diets: [],
 filter: '',
 sortAlf: '',
 sortNum: ''
}


function Reducer(state = initialState, action){
 switch (action.type) {
   case GET_ALL_RECIPES:
     return {
       ...state,
       recipes: action.payload,
       recipesCopy: action.payload
     };
   case FILTER_BY_DIET:
     const allRecipes = state.recipesCopy;
     let recipesFiltered = allRecipes;
     if(action.payload !== 'All'){
      action.payload === "lacto vegetarian"
          ? (recipesFiltered = allRecipes.filter((e) =>
              e.diet
                ? e.diet?.includes("lacto ovo vegetarian")
                  ? "lacto vegetarian"
                  : ""
                : e.diets?.find((e) => e.name === action.payload)
            ))
          : action.payload === "ovo vegetarian"
          ? (recipesFiltered = allRecipes.filter((e) =>
              e.diet
                ? e.diet?.includes("lacto ovo vegetarian")
                  ? "ovo vegetarian"
                  : ""
                : e.diets?.find((e) => e.name === action.payload)
            ))
          : (recipesFiltered = allRecipes.filter((e) =>
              e.diet
                ? e.diet?.includes(action.payload)
                : e.diets?.find((e) => e.name === action.payload)
            ));
     }                
     return {
       ...state,
       filter: action.payload,
       recipes: recipesFiltered,
     };
   case SORT_BY_ALPHABET:
     let sortedRecipes = state.recipes;
     if( action.payload !== 'All'){
      sortedRecipes = action.payload === "Asc"
         ? state.recipes.sort((a, b) => {
             if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
             if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
             return 0;
           })
         : state.recipes.sort((a, b) => {
             if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
             if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
             return 0;
           });
     }     
     return {
      ...state,
      sortAlf: action.payload,
      recipes: sortedRecipes
     };
   case SORT_BY_HEALTHSCORE:
    let sortedHealthscore = state.recipes;
    if( action.payload !== 'All'){
     sortedHealthscore = action.payload === 'LowToHigh'?
    state.recipes.sort((a,b) =>{
     if (a.health_score > b.health_score) return 1;
     if (a.health_score < b.health_score) return -1;
     return 0;
    }) : state.recipes.sort((a,b) =>{
     if (a.health_score < b.health_score) return 1;
     if (a.health_score > b.health_score) return -1;
     return 0;
    });   
    }     
     return {
      ...state,
      sortNum: action.payload,
      recipes: sortedHealthscore
     };
   case SEARCH_RECIPE:
    return {
     ...state,
     recipes: action.payload
    };
   case GET_RECIPE_DETAIL:
    return{
     ...state,
     recipeDetail: action.payload
    };
   case GET_ALL_DIETS:
    return{
     ...state,
     diets: action.payload
    };
   case POST_RECIPE:
    return{
     state
    };
   default:
     return state;
 }
}

export default Reducer;