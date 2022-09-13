import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeDetail } from "../redux/actions";

export default function Detail(props) {
 let { id } = props.match.params;
 const dispatch = useDispatch();
 const detail = useSelector((state) => state.recipeDetail);

 useEffect(()=>{
  dispatch(getRecipeDetail(id))
 },[dispatch, id]);

 return (
   <>
     {detail && (
       <div>
         <h3>Name: {detail.name}</h3>
         <img src={detail.image} alt="img not found" />
         {/* <h1>Diet: {detail.diet? detail.diet.map(e => `${e.diet} ,`) : detail.diets.map(e => `${e.diets.name} ,`)}</h1> */}
         <h1>Summary: {detail.summary}</h1>
         <h1>Health Score: {detail.health_score}</h1>
         {detail.steps.map( e => <h1>{e.number}. {e.step}</h1>)}
         <h1>Dishtypes: {detail.dish_types}</h1>
         <h1>Cuisines: {detail.cuisines}</h1>
       </div>
     )}
   </>
 );
};
