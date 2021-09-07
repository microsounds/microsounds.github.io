'use strict';

/*
 * refers to sound files in '{DOC_ROOT}/static/music'
 * Note: MediaSource supports Opus audio in WebM containers, but not Ogg.
 * $ ffmpeg -i wind1.opus -c:a copy -vn wind1.webm
 */
var loops = [
	[ 'wind1', 'effe - night drive ft. 初音ミク' ],
	[ 'wind2', 'effe - night drive ft. 初音ミク' ],
	[ 'jealousy', 'Taquwami - Concealed Jealousy' ],
	[ 'mirage1', 'Occult You - Mirage Love' ],
	[ 'mirage2', 'Occult You - Mirage Love' ],
	[ 'strobo', 'kz/livetune - Strobo Nights ft. 初音ミク' ],
];

/*
 * seamless looping background music with native MediaSource API
 * adapted from from example code found at
 * http://storage.googleapis.com/dalecurtis-shared/vine/index.html?src=video2.webm
 */
function setup_bgm() {
	/* constants */
	var duration = 30.0;
	var gc_duration = 2 * duration;
	var CUT_OFF = 0.01;

	/* contexts */
	var mediaSource;
	var sourceBuffer;
	var audio = document.getElementById('bgm');
	var bgm_toggle = document.getElementById('bgm_toggle');
	var client = new XMLHttpRequest();

	/* randomly select audio and tooltip text */
	var sel = Math.floor(Math.random() * loops.length);
	var file = '/static/music/' + loops[sel][0] + '.webm';
	bgm_toggle.title = loops[sel][1];

	/*
	 * Safari for iPhone and iPad (iOS < 13) do not support MediaSource at all
	 * fallback to native <audio> tag with stuttery audio and abort
	 */
	if (navigator.userAgent.match('iP(hone|ad|od)') != null) {
		var ctx = document.createElement('audio');
		ctx.id = 'bgm';
		ctx.type = 'audio/webm';
		ctx.hidden = true;
		ctx.loop = true;
		ctx.src = file;
		audio.replaceWith(ctx);
		return;
	 }

	client.onreadystatechange = function() {
		if (this.readyState !== 4)
			return;

		mediaSource = new MediaSource();
		audio.src = window.URL.createObjectURL(mediaSource);

		var buffer = new Uint8Array(this.response);

		mediaSource.addEventListener('sourceopen', function() {
			createLoopingAudio();
		}, false);

		function createLoopingAudio() {
			sourceBuffer = mediaSource.addSourceBuffer('audio/webm; codecs=opus');

			function addCopy() {
				// Choose the append time based on whether any segments have been
				// buffered thus far.  Zero if none, the end of the last one otherwise.
				// It's important to use the reported end point to avoid accidental
				// overlaps. Use the highest indexed range in the event multiple ranges
				// get created.
				var appendTime = (sourceBuffer.buffered.length > 0)
					? sourceBuffer.buffered.end(sourceBuffer.buffered.length - 1)
					: 0;

				// Adjust timestamp offset for cut off the front data.
				sourceBuffer.timestampOffset = appendTime - CUT_OFF;

				// // Set the append window to line up exactly with the append point.
				sourceBuffer.appendWindowStart = appendTime;
				sourceBuffer.appendWindowEnd = appendTime + duration - 2 * CUT_OFF;
				sourceBuffer.appendBuffer(buffer);
			}

			function segmentWatcher() {
				// There should always be one range by this point...

				var start = sourceBuffer.buffered.start(0);
				var end = sourceBuffer.buffered.end(sourceBuffer.buffered.length - 1);

				// Garbage collect old segments to avoid non-deterministic collection.
				// Note: this will cause the default controls to look weird since there
				// will be large gaps present. You should switch to a custom control set
				// to avoid these issues.  GC limits are ~12mb for audio and ~150mb for
				// video. This will vary by platform and device, so it's always best to
				// manually gc what you know won't be used.
				if (end - start > gc_duration) {
					// MSE will fire an updateend event once this completes.
					sourceBuffer.remove(start, end - gc_duration);
					return;
				}

				// Are we now into the second buffer?
				var appendAfter = end - duration / 2;
				if (audio.currentTime > appendAfter) {
					addCopy();
					return;
				}

				setTimeout(segmentWatcher, (duration * 1000) / 5);
			}

			sourceBuffer.addEventListener('updateend', segmentWatcher, false);
			audio.addEventListener('loadedmetadata', function() {
				// Vorbis parsing isn't quite as accurate as we'd like, so sometimes
				// we'll end up with ranges that shouldn't really be separate.  See
				// http://crbug.com/396634.  Note: Instead of using vorbis you could
				// demux the aac audio from the video track into adts or fragmented
				// mp4 and use it directly; this is what YouTube does.
				audio.currentTime =
					sourceBuffer.buffered.start(sourceBuffer.buffered.length - 1);

			// Will fire 'seeked' once complete.
			});

			addCopy();
		}
	}
	client.open('GET', file);
	client.responseType = "arraybuffer";
	client.send();
}

function play() {
	var audio = document.getElementById('bgm');
	var bgm_toggle = document.getElementById('bgm_toggle');
	if (audio.paused)
		bgm_toggle.innerText = bgm_toggle.innerText.replace('play', 'pause'), audio.play();
	else
		bgm_toggle.innerText = bgm_toggle.innerText.replace('pause', 'play'), audio.pause();
}

window.onload = setup_bgm;
