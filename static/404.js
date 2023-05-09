'use strict';

/*
 * upon 404, distract the user with old videos
 * some are nostalgic, others are just for fun
 * this feature mostly exists so I can reseed my youtube recs with my favorite topics
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
	'https://www.youtube.com/watch?v=H2_6RfoiYu4', /* sasakure.UK - to Asteroid B-612 feat. lasah */
	'https://www.youtube.com/watch?v=HgJmRGl4YLc', /* sasakure.UK - For Campanella feat. GUMI / カムパネルラ */
	'https://www.youtube.com/watch?v=0SoDRYwfjYc', /* sasakure. UK - For Campanella feat lasah (English ver.) */
	'https://www.youtube.com/watch?v=1gHHgx8bTxc', /* sasakure.UK - *Hello, Planet. feat. Miku Hatsune / ＊ハロー、プラネット。 */
	'https://www.youtube.com/watch?v=KGD-mFTY6mw', /* THE MOST SUPER KAWAII-EST LUCKY STAR FANDUB EVER. */
	'https://www.youtube.com/watch?v=25fsQofab9c', /* I'm So Lucky Lucky - Nightcore */
	'https://www.youtube.com/watch?v=1uUTM4OMNMk', /* PROOF I am 日本人  ラムネ好き！ Pretty intense animation */
	'https://www.youtube.com/watch?v=DnD_SvDdDkA', /* 【初音ミク】 ＬＩＮＫ 【オリジナル曲】*/
	'https://www.youtube.com/watch?v=YZfwXt8naAc', /* Perfume - Perfume */
	'https://www.youtube.com/watch?v=dFDiekVNy6I', /* モバイリ：センセーション（修正版）*/
	'https://www.youtube.com/watch?v=Y5bean7G1a8', /* Hatsune Miku - Boom, Boom, Boom, Boom!! (Cover) */
	'https://www.youtube.com/watch?v=vnhQ4yBH5ww', /* 【鏡音リン】 moon 【VOCALOIDカバー】 */
	'https://www.youtube.com/watch?v=4tuiyCLzrsQ', /* 【Miku Miku Dance】 vocaloid love and joy */
	'https://www.youtube.com/watch?v=0IkovhJYHUg', /* Hatsune Miku - I am programmer's song ( full song) */
	'https://www.youtube.com/watch?v=nj8GLCdmskA', /* DDR - True Love (Double) */
	'https://www.youtube.com/watch?v=YwDuZEXF-XQ', /* DDR TSUYOSHI＆AKANE SUNKISS DROP */
	'https://www.youtube.com/watch?v=B5NTMFraP2Y', /* Star Driver - Dazzeling the stage! HD */
	'https://www.youtube.com/watch?v=kYI6bR251T0', /* desire 初音ミク */
	'https://www.youtube.com/watch?v=Lj8db2VGS9A', /* Hatsune Miku - True my Heart -HATSUNE mix- */
	'https://www.youtube.com/watch?v=EYD7HApspNE', /*【MMD】Kawaii Miku Miku ni Shite ageru♪【Shiteyanyo】*/
	'https://www.youtube.com/watch?v=D1KqV5otAJ4', /* [Hatsune Miku] Miku Miku Ni Shite Ageru - English/Romanji Sub */
	'https://www.youtube.com/watch?v=S1XPW9eruds', /* Hatsune Miku "NEL" English subtitles 初音ミク */
	'https://www.youtube.com/watch?v=6vhzlYsWvuM', /* 06E 巡音ルカ */
	'https://www.youtube.com/watch?v=ydMYdtCCc4s', /* Kagamine Rin - noiz are nel (English & romaji subs) */
	'https://www.youtube.com/watch?v=mYp77tBIYtE', /* ACID NEL 初音ミク */
	'https://www.nicovideo.jp/watch/sm8378059', /* 【初音ミク】天の川【PV】*/
	'https://www.youtube.com/watch?v=te6ZKiVS4ow', /* 初音ミク　bpm 3DPV */
	'https://www.youtube.com/watch?v=422VbQry9Aw', /* 初音ミク　ワタシアナライザー　3ＤＰＶ */
	'https://www.youtube.com/watch?v=WzGch9EcdLs', /* 【初音ミクオリジナル曲】ワタシアナライザー【PV】.flv */
	'https://www.youtube.com/watch?v=wI6fGWFJijw', /* MineCraft - Earth */
	'https://www.youtube.com/watch?v=QBdbWhrviwU', /* "Smiley*Smiley" (Vocaloid Hatsune Miku Original Song) */
	'https://www.youtube.com/watch?v=CJ1J6ctuq1k', /* [祝DIVA入り]ストロボナイツ 編集版【yumiko featuring 初音ミク】*/
	'https://www.youtube.com/watch?v=SKfumaKBYZY', /* I missed the last train! Stranded in #VRChat Hwabon Night world */
	'https://www.youtube.com/watch?v=fWIbhwMDigM', /* 八王子P「エレクトリック・ラブ feat. 初音ミク」 */
	'https://www.youtube.com/watch?v=xyZzNAj-xDw', /* PC Engine Longplay [195] Ys Book 1 & 2 (Book 1) */
	'https://www.youtube.com/watch?v=fugtxz1znVw', /* Le Fishe au chocolat! Epic and lifechanging videoversion */
	'https://www.youtube.com/watch?v=g2QUwW6t3ro', /* Cyan Cat girl vr machine */
	'https://www.youtube.com/watch?v=EaI2JMcjXaQ', /* Hatsune Miku - Moon, Live in Tokyo 2012 (Alternate Angle) */
	'https://www.youtube.com/watch?v=KE3eGWRvwoY', /* 【あぴミクさんで】Packaged【MMD-PV】*/
	'https://www.youtube.com/watch?v=ZOf0K9nFxog', /* What's The Prob? 🐶 */
	'https://www.youtube.com/watch?v=4ccD-soZ4gM', /* Vektroid & New Dreams Ltd. / Fuji Grid TV Vol. II [1994, VHSRip] */
	'https://www.youtube.com/watch?v=EcDvUUB1H1I', /* 北斗の件 */
	'https://www.youtube.com/watch?v=5Xl_2YLg93U', /* 9mm Parabellum Bullet / The World */
	'https://www.youtube.com/watch?v=-DnrPwD-fus', /* CVLTVRΣ - ☯TempleＧｏｌｄ☯ */
	'https://www.youtube.com/watch?v=jHMi2OJU06k', /* Laserdisc Visions - Alien TV (MV) */
	'https://www.youtube.com/watch?v=6CPU2aKDWoo', /* 【初音ミク - Hatsune Miku】Far Away【Add Up Remix】*/
	'https://www.youtube.com/watch?v=6c2E6wiMIck', /* Hatsune Miku - La gata bajo la lluvia (Cover Japones) */
	'https://www.youtube.com/watch?v=DPsccKjAf2I', /* Fuji Grid TV - Prism Genesis (VISUAL ALBUM) */
	'https://www.youtube.com/watch?v=5RaDIBXkU3U', /* Japan Computer Graphics Lab (1984) */
	'https://www.youtube.com/watch?v=QDsDOlfz-QU', /* pae & sarah */
	'https://www.youtube.com/watch?v=SzT0dvNrFc4', /* Gigi D'Agostino - La Passion ( Official Video ) */
	'https://www.youtube.com/watch?v=zkQUFb4SswY', /* Japanese Commercial ~ Superflat Monogram */
	'https://www.youtube.com/watch?v=HgjyQ0_coJo', /* Nyan~ Neko Sugar Girls: All Episodes */
	'https://www.youtube.com/watch?v=4p1XlWtOC0Q', /* shamishami */
	'https://www.youtube.com/watch?v=7UFLY9bwhV8', /* CVLTVRE : NEW */
	'https://www.youtube.com/watch?v=SRam9zcijao', /* [Hatsune Miku became a robot] "Believe (ver.HD)" [MMD anime PV] */
	'https://www.youtube.com/watch?v=7j0mQH0BtEU', /* "FUTURE EVE" feat.HatsuneMiku / sasakure.‌UK + UKRampage */
	'https://www.youtube.com/watch?v=c-P7PiDBb6g', /* 【初音ミク - Hatsune Miku】Flowertone【Original】*/
	'https://www.youtube.com/watch?v=bU5rv7WfK30', /* Japanese Man Who Married Hatsune Miku */
	'https://www.youtube.com/watch?v=YaUpRcrJKTg', /* FM-TOWNS　の世界　紹介ビデオ（1989年）*/

