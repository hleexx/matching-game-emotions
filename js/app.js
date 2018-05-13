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
	// if there are exactly two clicks in any grid-item then it equals 1 move (move++)

	let moves = 0;

	function singularMoveText(num) {
		if (num === 1) {
			return `${num} move`;
		} else {
			return `${num} moves`;
		}
	}

	let lastSelectedCard = null;

	// function to display congratulatory modal when all 8 pairs have been matched

	let perfectMatch = 0;

	function perfectMatchModal() {
		perfectMatch++;
		if (perfectMatch === 8) {
			$(".modal-backdrop").show();
		}
	}

	// grid-item event listener on click

	$(".grid-item").on("click", function(event) {
		//debugger;

		if ($(event.currentTarget).children(".card-back").css("display") == "none") {

			// flip card + matching

			if (lastSelectedCard == null) {
				$(event.currentTarget).children(".card-back").show();
				lastSelectedCard = $(event.currentTarget);
			} else {
				if (lastSelectedCard.data("attribute") == $(event.currentTarget).data("attribute")) {
					$(event.currentTarget).children(".card-back").show();
					lastSelectedCard = null;
					perfectMatchModal();
				} else {
					$(event.currentTarget).children(".card-back").show();
					setTimeout(function() {
						$(event.currentTarget).children(".card-back").hide();
						lastSelectedCard.children(".card-back").hide();
						lastSelectedCard = null;

					}, 500);

				}
				
				// move counter display text

				moves++;
				$(".moves").text(singularMoveText(moves));
				$(".moves-final").text(singularMoveText(moves));

				// star rating display

				if (moves <= 12) {
					$(".three-stars").show();
					$(".stars-final").text("3 stars")
				} else if (moves <= 17) {
					$(".three-stars").hide();
					$(".two-stars").show();
					$(".stars-final").text("2 stars")
				} else {
					$(".two-stars").hide();
					$(".three-stars").hide();
					$(".one-star").show();
					$(".stars-final").text("1 star")
				}
			}
		}
	})

	// function for restart button -- TODO: need to add shuffle

	function resetGame() {
		$(".card-back").hide();
		moves = 0;
		$(".moves").text(singularMoveText(moves));
		seconds = 0;
		minutes = 0;
		$(".timer").text(`${formatTime(minutes)} : ${formatTime(seconds)}`);
		$(".one-star").hide();
		$(".two-stars").hide();
		$(".three-stars").show();
		lastSelectedCard = null;
	}

	$(".restart-button").on("click", function() {
		resetGame();
	})

	// modal close button event listener

	$(".close").on("click", function() {
		$(".modal-backdrop").hide();
	})

	// modal play again button event listener

	$(".replay-button").on("click", function() {
		resetGame();
		$(".modal-backdrop").hide();
	})


	
})