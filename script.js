const puzzle = document.getElementById("puzzle");

// Buat potongan 3x3
let pieces = [];

for (let y = 0; y < 3; y++) {
  for (let x = 0; x < 3; x++) {
    const div = document.createElement("div");
    div.classList.add("puzzle-piece");
    div.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
    div.dataset.order = y * 3 + x;
    div.draggable = true;

    div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragover", e => e.preventDefault());
    div.addEventListener("drop", drop);

    pieces.push(div);
  }
}

function renderPieces() {
  puzzle.innerHTML = '';
  pieces.forEach(piece => puzzle.appendChild(piece));
  checkIfSolved(); // Tambahkan pengecekan di sini
}

function shuffle() {
  pieces.sort(() => Math.random() - 0.5);
  renderPieces();
}

let dragged;

function dragStart(e) {
  dragged = e.target;
}

function drop(e) {
  const draggedIndex = pieces.indexOf(dragged);
  const targetIndex = pieces.indexOf(e.target);

  [pieces[draggedIndex], pieces[targetIndex]] = [pieces[targetIndex], pieces[draggedIndex]];
  renderPieces();
}

// ✅ Cek apakah puzzle sudah benar
function checkIfSolved() {
  const solved = pieces.every((piece, index) => piece.dataset.order == index);
  if (solved) {
    setTimeout(() => {
      alert("🎉 Puzzle telah selesai!");
    }, 100);
  }
}

// Inisialisasi
shuffle();




