import React from "react";
import style from './Pages.module.css';

export default function Pages( { currentPage, recipesPerPage, allrecipes, setcurrentPage } ){
 const totalPages = Math.ceil(allrecipes/recipesPerPage); //100 recetas son 12 pag
 const pagenum = [];
 let i = 1;

 while(i <= totalPages){
  pagenum.push(i);
  i++;
 }

 const page = (pagenum) => {
   setcurrentPage(pagenum);
 };

 function prev(){
  currentPage > 1?
  page(currentPage - 1):
  page(1)
 }

 function next() {
  currentPage < totalPages?
  page(currentPage + 1):
  page(totalPages)
 }

 return (
   <div className={style.container}>
     <button onClick={() => prev()} className={style.btn2}>
       Prev
     </button>
     {pagenum &&
       pagenum.map((e) => (
         <button key={e} id={e} onClick={() => page(e)} className={currentPage === e? style.btn : style.btn3}>
           {e}
         </button>
       ))}
     <button onClick={() => next()} className={style.btn2}>
       Next
     </button>
   </div>
 );
};