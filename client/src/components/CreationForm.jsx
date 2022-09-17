import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, postRecipe } from "../redux/actions";
import { Link, useHistory } from 'react-router-dom';

function validation(input){
 let error = {};
 if (!input.name) error.name = "Introduce a name";
 else if (!input.summary) error.summary = "Write a summary";
 else if (input.health_score < 1 || input.health_score > 100)
   error.health_score = "The health score should be between 1 and 100";
 else if (!input.steps || input.steps.split('.').length === 0) error.steps = "Write the steps separated with a point sentence";
 else if (input.diets.length === 0) error.diets = 'Choose a diet type';

 return error;
};

export default function CreationForm() {

 const dispatch = useDispatch();
 const history = useHistory();
 const alldiets = useSelector(state => state.diets);
 const [error, setError] = useState({});

 const [input, setInput] = useState({
   name: "",
   image: "",
   summary: "",
   health_score: 0,
   steps: '',
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
  });
  setError(
    validation({
      ...input,
      [e.target.name]: e.target.value,
    })
  );
 };


 function handleSelect(e){
  e.preventDefault();
  setInput({
   ...input,
   diets: [...input.diets, e.target.value]
  });
  setError(
    validation({
      ...input,
      diets: [...input.diets, e.target.value],
    })
  );
 };

 function handleSubmit(e){
  e.preventDefault();
  if(Object.values(error).length > 0) alert('Complete all the requiered fields');
  else if(input.name === '' || input.summary === '' || input.health_score === 0 || input.steps === '' || input.diets.length === 0) alert('Complete all the required fields');
  else{
  dispatch(postRecipe(input));
  alert('Recipe created successfully')
  setInput({
    name: "",
    image: "",
    summary: "",
    health_score: 0,
    steps: "",
    diets: [],
  });  
  history.push('/home');
 }
 };

 return (
   <>
     <Link to="/home">Go back</Link>
     <h2>¡Compartí tu receta favorita!</h2>
     <form onSubmit={(e) => handleSubmit(e)}>
       <label>Name:</label>
       <input
         type="text"
         placeholder="name"
         name="name"
         value={input.name}
         onChange={(e) => handleChange(e)}
       />
       {error.name && <p>{error.name}</p>}
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
       {error.summary && <p>{error.summary}</p>}
       <label>Health Score:</label>
       <input
         type="number"
         placeholder="health score"
         name="health_score"
         value={input.health_score}
         onChange={(e) => handleChange(e)}
       />
       {error.health_score && <p>{error.health_score}</p>}
       <label>Steps:</label>
       <input
         type="text"
         placeholder="steps"
         name="steps"
         value={input.steps}
         onChange={(e) => handleChange(e)}
       />
       {error.steps && <p>{error.steps}</p>}
       <label>Diets:</label>
       <select onChange={(e) => handleSelect(e)}>
         {alldiets &&
           alldiets.map((e) => <option name={e.name}>{e.name}</option>)}
       </select>
       {error.diets? <p>{error.diets}</p> : input.diets.map((e) => (
         <p id={e}>{`${e} `}</p>
       ))}
       { Object.values(error).length? <></>  : <button type="submit">Submit recipe</button>}       
     </form>
   </>
 );

};
