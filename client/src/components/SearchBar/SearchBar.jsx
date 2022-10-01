import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipe } from "../../redux/actions";
import style from './SearchBar.module.css';

export default function SearchBar(){

 const [name, setName] = useState('');
 const dispatch = useDispatch();

 function handleChange(e){
  e.preventDefault();
  setName(e.target.value);  
 };

 function handleSubmit(e){
  e.preventDefault();
  if(name !== ''){
   try {
    dispatch(searchRecipe(name));
   } catch (error) {
    alert('Recipe not found')
   }   
   setName('');
  } else {
   alert('Should introduce a name to search')
  }  
 }

 return(
  <div className={style.container}>
   <input type="text" placeholder="Search Recipe..." onChange={(e) => handleChange(e)} value={name} className={style.searchInput}/>
   <button type='submit' onClick={(e) => handleSubmit(e)} className={style.btn}>Search</button>
  </div>
 )
};