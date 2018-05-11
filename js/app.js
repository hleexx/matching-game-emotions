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

	let lastSelectedCard = null;

	$(".grid-item").on("click", function(event) {

		// move counter text

		moves++;
		$(".moves").text(singularMoveText(moves));

		// flip card + matching

		if (lastSelectedCard == null) {
			$(event.currentTarget).children(".card-item").show();
			lastSelectedCard = $(event.currentTarget).children(".card-item");
		} else {
			if (lastSelectedCard.data("attribute") == $(event.currentTarget).data("attribute")) {
				$(event.currentTarget).children(".card-item").show();
				lastSelectedCard = null;
			} else {
				$(event.currentTarget).children(".card-item").show();
				$(event.currentTarget).children(".card-item").hide();
				lastSelectedCard.hide();
				lastSelectedCard = null;
			}

		}

	})



	
})