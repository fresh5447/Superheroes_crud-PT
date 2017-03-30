var superheroes = require('./superheroes');

// Define handlers for application routes
module.exports = function(app){
  app.get('/', superheroes.index);
  app.get('/superheroes', superheroes.all);
  app.post('/superheroes', superheroes.create);
  app.get('/superheroes/:id', superheroes.one);
  app.put('/superheroes/:id', superheroes.update);
  app.delete('/superheroes/:id', superheroes.remove);
};
