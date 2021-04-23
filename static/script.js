/* toggle bgm playback */
function play() {
	var btn = document.getElementById('bgm_toggle');
	var bgm = document.getElementById('bgm');
	if (bgm.paused)
		btn.innerText = btn.innerText.replace('play', 'pause'), bgm.play();
	else
		btn.innerText = btn.innerText.replace('pause', 'play'), bgm.pause();
}
