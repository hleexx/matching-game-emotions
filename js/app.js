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

	document.getElementsByClassName("timer")[0].innerHTML = `${formatTime(minutes)} : ${formatTime(seconds)}`;

	setInterval(function() {
		seconds++;
		if (seconds == 60) {
			minutes++;
			seconds = 0;
		}

		document.getElementsByClassName("timer")[0].innerHTML = `${formatTime(minutes)} : ${formatTime(seconds)}`;

	}, 1000)
	
})