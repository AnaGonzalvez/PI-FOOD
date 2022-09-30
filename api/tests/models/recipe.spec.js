const { Recipe, conn } = require('../../src/db.js');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when it is a valid name', () => {
        Recipe.create({ name: 'Margerita Pizza' });
      });
    });
    describe('image', () => {
     it('should throw an error if image is not a string', (done) =>{
      Recipe.create({ image: 10 })
       .then(() => done(new Error('it requires a string value')))
       .catch(() => done());
    });
     it('should work when it is a string', () =>{
      Recipe.create({ image: "https://www.deliciosi.com/images/2600/2688/cocinar-torta-de-leche-1.jpg" });
     })
    });
    describe('summary', () =>{
     it('should throw an error if summary is not a string', (done) =>{
      Recipe.create({ summary: []})
       .then(() => done(new Error('it requires a string value')))
       .catch(() => done());
     });
     it('should work when it is a string', () =>{
      Recipe.create({ summary: 'A summary for a recipe' });
     });
    });
    describe('health_score', () => {
     it('should throw an error if health score is not a number', (done) =>{
      Recipe.create({ health_score: 'twenty'})
       .then(() => done(new Error('it requires a numeric health score')))
       .catch(() => done());
     });
     it('should work when it is a numeric value', () =>{
      Recipe.create({ health_score: 50 });
     });
    });
    describe("steps", () => {
      it("should throw an error if steps is not a string", (done) => {
        Recipe.create({ steps: {} })
          .then(() => done(new Error("it requires a string value")))
          .catch(() => done());
      });
      it("should work when it is a string", () => {
        Recipe.create({ steps: "Recipe's steps" });
      });
    });
  });
});
