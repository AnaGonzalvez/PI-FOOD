import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <h1>¡Bienvenido a RecipesApp!</h1>
      <h3>
        Aquí encontrarás gran variedad de recetas para agregarle sabor a tus
        comidas...
      </h3>
      <Link to="/home">
        <button>Comenzar búsqueda</button>
      </Link>
    </>
  );
}
