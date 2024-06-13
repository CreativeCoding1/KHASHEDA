class TextWave {
  constructor(txt, elementsX, elementsY) {
    this.txt = txt;
    this.elementsX = elementsX;
    this.elementsY = elementsY;
    this.font = 'Noto Sans Arabic';
    this.textColor = color(0, 0, 255); // Default text color
    this.backgroundColor = color(0, 0, 139);

    // Initialize slider and input variables
    this.magSlider = null;
    this.freqSlider = null;
    this.elementsXSlider = null;
    this.elementsYSlider = null;
    this.textInput = null;
    this.fontSelect = null;
    this.backgroundColorSelect = null;
    this.textColorSelect = null;
    this.textSizeSlider = null; // New slider for text size
  }

  setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(this.font);
    textAlign(CENTER, CENTER);

    // Create the GUI holder div
    this.guiHolder = createDiv('').class('gui-holder');

    createDiv('+++العنوان+++').parent(this.guiHolder).class('gui-title');

    // Create sliders and inputs with labels
    this.magSlider = this.createSlider('شدة', 0, 500, 200);
    this.freqSlider = this.createSlider('تردد', 1, 100, 31);
    this.elementsXSlider = this.createSlider('أفقيا', 1, 50, this.elementsX);
    this.elementsYSlider = this.createSlider('عموديا', 1, 50, this.elementsY);
    this.textInput = this.createTextInput('إدخال النص', this.txt);
    this.textSizeSlider = this.createSlider('حجم النص', 10, 50, 20); // New text size slider

    // Background color selection
    this.backgroundColorSelect = createColorPicker(this.backgroundColor).parent(this.guiHolder);
    this.backgroundColorSelect.changed(() => {
      this.backgroundColor = this.backgroundColorSelect.color();
    });
    // Style the background color picker
    this.backgroundColorSelect.style('border', 'none');
    this.backgroundColorSelect.style('padding', '5px');
    this.backgroundColorSelect.style('background-color', 'white');
    this.backgroundColorSelect.style('outline', 'none');
    this.backgroundColorSelect.style('float', 'right'); // Align to the right

    // Text color selection
    this.textColorSelect = createColorPicker(this.textColor).parent(this.guiHolder);
    this.textColorSelect.changed(() => {
      this.textColor = this.textColorSelect.color();
    });
    // Style the text color picker
    this.textColorSelect.style('border', 'none');
    this.textColorSelect.style('padding', '5px');
    this.textColorSelect.style('background-color', 'white');
    this.textColorSelect.style('outline', 'none');
    this.textColorSelect.style('float', 'right'); // Align to the right

    // Create a style element for the GUI holder and append it to the head
    createElement('style', `
      .gui-holder {
        position: fixed;
        top: 15px;
        right: 15px;
        background: white;
        padding: 10px;
        width: 250px;
        max-height: 400px;
        overflow-y: auto;
        color: white; /* Styles the GUI holder div */
      }

      

      .label-container {
        display: flex;
        color: black;
        align-items: center;
        justify-content: space-between; /* Center align sliders */
        margin-bottom: 5px;
        /* Styles the container for labels and sliders */
      }

      .label {
        margin-left: 5px;
        font-size: 20px;
        direction: ltr; /* Right-to-left for Arabic */
        /* Styles the labels for sliders and inputs */
      }

      input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        width: 150px;
        height: 10px;
        outline: none;
        background: black;
        /* Styles the range input */
      }

      input[type="range"]::-moz-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 8px;
        height: 30px;
        background: black;
        border: none; /* Remove border */
        cursor: pointer;
        /* Styles the range thumb for Mozilla Firefox */
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
  }

  draw() {
    background(this.backgroundColor);
    fill(this.textColor); // Set text color

    // Get values from sliders
    let magValue = this.magSlider.value();
    let freqValue = this.freqSlider.value();
    this.elementsX = this.elementsXSlider.value();
    this.elementsY = this.elementsYSlider.value();
    let textSizeValue = this.textSizeSlider.value(); // Get text size from slider

    textSize(textSizeValue); // Set text size

    // Draw text waves based on sliders' values
    for (let y = 0; y < this.elementsY + 1; y++) {
      for (let x = 0; x < this.elementsX + 1; x++) {
        let posY = map(y, 0, this.elementsY, 0, height);
        let magX = map(tan(radians(posY * freqValue + frameCount)), -1, 1, -magValue, magValue);
        let posX = map(x, 0, this.elementsX, -magX, magX);

        push();
        translate(width / 2 + posX, posY);
        text(this.txt, 0, 0);
        pop();
      }
    }
  }

  updateText(newTxt) {
    this.txt = newTxt;
  }

  // Helper function to create a slider with Arabic label
  createSlider(arabicLabel, minValue, maxValue, defaultValue) {
    let container = createDiv('').parent(this.guiHolder).class('label-container');
    createDiv(arabicLabel).parent(container).class('label');
    let slider = createSlider(minValue, maxValue, defaultValue).parent(container);
    return slider; // Return the slider object for further use if needed
  }

  // Helper function to create a text input with Arabic label
  createTextInput(arabicLabel, defaultValue) {
    let container = createDiv('').parent(this.guiHolder).class('label-container');
    createDiv(arabicLabel).parent(container).class('label');
    let input = createInput(defaultValue).parent(container);
    input.input(() => this.updateText(input.value()));
    return input; // Return the input object for further use if needed
  }
}

let textWave;

function setup() {
  textWave = new TextWave("انا بحب الجوافة", 10, 20);
  textWave.setup();
}

function draw() {
  textWave.draw();
}

function keyPressed() {
  textWave.updateText(key);
}
