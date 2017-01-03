'use strict';

//--------------------------------------------------------------
//	Global variables
//--------------------------------------------------------------

var difficulty = 0,
	counter,
	question,
	used_questions = [],
	testing = false,
	player_answer,
	questions_asked = 0,
	answers_array = [],
	unanswered = [],

	$time = $('#time'),
	$q = $('#question'),
	$acd = $('#answer_choices_display'),
	$dd = $('#difficulty_display');



//--------------------------------------------------------------
//	Random number generator function (w upper and lower ranges)
//--------------------------------------------------------------

function rand(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}


//-------------------------------------------------------------
//	Random question-picking function 
//-------------------------------------------------------------

function getQuestion() {
	question = question_array[rand(0, question_array.length+1)];
	setQuestion();
}


//-------------------------------------------------------------
//	Most recent question-saving function
//-------------------------------------------------------------

function setQuestion() {
	used_questions.push(question);
}


//-------------------------------------------------------------
//	Timer function 
//-------------------------------------------------------------

function startTimer(duration, time) {

	counter = setInterval(function() {

		time.text(duration).css('color', 'inherit');

		if(--duration < 0) {
			clearInterval(counter);
		}

		if(duration < 0 && testing !== true) {
			testAnswer();
		}

	}, 1000);

}


//-------------------------------------------------------------
//	Answer-testing function 
//-------------------------------------------------------------

function testAnswer() {

	testing = true;

	if(player_answer !== question['answer']
	&& player_answer !== undefined) {

		$('#'+player_answer).html(''
						+'<a class="answer list-group-item">'
						+	question[player_answer]
						+	'<span class="answer-symbol glyphicon glyphicon-remove"></span>'
						+'</a>');

		$time.html('Wrong!').css('color', 'red');

		unanswered.push('<span class="text-center answer-symbol glyphicon glyphicon-remove"></span>');

	} else if(player_answer === question['answer']) {

		$time.html('Correct!').css('color', 'green');

		unanswered.push('<span class="text-center answer-symbol glyphicon glyphicon-ok"></span>');

	} else if(player_answer === undefined) {

		unanswered.push('<h6 class="text-center">(unanswered)</h6>');

	}

	player_answer = undefined;

	$('#'+question['answer']).replaceWith(''
								+'<a class="answer list-group-item">'
								+	question[question['answer']]
								+	'<span class="answer-symbol glyphicon glyphicon-ok"></span>'
								+'</a>'
								);

	if(questions_asked+1 < 3) {

		setTimeout(() => {displayQuestion()}, 2000);

	} else {

		setTimeout(() => {displayStats()}, 2000);

	}

	answers_array.push(player_answer);

	questions_asked++;

	$('#answer_choices_display').off('click', '.answer');

	testing = false;

}


//-------------------------------------------------------------
//	Question-displaying function 
//-------------------------------------------------------------

function displayQuestion() {

	$time.html('');

	startTimer(difficulty, $time);

	getQuestion();

	$q.html(question['question']);

	$dd.html('');

	$acd.html(''
		+'<a class="answer list-group-item">'+question['A']+'</a>'
		+'<a class="answer list-group-item">'+question['B']+'</a>'
		+'<a class="answer list-group-item">'+question['C']+'</a>'
		+'<a class="answer list-group-item">'+question['D']+'</a>'
		// +'<a class="answer list-group-item">'+question['answer']+'</a>'
		);

	$('#answer_choices_display').children().eq(0).attr('id', 'A');
	$('#answer_choices_display').children().eq(1).attr('id', 'B');
	$('#answer_choices_display').children().eq(2).attr('id', 'C');
	$('#answer_choices_display').children().eq(3).attr('id', 'D');

	// setAnswerChoicesEvent();

	$('#answer_choices_display').on('click', '.answer', function() {
		
		clearInterval(counter);
		player_answer = $(this).attr('id');

		testAnswer();

	});

}


//-------------------------------------------------------------
//	Stats-displaying function (after each round of questions)
//-------------------------------------------------------------

