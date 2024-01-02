'use strict';

/* @licstart The following is the entire license notice for the
 * javascript code in this page.
 *
 * static/script.js — interactive webpage elements
 * (c) 2023 microsounds <https://github.com/microsounds>, GPLv3+
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

/* randomly selected subtitle text */
var platitudes = [
	'the echoes of time stand still',
	'なんて<b>好き</b>になったの？',
	'comfort is a color vt102 emulator',
	'why did i come to like you?',
	'returning to the aether in slow motion',
	'n-no, it\'s supposed to look like that',
	'the last love song at the end of time',
	'it\'s almost like you never existed',
	'did you want this moment to last forever?',
	'can i feel nostalgic for a time i never knew?',
	'post-post-post-ironic internet anemoia',
	'sweet nothings i don\'t understand',
	'i shiver from thrills i\'ve never known',
	'hello. lucky star ruined my life.',
	'dancing all night, staying up all night',
	'i wanna refresh the catalog all night',
	'nothing exciting ever happens',
	'aqua is still my favorite color',
	'aqua, slate and CDE salmon pink',
	'iridescent moonlit haze at 3am',
	(new Date().getDay() != 1) ? 'do you like flower music?' :
		'hhhey guess what? Itdst MIKU MONDAY!!!',
	'synthesized love songs from the future',
	'music that felt nostalgic when it was new',
	'you\'re my shining star, my beautiful fantasy',
	'you\'ll always be real in my heart',
	'lurid and indecent memories',
	'google doesn\'t go this far back',
	'AI generated lyrical nothings',
];

/* refers to sound files in '{DOC_ROOT}/static/music'
 * Note: MediaSource supports Opus streams in WebM containers, but not Ogg.
 * $ ffmpeg -i wind1.opus -c:a copy -vn wind1.webm
 */
var loops = [
	[ 'wind1', 'effe - night drive ft. 初音ミク' ],
	[ 'wind2', 'effe - night drive ft. 初音ミク' ],
	[ 'jealousy', 'Taquwami - Concealed Jealousy' ],
	[ 'fmtowns1', 'FM-TOWNS　の世界　紹介ビデオ（1989年）' ],
	[ 'fmtowns2', 'FM-TOWNS　の世界　紹介ビデオ（1989年）' ],
	[ 'grand1', 'Taquwami - Long Kigo III' ],
	[ 'grand2', 'Taquwami - Long Kigo III' ],
	[ 'mirage1', 'Occult You - Mirage Love' ],
	[ 'mirage2', 'Occult You - Mirage Love' ],
	[ 'darkness', 'Mr. Kitty - After Dark (Astrophysics cover ft. 初音ミク)' ],
	[ 'sparkle', 'livetune - Strobo Nights ft. 初音ミク' ],
	[ 'synthetic', 'FM Skyline - neon paradise' ],
	[ 'sorrows1', 'sasakure.UK - to Asteroid B-612 ft. lasah' ],
	[ 'sorrows2', 'sasakure.UK - to Asteroid B-612 ft. lasah' ],
	[ 'starlight', 'Pleasant Specter (快い亡霊) OST - Menu Screen' ],
	[ 'eternity1', 'Tatsuro Yamashita - 僕の中の少年' ],
	[ 'eternity2', 'Tatsuro Yamashita - 僕の中の少年' ],
	[ 'watashi1', 'KnuthP - ワタシアナライザー ft. 初音ミク' ],
	[ 'watashi2', 'KnuthP - ワタシアナライザー ft. 初音ミク' ],
	[ 'watashi3', 'KnuthP - ワタシアナライザー ft. 初音ミク' ],
	[ 'anemoia1', 'MAYUKI - CURUS (Pop\'n Cafe Edition)' ],
	[ 'anemoia2', 'MAYUKI - CURUS (Pop\'n Cafe Edition)' ],
	[ 'touch1', 'imprintafter - Tell Me Baby (ft. stillsound)' ],
	[ 'touch2', 'imprintafter - Tell Me Baby (ft. stillsound)' ],
	[ 'cycles1', 'Totomoni - Don\'t Stop/Take Me' ],
	[ 'cycles2', 'Totomoni - Don\'t Stop/Take Me' ],
	[ 'leisure1', 'LamazeP - Swimsuit ft. 初音ミク' ],
	[ 'leisure2', 'LamazeP - Swimsuit ft. 初音ミク' ],
	[ 'teardrop1', 'Hoobastank - The Reason (bo en remix)' ],
	[ 'teardrop2', 'Hoobastank - The Reason (bo en remix)' ],
	[ 'kimochi', 'TeddyLoid - ME!ME!ME! ft. daoko' ],
	[ 'pipo1', 'TeddyLoid - Pipo Password' ],
	[ 'waiting', 'OMORI Sound Team -  Snow Forest/A Single Flower Blooms' ],
	[ 'wist', 'Breakbot - Back for More' ],
	[ 'iridescent', 'Occult You - Transition' ],
	[ 'decay', 'LOONA - Butterfly' ],
	[ 'ballade', 'Genshin Impact OST - Stormterror Lair' ],
];

