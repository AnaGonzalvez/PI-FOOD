import React from "react";

export default function Card({ name, img, diet }){
 return (
   <>
     <h2>{name}</h2>
     {diet?.map((e) => <h4>{e}</h4>)} 
     <img src={img} alt="img not found" width="250px" />
   </>
 );
};