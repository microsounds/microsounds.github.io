'use strict';

/*
 * upon 404, distract the user with something dumb
 * there's some miku songs in here somewhere, mostly just old videos
 */
var urls = [
	'https://www.youtube.com/watch?v=xbFfz13gch4&t=40s', /* MLG Sonic */
	'https://www.youtube.com/watch?v=3znxiNxSQN4', /* Miku Hatune animation movie "TAPIPAN" */
	'https://www.youtube.com/watch?v=B-Z8s0VWlac', /* Miku Hatune animation movie "Z_TAPIPAN" */
	'https://www.youtube.com/watch?v=4x0_746fqW8', /* 【6th MMD CUP】Ballerina Shiteyanyo */
	'https://www.youtube.com/watch?v=SeVAhNUo7ko', /* 【Project DIVA 2nd】　2D OR NOT 2D　【鏡音レン・KAITO他】*/
	'https://www.youtube.com/watch?v=KivVBtZdYGM', /* The Ultimate Desu */
	'https://www.youtube.com/watch?v=XpAWbMtKO5k', /* La Bikina Hatsune Miku */
	'https://www.youtube.com/watch?v=t9bbMvbnXsY', /* Patty Sand Canyon */
	'https://www.youtube.com/watch?v=pNMRBTN1SGU', /* Ferris' Sand Canyon */
	'https://www.youtube.com/watch?v=UL8IpdFGeHU', /* Effe - Hatsune Miku - Night Drive - Japanese, Romaji & English Subs */
	'https://www.youtube.com/watch?v=eF_Gj3JdWP4', /* 【English Sub】 Fight Against Dangerous Kyouko 【Yuru Yuri】*/
	'https://www.youtube.com/watch?v=OjkazwKhQlY', /* Fight Against Dangerous Hirasawa Yui & Susumu */
	'https://www.youtube.com/watch?v=pIx9Bw8qYDk', /* Fight Against a Dangerous Keyboard Crusher [Super Mario RPG] */
	'https://www.youtube.com/watch?v=HmWf-aoF_v8', /* Miku "We are POP☆CANDY!" with English Lyric */
	'https://www.youtube.com/watch?v=1gHHgx8bTxc', /* sasakure.UK - *Hello, Planet. feat. Miku Hatsune / ＊ハロー、プラネット。 */
	'https://www.youtube.com/watch?v=KGD-mFTY6mw', /* THE MOST SUPER KAWAII-EST LUCKY STAR FANDUB EVER. */
	'https://www.youtube.com/watch?v=25fsQofab9c', /* I'm So Lucky Lucky - Nightcore */
	'https://www.youtube.com/watch?v=1uUTM4OMNMk', /* PROOF I am 日本人  ラムネ好き！ Pretty intense animation */
	'https://www.youtube.com/watch?v=YZfwXt8naAc', /* Perfume - Perfume */
	'https://www.youtube.com/watch?v=0IkovhJYHUg', /* Hatsune Miku - I am programmer's song ( full song) */
	'https://www.youtube.com/watch?v=nj8GLCdmskA', /* DDR - True Love (Double) */
	'https://www.youtube.com/watch?v=wI6fGWFJijw', /* MineCraft - Earth */
	'https://www.youtube.com/watch?v=QBdbWhrviwU', /* "Smiley*Smiley" (Vocaloid Hatsune Miku Original Song) */
	'https://www.youtube.com/watch?v=SKfumaKBYZY', /* I missed the last train! Stranded in #VRChat Hwabon Night world */
	'https://www.youtube.com/watch?v=fWIbhwMDigM', /* 八王子P「エレクトリック・ラブ feat. 初音ミク」 */
	'https://www.youtube.com/watch?v=xyZzNAj-xDw', /* PC Engine Longplay [195] Ys Book 1 & 2 (Book 1) */
	'https://www.youtube.com/watch?v=fugtxz1znVw', /* Le Fishe au chocolat! Epic and lifechanging videoversion */
	'https://www.youtube.com/watch?v=g2QUwW6t3ro', /* Cyan Cat girl vr machine */
	'https://www.youtube.com/watch?v=ZOf0K9nFxog', /* What's The Prob? 🐶 */
	'https://www.youtube.com/watch?v=EcDvUUB1H1I', /* 北斗の件 */
	'https://www.youtube.com/watch?v=5Xl_2YLg93U', /* 9mm Parabellum Bullet / The World */
	'https://www.youtube.com/watch?v=-DnrPwD-fus', /* CVLTVRΣ - ☯TempleＧｏｌｄ☯ */
	'https://www.youtube.com/watch?v=jHMi2OJU06k', /* Laserdisc Visions - Alien TV (MV) */
	'https://www.youtube.com/watch?v=6CPU2aKDWoo', /* 【初音ミク - Hatsune Miku】Far Away【Add Up Remix】*/
	'https://www.youtube.com/watch?v=DPsccKjAf2I', /* Fuji Grid TV - Prism Genesis (VISUAL ALBUM) */
	'https://www.youtube.com/watch?v=5RaDIBXkU3U', /* Japan Computer Graphics Lab (1984) */
	'https://www.youtube.com/watch?v=QDsDOlfz-QU', /* pae & sarah */
	'https://www.youtube.com/watch?v=SzT0dvNrFc4', /* Gigi D'Agostino - La Passion ( Official Video ) */
	'https://www.youtube.com/watch?v=zkQUFb4SswY', /* Japanese Commercial ~ Superflat Monogram */
	'https://www.youtube.com/watch?v=HgjyQ0_coJo', /* Nyan~ Neko Sugar Girls: All Episodes */
];
var sel = urls[Math.floor(Math.random() * urls.length)];

var msg = document.createElement('h2');
msg.innerHTML = 'Taking you to ' + sel + '!';

setTimeout(function() {
	document.getElementsByTagName('body')[0].appendChild(msg);
	window.location.replace(sel);
}, 500);
