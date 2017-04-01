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
      deleteHero: function(id) {
        var self = this;
        $.ajax({
          url: '/superheroes/' + id,
          method: 'DELETE',
        }).done(function(response){
          window.location = "/"
          console.log(response, "DELETE THAT SHIT");
        })
      }
    }
  })

  fetch('/superheroes')
    .then(d => d.json())
    .then(d => {
      console.table(d)
      newVue.heroes = d;
    })
    .catch(e => {
      console.error(e, "Could not fetch data")
    })

});
