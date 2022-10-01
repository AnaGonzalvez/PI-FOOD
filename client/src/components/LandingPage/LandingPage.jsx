import React from "react";
import { Link } from "react-router-dom";
import style from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <div className={style.container}>
      <img
        src="https://img.freepik.com/foto-gratis/mujer-cocina-cocina_1303-12914.jpg"
        alt="img not found"
        className={style.img}
      />
      <img
        src="https://unareceta.com/wp-content/uploads/2016/08/receta-wok-de-verduras.jpg"
        alt="img not found"
        className={style.img2}
      />
      <img
        src="https://img.freepik.com/foto-gratis/trozos-filete-cordero-salsas-pimiento-asado-ensalada-fresca-sobre-tabla-madera_140725-10580.jpg?w=2000"
        alt="img not found"
        className={style.img3}
      />
      <img
        src="https://images.ecestaticos.com/kmTMxvhDeA2nNQhFwXuZ-KtLdgA=/188x5:772x443/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F4ce%2F57c%2F343%2F4ce57c343d34bf803771c15c51ed03e7.jpg"
        alt="img not found"
        className={style.img4}
      />
      <h1 className={style.title}>¡Welcome to RecipesApp!</h1>
      <h3 className={style.subtitle}>
        Here you will find lot of recipes to put some flavours to your food...
      </h3>
      <Link to="/home">
        <button className={style.btn}>Start</button>
      </Link>
    </div>
  );
}
