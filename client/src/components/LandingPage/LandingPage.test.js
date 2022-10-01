import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import LandingPage from './LandingPage';

describe('Landing Page test', () =>{
 it('should contains a welcome text', () =>{
  const element = render(<BrowserRouter><LandingPage/></BrowserRouter>);
  expect(element.container).toHaveTextContent("¡Welcome to RecipesApp!");
 });
 it('should contains a phrase related with the page', () =>{
  const element = render(<BrowserRouter><LandingPage /></BrowserRouter>);
  expect(element.container).toHaveTextContent('Here you will find lot of recipes to put some flavours to your food...');
 });
 it('should contains 4 images', () =>{
  const element = render(<BrowserRouter><LandingPage /></BrowserRouter>);
  expect(element.getAllByRole('img').length).toBe(4);
 });
 it('should contains a button to go to /home', () =>{
  const element = render(<BrowserRouter><LandingPage /></BrowserRouter>);
  const link = element.getByRole('link');
  expect(link.getAttribute('href')).toBe('/home');
 });
});