/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: "Margerita Pizza",
  image: "https://www.deliciosi.com/images/2600/2688/cocinar-torta-de-leche-1.jpg",
  summary: 'Recipe to cook a delicious margerita pizza, such as in a italian restaurant',
  health_score: 64,
};

const diet = {
 name: 'vegetarian'
}

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
  describe('GET /recipes/:id', () =>{
   it('should get a 500 status code if it is send an invalid id from params', async () =>{
    const response = await agent.get('/recipes/123456789')
    expect(response.statusCode).to.be.equal(500);
   });
   it('should get a 200 status code if it is send a valid id from params', async () =>{
    const response = await agent.get("/recipes/716426")
    expect(response.statusCode).to.be.equal(200);
   })
  });
  describe('POST /recipes', () =>{
   it('should reply with status code 404 if it is not send a name, summary, health_score or diet', async () =>{
    const response = await agent.post('/recipes').send({})
    expect(response.statusCode).to.be.equal(404);
   });
   it('should reply with status code 200 if it is send a name, summary, health_score and diet', async () =>{
    const response4 = await agent.post("/recipes").send({
        name: "Pizza",
        summary: 'Recipe to cook a great pizza from NY.',
        health_score: 54,
        steps: 'Steps to make pizza',
        diets: 'gluten free'
      });
    expect(response4.statusCode).to.be.equal(200);
   }) 
  })
});

describe('Diet routes', () =>{
  before(() => conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() => Diet.sync({ force: true })
   .then(() => Diet.create(diet))
  );
  describe("GET /diets", () => {
    it("should get 200", () => 
    agent.get("/diets").expect(200));
  });
})