//	'https://www.youtube.com/watch?v=3lkyJKGhjxM', /* [MMD]Ninja re bang bang - Hatsune Miku (GUMI Vocal) */
//	'https://www.youtube.com/watch?v=yVkDAJ-zQck', /* [MMD]Happy Synthesizer - Hatsune Miku */
//	'https://www.youtube.com/watch?v=hwR_w0gNVNU', /* [Vocaloid] Hatsune Miku - El mundo es mío (World is Mine - Español) (スペイン語 サルサ) */
//	'https://www.youtube.com/watch?v=3k_ZwRa1PaI', /* [Vocaloid] Hatsune Miku 初音ミク - PoPiPo - Merengue Version - メレンゲバージョン */
//	'https://www.youtube.com/watch?v=mUmoly7sulY', /* 【Hatsune Miku】Electric Chair【VOCALOID Parody】*/
//	'https://www.youtube.com/watch?v=IEYpfnSf0yc', /* 【VOCALOID】Hatsune Miku - Júrame (Cover) El lobo y la Sociedad Privada */
//	'https://www.youtube.com/watch?v=8HZM6plwEuI', /* 【Cumbia】Diganle 【Hatsune Miku】*/
];
var sel = urls[Math.floor(Math.random() * urls.length)];

window.addEventListener('DOMContentLoaded', function() {
	var msg = document.createElement('ins');
	msg.innerHTML = 'Taking you back to ' + sel;
	document.getElementsByTagName('body')[0].appendChild(msg);

	setTimeout(function() {
		window.location.replace(sel);
	},
	1500);
});
