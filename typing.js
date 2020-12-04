var accuracy=0;
var count=1;
var timer=[0,0,0,0];
var interval;
var timerrunning=false;
var fulltime;
var speed;
var random;
var error=0;

arr=["Being human makes us susceptible to the onset of feelings.The role of these emotions varies. Some of them are useful while others may be harmful. The use of social media for self-expression has reached a point that it makes us feel we can say anything. This begins when we see people expressing anything and everything that come to mind.",
      "When we see everyone else voicing their likes and dislikes, their irritations and desires we tend to imitate what they do. And because many engage in this, we think that it is normal and healthy. However, when we get used to unbridled self-expression, we come to believe that all feelings are valid. We become convinced that in real life, we should also act on our emotions and our impulses.", 
     "Using social media this way erodes our ability to regulate our actions and reactions. To illustrate, when something small irritates us we think that it's okay to feel this way. But isn't it better to foster one's patience and resilience instead of immediately complaining? Or when we develop an attraction to someone despite that person being in a relationship.",
     "Your goal is to duplicate the provided text"];

random=Math.floor(Math.random()*4);
document.getElementById('para').innerHTML=arr[random];
const originText=document.querySelector(".origintext p ").innerHTML;
console.log(originText);
const textArea=document.querySelector("#textarea");
var totalchar=originText.length;

const textWrapper=document.querySelector(".textwrapper");
const theTimer= document.querySelector(".timer");
const resets=document.querySelector("#reset");
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
     document.getElementById('wpm').innerHTML= "Your typing speed is "+speed+"wpm and accuracy is "+accuracy+"%" ;
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
textarea.addEventListener("input",start,false);
textarea.addEventListener("keyup",function(e){spellCheck(e)},false);
resets.addEventListener("click",reset,false);