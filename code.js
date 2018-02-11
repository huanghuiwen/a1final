//code.js
function setupArray (array) {
  var i=0,j=0,temp=null;
  for (i = array.length - 1; i > 0; i--) {
	j = Math.floor(Math.random() * (i + 1))
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    
    temp=array[i].x;
    array[i].x=array[j].x;
    array[j].x=temp;
  }
  return array;
}

function start(){
    myCanvas=document.getElementById("myCanvas");
    ctx=myCanvas.getContext("2d");
    var widthRatio=0.50;
    var heightRatio=0.50;

    myCanvas.width = window.innerWidth*widthRatio;
    myCanvas.height = window.innerHeight*heightRatio;
    
    var barSettings={
        width:25,
        heightMultiplier:20,
        margin:30 
    }
    
    var swapInterval=null;
    var switchFlag=false;	
    var colorsArray=["yellow","black","red","green","blue","orange","purple","lightgreen","pink", "grey"]
    var barsArray=[];

    document.getElementById("setNumber").onclick=function(){
       	barsArray=setupArray(barsArray);
        drawBars();
    }
    document.getElementById("bubbleSort").onclick=function(){
        document.getElementById("setNumber").disabled=true;
        document.getElementById("bubbleSort").disabled=true;
        bubbleSort(barsArray);
        
        sortInterval=setInterval(function(){
        sorted=true;
          for(i=0;i<barsArray.length-1;i++){
               if(barsArray[i].x>barsArray[i+1].x) 
                    sorted=false;
            }
            if(sorted){
               clearInterval(sortInterval);
               document.getElementById("setNumber").disabled=false;
			   document.getElementById("bubbleSort").disabled=false;
			   document.getElementById("info").innerHTML="Number Sort Completed!";
            }
        },1000);
        
    }
    
    xBuffer=barSettings.margin*2;
	for(i=1;i<11;i++){
        barsArray.push({
            value:i,
            width:barSettings.width,
            height:barSettings.heightMultiplier*i,
            x:xBuffer,
            y:myCanvas.height-barSettings.heightMultiplier*i-10,
            color:colorsArray[i%colorsArray.length]
        });
        xBuffer=barSettings.width+barSettings.margin+xBuffer;		
    }
    
    function drawBars(){
        ctx.fillStyle="lightblue"; 
		ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
        xBuffer=barSettings.margin*2;
        for(i=0;i<barsArray.length;i++){
            bar=barsArray[i];
            ctx.beginPath();
            ctx.fillStyle=bar.color;
            ctx.rect(bar.x,bar.y,bar.width,bar.height);
            
            ctx.fill(); 
            ctx.font="20px Times New Roman";
            ctx.fillStyle="black"; ctx.fillText(bar.value,bar.x+barSettings.width/4,bar.y-barSettings.margin);
            ctx.closePath();
            
        }
    }
    
    function swapBars(barA,barB){

        function swapAnimation(){
            drawBars();
            
            if(barA.x>=xB || barB.x<=xA){
                clearInterval(swapInterval);
                swapInterval=null;
                switchFlag=false;
            }
            else{
                barA.x++;
                barB.x--;
            }
        }
        
        if(!swapInterval){
            xA=barA.x;
            xB=barB.x;
            switchFlag=true;			
            swapInterval=setInterval(swapAnimation ,33);
        }
        else{
            setTimeout(swapBars.bind(null,barA,barB),1000);
        }
    }

    function bubbleSort(a){
        var switched;
        do {
            switched = false;
			for (var i=0; i < a.length-1; i++) {
                 if (a[i].value > a[i+1].value) {                   
                    swapBars(a[i],a[i+1]);                    
                    var temp = a[i];
                    a[i] = a[i+1];
                    a[i+1] = temp;                   
					switched = true;
                }
            }
        } while (switched);	
    }
    drawBars();
}

window.onload=start;