import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByDiet,
  getAllRecipes,
  sortByAlphabet,
  sortByHealthscore,
} from "../redux/actions";
import Nav from './Nav';
import Card from './Card';
import Pages from "./Pages";
import { Link } from 'react-router-dom';

export default function Home(){
 const allrecipes = useSelector((state) => state.recipes);
 const dispatch = useDispatch();

 const [currentPage, setcurrentPage] = useState(1);
 const [recipesPerPage, setrecipesPerPage] = useState(9);
 const [order, setOrder] = useState('');

 const lastRecipe = currentPage * recipesPerPage; //9 - 18 
 const firstRecipe = lastRecipe - recipesPerPage; //0 - 9
 const currentRecipes = allrecipes.slice(firstRecipe,lastRecipe);
 
 const page = (pagenum) =>{
  setcurrentPage(pagenum);
 };


 useEffect(()=>{
  dispatch(getAllRecipes());
 },[dispatch]);


 function handleClick(e){
  e.preventDefault();
  dispatch(getAllRecipes());
 };

 function handleFilterByDiet(e) {
  dispatch(filterByDiet(e.target.value));
 };

 function handleSortByAlphabet(e){
  e.preventDefault();
  dispatch(sortByAlphabet(e.target.value));
  setcurrentPage(1);
  setOrder(`Ordenado ${e.target.value}`);
 };

 function handleSortByHealthscore(e){
  e.preventDefault();
  dispatch(sortByHealthscore(e.target.value));
  setcurrentPage(1);
  setOrder(`Ordenado ${e.target.value}`);
 };

 return (
   <>
     <Nav />
     <button onClick={(e) => handleClick(e)}>Refresh Recipes</button>
     <label>Sort by:</label>
     <label>Alphabetic:</label>
     <select onClick={(e) => handleSortByAlphabet(e)}>
       <option value="All">Choose</option>
       <option value="Asc">A-Z</option>
       <option value="Desc">Z-A</option>
     </select>
     <label>Health Score</label>
     <select onClick={(e) => handleSortByHealthscore(e)}>
       <option value="All">Choose</option>
       <option value="LowToHigh">Low to High</option>
       <option value="HighToLow">High to Low</option>
     </select>
     <label>Filtrar por:</label>
     <label>Tipo de dieta</label>
     <select onClick={(e) => handleFilterByDiet(e)}>
       <option value="All">Choose</option>
       <option value="gluten free">gluten free</option>
       <option value="ketogenic">ketogenic</option>
       <option value="vegetarian">vegetarian</option>
       <option value="lacto vegetarian">lacto vegetarian</option>
       <option value="ovo vegetarian">ovo vegetarian</option>
       <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
       <option value="vegan">vegan</option>
       <option value="pescetarian">pescetarian</option>
       <option value="paleolithic">paleolithic</option>
       <option value="primal">primal</option>
       <option value="low FODMAP">low FODMAP</option>
       <option value="whole 30">whole 30</option>
     </select>

     <Pages
       recipesPerPage={recipesPerPage}
       allrecipes={allrecipes.length}
       page={page}
     />

     {currentRecipes &&
       currentRecipes.map((e) => {return (
        <Link to={`/home/${e.id}`}>
         <Card id={e.id} name={e.name} img={e.image} diet={e.diets} />
        </Link>
       )})}
   </>
 );

};