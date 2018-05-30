
function onClick() {
	var r = document.getElementById("rightSelect");
	var l = document.getElementById("leftSelect");

	localStorage.setItem("player", JSON.stringify({
		right: r.value,
		left: l.value
	}));

	var jumpStep = document.getElementById("stepNumber");
	if (jumpStep) {
		localStorage.setItem("stepNumber", jumpStep.value);
	}

	window.location.href = "play.html";
}


document.getElementById("load-game").addEventListener("change", function(e) {
	var gamefile = document.getElementById("load-game").files[0];
	var reader = new FileReader();
	reader.readAsText(gamefile);
	reader.onloadend = function(res) {
		localStorage.setItem("gamefile", res.target.result);

		var num_input = document.getElementById("stepNumber");
		num_input.setAttribute("max", JSON.parse(res.target.result).length);
		num_input.setAttribute("value", JSON.parse(res.target.result).length);
		num_input.style.display = "inline-flex";
	}
});

localStorage.clear();
