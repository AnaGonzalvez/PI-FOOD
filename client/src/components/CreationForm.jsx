import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, postRecipe } from "../redux/actions";
import { Link, useHistory } from 'react-router-dom';


export default function CreationForm() {

 const dispatch = useDispatch();
 const history = useHistory();
 const alldiets = useSelector(state => state.diets);

 const [input, setInput] = useState({
   name: "",
   image: "",
   summary: "",
   health_score: 0,
   steps: "",
   diets: [],
 });

 useEffect(()=>{
  dispatch(getAllDiets());
 }, [dispatch]);

 function handleChange(e){
  e.preventDefault();
  setInput({
   ...input,
   [e.target.name]: e.target.value
  })
 };

 function handleSelect(e){
  e.preventDefault();
  setInput({
   ...input,
   diets: [...input.diets, e.target.value]
  })
 };

 function handleSubmit(e){
  e.preventDefault();
  dispatch(postRecipe(input));
  setInput({
   name: "",
   image: "",
   summary: "",
   health_score: 0,
   steps: "",
   diets: [],
  });
  history.push('/home');
 };

 return (
   <>
     <Link to="/home">Go back</Link>
     <h2>¡Compartí tu receta favorita!</h2>
     <form onSubmit={e => handleSubmit(e)}>
       <label>Name:</label>
       <input
         type="text"
         placeholder="name"
         name="name"
         value={input.name}
         onChange={(e) => handleChange(e)}
       />
       <label>Image:</label>
       <input
         type="text"
         placeholder="image"
         name="image"
         value={input.image}
         onChange={(e) => handleChange(e)}
       />
       <label>Summary:</label>
       <input
         type="text"
         placeholder="summary"
         name="summary"
         value={input.summary}
         onChange={(e) => handleChange(e)}
       />
       <label>Health Score:</label>
       <input
         type="number"
         placeholder="health score"
         name="health_score"
         value={input.health_score}
         onChange={(e) => handleChange(e)}
       />
       <label>Steps:</label>
       <input
         type="text"
         placeholder="steps"
         name="steps"
         value={input.steps}
         onChange={(e) => handleChange(e)}
       />
       <label>Diets:</label>
       <select onChange={(e) => handleSelect(e)} >
         {alldiets &&
           alldiets.map((e) => <option name={e.name}>{e.name}</option>)}
       </select>
       {input.diets.map(e => <p>{`${e} `}</p>)}
       <button type="submit">Submit recipe</button>
     </form>
   </>
 );

};
