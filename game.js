var buttonColours=["red", "blue", "green", "yellow"];

var userClickedPattern=[];

var gamePattern=[];

var started=false;

var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text(" level " + level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function handler(){

        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);

})
function startOver(){
   level=0;
   started=false;
   gamePattern=[];
}

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

     console.log("success");

       if(userClickedPattern.length===gamePattern.length){
         setTimeout(function(){
         nextSequence();
         },1000);
       }

    }else{
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function(){
         $("body").removeClass("game-over");
        },200);
     $("h1").text("Game Over, Press Any Key to Restart");
     console.log("wrong");
     startOver();
     }
}

function nextSequence() {
      userClickedPattern=[];
    var randomNember=(Math.floor(Math.random()*4));
    var randomChosenColour = buttonColours[randomNember];
    gamePattern.push(randomChosenColour);
   
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;

    $("#level-title").text(" level "+level);

}

function playSound(name){

    var audio = new Audio("sounds/"+name+'.mp3');
    audio.play();

}

function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

}
