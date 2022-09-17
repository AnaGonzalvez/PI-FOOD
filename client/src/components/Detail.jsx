import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../redux/actions";
import { Link } from 'react-router-dom';

export default function Detail(props) {
 let id = props.match.params.id;
 const dispatch = useDispatch();
 const detail = useSelector((state) => state.recipeDetail);

 useEffect(()=>{
  dispatch(getRecipeDetail(id))
 },[dispatch, id]);

 var i = 1;

 return (
   <>
     <Link to="/home">
       <button>Go back</button>
     </Link>
     {detail && (
       <div>
         <h3>Name: {detail.name}</h3>
         <img src={detail.image} alt="img not found" />
         <h4>
           Diet:{" "}
           {detail.diet
             ? detail.diet.map((e) => `${e}, `)
             : detail.diets?.map((e) => `${e.name}, `)}
         </h4>
         <h4>Summary: {detail.summary?.replace(/<[^>]*>/g, "")}</h4>
         <h4>
           Health Score: {detail.health_score ? detail.health_score : " - "}
         </h4>
         <h4>Steps: </h4>
         {Array.isArray(detail.steps) ? (
           detail.steps?.map((e) => (
             <h5>
               {e.number}. {e.step}
             </h5>
           ))
         ) : (
          detail.steps?.split('.').map(e => <h5> {i++}. {e} </h5>))
         }           
         <h4>
           Dishtypes:{" "}
           {detail.dish_types ? detail.dish_types.map((e) => `${e}, `) : " - "}
         </h4>
         <h4>
           Cuisines:{" "}
           {detail.cuisines ? detail.cuisines.map((e) => `${e}, `) : " - "}
         </h4>
       </div>
     )}
   </>
 );
};
