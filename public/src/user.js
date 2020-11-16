class User {
  constructor(name, score = 0) {
    this.name = name;
    this.score = score;
  }

  incrementScore(points) {
    this.score += points;
    localStorage.setItem('user', JSON.stringify(this));
  }

  score() {
    return this.score;
  }
}

export { User };