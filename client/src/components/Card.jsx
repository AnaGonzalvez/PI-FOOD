import React from "react";

export default function Card({ name, img, diet }){
 return (
   <>
     <h2>{name}</h2>
     {diet?.map((e) => (
       <h4>{e}</h4>
     ))}
     {img ? (
       <img src={img} alt="img not found" width="250px" />
     ) : (
       <img
         src="https://img.freepik.com/foto-gratis/tabla-cortar-madera-rodeada-platos-pasta-e-ingredientes-mesa_23-2148246798.jpg?w=2000"
         alt="img not found"
         width="250px"
       />
     )}
   </>
 );
};