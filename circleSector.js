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

  makeSectorPath(ctx, centerX, centerY, 
          innerRadius, outerRadius, 
          startAngle, endAngle, 
          anticlockwise);
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

  makeSectorPath(ctx, centerX, centerY, 
          innerRadius, outerRadius, 
          startAngle, endAngle, 
          anticlockwise);
  ctx.fill();
 }


/******************************************* 
*
* Creates a sector-shaped path on the given graphics context
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
 var makeSectorPath = function(ctx, centerX, centerY, 
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
}
