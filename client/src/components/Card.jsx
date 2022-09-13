import React from "react";

export default function Card({ name, img, diet }){
 return (
   <>
     <h2>{name}</h2>
    {/*  {diet?.map((e) => {return (<h4>{e.name}</h4>)} )} */}
     <img src={img} alt="img not found" width="250px" />
   </>
 );
};