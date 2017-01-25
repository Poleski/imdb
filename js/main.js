// Du¿o tego nie ma :)

// Chowamy podpowiedzi na starcie (automatycznie populuj¹ siê "Undefined")

$(document).ready(function() {
	$(".suggestion-box").hide();
});

// Funkcja odpalana oninput gdy piszemy coœ w searchbarze. Sztucznie spowolniona setTimeout'em, ¿eby nie pokazywaæ pocz¹tkowych wyników dla rezultatu zapytania o "Undefined" oraz ¿eby dopasowaæ do czasu okreœlonego w debounce

function showSuggestions() {
	setTimeout(function() {
		$(".suggestion-box").show();
	}, 520);
}

// Funkcja do zmiany koloru boxa z metascorem

function metaColor() {
	var metaScore = $(".metascore").attr("data-score");
	if (metaScore == "") {
		setTimeout(function() {
			metaColor();
		}, 100);
	} else {
		if (metaScore >= 60) {
			var newColor = "#66cc33";
		} else if (metaScore <= 40) {
			var newColor = "#ff0000";
		} else {
			var newColor = "#ffcc33";
		}
		$(".metascore").css("background-color", newColor);
	};
}