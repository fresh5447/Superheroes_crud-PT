import React, { PropTypes } from 'react';

const Hero = (props) => {
  return (
    <div className='hero-panel'>
      <h1> {props.name} </h1>
      <p> {props.rank} </p>
      <p> {props.alias} </p>
      <p> {props.universe} </p>
      <img src={props.img} />
    </div>
  )
}

export default Hero
