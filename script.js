const columns = 7;
const rows = 6;
let currentPlayer = 'red';
const board = Array.from({ length: rows }, () => Array(columns).fill(null));

// Skapa spelplanen
const boardElement = document.getElementById('board');
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < columns; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener('click', handleMove);
    boardElement.appendChild(cell);
  }
}

function handleMove(event) {
  const col = event.target.dataset.col;
  // Hitta den lägsta lediga raden i kolumnen
  for (let row = rows - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer);

      // Kontrollera vinst
      if (checkWin(row, col)) {
        document.getElementById('status').textContent = `Spelare ${currentPlayer === 'red' ? '1' : '2'} ( ${currentPlayer} ) vann!`;
        boardElement.style.pointerEvents = 'none'; // Stoppa ytterligare drag
        return;
      }

      // Byt spelare
      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      document.getElementById('status').textContent = `Spelare ${currentPlayer === 'red' ? '1' : '2'}'s tur (${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)})`;
      return;
    }
  }
  alert('Denna kolumn är full!');
}

// Kontrollera om någon vinner
function checkWin(row, col) {
  function count(directionRow, directionCol) {
    let count = 0;
    let r = row + directionRow;
    let c = parseInt(col) + directionCol;

    while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
      count++;
      r += directionRow;
      c += directionCol;
    }
    return count;
  }

  // Kontrollera horisontellt, vertikalt och diagonalt
  return (
    count(0, 1) + count(0, -1) >= 3 || // Horisontellt
    count(1, 0) + count(-1, 0) >= 3 || // Vertikalt
    count(1, 1) + count(-1, -1) >= 3 || // Diagonal \
    count(1, -1) + count(-1, 1) >= 3    // Diagonal /
  );
}