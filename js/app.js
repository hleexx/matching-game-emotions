$(function() {
	
	// function for timer
	// removing the '0's when seconds and minutes hit 10
	// i.e. you don't want to see 010m:006s in the display

	let seconds = 0;
	let minutes = 0;

	function formatTime(num) {
		if (num < 10) {
			return `0${num}`;
		} else { 
			return `${num}`;
		}
	}

	// timer display text

	$(".timer").text(`${formatTime(minutes)} : ${formatTime(seconds)}`);

	// when it hits 60 seconds, it turns into 1 minute

	setInterval(function() {
		seconds++;
		if (seconds == 60) {
			minutes++;
			seconds = 0;
		}

		$(".timer").text(`${formatTime(minutes)} : ${formatTime(seconds)}`);

	}, 1000)

	// function for move counter
	// if there are exactly two clicks on any grid-item then it equals 1 move
	// displaying the move count with string 'move' behind the count

	let moves = 0;

	function singularMoveText(num) {
		if (num === 1) {
			return `${num} move`;
		} else {
			return `${num} moves`;
		}
	}

	// congratulatory modal function
	// when all 8 pairs have been matched the modal is displayed

	let perfectMatch = 0;

	function perfectMatchModal() {
		perfectMatch++;
		if (perfectMatch === 8) {
			$(".modal-backdrop").show();
		}
	}

	// grid-item event listener on click function

	let lastSelectedCard = null;

	function bindEventListener() {
		$(".grid-item").on("click", function(event) {

			//flip card animation initiated by stating the starting css and the rotation for the flip

			if ($(event.currentTarget).children(".flipper").css("transform") == "matrix(1, 0, 0, 1, 0, 0)") {
				$(event.currentTarget).children(".flipper").css("transform", "rotateY(180deg)");

				if (lastSelectedCard == null) {
					$(event.currentTarget).children(".flipper").css("transform", "rotateY(180deg)");
					lastSelectedCard = $(event.currentTarget);

				// when the lastSelectedCard and currently clicked card match
				// both cards will flip and then bounce
				// once, all 8 pairs are matched, the modal will be displayed

				} else {
					if (lastSelectedCard.data("attribute") == $(event.currentTarget).data("attribute")) {
						$(event.currentTarget).children(".flipper").css("transform", "rotateY(180deg)");

						lastSelectedCard.children(".flipper").effect("bounce", {times:2, distance:250}, 400);
						$(event.currentTarget).children(".flipper").effect("bounce", {times:2, distance:250}, 400);

						lastSelectedCard = null;
						perfectMatchModal();

					// when the lastSelectedCard and currently clicked card DO NOT match
					// the cards flip and then shake BEFORE flipping back over again

					} else {
						$(event.currentTarget).children(".flipper").css("transform", "rotateY(180deg)");

						$(event.currentTarget).children(".flipper").effect("shake", {times:2, distance:100}, 150, function () {
							$(event.currentTarget).children(".flipper").css("transform", "rotateY(0deg)");
						});

						lastSelectedCard.children(".flipper").effect("shake", {times:2, distance:100}, 150, function () {
							lastSelectedCard.children(".flipper").css("transform", "rotateY(0deg)");
							lastSelectedCard = null;
						})

					}
					
					// move counter display text
					// inside the event listener because the value dependent on matching in .grid-item

					moves++;
					$(".moves").text(singularMoveText(moves));
					$(".moves-final").text(singularMoveText(moves));

					// star rating display
					// shows 3 stars at first then hides stars after 13 moves and 17 moves
					// inside the event listener because the value dependent on matching in .grid-item
					// also dependent on the move counter

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
		});
	}

	// shuffles cards on page load

	shuffleCards();

	// shuffling functio - START
	// URL: https://stackoverflow.com/questions/13427287/shuffle-all-divs-with-the-same-class
	// based the code off the example shown here

	function shuffleCards() {
        // remove all divs within .grid-container, store in $d
        var $d = $(".grid-container").find(".grid-item").remove();
        // sort $d randomnly with fisher yates shuffle
        $d.sort(function () { return Math.floor(Math.random() * $d.length); });
        // append divs within $d to .grid-container again
        $d.appendTo($(".grid-container"));
        // shuffling function - END

		// initialize event listener again
		// shuffling removed the grid.item event listener (previously)

        bindEventListener();
	};

	// function to reset current game information
	// cards are "flipped" back to '0 degrees'
	// all variables are set to '0'
	// stars are set back to 3 stars
	// cards will be shuffled again
	// lastSelectedCard will be turned back to 'nothing'

	function resetGame() {
		$(".flipper").css("transform", "rotateY(0deg)");
		moves = 0;
		$(".moves").text(singularMoveText(moves));
		seconds = 0;
		minutes = 0;
		perfectMatch = 0;
		$(".timer").text(`${formatTime(minutes)} : ${formatTime(seconds)}`);
		$(".one-star").hide();
		$(".two-stars").hide();
		$(".three-stars").show();
		$(".modal-backdrop").hide();
		shuffleCards();
		lastSelectedCard = null;
	}

	// restart button event listener

	$(".restart-button").on("click", function() {
		resetGame();
	})

	// modal close button (x) event listener

	$(".close").on("click", function() {
		$(".modal-backdrop").hide();
	})

	// modal play again button event listener

	$(".replay-button").on("click", function() {
		resetGame();
	})


	
})