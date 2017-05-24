import React, { PropTypes } from 'react'
import Hero from './Hero';

const HeroesList = (props) => (
  <div className="hero-container">
    { props.heros.map(i => <Hero {...i} />) }
  </div>
)

export default HeroesList
