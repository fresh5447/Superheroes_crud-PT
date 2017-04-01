fetch('/superheroes')
  .then(d => d.json())
  .then(d => {
    console.table(d)
    var superHeroData = d;
  })
  .catch(e => {
    console.error(e, "Could not fetch data")
  })
