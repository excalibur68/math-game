var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;
//functions
//stop the counter
function stopCountDown(){
    clearInterval(action);
}
//hide the elements 
function hide(id){
    document.getElementById(id).style.display = "none";
}
//show the elements
function show(id){
    document.getElementById(id).style.display = "block";
}
//start the counter 
function startCountDown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("time remaining value").innerHTML = timeRemaining + ' sec';
        if(timeRemaining == 0){ //when game is over
            stopCountDown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game Over!</p><p>Your Score is " + score +".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}
function generateQA(){
    var x = 1 + Math.round(9 *Math.random());
    var y = 1 + Math.round(9 *Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML =  x + "x" + y ;
    var correctPosition = 1 + Math.round(3 *Math.random()); //between 1-4
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
    var answers = [correctAnswer];
    for(var i=1; i< 5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9 *Math.random()))*(1 + Math.round(9 *Math.random()));
            }while(wrongAnswer == correctAnswer || answers.indexOf(wrongAnswer) >= 0);
            answers.push(wrongAnswer);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
        } 
    }
}
//if we click on the start/reset botton
document.getElementById("startreset").onclick = function(){
    //if we are playing 
    if(playing == true){
        //reload the page
        location.reload();
    }else{ //if we are not playing 
        playing = true;
        //set score to 0
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
        //show countdown box
        show("timeremaining");
        timeRemaining = 60;
        document.getElementById("time remaining value").innerHTML = timeRemaining + ' sec';
        //hide the game over box
        hide("gameOver");
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //reduce time by 1sec
        startCountDown();
        
        //generate new Q&A
        generateQA();
    }
}
//clicking on an answer box
for(var i = 1; i<5;i++){
    document.getElementById("box" + i).onclick = function(){
        //check if we are playing
        if(playing == true){
            if(this.innerHTML == correctAnswer){
               //correct answer
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                //hide the wrong box and show the correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000)
                //generate new Q$A
                generateQA();
            }else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000)
            }
        }
    }
}

//if we click on answer box 
    //if we are playing 
        //correct?
            //yes
                //increase ;the score by one
                //show correct box
                //generate new Q&A
            //no 
                //show try again box