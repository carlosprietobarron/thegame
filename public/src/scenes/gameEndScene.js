import Phaser from 'phaser';
import { User } from '../entities/user';
import { domUtils } from '../entities/domUtils';
// import spritesheet from '../assets/map/spritesheet.png'
// import { WorldScene } from './worldScene'
import { apilibrary } from '../entities/apiScore';

class GameEndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameEndScene' });
  }

  init(data) {
    this.savebtn = data.saveScr;
  }

  create() {
    // this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo");
    this.add.image(0, 0, 'bg').setOrigin(0);

    // this.sound.play("startMusic");
    if (this.savebtn === 'yes') {
      const userData = JSON.parse(localStorage.getItem('user'));
      this.userplayer = new User(userData.name, userData.score);
      this.saveScore();
    } else {
      this.showScore('game-end');
      this.displayList();
    }
  }

  saveScore() { // eslint-disable-line class-methods-use-this
    const scoreform = domUtils.element('game-end');
    const userScore = domUtils.element('user-score');
    scoreform.style.display = 'block';
    const scoreText = `USER :  ${this.userplayer.name} - ${this.userplayer.score} POINTS `;

    userScore.textContent = scoreText;
    const save = domUtils.element('rectbtn');
    save.onclick = async () => {
      if (this.userplayer.name !== '') {
        domUtils.deleteEleContent('game-end');
        save.display = 'none';
        const results = await apilibrary.sendScores(this.userplayer.name, this.userplayer.score); // eslint-disable-line no-unused-vars
      } else {
        alert('There was an error'); // eslint-disable-line no-alert
      }
      this.showScore('game-end');
    };
  }

  async showScore(id) {
    this.gotScore = true;
    domUtils.deleteEleContent(id);
    // const data = await apilibrary.getScores();
    // const scores = data.result;
    const scores = await apilibrary.getScores();
    if (this.gotScore) {
      scores.sort((a, b) => b.score - a.score);
    }
    const divTarget = document.getElementById(id);
    domUtils.showComponent(id);
    const ulScores = document.createElement('ul');
    ulScores.setAttribute('id', 'ul-scores');
    divTarget.appendChild(ulScores);
    for (let i = 0; i < scores.length && i < 5; i += 1) {
      const liScore = document.createElement('li');
      const texto = `${scores[i].user} ${scores[i].score}`;
      domUtils.setAttributes(liScore,
        {
          id: `li${i}`,
          class: 'h-score',
        });
      liScore.textContent = texto;
      ulScores.appendChild(liScore);
    }
    const btn = domUtils.createButtonFsy('RESTART', 'game-end', 'rstBtn');
    btn.onclick = () => {
      domUtils.deleteEleContent('game-end');
      location = window.location;
    };
  }

  // eslint-disable-next-line class-methods-use-this
  displayList() {
    const scbtn = domUtils.element('scoresbtn');
    scbtn.style.display = 'none';
    const frm = domUtils.element('user-form');
    frm.style.display = 'none';
    const gend = domUtils.element('game-end');
    gend.style.display = 'block';
  }
}

export { GameEndScene };