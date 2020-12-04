
const textArea=document.querySelector("#textarea");
var count=1;

arr=["A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea.","A paragraph consists of one or more sentences.",
     "Though not required by the syntax of any languagae"];
var random;
random=Math.floor(Math.random()*3);
document.getElementById('para').innerHTML=arr[random];
var error=0;
const originText=document.querySelector(".origintext p ").innerHTML;
var totalchar=originText.length;
const textWrapper=document.querySelector(".textwrapper");
var accuracy=0;
const theTimer= document.querySelector(".timer");

const resets=document.querySelector("#reset");

var timer=[0,0,0,0];
var interval;
var timerrunning=false;
var fulltime;
var speed;
function spellCheck(e)
{
  textEntered=textArea.value;
  console.log(textEntered);
   let originTextMatch=originText.substring(0,textEntered.length);
   console.log(originTextMatch);
   if (textEntered==originText )
   {  
   	 clearInterval(interval);
   	 textWrapper.style.borderColor="green";
   	 console.log(count);
   	 let min=timer[0];
   	 let sec=timer[1]/60;
     fulltime=(min+sec); 
     speed=Math.floor(count/fulltime);
     console.log(speed);
      accuracy=Math.floor(((totalchar-error)/totalchar)*100);
     document.getElementById('textarea').style.display="none";
     document.getElementById('bottom').style.display="none";
     document.getElementById('wpm').style.display="block";
     document.getElementById('wpm').innerHTML= "Your typing speed is "+speed+"wpm accuracy is "+accuracy+"%" ;
   }
    else
    {      	
    	if(originTextMatch==textEntered)
    	{ 
          textWrapper.style.borderColor="blue";
           if(e.key==" ")
           { debugger;
           	console.log(e.key);
           	 count=count+1;
           	 console.log("word",count);
           }
    	}
    	else
    	{
    	  textWrapper.style.borderColor="orange";
    	  error=error+1;
    	}
    }
}
function leadingZero(time)
{
	if(time<=9)
	{
		time="0"+time;
	}
	return time;
}

function runTimer()
{
	let currentTime=leadingZero(timer[0])+ ":"+leadingZero(timer[1])+":"+leadingZero(timer[2]);
	theTimer.innerHTML=currentTime;
	timer[3]++;
	timer[0]=Math.floor((timer[3]/100)/60);
	timer[1]=Math.floor((timer[3]/100)-(timer[0]*60));
	timer[2]=Math.floor(timer[3]-(timer[1]*100)-(timer[0]*6000));
}

function start()
{    
	let textEnteredLength=textArea.value.length;
	console.log(textEnteredLength);

    if (textEnteredLength ===0 && !timerrunning)
    {   timerrunning=true;
    	interval=setInterval(runTimer,10);
    }
}
function reset()
{
	clearInterval(interval);
	interval=null;
	timer=[0,0,0,0];
	timerrunning=false;
	textArea.value="";
	theTimer.innerHTML="00:00:00";
	textWrapper.style.borderColor="grey";
}

textarea.addEventListener("keypress",start,false);
textarea.addEventListener("keyup",function(e){spellCheck(e)},false);
resets.addEventListener("click",reset,false);