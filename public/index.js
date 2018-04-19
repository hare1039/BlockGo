
function onClick() {
	var r = document.getElementById("rightSelect");
	var l = document.getElementById("leftSelect");

	localStorage.setItem("player", JSON.stringify({
		right: r.value,
		left: l.value
	}));
	
	window.location.href = "play.html";
}


document.getElementById("load-game").addEventListener("change", function(e) {
	var gamefile = document.getElementById("load-game").files[0];
	var reader = new FileReader();
	reader.readAsText(gamefile);
	reader.onloadend = function(res) {
		localStorage.setItem("gamefile", res.target.result);
		onClick();
	}
});

localStorage.clear();
