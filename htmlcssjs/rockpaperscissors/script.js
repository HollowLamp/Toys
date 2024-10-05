function getComputerChoice() {
  let base = Math.floor(Math.random() * 10) % 3;
  if (base == 0) {
    return 'rock';
  } else if (base == 1) {
    return 'paper';
  } else {
    return 'scissor';
  }
}


function playGame() {

  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    let human = humanChoice == 'rock' ? 0 :
      humanChoice == 'paper' ? 1 : 2;
    let computer = computerChoice == 'rock' ? 0 :
      computerChoice == 'paper' ? 1 : 2;
    let disp;
    if (human == computer) {
      disp = 'Tie!';
    } else if ((human == 0 && computer == 2) || (human - computer == 1)) {
      disp = 'Win!';
      humanScore++;
    } else {
      disp = 'Lose!';
      computerScore++;
    }
    return (disp + ' ' + 'You are ' + humanChoice + ',' + ' Computer is ' + computerChoice);
  }

  const rock = document.createElement('button');
  rock.textContent = 'rock';
  const paper = document.createElement('button');
  paper.textContent = 'paper';
  const scissor = document.createElement('button');
  scissor.textContent = 'scissor';

  document.body.appendChild(rock);
  document.body.appendChild(paper);
  document.body.appendChild(scissor);

  const log = document

  const acc = document.createElement('p');

  const btns = document.querySelectorAll('button');
  btns.forEach(btns => btns.addEventListener('click', function (e) {
    let human = e.target.textContent;
    let disp = playRound(human, getComputerChoice());
    updateAcc();
    const div = document.createElement('div');
    div.textContent = disp;
    document.body.appendChild(div);
    if (computerScore == 5) {
      alert('You lose!');
      reset();
    }
    if (humanScore == 5) {
      alert('You win!');
      reset();
    }
  }));

  acc.textContent = 'You score: ' + humanScore + ' ' + 'Computer score: ' + computerScore;
  document.body.appendChild(acc);
  function updateAcc() {
    acc.textContent = 'You score: ' + humanScore + ' ' + 'Computer score: ' + computerScore;
  }

  function reset() {
    humanScore = 0;
    computerScore = 0;
    const divs = document.querySelectorAll('div');
    divs.forEach(div => div.remove());
  }
}

playGame();