'use strict';

/*
 * @licstart The following is the entire license notice for the
 * javascript code in this page.
 *
 * static/script.js — interactive webpage elements
 * (c) 2022 microsounds <https://github.com/microsounds>, GPLv3+
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Suite 500, Boston, MA  02110-1335, USA.
 *
 * @licend The above is the entire license notice for the
 * javascript code in this page.
 */

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
	[ 'sparkle', 'livetune - Strobo Nights ft. 初音ミク' ],
	[ 'synthetic', 'FM Skyline - neon paradise' ],
	[ 'starlight', 'Pleasant Specter (快い亡霊) OST - Menu Screen' ],
	[ 'eternity1', 'Tatsuro Yamashita - 僕の中の少年' ],
	[ 'eternity2', 'Tatsuro Yamashita - 僕の中の少年' ],
	[ 'cycles1', 'Totomoni - Don\'t Stop/Take Me' ],
	[ 'cycles2', 'Totomoni - Don\'t Stop/Take Me' ],
	[ 'leisure1', 'LamazeP - Swimsuit ft. 初音ミク' ],
	[ 'leisure2', 'LamazeP - Swimsuit ft. 初音ミク' ],
	[ 'kimochi', 'TeddyLoid - ME!ME!ME! ft. daoko' ],
	[ 'waiting', 'Omori OST -  Snow Forest/A Single Flower Blooms' ],
	[ 'wist', 'Breakbot - Back for More' ],
	[ 'iridescent', 'Occult You - Transition' ],
	[ 'decay', 'LOONA - Butterfly' ],
	[ 'ballade', 'Genshin Impact OST - Stormterror Lair' ],
];

/*
 * https://bugs.chromium.org/p/chromium/issues/detail?id=353072
 *
 * native <audio> tag does not support gapless loops without stutters
 * implementing seamless looping background music with native MediaSoure API
 * adapted from from example code found at
 * http://storage.googleapis.com/dalecurtis-shared/vine/index.html?src=video2.webm
 */
function is_compatible() {
	var ctx = new MediaSource();
	return !!ctx.addSourceBuffer;
}

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

	if (!is_compatible()) {
		/* fallback to native stuttery <audio> loop if possible */
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
	};
	client.open('GET', file);
	client.responseType = "arraybuffer";
	client.send();
}

/*
 * warn user that their browser is garbage
 * desktop and mobile safari are regularly missing the following features
 */
function spawn_warning(heading, body, list) {
		var doc = document.getElementsByClassName('content')[0];
		var warn = document.createElement('blockquote');
		warn.innerHTML += '<p><b>' + heading + '</b><br/>';
		warn.innerHTML += '<i>' + body + '</i><br/>';
		if (list) {
			warn.innerHTML += '<ul>';
			for (var i in list) {
				warn.innerHTML += '<li><i>' + list[i] + '</i></li>';
			}
			warn.innerHTML += '</ul>';
		}
		warn.innerHTML += '</p>';
		doc.insertBefore(warn, doc.firstChild);
}

function browser_check() {
	var issues = [];
	if (MediaSource) {
		if (!MediaSource.isTypeSupported('audio/webm;codecs=opus'))
			issues.push('playback of Opus format audio');
		if (!MediaSource.isTypeSupported('video/webm;codecs=vp8'))
			issues.push('playback of VP8 format video');
	}
	else
		issues.push('No MediaSource API support, audio loops will stutter or not work at all.');
	if (CSS.supports) {
		if (!CSS.supports('filter', 'grayscale(0%)'))
			issues.push('image filtering and desaturation');
		if (!CSS.supports('transform', 'rotate(0deg)'))
			issues.push('image rotation and transform');
		if (!CSS.supports('animation-duration', '1s'))
			issues.push('animated backgrounds');
		if (!CSS.supports('background-blend-mode', 'screen'))
			issues.push('layered background compositing');
		if (!CSS.supports('background-color', 'rgba(0,0,0,100%)'))
			issues.push('alpha transparency in background colors');
	}
	else
		issues.push('No way to query stylesheet features, get a real web browser!!');

	if (!!issues.length)
		spawn_warning('NOTE', 'Your web browser is <b>outdated</b>' +
			' and is missing the following feature(s):',
			issues
		);
}

/*
 * calculate parallax animation duration
 * ensure animation always runs at 15px/sec to avoid nauseating visitors
 */
function toggle_animation() {
	var root = document.documentElement;
	if (!root.classList.contains('moonrise')) {
		var secs = Math.floor(root.scrollHeight / 15);
		root.classList.add('moonrise');
		root.style.animation='moonrise ' + secs + 's ease infinite';
	}
	else {
		root.removeAttribute('style');
		root.removeAttribute('class');
	}
}

/*
 * make an attempt to playback audio
 * there's plenty of reasons why this won't work as expected
 * on post-2018 browsers, some are described below
 */
function play() {
	var audio = document.getElementById('bgm');
	var bgm_toggle = document.getElementById('bgm_toggle');
	if (audio.paused) {
		/* if successful, persist settings */
		audio.play().then(function() {
			document.cookie = 'bgm=1;path=/';
			bgm_toggle.innerText = bgm_toggle.innerText.replace('play', 'pause');
			toggle_animation();
		}).catch(function() {
			/*
			 * on chromium-based browsers, persistent playback
			 * settings only work for the current session after
			 * the user has interacted with the page unless
			 * autoplay is explicitly enabled
			 */
			document.cookie = 'bgm=0;path=/';
			var hints = [];
			if (navigator.userAgent.includes('Firefox')) {
				hints.push('Did you know that Firefox requires you to enable autoplay explicitly?');
				spawn_warning('NOTE', 'Your browser is blocking persistent autoplay.', hints);
			}
		});
	}
	else {
		audio.pause();
		document.cookie = 'bgm=0;path=/';
		bgm_toggle.innerText = bgm_toggle.innerText.replace('pause', 'play');
		toggle_animation();
	}
}

window.addEventListener('DOMContentLoaded', function() {
	browser_check();
	setup_bgm();

	/* persist playback settings */
	if (document.cookie.includes('bgm=1'))
		play();
});
