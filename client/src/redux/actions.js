import axios from 'axios';
export const GET_ALL_RECIPES = 'GEL_ALL_RECIPES';

export function getAllRecipes(){
 return async (dispatch)=>{
  let result = await axios.get("http://localhost:3001/recipes");
  return dispatch({
   type: GET_ALL_RECIPES,
   payload: result.data
  })
 }
};
