// depends on annulus.js

/******************************************* 
* 
* board object-making function
*
*******************************************/
var SimonBoard = function (spec){
  spec = spec || {};
  
  // DOM canvas ID fields
  this.canvasID = spec.canvasID || "boardCanvas";

  // geometry values
  this.width = spec.width || 300;
  this.height = spec.height || 300;
  this.centerX = spec.centerX || this.width/2;
  this.centerY = spec.centerY || this.height/2;

};

/******************************************* 
* 
* An immediately invoked function to add methods
* and data to the SimonBoard object prototype.
*
*******************************************/
(function() {

  // colors for drawing the board
  var onColors = ["#FF0000", "#00FF00", "#3344FF", "#FFA500"];
  var offColors = ["#BB0000", "#00BB00", "#3040BB", "#BB8500"];



/******************************************* 
*
* Draw the game board
*
* Useful fields for the drawSpec object:
* 	{ 	canvas: the canvas on which to draw the board
*   	centerX: the center X coordinate, in canvas coords
*		centerY: the center Y coordinate, in canvas coords
*		event: optional mouse event
*		mouseDown: optional boolean
*					true=> mouseDown event, false=> mouseUp event
*	}
*******************************************/
  var draw = function(drawSpec) {
   drawSpec = drawSpec || {};
   var canvas = drawSpec.canvas || document.getElementById(this.canvasID);
   var e = drawSpec.event;
   var mouseDown = drawSpec.mouseDown;

   // update center coordinates
   this.centerX = drawSpec.centerX || this.centerX;
   this.centerY = drawSpec.centerY || this.centerY;

   var ctx = canvas.getContext("2d");
   if ( e && mouseDown ) {
     var rect = canvas.getBoundingClientRect();
     var mouseX = e.clientX - rect.left;
     var mouseY = e.clientY - rect.top;
   }

   // board values
   var boardSize = Math.min(this.width, this.height);
   var bigRadius = 0.9*boardSize/2;
   var innerButtonRadius = 0.25*boardSize/2;
   var outerButtonRadius = 0.7*boardSize/2;

   var sectorSpacing = bigRadius*0.05;

   var buttonInfo = { centerX: this.centerX,
                      centerY: this.centerY,
                      innerRadius: innerButtonRadius,
                      outerRadius: outerButtonRadius,
                      sectorSpacing: sectorSpacing};

   // draw center black circle
   var gradient = ctx.createRadialGradient(this.centerX,this.centerY,0,
                                           this.centerX,this.centerY,bigRadius);
   gradient.addColorStop(0.95,"#303030");
   gradient.addColorStop(1,"#DDDDDD");
   ctx.fillStyle = gradient;
   ctx.arc(this.centerX, this.centerY, bigRadius, 0, 2*Math.PI);
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

    var gradient = ctx.createRadialGradient(gradCenterX, gradCenterY, gradInnerR,
                                            gradCenterX, gradCenterY, gradOuterR);

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
    var gradInnerR = buttonInfo.innerRadius;
    var gradOuterR = 1.8*buttonInfo.outerRadius;

    var gradCenterX = buttonInfo.centerX;
    var gradCenterY = buttonInfo.centerY;

    var gradient = ctx.createRadialGradient(gradCenterX, gradCenterY, gradInnerR,
                                            gradCenterX, gradCenterY, gradOuterR);

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

    ctx.annulus( 
      buttonInfo.centerX+buttonInfo.sectorSpacing*xSign, 
      buttonInfo.centerY+buttonInfo.sectorSpacing*ySign, 
      buttonInfo.innerRadius, buttonInfo.outerRadius,
      startAngle, endAngle);
  }


  var onClick = function(event, mouseDown) { 
	  this.draw({event: event, mouseDown: mouseDown});
  };

  SimonBoard.prototype.draw = draw;
  SimonBoard.prototype.onClick = onClick;
  SimonBoard.prototype.onColors = onColors;
  SimonBoard.prototype.offColors = offColors;
})();
