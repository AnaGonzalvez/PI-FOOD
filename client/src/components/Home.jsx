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
     <button onClick={(e) => handleClick(e)}>Recargar recetas</button>
     <label>Ordenar:</label>
     <label>Alfabeticamente:</label>
     <select onClick={(e) => handleSortByAlphabet(e)}>
       <option value="All">Seleccionar</option>
       <option value="Asc">A-Z</option>
       <option value="Desc">Z-A</option>
     </select>
     <label>Nivel saludable</label>
     <select onClick={(e) => handleSortByHealthscore(e)}>
       <option value="All">Seleccionar</option>
       <option value="LowToHigh">Ascendente</option>
       <option value="HighToLow">Descendente</option>
     </select>
     <label>Filtrar por:</label>
     <label>Tipo de dieta</label>
     <select onClick={(e) => handleFilterByDiet(e)}>
       <option value="All">Seleccionar</option>
       <option value="gluten Free">sin TACC</option>
       <option value="ketogenic">Cetogénica</option>
       <option value="vegetarian">Vegetariana</option>
       <option value="lacto vegetarian">Lacto-vegetariana</option>
       <option value="ovo vegetarian">Ovo-vegetariana</option>
       <option value="lacto ovo vegetarian">Lacto-ovo-vegetariana</option>
       <option value="vegan">Vegana</option>
       <option value="pescetarian">Pescetariana</option>
       <option value="paleolithic">Paleo</option>
       <option value="primal">Primitivo</option>
       <option value="low FODMAP">FODMAP bajo</option>
       <option value="whole 30">Entero 30</option>
     </select>

     <Pages
       recipesPerPage={recipesPerPage}
       allrecipes={allrecipes.length}
       page={page}
     />

     {currentRecipes &&
       currentRecipes.map((e) => (
         <Card id={e.id} name={e.name} img={e.image} diet={e.diets} />
       ))}
   </>
 );

};