
function onClick() {
	var r = document.getElementById("rightSelect");
	var l = document.getElementById("leftSelect");
	if (r.value == "human" && l.value == r.value) {
		alert("Sorry, only one humen can play this game");
		return;
	}
	localStorage.setItem("player", {
		right: r.value,
		left: l.value
	});
	
	window.location.href = "play.html";
}


