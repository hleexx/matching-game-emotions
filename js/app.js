$(function() {
	
	// function for timer

	let seconds = 0;
	let minutes = 0;

	function formatTime(num) {
		if (num < 10) {
			return `0${num}`;
		} else { 
			return `${num}`;
		}
	}

	$(".timer").text(`${formatTime(minutes)} : ${formatTime(seconds)}`);

	setInterval(function() {
		seconds++;
		if (seconds == 60) {
			minutes++;
			seconds = 0;
		}

		$(".timer").text(`${formatTime(minutes)} : ${formatTime(seconds)}`);

	}, 1000)

	// function for move counter - need to do it for 2 flips of a card

	let moves = 0;

	function singularMoveText(num) {
		if (num === 1) {
			return `${num} move`;
		} else {
			return `${num} moves`;
		}
	}

	$(".grid-item").on("click", function(event) {
		moves++;

		$(".moves").text(singularMoveText(moves));


	})
	
})