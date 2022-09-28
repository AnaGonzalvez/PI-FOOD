import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets, postRecipe } from "../../redux/actions";
import { Link, useHistory } from 'react-router-dom';
import style from './CreationForm.module.css';

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
  if(input.diets.filter((d) => d === e.target.value).length === 0){
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
  } else {
   alert('Diet type already selected');
  } 
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

 function handleDelete(e){  
  setInput({
   ...input,
   diets: input.diets.filter(r => r !== e)
  })
 };

 return (
   <div className={style.container}>
     <Link to="/home">
       <button className={style.btn}>Go back</button>
     </Link>
     <h2 className={style.title}>¡Share your favourite recipe!</h2>
     <img
       src="https://avera.mx/wp-content/uploads/2022/08/1200x600utensilios-1-1024x512.jpg"
       alt="img not found"
       className={style.img}
     />
     <img
       src="https://www.deliciosi.com/images/2600/2688/cocinar-torta-de-leche-1.jpg"
       alt="img not found"
       className={style.img2}
     />
     <img
       src="https://www.hogarmania.com/archivos/202102/como-hacer-sushi-japones-en-casa-estrilla-bambu-makisu-XxXx80.jpg"
       alt="img not found"
       className={style.img3}
     />
     <img
       src="https://doncucharon.com/fotos/recetas/235/th-preparacion-postre-de-moca-paso-1.jpg"
       alt="img not found"
       className={style.img4}
     />
     <img
       src="https://i.blogs.es/90b0cc/istock-527135691/840_560.jpg"
       alt="img not found"
       className={style.img5}
     />
     <img
       src="https://okdiario.com/img/recetas/2016/12/14/desayuno-ingles-01.jpg"
       alt="img not found"
       className={style.img6}
     />
     <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
       <label className={style.label}>Name:</label>
       <input
         type="text"
         placeholder="name"
         name="name"
         value={input.name}
         onChange={(e) => handleChange(e)}
         className={style.input}
       />
       {error.name && <p className={style.error}>{error.name}</p>}
       <label className={style.label}>Image:</label>
       <input
         type="text"
         placeholder="image"
         name="image"
         value={input.image}
         onChange={(e) => handleChange(e)}
         className={style.input}
       />
       <label className={style.label}>Summary:</label>
       <input
         type="text"
         placeholder="summary"
         name="summary"
         value={input.summary}
         onChange={(e) => handleChange(e)}
         className={style.input}
       />
       {error.summary && <p className={style.error}>{error.summary}</p>}
       <label className={style.label}>Health Score:</label>
       <input
         type="number"
         placeholder="health score"
         name="health_score"
         value={input.health_score}
         onChange={(e) => handleChange(e)}
         className={style.input}
       />
       {error.health_score && (
         <p className={style.error}>{error.health_score}</p>
       )}
       <label className={style.label}>Steps:</label>
       <input
         type="text"
         placeholder="steps"
         name="steps"
         value={input.steps}
         onChange={(e) => handleChange(e)}
         className={style.input}
       />
       {error.steps && <p className={style.error}>{error.steps}</p>}
       <label className={style.label}>Diets:</label>
       <select onChange={(e) => handleSelect(e)} className={style.select}>
         {alldiets &&
           alldiets.map((e) => <option name={e.name}>{e.name}</option>)}
       </select>

       {error.diets ? (
         <p className={style.error}>{error.diets}</p>
       ) : (
         input.diets.map((e) => (
           <p id={e} className={style.diets}>
             {`${e} `}{" "}
             <button
               onClick={() => handleDelete(e)}
               key={e}
               className={style.btn3}
             >
               x
             </button>
           </p>
         ))
       )}
       <button type="submit" className={style.btn2}>
         Submit recipe
       </button>
     </form>
   </div>
 );

};
