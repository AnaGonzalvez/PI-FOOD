import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByDiet,
  getAllRecipes,
  sortByAlphabet,
  sortByHealthscore,
} from "../../redux/actions";
import Nav from '../Nav/Nav';
import Card from '../Card/Card';
import Pages from "../Pages/Pages";
import { Link } from 'react-router-dom';
import style from './Home.module.css';

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
  e.preventDefault();
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
   <div className={style.container}>
     <Nav />

     <div className={style.container2}>
       <button onClick={(e) => handleClick(e)} className={style.btnRefresh}>
         Refresh Recipes
       </button>

       <div className={style.sort}>
         <label className={style.label2}>Sort by:</label>
         <div>
           <label className={style.label}>Alphabetic</label>
           <select
             name="alphabetic"
             onClick={(e) => handleSortByAlphabet(e)}
             className={style.select}
           >
             <option disabled selected>Choose</option>
             <option value="Asc">A-Z</option>
             <option value="Desc">Z-A</option>
           </select>
         </div>
         <div>
           <label className={style.label}>Health Score</label>
           <select
             name="health_score"
             onClick={(e) => handleSortByHealthscore(e)}
             className={style.select}
           >
             <option disabled selected>
               Choose
             </option>
             <option value="LowToHigh">Low to High</option>
             <option value="HighToLow">High to Low</option>
           </select>
         </div>
       </div>

       <div className={style.filter}>
         <label className={style.label2}>Filter by:</label>
         <div>
           <label className={style.label}>Diet type</label>
           <select
             name="diet"
             onClick={(e) => handleFilterByDiet(e)}
             className={style.select}
           >
             <option disabled selected>Choose</option>
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
         </div>
       </div>
     </div>

     <Pages
       currentPage={currentPage}
       recipesPerPage={recipesPerPage}
       allrecipes={allrecipes.length}
       page={page}
       className={style.paged}
     />

     <div className={style.cards}>
       {currentRecipes && 
         currentRecipes.map((e) => (
           <Link to={`/home/${e.id}`} className={style.cardLink} key={e.id}>
             <Card
               key={e.id}
               name={e.name}
               img={e.image}
               diet={
                 e.diet ? e.diet.map((e) => e) : e.diets?.map((e) => e.name)
               }
             />
           </Link>
         ))}{" "}
     </div>
   </div>
 );

};