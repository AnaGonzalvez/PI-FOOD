import React from "react";
import style from './Pages.module.css';

export default function Pages( { recipesPerPage, allrecipes, page } ){
 
 const totalPages = Math.ceil(allrecipes/recipesPerPage); //100 recetas son 12 pag
 const pagenum = [];
 let i = 1;

 while(i <= totalPages){
  pagenum.push(i);
  i++;
 }

 return(
  <div className={style.container}>  
   { pagenum && pagenum.map(e =>    
    <button key={e} onClick={() => page(e)} className={style.btn}>{e}</button>     
   ) }  
  </div>
 )
};