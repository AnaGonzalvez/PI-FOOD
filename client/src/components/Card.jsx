import React from "react";

export default function Card({ name, img, diet}){
 return(
  <>
   <h2>{name}</h2>
   <h4>{diet}</h4>
   <img src={img} alt="img not found" />
  </>
 )
};