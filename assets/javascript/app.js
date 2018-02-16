var triviaQuestions = [{
	question: " What is the name of the dimensional plane where Kryptonian criminals were exiled for their crimes?",
	answerList: ["Zimbardo's Prison", "Bizzaro World", "The Phantom Zone", "No Man's Land"],
	answer: 2
},{
	question: "What super-villain killed the Man of Steel in Superman #75?",
	answerList: ["Braniac", "Lex Luthor", "Darkseid", "Doomsday"],
	answer: 3
},{
	question: "Who created Superman?",
	answerList: ["Stan Lee", "Bob Kane", "Joe Shuster", "Joe Shuster & Jerry Siegel"],
	answer: 3
},{
	question: " What is Superman's Kryptonian name?",
	answerList: ["Kal-El", "Jor-El", "Zor-El", "Car-El"],
	answer: 0
},{
	question: "What was the name of Superman's birth mother?",
	answerList: ["Faora", "Lara", "Xala", "Kara"],
	answer: 1
},{
	question: "Who did Superman entrust with a Kryptonite ring to stop him if he ever turned evil?",
	answerList: ["Wonder Woman", "Lois Lane", "Batman", "Supergirl"],
	answer: 2
},{
	question: "What object is Superman holding on the cover of Action Comics #1?",
	answerList: ["A rocket", "A car", "Kryptonite", "Lois Lane"],
	answer: 1 
},{
	question: "Which of Superman's enemies is an imp from the fifth dimension?",
	answerList: ["Doomsday", "Bizarro", "Jax-Ur", "Mr. Mxyzptlk"],
	answer: 3
},{
	question: "Who portrayed Clark Kent in the television show 'Smallville'?",
	answerList: ["Tom Welling", "Brandon Routh", "John Schneider", "Michael Rosenbaum"],
	answer: 0
},{
	question: "Who is the Editor-in-Chief of the Daily Planet?",
	answerList: ["Cat Grant", "Perry White", "Lois Lane", "Jimmy Olsen"],
	answer: 1
},{
	question: "What color Kryptonite is fatal to Bizarro creatures?",
	answerList: ["Red", "Black", "Green", "Blue"],
	answer: 3
},{
	question: "Which character is a warlord from Superman's home planet of Krypton?",
	answerList: ["Grodd", "Zor-El", "Braniac", "Zod"],
	answer: 3
},{
	question: "When was Superman's 'S' shield first explained to be the El family crest?",
	answerList: ["Superman (1978)", "Action Comics #232", "Smallville (2001-11)", "The Adventures of Superman (1952-58"],
	answer: 0
}];

var gifArray = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10", "question11", "question12", "question13"];
var currentQuestion; 
var correctAnswer;
var incorrectAnswer;  
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Right on!",
	incorrect: "Wrong!",
	endTime: "Sorry, times up!",
	finished: "Now, for the final tally!"
}

$("#startBtn").on("click", function(){
	$(this).hide();
	newGame();
});

$("#resetBtn").on("click", function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$("#endMessage").empty();
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gifs").empty();
	answered = true;
	
	//here the code generates new questions & answerList
	$(".question").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");
	for(var i = 0; i < 4; i++){
		var options = $("<div>");
		options.text(triviaQuestions[currentQuestion].answerList[i]);
		options.attr({"data-index": i });
		options.addClass("userOption");
		$(".answerList").append(options);
	}
	countdown();
	//once user selects their answer this will pause the timer and display the answer
	$(".userOption").on("click",function(){
		userSelect = $(this).data("index");
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
	//displays the timer countdown
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$("#currentQuestion").empty();
	$(".userOption").empty(); 
	$(".question").empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $("#gifs").html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');	//checks whether the asnwer is correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$("#message").html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$("#correctedAnswer").html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$("#message").html(messages.endTime);
		$("#correctedAnswer").html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
};

function scoreboard(){
	$("#timeLeft").empty();
	$("#message").empty();
	$("#correctedAnswer").empty();
	$("#gifs").empty();

	$("#endMessage").html(messages.finished);
	$("#correctAnswers").html("Right Answers: " + correctAnswer);
	$("#incorrectAnswers").html("Wrong Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#resetBtn").addClass("startOver");
	$("#resetBtn").show();
	$("#resetBtn").html("Try again?");
}