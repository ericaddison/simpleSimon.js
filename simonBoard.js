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
  var innerButtonRadius = 0.25*boardSize/2;
  var outerButtonRadius = 0.7*boardSize/2;
  var centerX = board.width/2;
  var centerY = board.height/2;
  var sectorSpacing = bigRadius*0.05;

  var onColors = ["#FF0000", "#00FF00", "#3344FF", "#FFA500"];
  var offColors = ["#BB0000", "#00BB00", "#3040BB", "#BB8500"];
  var buttonInfo = {centerX: centerX,
                    centerY: centerY,
                    innerRadius: innerButtonRadius,
                    outerRadius: outerButtonRadius,
                    sectorSpacing: sectorSpacing};

  // draw center black circle
  var gradient = ctx.createRadialGradient(centerX,centerY,0,centerX,centerY,bigRadius);
  gradient.addColorStop(0.95,"#303030");
  gradient.addColorStop(1,"#DDDDDD");
  ctx.fillStyle = gradient;
  ctx.arc(centerX, centerY, bigRadius, 0, 2*Math.PI);
  ctx.fill();

  // draw the Buttons

  for( iButton=0; iButton<4; iButton++ ){
    buttonInfo.buttonNumber = iButton;
    computeButtonPath(ctx, buttonInfo);

    buttonInfo.on = ( e && mouseDown && ctx.isPointInPath(mouseX, mouseY) );
    buttonInfo.color = (buttonInfo.on) ? onColors[iButton] : offColors[iButton];

    ctx.fillStyle = (buttonInfo.on) ? getOnButtonGradient(ctx, buttonInfo) 
                                  : getOffButtonGradient(ctx, buttonInfo);
    ctx.fill();

  }


 }


/******************************************* 
*
* Get the gradient needed for drawing an ON button (pressed button)
*
*******************************************/
 var getOnButtonGradient = function(ctx, buttonInfo) {
    var halfRadius = (buttonInfo.innerRadius + buttonInfo.outerRadius)/2.5;
    var xSign = Math.pow(-1, buttonInfo.buttonNumber%3>0);
    var ySign = Math.pow(-1, buttonInfo.buttonNumber>=2 );

    var gradCenterX = buttonInfo.centerX + halfRadius*xSign;
    var gradCenterY = buttonInfo.centerY + halfRadius*ySign;

    var gradInnerR = 0;
    var gradOuterR = buttonInfo.outerRadius * 0.7;

    var gradient = ctx.createRadialGradient(gradCenterX,gradCenterY,
                                            gradInnerR,
                                            gradCenterX,gradCenterY,
                                            gradOuterR);

    gradient.addColorStop(1,buttonInfo.color);
    gradient.addColorStop(0,"white");

    return gradient;
 }



/******************************************* 
*
* Get the gradient needed for drawing an OFF button (unpressed button)
*
*******************************************/
 var getOffButtonGradient = function(ctx, buttonInfo) {
    var gradCenterX = buttonInfo.centerX;
    var gradCenterY = buttonInfo.centerY;

    var gradInnerR = buttonInfo.innerRadius;
    var gradOuterR = 1.8*buttonInfo.outerRadius;

    var gradient = ctx.createRadialGradient(gradCenterX,gradCenterY,
                                            gradInnerR,
                                            gradCenterX,gradCenterY,
                                            gradOuterR);

    gradient.addColorStop(0,buttonInfo.color);
    gradient.addColorStop(1,"white");

    return gradient;
 }


/******************************************* 
*
* Get the path for a button, but don't fill
*
*******************************************/
 var computeButtonPath = function(ctx, buttonInfo) {
    var xSign = Math.pow(-1, buttonInfo.buttonNumber%3>0);
    var ySign = Math.pow(-1, buttonInfo.buttonNumber>=2 );
    var startAngle = 90*buttonInfo.buttonNumber;
    var endAngle = startAngle+90;

    makeSectorPath(ctx, 
      buttonInfo.centerX+buttonInfo.sectorSpacing*xSign, 
      buttonInfo.centerY+buttonInfo.sectorSpacing*ySign, 
      buttonInfo.innerRadius, buttonInfo.outerRadius,
      startAngle, endAngle);
 }

