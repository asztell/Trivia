'use strict';

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




});