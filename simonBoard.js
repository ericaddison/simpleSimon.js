
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
