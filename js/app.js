$(function() {
	
	// function for timer -- TODO: need to add stop timer when player matches everything

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

	// event listener on click

	$(".grid-item").on("click", function(event) {
		//debugger;

		if ($(event.currentTarget).children(".card-item").css("display") == "none") {

			// flip card + matching -- TODO: need to add modal to congratulate player and let them know how much time it took to win and their star rating.

			if (lastSelectedCard == null) {
				$(event.currentTarget).children(".card-item").show();
				lastSelectedCard = $(event.currentTarget);
			} else {
				if (lastSelectedCard.data("attribute") == $(event.currentTarget).data("attribute")) {
					$(event.currentTarget).children(".card-item").show();
					lastSelectedCard = null;
					perfectMatchModal();
				} else {
					$(event.currentTarget).children(".card-item").show();
					setTimeout(function() {
						$(event.currentTarget).children(".card-item").hide();
						lastSelectedCard.children(".card-item").hide();
						lastSelectedCard = null;

					}, 500);

				}
				
				// move counter text

				moves++;
				$(".moves").text(singularMoveText(moves));
				$(".moves-final").text(singularMoveText(moves));

				// star rating

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

	//restart button -- TODO: need to add shuffle

	$(".restart-button").on("click", function() {
		$(".card-item").hide();
		moves = 0;
		$(".moves").text(singularMoveText(moves));
		seconds = 0;
		minutes = 0;
		$(".timer").text(`${formatTime(minutes)} : ${formatTime(seconds)}`);
		lastSelectedCard = null;
	})


	
})