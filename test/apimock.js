import 'regenerator-runtime';

const fetch = require('node-fetch');

const sendScores = (user, score) => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/7LRGSfMNbyFSH7aVn2u5/scores/', {
  method: 'POST',
  headers: {
    'Content-Type': 'Application/json',
  },
  body: JSON.stringify({ user, score }),
}).then(response => response.json()).catch((err) => new Error(err));

const getData = () => fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/7LRGSfMNbyFSH7aVn2u5/scores/')
  .then(response => response.json())
  .catch((err) => new Error(err));

const getScores = async () => {
  const data = await getData();
  return data.result;
};

module.exports = { sendScores, getScores };