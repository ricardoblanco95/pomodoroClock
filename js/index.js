$(document).ready(function(){
  var countBreak = 0;
  var countWork = 0;
  var seconds = 0;
  var totalSeconds = 0;
  var b = false;
  var c = true;
  var d = true;
  var stop = false;
  var workFlag=false;
  var countBlock=true;
  var gradCount = 0;
  var clock;
  //n = Math.round(15.45*1000/20)/10;
  //var str = n.toString();
  //alert(str);
  //seconds = 4; //TEST VALUE.
  var countDown = function(){
    //seconds = 0;
    if(workFlag){
      if(d){
       countBlock=false;
       $('body').css('background-color','rgb(0,101,175)');
       $('h1, #breakTitle, #workTitle, #status, #timer, #start, #reset,#slashSr, #author').css('color','rgb(210,210,0)');
       $('#breakPlus, #breakMinus, #workPlus, #workMinus, #breakMin, #workMin, #slash, #link').css('color','rgb(227,34,39)');
       $('#status').text('WORK');
       $('#progBar').css('border','4px solid rgb(227,34,39)');
       $('#progBar').css('background-image','linear-gradient(to right, rgb(0,101,175) 100%, rgb(0,101,175) 0%)');
       d = false;    
      }
      if(countWork>0 && seconds===-1){
        if(c){
          $('#status').text('WORK');
          totalSeconds = countWork*60;
          c=!c;
        }
        seconds = 59;
        countWork--;
      }
      var temp = gradCount*100/(totalSeconds)
      //alert(temp);
      var strSec = '';
      var strCount = '';
      if(seconds.toString().length===1){
        strSec='0';
      }
      if(countWork.toString().length===1){
        strCount='0';
      }
    
      $('#timer').text(strCount+countWork+':'+strSec+seconds);
      $('#progBar').css('background-image','linear-gradient(to right, rgb(227,34,39) '+ temp +'%, rgb(0,101,175) 0%)');
      gradCount++;
      seconds--;
      if(countWork===0 && seconds===-1){
        workFlag=false;
        c=true;
        d=true;
        gradCount=0;
        seconds = 0;
         $('#progBar').css('background-image','linear-gradient(to right, rgb(227,34,39) 100%, rgb(0,101,175) 0%)');
        //resetVar();
      }
    }else{
      if(d){
       countBlock=false;
       $('body').css('background-color','rgb(61,218,107)');
       $('h1, #breakTitle, #workTitle, #status, #timer, #start, #reset,#slashSr, #author').css('color','rgb(236,118,0)');
       $('#breakPlus, #breakMinus, #workPlus, #workMinus, #breakMin, #workMin, #slash, #link').css('color','white');
       $('#status').text('BREAK');
       $('#progBar').css('border','4px solid white');
       $('#progBar').css('background-image','linear-gradient(to right, rgb(61,218,107) 100%, rgb(61,218,107) 0%)');
       d = false;    
      }
      if(countBreak>0 && seconds===-1){
        if(c){
          totalSeconds = countBreak*60;
          c=!c;
        }
        seconds = 59;
        countBreak--;
      }
      var temp = gradCount*100/(totalSeconds)
      var strSec = '';
      var strCount = '';
      if(seconds.toString().length===1){
        strSec='0';
      }
      if(countWork.toString().length===1){
        strCount='0';
      }
      $('#timer').text(strCount+countBreak+':'+strSec+seconds);
      $('#progBar').css('background-image','linear-gradient(to right, white '+ temp +'%, rgb(61,218,107) 0%)');
      gradCount++;
      seconds--;
      if(countBreak===0 && seconds===-1){
        $('#progBar').css('background-image','linear-gradient(to right, white 100%, rgb(61,218,107) 0%)');
        resetVar();
      }
    }
   
    
  };
  var resetVar = function(){
    countBreak = 0;
    countWork = 0;
    seconds = 0;
    stop = false;
    b = false;
    c=true;
    d=true;
    workFlag = false;
    countBlock=true;
    gradCount = 0;
    totalSeconds = 0;
    clearInterval(clock);
    $('#timer').text('00:00');
    $('#start').text('START');
    $('#progBar').css('background-image','linear-gradient(to right, white 100%, white 0%)');
    $('body').css('background-color','rgb(97,97,97)');
       $('h1, #breakTitle, #workTitle, #status, #timer, #start, #reset,#slashSr, #author').css('color','rgb(22,22,22)');
       $('#breakPlus, #breakMinus, #workPlus, #workMinus, #breakMin, #workMin, #slash, #link').css('color','white');
       $('#status').text('---');
        $('#progBar').css('border','4px solid white');
       $('#progBar').css('background-image','linear-gradient(to right, rgb(97,97,97) 100%, rgb(97,97,97) 0%)');
    $('#breakMin, #workMin').text('00');
  };
  //var count = 10;
  //var clock = setInterval(function(){console.log(count); count--; if(count===-1){ clearInterval(clock)} },1000);
    
  $('#breakPlus, #breakMinus').click(function(){
    if(countBlock){
      b = true;
      switch($(this).text()){
        case '+': if(countBreak<25){countBreak++;}else{countBreak=0;} ;break;
        case '-': if(countBreak>0){countBreak--;}else{countBreak=25;} ;break;
                         }
      if(countBreak.toString().length === 1){
      $('#breakMin').text('0'+countBreak);
      }else{
       $('#breakMin').text(countBreak);
      }
    }
  });
  
  $('#workPlus, #workMinus').click(function(){
    if(countBlock){
      b = true;
      workFlag = true;
      switch($(this).text()){
        case '+': if(countWork<25){countWork++;}else{countWork=0;} ;break;
        case '-': if(countWork>0){countWork--;}else{countWork=25;} ;break;
                         }
    if(countWork.toString().length === 1){
      $('#workMin').text('0'+countWork);
      }else{
      $('#workMin').text(countWork);
     }
    }
  });
   
  $('#start').click(function(){
    //alert('ok');
    if(!stop){
      if(b){
        stop = true;
        clock = setInterval(function(){ countDown() },1000);
        $(this).text('PAUSE');
      }else{
        stop=false;
      }
    }else{
      stop=false;
      clearInterval(clock);
      $(this).text('START');
    }
  });
  
  $('#reset').click(function(){
    resetVar();
  });
    
}); //END