/* https://bugs.chromium.org/p/chromium/issues/detail?id=353072
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
	var duration = 60.0;
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

/* warn user that their browser is garbage
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
	if (navigator.userAgent.match('(Macintosh|iP(hone|[oa]d))')) {
		issues.push('Apple Safari regularly has issues displaying this site correctly.');
	}
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

/* calculate parallax animation duration
 * ensure animation always runs at 15px/sec to avoid nauseating visitors
 * TODO: rewrite animation as 4 separate backround layers using transform: translate()
 * sky / moon / gradient / clouds
 * animating background-position is CPU-bound
 */
function toggle_animation() {
	var root = document.documentElement;
	if (!root.classList.contains('moonrise')) {
		var secs = Math.floor(root.scrollHeight / 15);
		root.classList.add('moonrise');
		root.style.animation = 'moonrise ' + secs + 's ease infinite';
	}
	else {
		root.removeAttribute('style');
		root.removeAttribute('class');
	}
}

/* make an attempt to playback audio
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
			/* on chromium-based browsers, persistent playback
			 * settings only work for the current session after
			 * the user has interacted with the page unless
			 * autoplay is explicitly enabled
			 */
			document.cookie = 'bgm=0;path=/';
			var hints = [];
			if (navigator.userAgent.includes('Firefox')) {
				hints.push('Mozilla Firefox requires you to enable autoplay explicitly on this page.');
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

/* wrap every inline image with a clickable link to itself
 * markdown images starting with ![ico-*] and ![nolink] are excluded
 * inline videos within galleries are also wrapped
 * this is to avoid having to double-link images manually in markdown
 */
function linkify_images() {
	var imgs = document.querySelectorAll(
		'p img:not([alt^=ico-]):not([alt^=nolink]), .gallery video'
	);
	for (var i in imgs) {
		if (imgs[i].outerHTML) {
			imgs[i].outerHTML =
				'<a target="_blank" href="' + imgs[i].src + '">' +
					imgs[i].outerHTML +
				'</a>';
		}
	}
}

/* randomize subtitle text
 * celebrate miku's birthday if it's Aug 31st!
 */
function random_subtitle() {
	var ordinal = function(num) {
		num = num | 0;
		var str = num.toString();
		var digit = parseInt((str.length == 1) ? str[0] : str[str.length - 1]);
		if ((num % 100) < 11 || (num % 100) > 13) {
			switch (digit) {
				case 1: return num + 'st';
				case 2: return num + 'nd';
				case 3: return num + 'rd';
			};
		}
		return num + 'th';
	};
	if (new Date().getMonth() == 7 && new Date().getDate() == 31)
		document.getElementById('subtitle').innerHTML =
			'happy ' + ordinal(new Date().getYear() - (2007 - 1900)) + ' birthday, miku! ✨';
	else
		document.getElementById('subtitle').innerHTML =
			platitudes[Math.floor(Math.random() * platitudes.length)];
}

/* calculate random cloud cover placement using SVG filters, but only on desktop
 * adapted from example code found at https://css-tricks.com/drawing-realistic-clouds-with-svg-and-css/
 * TODO: this is incredibly taxing even on desktop, firefox slows to a crawl
 */
function generate_clouds() {
	/* clamped random int */
	var random_int = function(min, max) {
		return Math.floor(Math.random() * ((max - min) + 1) + min);
	};
	var random_arg = function(args) {
		return args[random_int(0, args.length - 1)];
	};

	/* randomly generate box shadows
	 * box-shadow: off-x off-y blur-radius blur-minimum color;
	 */
	var root = document.documentElement;
	var box_shadow = function(max) {
		var i, arr = [];
		for (i = 0; i < max; i++) {
			arr.push(
				random_int(1, root.scrollWidth) + 'px ' +
				random_int(1, root.scrollHeight) + 'px ' +
				random_int(20, 40) + 'vmin ' +
				random_int(1, 20) + 'vmin ' +
				random_arg([ '#CCCCCC', '#FFFFFF', '#E2FAF9' ])
			);
		}
		return arr.join(',');
	};
	/* density of 10 clouds per screenful of content */
	if (!navigator.userAgent.match('(Firefox|[Aa]ndroid|iP(hone|[oa]d|[Mm]obile))'))
		document.getElementsByClassName('cloud-cover')[0].style.boxShadow =
			box_shadow(10 * Math.floor(root.scrollHeight / root.clientHeight));
}

window.addEventListener('DOMContentLoaded', function() {
	generate_clouds();
	random_subtitle();
	setup_bgm();

	/* persist playback settings */
	if (document.cookie.includes('bgm=1'))
		play();

	linkify_images();
	browser_check();
});
