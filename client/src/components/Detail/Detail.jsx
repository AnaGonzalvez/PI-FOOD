import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../../redux/actions";
import { Link } from 'react-router-dom';
import style from './Detail.module.css';

export default function Detail(props) {
 let id = props.match.params.id;
 const dispatch = useDispatch();
 const detail = useSelector((state) => state.recipeDetail);

 useEffect(()=>{
  dispatch(getRecipeDetail(id))
 },[dispatch, id]);

 var i = 1;

 return (
   <div className={style.container}>
     <Link to="/home">
       <button className={style.btn}>Go back</button>
     </Link>
     <div className={style.container2}>
       {detail && (
         <div>
           <span className={style.name}>Name: {detail.name}</span>
           <div className={style.circle}></div>
           <div className={style.circle3}></div>
           {detail.image ? (
             <img
               src={detail.image}
               alt="img not found"
               className={style.img}
             />
           ) : (
             <img
               src="https://img.freepik.com/foto-gratis/tabla-cortar-madera-rodeada-platos-pasta-e-ingredientes-mesa_23-2148246798.jpg?w=2000"
               alt="img not found"
               className={style.img}
             />
           )}
           <p></p>
           <div className={style.diet}>
             Diet:{" "}
             {detail.diet
               ? detail.diet.map((e) => `${e}, `)
               : detail.diets?.map((e) => `${e.name}, `)}
           </div>
           <p></p>
           <div className={style.summary}>
             Summary: {detail.summary?.replace(/<[^>]*>/g, "")}
           </div>
           <p></p>
           <div className={style.health_score}>
             Health Score: {detail.health_score ? detail.health_score : " - "}
           </div>
           <p></p>
           <div className={style.steps}>Steps: </div>
           {Array.isArray(detail.steps)
             ? detail.steps?.map((e) => (
                 <div className={style.step}>
                   {e.number}. {e.step}
                 </div>
               ))
             : detail.steps?.split(".").map((e) => (
                 <div className={style.step}>
                   {" "}
                   {i++}. {e}{" "}
                 </div>
               ))}
           <p></p>
           <div className={style.dish}>
             Dishtypes:{" "}
             {detail.dish_types
               ? detail.dish_types.map((e) => `${e}, `)
               : " - "}
           </div>
           <p></p>
           <div className={style.cuisine}>
             Cuisines:{" "}
             {detail.cuisines ? detail.cuisines.map((e) => `${e}, `) : " - "}
           </div>
         </div>
       )}
     </div>
   </div>
 );
};
