let input, button;

var data = [];
var m;
var b;


function setup() {
  createCanvas(800, 800);
  background(255);
  
  input = createInput();
  input.position(20, 20);


  button = createButton('submit');
  button.position(155, 20);
  
  stroke(0);
  fill(0);
  text("input your value as x,y - please keep your values between 0~700", 20,10);
}



function draw(){
  button.mousePressed(plotPoint);
  
  if(data.length > 1){
    linearRegression();
  }
}


function plotPoint(){
  //seperate the x & y from the input--------------
  let coordinate = split(input.value(), ',');
  
  var x = float(coordinate[0]);
  var y = float(coordinate[1]);
  var point = createVector(x,y);
  
  //upload this point onto the array
  data.push(point);
  
  
  //plot the points--------------------------------
  background(255);
  
  //draw a coordinate plane
  stroke(3);
  fill(0);
  line(50, 50, 50, 750);
  line(50, 750, 750, 750);
  
  //draw in the points
  fill(200, 0, 200);
  for (var i = 0; i < data.length; i++){
    ellipse(data[i].x+50, 750-data[i].y, 8, 8);
  }
  
  //clear the input box & reset the text
  input.value('');
  stroke(0);
  fill(0);
  text("input your value as x,y - please keep your values between 0~700", 20,10);
}




function linearRegression(){
  //find the mean of x & y---------------------------------------
  let xMean = 0;
  let yMean = 0;
  
  for(var i = 0; i < data.length; i++){
    xMean = xMean + data[i].x;
    yMean = yMean + data[i].y;
  }
  
  xMean /= data.length;
  yMean /= data.length;
  
  
  //use the linear regression equation to find m-----------------
  let numerator = 0;
  let denominator = 0;
  
  for(i = 0; i < data.length; i++){
    numerator += (data[i].x - xMean)*(data[i].y - yMean);
    denominator += pow((data[i].x - xMean), 2);
  }
  
  m = numerator / denominator;
  
  
  //find b and draw the line---------------------------------------
  b = (yMean - m*xMean);
  
  fill(0);
  stroke(255, 0, 0);
  // text("m = " + m, 300, 300);
  // text("b = " + b, 300, 400);
  line(50, 750-b, 700+50, 750-(m*700+b));
}