function displayStats() {

	$('.clear_on_stats').html('');

	$('#stats').html(''
					+'<table class="table table-condensed' 
					// +									 'col-lg-6 '
					// +									 'col-md-8 '
					// +									 'col-sm-10 '
					// +									 'col-xs-10'
					+'">'
					// +	'<thead>'
					// +		'<tr>'
					// +			'<th>'
					// +				'<h4>Questions</h4>'
					// +			'</th>'
					// +			'<th>'
					// +				'<h5></h5>'
					// +			'</th>'
					// // +			'<th>'
					// // +				'<h5></h5>'
					// // +			'</th>'
					// +		'</tr>'
					// +	'</thead>'
					+	'<tbody>'
					+		'<tr>'
					+			'<td>'
					+				'<h6>'
					+				used_questions[0].question
					+				'</h6>'
					+			'</td>'
					+			'<td>'
					+				'<h6 class="right">'
					+				used_questions[0][used_questions[0].answer]
					+				'</h6>'
					+			'</td>'
					+			'<td>'
					// +				'<h6 class="left">'
					+				unanswered[0]
					// +				'</h6>'
					+			'</td>'
					+		'</tr>'
					+		'<tr>'
					+			'<td>'
					+				'<h6>'
					+				used_questions[1].question
					+				'</h6>'
					+			'</td>'
					+			'<td>'
					+				'<h6 class="right">'
					+				used_questions[1][used_questions[1].answer]
					+				'</h6>'
					+			'</td>'
					+			'<td>'
					// +				'<h6 class="left">'
					+				unanswered[1]
					// +				'</h6>'
					+			'</td>'
					+		'</tr>'
					+		'<tr>'
					+			'<td>'
					+				'<h6>'
					+				used_questions[2].question
					+				'</h6>'
					+			'</td>'
					+			'<td>'
					+				'<h6 class="right">'
					+				used_questions[2][used_questions[2].answer]
					+				'</h6>'
					+			'</td>'
					+			'<td>'
					// +				'<h6 class="left">'
					+				unanswered[2]
					// +				'</h6>'
					+			'</td>'
					+		'</tr>'
					// +		'<tr>'
					// +			'<td>'
					// +				used_questions[3].question
					// +			'</td>'
					// +			'<td>'
					// +				used_questions[3].answer
					// +			'</td>'
					// +			'<td>'
					// +				answers_array[3]
					// +			'</td>'
					// +		'</tr>'
					// +		'<tr>'
					// +			'<td>'
					// +				used_questions[4].question
					// +			'</td>'
					// +			'<td>'
					// +				used_questions[4].answer
					// +			'</td>'
					// +			'<td>'
					// +				answers_array[4]
					// +			'</td>'
					// +		'</tr>'
					// +		'<tr>'
					// +			'<td>'
					// +				used_questions[5].question
					// +			'</td>'
					// +			'<td>'
					// +				used_questions[5].answer
					// +			'</td>'
					// +			'<td>'
					// +				answers_array[5]
					// +			'</td>'
					// +		'</tr>'
					// +		'<tr>'
					// +			'<td>'
					// +				used_questions[6].question
					// +			'</td>'
					// +			'<td>'
					// +				used_questions[6].answer
					// +			'</td>'
					// +			'<td>'
					// +				answers_array[6]
					// +			'</td>'
					// +		'</tr>'
					// +		'<tr>'
					// +			'<td>'
					// +				used_questions[7].question
					// +			'</td>'
					// +			'<td>'
					// +				used_questions[7].answer
					// +			'</td>'
					// +			'<td>'
					// +				answers_array[7]
					// +			'</td>'
					// +		'</tr>'
					// +		'<tr>'
					// +			'<td>'
					// +				used_questions[8].question
					// +			'</td>'
					// +			'<td>'
					// +				used_questions[8].answer
					// +			'</td>'
					// +			'<td>'
					// +				answers_array[8]
					// +			'</td>'
					// +		'</tr>'
					+	'</tbody>'
					+'</table>'

					+'<a id="restart" class="btn">new game</a>'
					);

	answers_array.length = 0;
	used_questions.length = 0;
	unanswered.length = 0;

}


function displayAnswerSymbol() {



}


//-------------------------------------------------------------
//	game-resetting function
//-------------------------------------------------------------

function restart() {

	$('#stats').html('');

	$dd.html(
			'<a href="#" id="easy" class="difficulty list-group-item">'
			+'easy</a>'
			+'<a href="#" id="medium" class="difficulty list-group-item">'
			+'medium</a>'
			+'<a href="#" id="hard" class="difficulty list-group-item">'
			+'hard</a>'
			);

	questions_asked = 0;

}


//-------------------------------------------------------------
//	main jQuery
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
		supplied: "mp3",
		loop: true,
        cssSelectorAncestor: "",
      	cssSelector: {
          mute: "#mute",
          unmute: "#unmute"
        }

	});

	$('#mute').trigger('click');

	$('#mute').click(function() {
	  $(this).toggle();
	  $('#unmute').toggle();
	});

	$('#unmute').click(function() {
	  $(this).toggle();
	  $('#mute').toggle();
	});


	$('#difficulty_display').on('click', '.difficulty', function() {
		
		if($(this).attr('id') === 'easy') {
			difficulty = 15;
		} else if($(this).attr('id') === 'medium') {
			difficulty = 10;
		} else if($(this).attr('id') === 'hard') {
			difficulty = 5;
		}

		displayQuestion();

	});


	$('#stats').on('click', '#restart', function() {

		restart();
	
	});


});