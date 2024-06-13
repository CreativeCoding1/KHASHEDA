let textInput, textSizeSlider, textColorPicker, bgColorPicker;
let drawingLayer;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create a style element and append it to the head
  let style = createElement('style', `
    .gui-holder {
      position: fixed;
      top: 15px;
      right: 15px;
      background: white;
      padding: 10px;
      width: 250px;
      max-height: 400px;
      overflow-y: auto;
      color: black;
      border: 1px solid #ccc;
      margin-right: 20px; /* Added margin on the right */
    }

    .label-container {
     margin-right:30px;
      display: flex;
      color: black;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    .label {
      margin-left: 5px;
      font-size: 20px;
      direction: ltr;
    }

    .input-field {
      width: calc(100% - 10px);
      padding: 5px;
      margin: 5px;
      border: 1px solid #ccc;
    }

    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 150px;
      height: 10px;
      outline: none;
      background: black;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: #666;
      border-radius: 50%;
      cursor: pointer;
    }

    input[type="range"]::-moz-range-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 8px;
      height: 30px;
      background: black;
      border: none;
      cursor: pointer;
    }

    input[type="color"] {
      -webkit-appearance: none;
      appearance: none;
      width: 30px;
      height: 30px;
      padding: 0;
      margin: 0;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      vertical-align: middle;
      margin-left: 5px;
    }
  `);
  style.parent(document.head);

  // Setup UI elements
  setupUI();

  // Initialize drawing layer
  drawingLayer = createGraphics(windowWidth, windowHeight);

  // Add key event listener to the window object
  window.addEventListener('keydown', handleKeyPress);
}

function setupUI() {
  // Create a div to hold the GUI
  let guiHolder = createDiv('');
  guiHolder.class('gui-holder'); // Apply class for styling
  guiHolder.position(windowWidth - 265, 15); // Adjusted position relative to canvas

  // Title for GUI holder


  

  // Container for text size slider
  let textSizeContainer = createDiv('');
  textSizeContainer.class('label-container'); // Apply class for styling
  textSizeContainer.parent(guiHolder);

  // Label for text size slider
  let textSizeLabel = createDiv('حجم');
  textSizeLabel.class('label'); // Apply class for styling
  textSizeLabel.parent(textSizeContainer);

  // Slider for text size
  textSizeSlider = createSlider(12, 50, 20);
  textSizeSlider.parent(textSizeContainer);

  // Container for text color picker
  let textColorContainer = createDiv('');
  textColorContainer.class('label-container'); // Apply class for styling
  textColorContainer.parent(guiHolder);

  // Label for text color picker
  let textColorLabel = createDiv(' لون ١');
  textColorLabel.class('label'); // Apply class for styling
  textColorLabel.parent(textColorContainer);

  // Color picker for text color
  textColorPicker = createInput('#00ff00', 'color');
  textColorPicker.parent(textColorContainer);
  textColorPicker.class('input-field'); // Apply class for styling

  // Container for background color picker
  let bgColorContainer = createDiv('');
  bgColorContainer.class('label-container'); // Apply class for styling
  bgColorContainer.parent(guiHolder);

  // Label for background color picker
  let bgColorLabel = createDiv('لون ٢');
  bgColorLabel.class('label'); // Apply class for styling
  bgColorLabel.parent(bgColorContainer);

  // Color picker for background color
  bgColorPicker = createInput('#000000', 'color');
  bgColorPicker.parent(bgColorContainer);
  bgColorPicker.class('input-field'); // Apply class for styling
  // Text input
  textInput = createInput('واو');
  textInput.class('input-field'); // Apply class for styling
  textInput.parent(guiHolder);
}

function draw() {
  background(255);
  image(drawingLayer, 0, 0);

  // Check if mouse is pressed
  if (mouseIsPressed) {
    drawText();
  }
}

function drawText() {
  let txt = textInput.value();
  let textSizeValue = textSizeSlider.value();
  let textColor = textColorPicker.value();
  let bgColor = bgColorPicker.value();

  drawingLayer.fill(bgColor);
  drawingLayer.noStroke();
  drawingLayer.rect(mouseX, mouseY - textSizeValue, drawingLayer.textWidth(txt), textSizeValue);
  
  drawingLayer.fill(textColor);
  drawingLayer.textSize(textSizeValue);
  drawingLayer.text(txt, mouseX, mouseY);
}

function handleKeyPress(event) {
  if (event.key === 'R' || event.key === 'r') {
    drawingLayer.clear();
  }
}
