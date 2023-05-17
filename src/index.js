import './styles/main.scss';

const leaderboardList = document.getElementById('leaderboard-list');
const addForm = document.getElementById('add-form');
const refreshButton = document.getElementById('refresh');
const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const gameId = 'p54b5mtGhUUyB50K6Ux1';
const scores = [];

// Create a new game with the name "My Game" just one time to get the gameId
// and then use it to add scores and get the leaderboard.
function renderScores() {
  leaderboardList.innerHTML = '';
  scores.forEach((score, index) => {
    const listItem = document.createElement('li');
    const listItemText = document.createTextNode(`${index + 1}. ${score.user}: `);
    const listItemScore = document.createElement('span');
    listItemScore.textContent = score.score;

    listItem.appendChild(listItemText);
    listItem.appendChild(listItemScore);
    leaderboardList.appendChild(listItem);
  });
}

async function getScores() {
  if (!gameId) {
    return;
  }
  const response = await fetch(`${apiUrl}/games/${gameId}/scores`);
  const data = await response.json();
  scores.length = 0;
  data.result.forEach((score) => {
    scores.push({ user: score.user, score: score.score });
  });
  renderScores();
}

async function addScore(name, score) {
  if (!gameId) {
    return;
  }
  const response = await fetch(`${apiUrl}/games/${gameId}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: name, score }),
  });
  await response.json();
  scores.push({ user: name, score });
  scores.sort((a, b) => b.score - a.score);
  renderScores();
}

addForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const score = document.getElementById('score').value;
  await addScore(name, score);
  addForm.reset();
});

refreshButton.addEventListener('click', async () => {
  await getScores();
  scores.sort((a, b) => b.score - a.score);
  renderScores();
});
