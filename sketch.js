let boxArray = [];

// Default globals for integration bounds, and box lengths.
//var x, y;
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

let displayButton;

let zoomSlider,
    graphColSlider;

function multivarFunc(x, y)
{
  return -(2*x + y); 
  //return -( (2 * x) + y);
  //return -(x*x + y*y - 1);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  
  checkBox = createCheckbox('Show Function', false);
  checkBox.position(0, height + 5);
  
  // Zoom functionality
  zoomSlider = createSlider((zoomScale*1.5)/2, zoomScale * 1.5, zoomScale);
  zoomSlider.position(width - (3*width/4), height + 20);

  // Input box
  inputBox = createInput("f(x, y) = " + defaultFunc);
  //inputBox = createInput(defaultFunc);
  mathFunction = new MathFunc(defaultFunc, a, b, c, d);
  inputBox.position(0, height + 60);

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
  
  cols();
}

function draw() {
  background(220);
  
  orbitControl();
  
  scale(zoomSlider.value());
  
  if(checkBox.checked()) {
    //shape();

    axes();
  
    integral();
  } else {
    axes();
  
    integral();
  }
  
  //axes();
  
  //integral();
    
}

// http://hplgit.github.io/Programming-for-Computations/pub/p4c/p4c-sphinx-Matlab/._pylight004.html#derivation-via-one-dimensional-integrals
function integral()
{
  var volume = 0;
  
  // Integral Computation
  // for (let x = a; x < b; x += deltaX)
  // {
  //   for (let y = c; y < d; y += deltaY)
  //   {
  //     volume += multivarFunc(x, y) * deltaX * deltaY;  
  //   }
  // }
  //print(-volume);
  
  // Displays the columns
  for (var i = 0; i < boxArray.length; i++)
  {
    boxArray[i].display();
  }
  
}

function cols()
{
  var volume = 0;
  
  boxArray = [];

  //console.log(inputBox.value());
  // Column instantiation
  for (var x = a; x < b; x += deltaX)
  {
    for (var y = c; y < d; y += deltaY)
    {
      boxArray.push( new MyBox(x, y, -mathFunction.evaluateAt(x, y, inputBox.value()), deltaX, deltaY, 255) ); 
      //volume += multivarFunc(x, y) * deltaX * deltaY
    }
  }  
  
  var nx = (b - a)/deltaX;
  var ny = (d - c)/deltaY;
  //print(boxArray); 
  print("Double integral of f(x, y) = 2x + y from");
  print("x = " +a+ " to x = " +b+ " and y = " +c+ " to y = " +d);
  //print("V ≈ " + (-volume));
  print("Column count: " + (nx*ny));
}

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
        //vertex(j, multivarFunc(j, a) - 0.1, -a + 0.1);
        //vertex(j, multivarFunc(j, b) - 0.1, -b);
        vertex(i, -mathFunction.evaluateAt(i, c, mathFunction.input) - 0.1, -c + 0.1);
        vertex(i, -mathFunction.evaluateAt(i, d, mathFunction.input) - 0.1, -d + 0.1);
        //vertex(j, multivarFunc(i, a) - 0.1, 0);
        
        //vertex(j, multivarFunc())
        ///vertex(i, multivarFunc(i, d) - 0.1, -d);
        //line(i, multivarFunc(i,j) - 0.2, -j, i + deltaX, multivarFunc(i + deltaX, j + deltaY) - 0.2, -j + deltaY);
        
        pop();
      }
  }
  endShape();
}

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

function getVolume(mathFunction) {
  var volume = 0;
  for (var x = a; x < b; x += deltaX) {
    for (var y = c; y < d; y += deltaY) {
      volume += multivarFunc(x, y) * deltaX * deltaY;
      console.log( -volume);
    }
  }
  return volume;
}

function updateIntegral() {
  var aNew = parseFloat(lowerXBox.value(), 10);
  var bNew = parseFloat(upperXBox.value(), 10);
  if (aNew !== NaN && bNew !== NaN && aNew < bNew) {
    a = aNew;
    b = bNew;
  }

  var cNew = parseFloat(lowerYBox.value(), 10);
  var dNew = parseFloat(upperYBox.value(), 10);
  if (cNew !== NaN && dNew !== NaN && cNew < dNew) {
    c = cNew;
    d = dNew;
  }

  mathFunction = new MathFunc(inputBox.value(), a, b, c, d);
  cols();
  integral();
  shape();
  console.log(boxArray);
  //for (int i = 0)
  //outputBox.value(mathFunction.evaluateAt());

  console.log(mathFunction.input);
  console.log(mathFunction.toString());
  console.log(mathFunction.getApproxArea(deltaX, deltaY));
  //console.log(getVolume(mathFunction));

  // Checks if the rules are being followed
  // if (lowerXBox.value(isNaN))
  // {
  //   lowerXBox.value(a);  
  // }
  // if (upperXBox.value(isNaN))
  // {
  //   upperXBox.value(a);
  // }
  // if (aNew > bNew)
  // {
  //   lowerLimitBox.value(a); 
  // }  

}

