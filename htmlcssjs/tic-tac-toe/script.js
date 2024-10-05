const disp = document.querySelector(".status");

function gameBoard() {
  const row = 3;
  const col = 3;
  const board = [];

  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < col; j++) {
      board[i].push(cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (row, col, player) => {
    if (board[row][col].getVal() != 0) return;
    board[row][col].addToken(player);
  }

  const printBoard = () => {
    const vals = board.map((row) => row.map((cell) => cell.getVal()));
    console.log(vals);
  }

  const checkWinner = () => {
    for (let i = 0; i < row; i++) {
      if (board[i][0].getVal() === board[i][1].getVal() && board[i][1].getVal() === board[i][2].getVal() && board[i][0].getVal() != 0)
        return true;
    }
    for (let i = 0; i < col; i++) {
      if (board[0][i].getVal() === board[1][i].getVal() && board[1][i].getVal() === board[2][i].getVal() && board[0][i].getVal() != 0)
        return true;
    }
    if (board[0][0].getVal() === board[1][1].getVal() && board[1][1].getVal() === board[2][2].getVal() && board[0][0].getVal() != 0)
      return true;
    if (board[0][2].getVal() === board[1][1].getVal() && board[1][1].getVal() === board[2][0].getVal() && board[0][2].getVal() != 0)
      return true;

    return false;
  }


  return {
    getBoard,
    dropToken,
    printBoard,
    checkWinner
  };
}

function cell() {
  let val = 0;

  const addToken = (player) => {
    val = player;
  };

  const getVal = () => val;

  return {
    addToken,
    getVal
  };
}


function gameController(playerOne = "X", playerTwo = "O") {
  let gameOver = false;
  const board = gameBoard();

  const players = [
    {
      name: playerOne,
      token: 1
    },
    {
      name: playerTwo,
      token: 2
    }
  ];

  let activePlayer = players[0];


  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    disp.textContent = `${getActivePlayer().name}'s turn.`;
  };

  const playRound = (row, col) => {
    if (gameOver) return;

    board.dropToken(row, col, getActivePlayer().token);

    if (board.checkWinner()) {
      disp.textContent = `${getActivePlayer().name} win.`;
      gameOver = true;
      return;
    }

    const isDraw = board.getBoard().every(row => row.every(cell => cell.getVal() !== 0));
    if (isDraw) {
      disp.textContent = 'Draw';
      gameOver = true;
      return;
    }

    switchPlayer();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard
  };
}

function domDealer() {
  let game;
  const boardElement = document.querySelector('#board');
  const reset = document.querySelector(".reset");
  const playerOneNameInput = document.querySelector('#playerOneName');
  const playerTwoNameInput = document.querySelector('#playerTwoName');
  const startButton = document.querySelector('#start');

  startButton.addEventListener('click', () => {
    const playerOneName = playerOneNameInput.value;
    const playerTwoName = playerTwoNameInput.value;
    game = gameController(playerOneName, playerTwoName);
    createBoard();
  });

  const createBoard = () => {
    const board = game.getBoard();
    boardElement.innerHTML = '';
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.dataset.row = i;
        cellElement.dataset.col = j;
        cellElement.textContent = board[i][j].getVal() === 0 ? ' ' : board[i][j].getVal() === 1 ? 'X' : 'O';
        boardElement.appendChild(cellElement);
      }
    }
  };

  boardElement.addEventListener('click', (event) => {
    if (event.target.className === 'cell') {
      const row = parseInt(event.target.dataset.row);
      const col = parseInt(event.target.dataset.col);
      game.playRound(row, col);
      createBoard();
    }
  });

  reset.addEventListener("click", () => {
    game = gameController();
    createBoard();
  });

  createBoard();
}

domDealer();
