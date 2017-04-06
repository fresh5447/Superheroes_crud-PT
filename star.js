const Promise = require('bluebird');
const fetch   = require('node-fetch');
let allData   = [];

const getFirstChar = () =>
  fetch('http://swapi.co/api/people/1')
    .then(blob => blob.json())
    .then(data => data)
    .catch(e => e);

const getSecondChar = () =>
  fetch('http://swapi.co/api/people/2')
    .then(blob => blob.json())
    .then(data => data)
    .catch(e => e);

const getThirdChar = () =>
  fetch('http://swapi.co/api/people/3')
    .then(blob => blob.json())
    .then(data => data)
    .catch(e => e);

const getFourthChar = () =>
  fetch('http://swapi.co/api/people/4')
    .then(blob => blob.json())
    .then(data => data)
    .catch(e => e);

const getFifthChar = () =>
  fetch('http://swapi.co/api/people/5')
    .then(blob => blob.json())
    .then(data => data)
    .catch(e => e);

Promise.all([getFirstChar(), getSecondChar(), getThirdChar(), getFourthChar(), getFifthChar()])
  .then((data) => allData.push(data))
  .catch(e => e);

setTimeout(() => {
  console.log(allData);
}, 1000);
