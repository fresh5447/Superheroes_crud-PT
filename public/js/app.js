$(document).ready(function(){

  var newVue = new Vue({
    el: '#component',
    data: {
      heroes: {},
      nName: '',
      nPower: '',
      nEvil: '',
      nRank: '',
      nUniverse: '',
    },
    methods: {
      sayPower: function(hero) {
        alert(hero.superPower);
      },
      submitHero: function(e) {
        var self = this;
        e.preventDefault();
        console.info("SUMIT HERO FOUND");
        var heroData = {
          name: this.nName,
          superPower: this.nPower,
          evil: this.nEvil,
          universe: this.nUniverse,
          rank: this.nRank
        }
        $.ajax({
          url: '/superheroes',
          method: 'POST',
          data: heroData
        }).done(function(response){
          self.heroes.push(response);
          console.log(response, "DATA IN AJAX");
        })
      },
      deleteHero: function(id){
        var myInit = { method: 'DELETE' };
        fetch('/superheroes/' + id, myInit)
          .then((d) => d.json())
          .then((data) => console.log(data))
      }
    }
  })

  fetch('/superheroes')
    .then(d => d.json())
    .then(d => {

      var sortedData = d.sort(function(a, b){
        return a.rank > b.rank ? 1 : -1
      });

      newVue.heroes = sortedData;

    })
    .catch(e => {
      console.error(e, "Could not fetch data")
    })

});
