let blocks = []; // Array to store block properties
let draggingBlock = null; // Track block being dragged
let offsetX, offsetY; // Offset for dragging


function setup() {
  createCanvas(windowWidth, windowHeight);
  drawStaticElements();
  generateRandomRects();
}
    
function draw() {
  background(255);
  drawStaticElements();
  drawInteractiveRects(); // Draw and manage interactivity for random rectangles
}


// Function to draw static elements (existing lines, fixed rects, roads)
function drawStaticElements() {
  drawRandomLines();
  drawfixedRects();
  drawColouredHorizontalRoad(min(width, height) / 40 * 21);
  drawColouredVerticalRoad(min(width, height) / 40 * 1);
  drawColouredVerticalRoad(min(width, height) / 40 * 23);
  drawColouredHorizontalRoad(min(width, height) / 40 * 15);
  drawColouredVerticalRoad(min(width, height) / 40 * 13);
  drawColouredHorizontalRoad(min(width, height) / 40 * 37);
}

// Function to generate random rectangles and store them in blocks array
function generateRandomRects() {
  let size = min(windowWidth, windowHeight);
  let colors = [
    [239, 17, 17],    // red
    [43, 115, 247],   // blue
    [211, 211, 211]   // gray
  ];

  for (let i = 0; i < 50 ; i++) {
    let rectSize = random(20, 80);
    let x = random(0, size - rectSize);
    let y = random(0, size - rectSize);
    let color = random(colors);
    blocks.push({ x, y, size: rectSize, originalSize: rectSize, color, originalX: x, originalY: y });
  }
}

// Function to draw and apply interactions on random rectangles
function drawInteractiveRects() {
  for (let block of blocks) {
    let isHovered = mouseX > block.x && mouseX < block.x + block.size &&
                    mouseY > block.y && mouseY < block.y + block.size;



// Apply hover effect
    if (isHovered) {
      block.size = block.originalSize * 5; // Enlarge size by 20% on hover
    } else {
      block.size = block.originalSize; // Revert to original size
    }

 // Draw shadow effect when dragging
 if (draggingBlock === block) {
  for (let i = 15; i > 0; i--) {
    let alpha = map(i, 5, 1, 50, 200);
    fill(block.color[0], block.color[1], block.color[2], alpha);
    noStroke();
    rect(block.x - offsetX * 0.5 * i, block.y - offsetY * 0.5 * i, block.size, block.size);
  }
}


    // Draw the block
    fill(block.color);
    noStroke();
    rect(block.x, block.y, block.size, block.size);
  }
}

// Change color on click
function mousePressed() {
  for (let block of blocks) {
    let isHovered = mouseX > block.x && mouseX < block.x + block.size &&
                    mouseY > block.y && mouseY < block.y + block.size;
    if (isHovered) {
      block.color = [random(255), random(255), random(255)]; // Assign random color
      draggingBlock = block; // Start dragging if clicked
      offsetX = mouseX - block.x;
      offsetY = mouseY - block.y;
      break;
    }
  }
}


// Stop dragging on mouse release
function mouseReleased() {
  draggingBlock = null;
}

// Drag and move block
function mouseDragged() {
  if (draggingBlock) {
    draggingBlock.x = mouseX - offsetX;
    draggingBlock.y = mouseY - offsetY;
  }
}


// Reset position on double-click
function doubleClicked() {
  for (let block of blocks) {
    let isHovered = mouseX > block.x && mouseX < block.x + block.size &&
                    mouseY > block.y && mouseY < block.y + block.size;
    if (isHovered) {
      block.x = block.originalX;
      block.y = block.originalY;
      break;
    }
  }
}



function drawRandomLines(){
  let size = min(windowWidth, windowHeight);
  // Set the stroke color and weight for the yellow lines
  stroke(252, 224, 46);
  strokeWeight(size / 40);
  

  // Define the number of lines for both horizontal and vertical
  let yPositions = [0, size];
  for (let i = 0; i < 5; i++){
    yPositions.push(random(50, size - 50));
  }
  yPositions.sort((a,b) => a-b);

  // Draw the horizontal lines
  for (let y of yPositions ){
    line(0, y, size, y);
  }

  let xPositions = [0, size];
  for (let j = 0; j < 5; j++){
    xPositions.push(random(50, size - 30));
  }
  xPositions.sort((a,b) => a-b);


    // Draw the vertical lines
  for (let x of xPositions ){
      line(x, 0, x, size);
  }

}




