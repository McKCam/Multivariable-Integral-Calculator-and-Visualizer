let boxArray = [];

// Default globals for integration bounds, and box lengths.
var b = 2, a = 0;
var d = 3, c = 2;
var deltaVal = 0.1;
var deltaX = deltaVal, deltaY = deltaVal;

// User interface globals
var zoomScale = 40;

let checkBox;

var defaultFunc = "2x + y";
let mathFunction;
let inputBox;
let outputBox;

let lowerXBox;
let upperXBox;
let lowerYBox;
let upperYBox;

let answerBox;

let displayButton;

let zoomSlider,
    graphColSlider;

/**
 * setup() runs once at the start.
 */
function setup() {
  createCanvas(600, 600, WEBGL);
  
  checkBox = createCheckbox('Show Function', false);
  checkBox.position(0, height + 5);
  
  // Zoom functionality
  zoomSlider = createSlider((zoomScale*1.5)/2, zoomScale * 1.5, zoomScale);
  zoomSlider.position(width - (3*width/4), height + 20);

  // Input box
  inputBox = createInput(defaultFunc);
  //inputBox = createInput(defaultFunc);
  mathFunction = new MathFunc(inputBox.value(), a, b, c, d);
  inputBox.position(30, height + 60);

  upperXBox = createInput(b);
  upperXBox.position(width/2, height + 10);
  upperXBox.size(50);
  lowerXBox = createInput(a);
  lowerXBox.position(width/2, height + 30);
  lowerXBox.size(50);
  
  upperYBox = createInput(d);
  upperYBox.position(width/2 + 100, height + 10);
  upperYBox.size(50);
  lowerYBox = createInput(c);
  lowerYBox.position(width/2 + 100, height + 30);
  lowerYBox.size(50);

  // Button
  displayButton = createButton("Display");
  displayButton.position(width - 60, height + 50);
  displayButton.mousePressed(updateIntegral);
  
  graphColSlider = createSlider(0, 255, 255);
  graphColSlider.position(0, height + 20);

  // answerBox contains the result
  answerBox = createInput(mathFunction.getApproxVol(deltaX, deltaY));
  answerBox.position(30, height + 100);
  answerBox.attribute('readonly', true);  // Make the input box non-modifiable
  
  cols();
}

/**
 * draw() runs until termination.
 */
function draw() {
  background(220);
  
  orbitControl();
  
  scale(zoomSlider.value());
  
  if (checkBox.checked()) {
    shape();

    axes();
  
    integral();
  } else {
    axes();
  
    integral();
  }
    
}

// http://hplgit.github.io/Programming-for-Computations/pub/p4c/p4c-sphinx-Matlab/._pylight004.html#derivation-via-one-dimensional-integrals
/**
 * Responsible for the display for the boxes.
 */
function integral()
{
  var volume = 0;
  
  // Displays the columns
  for (var i = 0; i < boxArray.length; i++)
  {
    boxArray[i].display();
  }
  
}

/**
 * Responsible for the box instantiation of the math function.
 */
function cols()
{
  var volume = 0;
  
  boxArray = [];

  // Column instantiation
  for (var x = a; x < b; x += deltaX)
  {
    for (var y = c; y < d; y += deltaY)
    {
      boxArray.push( new MyBox(x, y, -mathFunction.evaluateAt(x, y, inputBox.value()), deltaX, deltaY, 255) ); 
    }
  }  
  
  //var nx = (b - a)/deltaX;
  //var ny = (d - c)/deltaY;
  //print(boxArray); 
  //print("Double integral of f(x, y) = 2x + y from");
  //print("x = " +a+ " to x = " +b+ " and y = " +c+ " to y = " +d);
  //print("V ≈ " + (-volume));
  //print("Column count: " + (nx*ny));
}

/**
 * Creates the shape of the multivariable function.
 */
function shape()
{
  beginShape();
  for (var i = a; i < b; i += deltaX)
  {
    for (var j = c; j < d; j += deltaY)
      {
        push();
        colorMode(HSB);
        fill(graphColSlider.value(), 100, 100, 1);
        vertex(i, -mathFunction.evaluateAt(i, j, mathFunction.input) - 0.1, -j + 0.1);
        pop();
      }
  }
  endShape();
}

/**
 * Creates the x-y-z axes representation.
 */
function axes()
{
  // Axes
  push();
  stroke(0);
  // x-Axis
  line(-width, 0, 0, width, 0, 0);
  // z-Axis
  line(0, -height, 0, 0, height, 0);
  // y-axis
  line(0, 0, -width, 0, 0, width);
  pop();
  
  for (var x = -0.21; x < width/zoomScale * 4; x++)
  {
    line(x + 1, 0.2, 0, x + 1, -0.2, 0);    
  }
  
  for (var z = 0; z < height/zoomScale; z++)
  {
    line(0.2, -z, 0, -0.2, -z, 0);  
  }
  
  for (var y = 0.10; y > -width/zoomScale * 3; y--)
  {
    line(0, 0.2, y - 1, 0, -0.2, y - 1);      
  }
  
  // Labels for the axes
  push();
  fill('black');
  textSize(1);
  //text("z", 0.5, -6.1);
  pop();
  
  push();
  fill('black');
  textSize(1);
  translate(0, 0, -6);
  rotateY(3 * HALF_PI);
  //text("y", 0, -0.5);
  pop();
  
  push();
  fill('black');
  textSize(1);
  //text("x", 6.1, -0.25);
  pop();
  
}

/**
 * Responsible for handling updates when the display button is pressed.
 */
function updateIntegral() {
  var aNew = parseFloat(lowerXBox.value(), 10);
  var bNew = parseFloat(upperXBox.value(), 10);

  if (!isNaN(aNew) && !isNaN(bNew) && aNew < bNew) {
    a = aNew;
    b = bNew;
  } else {
    lowerXBox.value(a);
    upperXBox.value(b);
  }

  var cNew = parseFloat(lowerYBox.value(), 10);
  var dNew = parseFloat(upperYBox.value(), 10);
    
  if (!isNaN(cNew) && !isNaN(dNew) && cNew < dNew) {
    c = cNew;
    d = dNew;
  } else {
    lowerYBox.value(c);
    upperYBox.value(d);
  }

  mathFunction = new MathFunc(inputBox.value(), a, b, c, d);
  cols();
  integral();
  answerBox.value(mathFunction.getApproxVol(deltaX, deltaY));

  //console.log(boxArray);
  //outputBox.value(mathFunction.evaluateAt());

  //console.log(mathFunction.input);
  //console.log(mathFunction.toString());
  //console.log("Volume: " + mathFunction.getApproxVol(deltaX, deltaY));

}

