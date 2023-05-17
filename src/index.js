import './styles/main.scss';

const leaderboardList = document.getElementById('leaderboard-list');
const addForm = document.getElementById('add-form');
const scores = [];

function addScoreToList(name, score) {
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);

  leaderboardList.innerHTML = '';

  scores.forEach((score, index) => {
    const listItem = document.createElement('li');
    const listItemText = document.createTextNode(`${index + 1}. ${score.name}: `);
    const listItemScore = document.createElement('span');
    listItemScore.textContent = score.score;

    listItem.appendChild(listItemText);
    listItem.appendChild(listItemScore);
    leaderboardList.appendChild(listItem);
  });
}

addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const score = document.getElementById('score').value;
  addScoreToList(name, score);
  addForm.reset();
});