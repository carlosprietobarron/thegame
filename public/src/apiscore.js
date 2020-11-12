const apilibrary = (() =>{
  const sendScores = (user, score) => {
      return fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/JcRycLSHbTlYqZ35HPhc/scores/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ user, score }),
      }).then(response => response.json()).catch((err) => new Error(err));
  }
  
  const getData = () => {
      return fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/JcRycLSHbTlYqZ35HPhc/scores/`)
        .then(response => response.json())
        .catch((err) => new Error(err));
 }

  const getScores = async () => {
    const data = await getData();
    console.log("data", data);
    return data.result;
 }

 return { sendScores, getScores }
})();

export { apilibrary };


//7LRGSfMNbyFSH7aVn2u5