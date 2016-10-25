
/******************************************* 
* 
* board object-making function
*
*******************************************/
 var makeBoard = function (spec){
  spec = spec || {};
  var canvasID = spec.canvasID || "boardCanvas";
  var width = spec.width || 300;
  var height = spec.height || 300;
  return {
    getCanvasID: function() { return canvasID; },
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
* Draw a sector of a circle on a canvas graphics context
* inputs:
*		ctx - the graphics context
*		centerX - x coordinate of circle center
*		centerY - y coordinate of cirlce center
*		innerRadius - radius of inner circle
*		outerRadius - radius of outer circle
*		startAngle - angle to start at, in degrees, measured CW from (1,0)
*		endAngle - angle to end at, in degrees, measured CW from (1,0)
*		anticlockwise - boolean, arc draw direction is CW (default, false) or CCW (true)
*
*******************************************/
 var strokeSector = function(ctx, centerX, centerY, 
          innerRadius, outerRadius, 
          startAngle, endAngle, 
          anticlockwise) {  

  var th1 = startAngle*Math.PI/180;
  var th2 = endAngle*Math.PI/180;
  var startOfOuterArcX = outerRadius*Math.cos(th2) + centerX;
  var startOfOuterArcY = outerRadius*Math.sin(th2) + centerY;

  ctx.beginPath();
  ctx.arc(centerX, centerY, innerRadius, th1, th2, anticlockwise);
  ctx.lineTo(startOfOuterArcX, startOfOuterArcY);
  ctx.arc(centerX, centerY, outerRadius, th2, th1, !anticlockwise);
  ctx.closePath();
  ctx.stroke();
 }


/******************************************* 
*
* Fill a sector of a circle on a canvas graphics context
* inputs:
*		ctx - the graphics context
*		centerX - x coordinate of circle center
*		centerY - y coordinate of cirlce center
*		innerRadius - radius of inner circle
*		outerRadius - radius of outer circle
*		startAngle - angle to start at, in degrees, measured CW from (1,0)
*		endAngle - angle to end at, in degrees, measured CW from (1,0)
*		anticlockwise - boolean, arc draw direction is CW (default, false) or CCW (true)
*
*******************************************/
 var fillSector = function(ctx, centerX, centerY, 
          innerRadius, outerRadius, 
          startAngle, endAngle, 
          anticlockwise) {  

  var th1 = startAngle*Math.PI/180;
  var th2 = endAngle*Math.PI/180;
  var startOfOuterArcX = outerRadius*Math.cos(th2) + centerX;
  var startOfOuterArcY = outerRadius*Math.sin(th2) + centerY;

  ctx.beginPath();
  ctx.arc(centerX, centerY, innerRadius, th1, th2, anticlockwise);
  ctx.lineTo(startOfOuterArcX, startOfOuterArcY);
  ctx.arc(centerX, centerY, outerRadius, th2, th1, !anticlockwise);
  ctx.closePath();
  ctx.fill();
 }
