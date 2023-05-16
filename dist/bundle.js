/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
var leaderboardList = document.getElementById('leaderboard-list');
var addForm = document.getElementById('add-form');
// eslint-disable-next-line prefer-const
var scores = [];
function addScoreToList(name, score) {
  scores.push({
    name: name,
    score: score
  });
  scores.sort(function (a, b) {
    return b.score - a.score;
  });
  leaderboardList.innerHTML = '';
  scores.forEach(function (score, index) {
    var listItem = document.createElement('li');
    var listItemText = document.createTextNode("".concat(index + 1, ". ").concat(score.name, ": "));
    var listItemScore = document.createElement('span');
    listItemScore.textContent = score.score;
    listItem.appendChild(listItemText);
    listItem.appendChild(listItemScore);
    leaderboardList.appendChild(listItem);
  });
}
addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var score = document.getElementById('score').value;
  addScoreToList(name, score);
  addForm.reset();
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map