function drawfixedRects(){
  let size = min(windowWidth, windowHeight)
  strokeWeight(size / 40);
  fill(239,17,17); //red
  rect(0.037 * size, 0.186 * size, 0.125 * size, 0.2 * size);

  fill(43,115,247); //blue
  rect(0.625 * size, 0.15 * size, 0.125 * size, 0.2 * size);

  fill (211,211,211); //gray
  rect (0.138 * size, 0.725 * size, 0.2 * size, 0.125 * size);

  fill(239,17,17); //red
  rect(0.7 * size, 0.7 * size, 0.175 * size, 0.225 * size);
}

//Random rects, representing objects that change over time

function randomRect(){
  let size = min(windowWidth, windowHeight);
  let colors = [
    [239,17,17], //red
    [43,115,247], //blue
    [211,211,211] //gray
  ];

  //Fixed the size and location of rects.
  let fixedRects = [ 
    { x: 0.037 * size, y: 0.186 * size, w: 0.125 * size, h: 0.2 * size},
    { x: 0.625 * size, y: 0.15 * size, w: 0.125 * size, h: 0.2 * size},
    { x: 0.138 * size, y: 0.725 * size, w: 0.2 * size, h: 0.125 * size},
    { x: 0.7 * size, y: 0.7 * size, w: 0.175 * size, h: 0.225 * size},
  ];

  for (let i=0; i< 5; i++) {
    let rectSize = random(20,80);
    let x, y;
    let overlapping = true;
    
    //while loops are helpful for repeating statements while a condition is true. They're like if statements that repeat.
    //Loop through the locations until find one that doesn't overlap
    while (overlapping){
      x = random(0, size - 70);
      y = random(0, size - 70);
      overlapping = false;

      //Check to see if random rects overlaps the fixed rects
      for (let rect of fixedRects){
        let horizontalOverlap = false;
        let verticalOverlap = false;
      
        //Determine whether there is horizontal overlap
        if (x < rect.x + rect.w) {
          if (x + rectSize > rect.x){
            horizontalOverlap = true;
          }
        }
        //Determine whether there is vertical overlap
        if (y < rect.y + rect.h){
          if (y + rectSize > rect.y){
            verticalOverlap = true;
          }
        }

        //If both directions have overlapping, set overlapping to true
        if (horizontalOverlap){
          if (verticalOverlap){
            overlapping = true;
            break;
          }
        }
      }
    }

    let color = random(colors);
    fill(color);
    noStroke();
    rect(x,y,rectSize, rectSize);
  }
}


function drawColouredHorizontalRoad(y){
  let boxSize = min(width, height) / 40;
  let boxNumbers = min(width, height) / boxSize;
  let colourChoice;
  for (let i = 0; i < boxNumbers; i ++){
    let x = i * boxSize;
    if(i % 2 === 0){
      colourChoice = color(252, 224, 46); // yellow
    } else if (i % 6 == 1 || i % 6 == 5){
      if(random(1) < 0.7){
        colourChoice = color(252, 224, 46); // yellow
      } else {
        colourChoice = color(211, 211, 211); // gray
      }
    } else {
      colourChoice = random([color(239, 17, 17), color(43, 115, 247)]);
    }

    fill(colourChoice);
    noStroke();
    rect(x, y, boxSize, boxSize);
  }
}

function drawColouredVerticalRoad(x){
  let boxSize = min(width, height) / 40;
  let boxNumbers = min(width, height) / boxSize;
  let colourChoice;
  for (let i = 0; i < boxNumbers; i ++){
    let y = i * boxSize;
    if(i % 2 === 0){
      colourChoice = color(252, 224, 46); // yellow
    } else if (i % 6 == 1 || i % 6 == 5){
      if(random(1) < 0.7){
        colourChoice = color(252, 224, 46); // yellow
      } else {
        colourChoice = color(211, 211, 211); // gray
      }
    } else {
      colourChoice = random([color(239, 17, 17), color(43, 115, 247)]);
    }

    fill(colourChoice);
    noStroke();
    rect(x, y, boxSize, boxSize);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}