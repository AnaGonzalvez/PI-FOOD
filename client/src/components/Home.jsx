import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from "../redux/actions";
import Nav from './Nav';
import Card from './Card';

export default function Home(){
 const allrecipes = useSelector((state) => state.recipes);
 const dispatch = useDispatch();

 useEffect(()=>{
  dispatch(getAllRecipes());
 },[dispatch]);


 function handleClick(e){
  e.preventDefault();
  dispatch(getAllRecipes());
 };

 return (
   <>
     <Nav />
     <button onClick={(e) => handleClick(e)}>Recargar recetas</button>
     <select>
       <option value="All">Seleccionar</option>
       <option value="Gluten Free">sin TACC</option>
       <option value="Ketogenic">Cetogénica</option>
       <option value="Vegetarian">Vegetariana</option>
       <option value="Lacto-Vegetarian">Lacto-vegetariana</option>
       <option value="Ovo-Vegetarian">Ovo-vegetariana</option>
       <option value="Vegan">Vegana</option>
       <option value="Pescetarian">Pescetariana</option>
       <option value="Paleo">Paleo</option>
       <option value="Primal">Primitivo</option>
       <option value="Low FODMAP">FODMAP bajo</option>
       <option value="Whole30">Entero 30</option>
     </select>
     <select>
       <option value="All">Seleccionar</option>
       <option value="Asc">A-Z</option>
       <option value="Desc">Z-A</option>
     </select>
     <select>
       <option value="All">Seleccionar</option>
       <option value="Very-low">de 0 a 20</option>
       <option value="Low">de 21 a 40</option>
       <option value="Normal">de 41 a 60</option>
       <option value="High">de 61 a 80</option>
       <option value="Very-high">de 81 a 100</option>
     </select>
     {
      allrecipes && allrecipes.map(e =>
       <Card name={e.name} img={e.img} diet={e.diet} />
      )
     }
   </>
 );

};