console.info("%c HELLO FROM HERO.js 🤗", "font-size: 20px; color: blue");


// ajax GET (old lame way)
// $.ajax({
//   url: "/api/superheroes",
//   method: "GET"
// }).done(function(data){
//   console.table(data);
// });


// fetch Promise based (super awesome) way
fetch('/api/superheroes')
  .then(function(blob){
    return blob.json()
  })
  .then(function(data){
    return data
  })
  .catch(function(err){
    console.error(`%c ${err} your 💩`, `font-size: 20px; color: red`)
    return err
  });
