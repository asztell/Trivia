'use strict';



var difficulty = 0,
	counter,
	question,
	used_questions = [],
	testing = false,
	player_answer,

	$time = $('#time'),
	$q = $('#question'),
	$ad = $('#answers_display'),
	$dd = $('#difficulty_display');


//--------------------------------------------------------------
//	Random number generator function with upper and lower ranges
//--------------------------------------------------------------

function rand(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}


//-------------------------------------------------------------
//	Random question picker function 
//-------------------------------------------------------------

function getQuestion() {
	question = question_array[rand(0, question_array.length+1)];
}


//-------------------------------------------------------------
//	Last question saver function - avoids duplicates
//-------------------------------------------------------------

function setQuestion() {
	used_questions.append(question);
}



//-------------------------------------------------------------
//	Timer function 
//-------------------------------------------------------------

function startTimer(duration, time) {

	counter = setInterval(function() {

		time.text(duration);

		if(--duration < 0) {
			clearInterval(counter);
		}

		if(duration < 0 && testing !== true) {
			testAnswer();
		}

	}, 1000);

}


//-------------------------------------------------------------
//	Answer tester function 
//-------------------------------------------------------------

function testAnswer() {

	testing = true;
	console.log(testing);

	if(player_answer !== question['answer']) {
		$('#'+player_answer).html('<a class="answer list-group-item">'
			+question[player_answer]
			+'<span class="glyphicon glyphicon-remove"></span>'
		+'</a>');
	}

	$('#'+question['answer']).html('<a class="answer list-group-item">'
			+question[question['answer']]
			+'<span class="glyphicon glyphicon-ok"></span>'
		+'</a>');
	setTimeout(() => {displayQuestion()}, 3000);

	testing = false;
	console.log(testing);

}


//-------------------------------------------------------------
//	Display questions function 
//-------------------------------------------------------------


function displayQuestion() {

	startTimer(difficulty, $time);

	getQuestion();

	$q.html(question['question']);

	$dd.html('');

	$ad.html(
		'<a class="answer list-group-item">'+question['A']+'</a>'+
		'<a class="answer list-group-item">'+question['B']+'</a>'+
		'<a class="answer list-group-item">'+question['C']+'</a>'+
		'<a class="answer list-group-item">'+question['D']+'</a>'+
		'<a class="answer list-group-item">'+question['answer']+'</a>'+
		''
	);

	$('#answers_display').children().eq(0).attr('id', 'A');
	$('#answers_display').children().eq(1).attr('id', 'B');
	$('#answers_display').children().eq(2).attr('id', 'C');
	$('#answers_display').children().eq(3).attr('id', 'D');

	if(testing !== true) {
		setTimeout(() => {testAnswer()}, 5000);
	}

}


//-------------------------------------------------------------
//	jQuery
//-------------------------------------------------------------

$(document).ready(function() {

	$("#jquery_jplayer_1").jPlayer({
		
		ready: function() {
			
			$(this).jPlayer("setMedia", {
			
				mp3: "../Trivia/assets/audio/st.mp3"
			
			}).jPlayer("play");
		
			var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
			
			var kickoff = function () {
				$("#jquery_jplayer_1").jPlayer("play");
				document.documentElement.removeEventListener(click, kickoff, true);
			};
			
			document.documentElement.addEventListener(click, kickoff, true);
		},

		swfPath: "/js",
		loop: true

	});


	$('.difficulty').on('click', function() {
		
		if($(this).attr('id') === 'easy') {
			difficulty = 15;
		} else if($(this).attr('id') === 'medium') {
			difficulty = 10;
		} else if($(this).attr('id') === 'hard') {
			difficulty = 5;
		}

		displayQuestion();

	});


	$('#answers_display').on('click', '.answer', function() {
		
		console.log('clicked on .answer '+player_answer);
		clearInterval(counter);
		player_answer = $(this).attr('id');
		console.log(player_answer);

	});


});