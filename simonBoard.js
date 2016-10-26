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
  var onClick = function(event, mouseDown) { drawBoard(this, event, mouseDown); };

  var width = spec.width || 300;
  var height = spec.height || 300;
  var activeQuadrant = 0;
  return {
    getCanvasID: getCanvasID,
    width: width,
    height: height,
    onClick: onClick
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
  newCanvas.onmousedown = function(event){ board.onClick(event, true); };
  newCanvas.onmouseup = function(event){ board.onClick(event, false); };
  parentElement.appendChild(newCanvas);
  return newCanvas;
 }



/******************************************* 
*
* Draw the game board
*
*******************************************/
 var drawBoard = function(board, e, mouseDown) {
  board = board || defaultBoard;
  var canvas = document.getElementById(board.getCanvasID());
  var ctx = canvas.getContext("2d");

  if ( e && mouseDown ) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = e.clientX - rect.left;
    var mouseY = e.clientY - rect.top;
  }

  // board values
  var boardSize = Math.min(board.width, board.height);
  var bigRadius = 0.9*boardSize/2;
  var innerQuadRadius = 0.25*boardSize/2;
  var outerQuadRadius = 0.7*boardSize/2;
  var centerX = board.width/2;
  var centerY = board.height/2;
  var sectorSpacing = bigRadius*0.05;

  var onColors = ["#FF0000", "#00FF00", "#3344FF", "#FFA500"];
  var offColors = ["#BB0000", "#00BB00", "#3040BB", "#BB8500"];
  var quadInfo = {centerX: centerX,
                    centerY: centerY,
                    innerRadius: innerQuadRadius,
                    outerRadius: outerQuadRadius,
                    sectorSpacing: sectorSpacing};

  // draw center black circle
  var gradient = ctx.createRadialGradient(centerX,centerY,0,centerX,centerY,bigRadius);
  gradient.addColorStop(0.95,"#303030");
  gradient.addColorStop(1,"#DDDDDD");
  ctx.fillStyle = gradient;
  ctx.arc(centerX, centerY, bigRadius, 0, 2*Math.PI);
  ctx.fill();

  // draw the quadrants

  for( iQuad=0; iQuad<4; iQuad++ ){
    quadInfo.quadrant = iQuad;
    computeQuadrantPath(ctx, quadInfo);

    quadInfo.on = ( e && mouseDown && ctx.isPointInPath(mouseX, mouseY) );
    quadInfo.color = (quadInfo.on) ? onColors[iQuad] : offColors[iQuad];

    ctx.fillStyle = (quadInfo.on) ? getOnQuadrantGradient(ctx, quadInfo) 
                                  : getOffQuadrantGradient(ctx, quadInfo);
    ctx.fill();

  }


 }


/******************************************* 
*
* Get the gradient needed for drawing an ON quadrant (pressed button)
*
*******************************************/
 var getOnQuadrantGradient = function(ctx, quadInfo) {
    var halfRadius = (quadInfo.innerRadius + quadInfo.outerRadius)/2.5;
    var xSign = Math.pow(-1, quadInfo.quadrant%3>0);
    var ySign = Math.pow(-1, quadInfo.quadrant>=2 );

    var gradCenterX = quadInfo.centerX + halfRadius*xSign;
    var gradCenterY = quadInfo.centerY + halfRadius*ySign;

    var gradInnerR = 0;
    var gradOuterR = quadInfo.outerRadius * 0.7;

    var gradient = ctx.createRadialGradient(gradCenterX,gradCenterY,
                                            gradInnerR,
                                            gradCenterX,gradCenterY,
                                            gradOuterR);

    gradient.addColorStop(1,quadInfo.color);
    gradient.addColorStop(0,"white");

    return gradient;
 }



/******************************************* 
*
* Get the gradient needed for drawing an OFF quadrant (unpressed button)
*
*******************************************/
 var getOffQuadrantGradient = function(ctx, quadInfo) {
    var gradCenterX = quadInfo.centerX;
    var gradCenterY = quadInfo.centerY;

    var gradInnerR = quadInfo.innerRadius;
    var gradOuterR = 1.8*quadInfo.outerRadius;

    var gradient = ctx.createRadialGradient(gradCenterX,gradCenterY,
                                            gradInnerR,
                                            gradCenterX,gradCenterY,
                                            gradOuterR);

    gradient.addColorStop(0,quadInfo.color);
    gradient.addColorStop(1,"white");

    return gradient;
 }


/******************************************* 
*
* Get the path for a button, but don't fill
*
*******************************************/
 var computeQuadrantPath = function(ctx, quadInfo) {
    var xSign = Math.pow(-1, quadInfo.quadrant%3>0);
    var ySign = Math.pow(-1, quadInfo.quadrant>=2 );
    var startAngle = 90*quadInfo.quadrant;
    var endAngle = startAngle+90;

    makeSectorPath(ctx, 
      quadInfo.centerX+quadInfo.sectorSpacing*xSign, 
      quadInfo.centerY+quadInfo.sectorSpacing*ySign, 
      quadInfo.innerRadius, quadInfo.outerRadius,
      startAngle, endAngle);
 }

