import React, { Component } from 'react';
import $ from 'jquery';

import HeroList from './HeroList';

class HeroesContainer extends Component {
  state = {
    heros: undefined
  }

  componentDidMount = () => this.loadHeroes()

  loadHeroes(){
    $.ajax({
      url:'/api/superheroes',
      method: 'GET'
    }).done((data) => {
      this.setState({heros: data.data})
      console.log(data, "DATA IN HROES");
    });
  }
  render() {
    return (
      <div>
        { this.state.heros ? <HeroList heros={this.state.heros}/>: <h1> No Heroes</h1> }
      </div>
    );
  }
}

export default HeroesContainer;
