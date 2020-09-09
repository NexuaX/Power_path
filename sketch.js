let descriptor = [
  ["b", "b", "r", "b", "b"],
  ["cl", "cs", "cl", "ct", "cl"],
  ["cl", "cs", "cs", "cl", "cl"],
  ["cl", "ct", "cl", "cs", "cl"],
  ["cl", "cl", "cs", "ct", "cl"],
  ["cl", "cs", "cl", "cl", "cl"],
  ["b", "b", "p", "b", "b"],
];

let power, recivier;

function setup() {
  createCanvas(400, 400);
  frameRate(24);
  
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 5; j++) {
      let element = descriptor[i][j];
      if (element == "cl")
        descriptor[i][j] = new Connector(100+j*50, 50+i*50, 0);
      else if (element == "cs")
        descriptor[i][j] = new Connector(100+j*50, 50+i*50, 1);
      else if (element == "ct")
        descriptor[i][j] = new Connector(100+j*50, 50+i*50, 2);
      else if (element == "b")
        descriptor[i][j] = new Blank();
      else if (element == "p") {
        descriptor[i][j] = new Power(100+j*50, 50+i*50, 40);
        power = [i ,j];
      } else if (element == "r") {
        descriptor[i][j] = new Recivier(100+j*50, 50+i*50, 40);
        recivier = [i, j];
      }
    }
  }
  
}

function draw() {
  background(220);
  drawWeb();
  drawElements();
}

function mousePressed(){
  descriptor.forEach(x => x.forEach(x => x.clicked()));
  if (descriptor[power[0]][power[1]].state) {
    lightsOff();
    descriptor[power[0]][power[1]].state = 1;
    recursiveCheck(power[0], power[1], 4);
  } else {
    lightsOff();
  }
}

function drawWeb() {
  stroke(240);
  for (let i = 0; i < 8; i++) 
    line(75, 25+i*50, width-75, 25+i*50);
  for (let i = 0; i < 6; i++) 
    line(75+i*50, 25, 75+i*50, height-25); 
  stroke(0);
}

function recursiveCheck(i, j, back) {
  if (i == recivier[0] && j == recivier[1]) {
    descriptor[i][j].state = 1;
    return;
  }
  
  if (i > 0 && back != 0 && descriptor[i][j].conn[0] && descriptor[i-1][j].conn[2]) {
    descriptor[i-1][j].state = 1;
    recursiveCheck(i-1, j, 2);
  }
  if (j < 4 && back != 1 && descriptor[i][j].conn[1] && descriptor[i][j+1].conn[3]) {
    descriptor[i][j+1].state = 1;
    recursiveCheck(i, j+1, 3);
  }
  if (i < 6 && back != 2 && descriptor[i][j].conn[2] && descriptor[i+1][j].conn[0]) {
    descriptor[i+1][j].state = 1;
    recursiveCheck(i+1, j, 0);
  }
  if (j > 0 && back != 3 && descriptor[i][j].conn[3] && descriptor[i][j-1].conn[1]) {
    descriptor[i][j-1].state = 1;
    recursiveCheck(i, j-1, 1);
  }
  
  return;
  
}
    

function drawElements() {
  descriptor.forEach(x => x.forEach(x => x.display())); 
}

function lightsOff() {
  descriptor.forEach(x => x.forEach(x => x.state = 0));
}