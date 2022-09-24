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
     {detail && (
       <div>
         <h3 className={style.name}>Name: {detail.name}</h3>
         {detail.image ? (
           <img src={detail.image} alt="img not found" className={style.img} />
         ) : (
           <img
             src="https://img.freepik.com/foto-gratis/tabla-cortar-madera-rodeada-platos-pasta-e-ingredientes-mesa_23-2148246798.jpg?w=2000"
             alt="img not found"
             className={style.img}
           />
         )}
         <h4 className={style.diet}>
           Diet:{" "}
           {detail.diet
             ? detail.diet.map((e) => `${e}, `)
             : detail.diets?.map((e) => `${e.name}, `)}
         </h4>
         <h4 className={style.summary}>
           Summary: {detail.summary?.replace(/<[^>]*>/g, "")}
         </h4>
         <h4 className={style.health_score}>
           Health Score: {detail.health_score ? detail.health_score : " - "}
         </h4>
         <h4 className={style.steps}>Steps: </h4>
         {Array.isArray(detail.steps)
           ? detail.steps?.map((e) => (
               <h5 className={style.step}>
                 {e.number}. {e.step}
               </h5>
             ))
           : detail.steps?.split(".").map((e) => (
               <h5 className={style.step}>
                 {" "}
                 {i++}. {e}{" "}
               </h5>
             ))}
         <h4 className={style.dish}>
           Dishtypes:{" "}
           {detail.dish_types ? detail.dish_types.map((e) => `${e}, `) : " - "}
         </h4>
         <h4 className={style.cuisine}>
           Cuisines:{" "}
           {detail.cuisines ? detail.cuisines.map((e) => `${e}, `) : " - "}
         </h4>
       </div>
     )}
   </div>
 );
};
