import React from "react";
import style from './Card.module.css';

 
export default function Card({ name, img, diet }){
 return (
   <div className={style.cardBox}>    
     {img ? (
       <img
         src={img}
         alt="img not found"
         className={style.cardImage}
       />
     ) : (
       <img
         src="https://img.freepik.com/foto-gratis/tabla-cortar-madera-rodeada-platos-pasta-e-ingredientes-mesa_23-2148246798.jpg?w=2000"
         alt="img not found"
         className={style.cardImage}
       />
     )}
     <div className={style.cardName}>{name}</div>
     <div className={style.cardDietTypes}>
     {diet?.map((e) => e? <span className={style.cardItem} key={e}>{e}</span> : <></>)}</div>
   </div>
 );
};