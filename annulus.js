
var augmentCanvasRenderingContext2D = function(){

/******************************************* 
*
* Creates a partial annulus path on the calling graphics context
* inputs:
*		centerX - x coordinate of circle center
*		centerY - y coordinate of cirlce center
*		innerRadius - radius of inner circle
*		outerRadius - radius of outer circle
*		startAngle - angle to start at, in degrees, measured CW from (1,0)
*		endAngle - angle to end at, in degrees, measured CW from (1,0)
*		anticlockwise - boolean, arc draw direction is CW (default, false) or CCW (true)
*
*******************************************/
	 var annulus = function(centerX, centerY, 
		      innerRadius, outerRadius, 
		      startAngle, endAngle, 
		      anticlockwise) {
	  var th1 = startAngle*Math.PI/180;
	  var th2 = endAngle*Math.PI/180;
	  var startOfOuterArcX = outerRadius*Math.cos(th2) + centerX;
	  var startOfOuterArcY = outerRadius*Math.sin(th2) + centerY;

	  this.beginPath();
	  this.arc(centerX, centerY, innerRadius, th1, th2, anticlockwise);
	  this.lineTo(startOfOuterArcX, startOfOuterArcY);
	  this.arc(centerX, centerY, outerRadius, th2, th1, !anticlockwise);
	  this.closePath();
	}


CanvasRenderingContext2D.prototype.annulus = annulus;

}();
