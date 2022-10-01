import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";
import style from './Nav.module.css';

export default function Nav(){
 return(
  <div className={style.container}>
   <Link to='/' className={style.title}>RecipesApp</Link> 
   <SearchBar className={style.search}/>
   <Link to='/newRecipe' className={style.navLink}>Create a New Recipe</Link>
  </div>
 )
}
