import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipe } from "../redux/actions";

export default function SearchBar(){

 const [name, setName] = useState('');
 const dispatch = useDispatch();

 function handleChange(e){
  e.preventDefault();
  setName(e.target.value);
 };

 function handleSubmit(e){
  e.preventDefault();
  dispatch(searchRecipe(name));
  setName('');
 }

 return(
  <>
   <input type="text" placeholder="Search..." onChange={(e) => handleChange(e)} />
   <button type='submit' onSubmit={(e) => handleSubmit(e)}>Search</button>
  </>
 )
};