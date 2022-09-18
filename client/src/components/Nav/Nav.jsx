import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";

export default function Nav(){
 return(
  <>
   <h4>RecipesApp</h4>   
   <SearchBar />
   <Link to='/newRecipe'>Create a New Recipe</Link>
  </>
 )
}