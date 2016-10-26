// depends on circleSector.js


/******************************************* 
* 
* board object-making function
*
*******************************************/
 var makeBoard = function (spec){
  spec = spec || {};
  
  var canvasID = spec.canvasID || "boardCanvas";
  var getCanvasID = function() { return canvasID; };
 
  var activeQuadrant = 0;
  var getActiveQuadrant = function() {return activeQuadrant; };
  var setActiveQuadrant = function(quad){
    if(quad == 1){
      activeQuadrant = 1;
    } else if(quad == 2){
      activeQuadrant = 2;
    } else if(quad == 3){
      activeQuadrant = 3;
    } else if(quad == 4){
	  activeQuadrant = 4;
    } else {
	  activeQuadrant = 0;
	}
  }

  var width = spec.width || 300;
  var height = spec.height || 300;
  var activeQuadrant = 0;
  return {
    getCanvasID: getCanvasID,
    getActiveQuadrant: getActiveQuadrant,
    setActiveQuadrant: setActiveQuadrant,
    width: width,
    height: height
  };
 }

// default board
 var defaultBoard = makeBoard();


/******************************************* 
*
* function to create the game board canvas that the board
* will be drawn on
*
*******************************************/
 var makeBoardCanvas = function(board, parentElement) {
  board = board || {};
  var newCanvas = document.createElement("canvas"); 
  newCanvas.id = board.getCanvasID() || defaultBoard.getCanvasID();
  newCanvas.width = board.width || defaultBoard.width;
  newCanvas.height = board.height || defaultBoard.height;
  newCanvas.style = "border:1px solid #000000;";
  parentElement.appendChild(newCanvas);
  return newCanvas;
 }




/******************************************* 
*
* Draw the game board
*
*******************************************/
 var drawBoard = function(ctx, board) {
  board = board || defaultBoard;

  // board values
  var boardSize = Math.min(board.width, board.height);
  var bigRadius = 0.9*boardSize/2;
  var innerQuadRadius = 0.25*boardSize/2;
  var outerQuadRadius = 0.7*boardSize/2;
  var centerX = board.width/2;
  var centerY = board.height/2;
  var sectorSpacing = bigRadius*0.05;

  // draw center black circle
  ctx.fillStyle="#303030";
  ctx.arc(centerX, centerY, bigRadius, 0, 2*Math.PI);
  ctx.fill();

  // draw the quadrants
  var colors = ["#FF0000", "#00FF00", "#3344FF", "#FFA500"];
  for( iQuad=0; iQuad<4; iQuad++ ){
    var gradient = ctx.createRadialGradient(centerX,centerY,innerQuadRadius,centerX,centerY,1.4*outerQuadRadius);
    gradient.addColorStop(0,colors[iQuad]);
    gradient.addColorStop(1,"white");
    ctx.fillStyle = gradient;
    fillSector(ctx, 
      centerX+sectorSpacing*(Math.pow(-1, iQuad%3>0 )), 
      centerY+sectorSpacing*(Math.pow(-1, iQuad>=2 )), 
      innerQuadRadius, outerQuadRadius,
      0+90*iQuad, 90+90*iQuad);
  }


 }

