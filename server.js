var express       = require('express');
    path          = require('path'),
    Villain       = require('./models/villain'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    chalk         = require('chalk'),
    colors        = require('colors')
    heroRoutes    = require('./routes/superheroes');
    villainRoutes = require('./routes/villains')

mongoose.connect("mongodb://localhost/superheroes");

app.set('port', 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/superheroes', heroRoutes);
app.use('/api/villains', villainRoutes);

app.listen(app.get('port'), () => {
  console.log(chalk.blue("BEGIN COMPUTER STUFF 🤖 BEEEP 🤖 BOOOP 🤖 BOPPPPP 🤖"));
  console.log(`SERVER 🔥🔥🔥🔥 @  http://localhost:${app.get('port')}/`);
})


module.exports = app;
