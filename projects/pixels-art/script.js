function generateRandomColor() {
  return `${Math.ceil(Math.random() * 254)} , ${Math.ceil(Math.random() * 254)} , ${Math.ceil(Math.random() * 254)}`;
}

function generatePalette(palette) {
  for (let i = 0; i < 4; i += 1) {
    const color = document.createElement('div');
    color.addEventListener('click', (event) => {
      for (let colPixel = 0; colPixel < palette.children.length; colPixel += 1) {
        palette.children[colPixel].className = 'color';
      }
      event.target.className = 'color selected';
    });

    if (palette.children.length === 0) {
      color.className = 'color selected';
      color.style.backgroundColor = 'black';
      palette.appendChild(color);
    } else {
      const colGen = generateRandomColor();

      color.className = 'color';
      color.style.backgroundColor = `rgb(${colGen})`;
      palette.appendChild(color);
    }
  }
}

function createLine(size) {
  const line = document.createElement('tr');
  line.className = 'pixel-line';

  for (let i = 0; i < size; i += 1) {
    const pixel = document.createElement('td');
    pixel.className = 'pixel';
    pixel.style.backgroundColor = 'white';
    pixel.addEventListener('click', (event) => {
      const currentColor = document.getElementsByClassName('selected')[0].style.backgroundColor;
      event.target.style.backgroundColor = currentColor;
    });

    line.appendChild(pixel);
  }

  return line;
}

function generateBoard(size, board) {
  for (let i = 0; i < size; i += 1) {
    const line = createLine(size);
    board.appendChild(line);
  }
}

function handleBigNumbers(size) {
  let newSize = size;
  if (newSize < 5) {
    newSize = 5;
  } else if (newSize > 50) {
    newSize = 50;
  }

  return newSize;
}

function clearBoard() {
  const pixels = document.getElementsByClassName('pixel');

  for (let pix = 0; pix < pixels.length; pix += 1) {
    pixels[pix].style.backgroundColor = 'white';
  }
}

function updateBoardSize() {
  const board = document.getElementById('pixel-board');
  let newSize = document.getElementById('board-size').value;

  if (!newSize) {
    alert('Board inválido!');
  } else {
    board.innerHTML = '';
    newSize = handleBigNumbers(newSize);
    generateBoard(newSize, board);
  }
}

function titleColors() {
  const title = document.getElementById('title');
  const titleString = 'Paleta de Cores';
  
  for (let i = 0; i < titleString.length; i += 1) {
    const createSpan = document.createElement('span');
    createSpan.innerText = titleString[i];
    createSpan.style.color = `rgb(${generateRandomColor()})`;
    title.appendChild(createSpan);
  }
}

window.onload = () => {
  const board = document.getElementById('pixel-board');
  const palette = document.getElementById('color-palette');
  const clearButton = document.getElementById('clear-board');
  const updateSizeButton = document.getElementById('generate-board');
  const size = 5;

  generatePalette(palette);
  generateBoard(size, board);
  titleColors();

  clearButton.addEventListener('click', clearBoard);
  updateSizeButton.addEventListener('click', updateBoardSize);
};
