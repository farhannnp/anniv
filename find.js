const grid = document.getElementById("grid");
const gridSize = 12;
const words = ["happy", "first", "anniversary", "bebe", "love", "you"];
let isDragging = false;
let selectedCells = [];

function generateGrid() {
  grid.innerHTML = "";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = letters[Math.floor(Math.random() * letters.length)];
    cell.dataset.index = i;

    cell.addEventListener("mousedown", () => {
      isDragging = true;
      clearSelection();
      selectCell(cell);
    });

    cell.addEventListener("mouseenter", () => {
      if (isDragging) selectCell(cell);
    });

    cell.addEventListener("mouseup", () => {
      isDragging = false;
      checkSelectedWord();
    });

    grid.appendChild(cell);
  }
}

// Simpan posisi kata yang sudah dipakai supaya tidak tumpang tindih
const occupiedPositions = new Set();

function canPlaceWord(row, col, length) {
  if (col + length > gridSize) return false; // kebangetan ke kanan
  for (let i = 0; i < length; i++) {
    const pos = row * gridSize + (col + i);
    if (occupiedPositions.has(pos)) return false; // sudah dipakai
  }
  return true;
}

function markOccupied(row, col, length) {
  for (let i = 0; i < length; i++) {
    const pos = row * gridSize + (col + i);
    occupiedPositions.add(pos);
  }
}

function placeWord(word) {
  const cells = grid.querySelectorAll(".cell");
  const length = word.length;
  
  // Cari posisi acak yang muat dan tidak bentrok
  let placed = false;
  while (!placed) {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * (gridSize - length + 1));
    
    if (canPlaceWord(row, col, length)) {
      for (let i = 0; i < length; i++) {
        const index = row * gridSize + (col + i);
        cells[index].textContent = word[i].toUpperCase();
        cells[index].dataset.letter = word;
      }
      markOccupied(row, col, length);
      placed = true;
    }
  }
}

function placeAllWords() {
  words.forEach(word => placeWord(word));
}

function selectCell(cell) {
  if (!cell.classList.contains("selected")) {
    cell.classList.add("selected");
    selectedCells.push(cell);
  }
}

function clearSelection() {
  selectedCells.forEach(c => c.classList.remove("selected"));
  selectedCells = [];
}

function checkSelectedWord() {
  const selectedText = selectedCells.map(c => c.textContent).join("").toLowerCase();
  if (words.includes(selectedText)) {
    selectedCells.forEach(c => {
      c.classList.remove("selected");
      c.classList.add("found");
    });
    document.getElementById("result").textContent = `🎉 Ditemukan: ${selectedText.toUpperCase()}`;
  } else {
    setTimeout(clearSelection, 300);
  }

  checkAllWordsFound();
}

function checkAllWordsFound() {
  const found = document.querySelectorAll(".cell.found");
  const lettersFound = found.length;
  const total = words.reduce((sum, word) => sum + word.length, 0);
  if (lettersFound === total) {
    document.getElementById("result").textContent = "🥳 Semua kata ditemukan!";
  }
}

document.addEventListener("mouseup", () => {
  isDragging = false;
  checkSelectedWord();
});

// Jalankan
generateGrid();
placeAllWords();
