var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');

function DrawAxes(){
  context.beginPath();
  context.strokeStyle='black';
  context.moveTo(40,20);
  context.lineTo(40,450);
  context.lineTo(900,450);
  context.stroke();
}

function DrawXgrids(){
  for(i=0; i<canvas.height; i+=10){
    context.strokeStyle = '#ADD8E6';
    context.moveTo(0,i);
    context.lineTo(canvas.width, i);
    context.stroke();
  }
}

function DrawYgrids(){
  for(i=0; i<canvas.width; i+=10){
    context.strokeStyle = '#ADD8E6';
    context.moveTo(i,0);
    context.lineTo(i, canvas.height);
    context.stroke();
  }
}

function PlotScale(){
  var yPlot=0;
  var xPlot=0;
  for(i=450; i>=20;i-=20){
    context.strokeText(yPlot,20,i);
    yPlot++;
  }
  for(i=40;i<=900;i+=20){
    context.strokeText(xPlot, i, 470);
    xPlot++;
  }
}
var xMath =0, yMath, xOldMath=0;
 var math = mathjs();
 var scope = {x:0};
 var tree;

function PlotFunction(){

context.save();
context.translate(40,450);
context.strokeStyle='black';
context.moveTo(0,0);
for(xOldMath=0;xOldMath<=860;xOldMath+=1){
  xMath=xOldMath/20;
  yMath = -20*(evaluateexp(xMath));
  context.lineTo(xOldMath,yMath);
}
context.stroke();
context.restore();
}

context.fillStyle='white';
context.fillRect(0,0,canvas.width,canvas.height);
DrawXgrids();
DrawYgrids();
DrawAxes();
PlotScale();

var input = document.querySelector('#inputfield');
input.value = "";
var submit = document.querySelector('#button')
//get function
  submit.addEventListener('click',()=>{
    var expr = input.value;
    console.log(expr);
    tree = math.parse(expr,scope);
    input.disabled = true;
  PlotFunction();
})

function evaluateexp(xMath){
  scope.x=xMath;
  return tree.eval();
}

var newplot = document.querySelector('#newplot');
newplot.addEventListener('click', ()=>{
  input.value = '';
  location.reload();
});
