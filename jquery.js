var playing = false;
var score; 
var trialsLeft;
var step;
var action; // for step interval action
var fruits = ['apple','banana','berry','cherries','grape','watermelon','mango','orange','peach','pear','Pineapple'];
$(function(){

    //click on start reset button
    $("#startreset").click(function(){
        if(playing == true){
            location.reload();

        }else{
            playing = true;  // game initiated
            score = 0;
            $("#scorevalue").html(score);

            //show trials left
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();

            // hide game over box
            $("#gameOver").hide();

            //change button text to reset game
            $("#startreset").html("Reset Game");

            //start sending fruits
            startAction();
        }
    });

    // Slice a fruit
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score); //update score

        //document.getElementById("slicesound").play();
        $("#slicesound")[0].play(); 

        //stop fruit
        //stopAction();
        clearInterval(action);

        //hide fruit and slice fruit
        $("#fruit1").hide("explode");

        //send new fruit
        //startAction();
        setTimeout(startAction, 500);

    });

function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.png" class="life">');
    }
}

// Start sending fruits function

function startAction(){
    //$("#fruitsContainer").append('<img src="images/apple.png" class="fruit">');
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({'left': Math.round(550* Math.random()), 'top' : -50 });

    // generate a random step 
    step = 1 + Math.round(5*Math.random());
    
    //change step and move fruit down by one step every 10ms
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step);

        // Check if the fruit is too low
        if($("#fruit1").position().top > 
        $("#fruitsContainer").height()){
            //check if we have trials left
            if(trialsLeft > 1){
                $("#fruit1").show();
                chooseFruit(); //choose a random fruit
                $("#fruit1").css({'left': Math.round(550* Math.random()), 'top' : -50 });
                step = 1 + Math.round(5*Math.random());

                // reduce trail by one
                trialsLeft--;

                addHearts();
            }else{ // Game Over
                playing = false;  // we are not playing again
                $("#startreset").html("Start Game");  // change button to start Game
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over</p><p>Your Score is '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, 10);

}

// generate a random fruit

function chooseFruit(){
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(10*Math.random())] + '.png');
}


// Stop dropping fruits
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}

});