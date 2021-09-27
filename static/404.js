'use strict';

/*
 * upon 404, distract the user with something dumb
 * there's some miku songs in here somewhere, mostly just old videos
 */
var urls = [
	'https://www.youtube.com/watch?v=xbFfz13gch4&t=40s',
	'https://www.youtube.com/watch?v=saYQAo9bvRI&t=1381s',
	'https://www.youtube.com/watch?v=UxYaFvzSv2U&t=1946s',
	'https://www.youtube.com/watch?v=4x0_746fqW8',
	'https://www.youtube.com/watch?v=KGD-mFTY6mw',
	'https://www.youtube.com/watch?v=1uUTM4OMNMk',
	'https://www.youtube.com/watch?v=nj8GLCdmskA',
	'https://www.youtube.com/watch?v=wI6fGWFJijw',
	'https://www.youtube.com/watch?v=FoJmBzTi0IQ',
	'https://www.youtube.com/watch?v=1gHHgx8bTxc',
	'https://www.youtube.com/watch?v=QBdbWhrviwU',
	'https://www.youtube.com/watch?v=SKfumaKBYZY',
	'https://www.youtube.com/watch?v=fWIbhwMDigM',
	'https://www.youtube.com/watch?v=e5IR8Njabj8',
	'https://www.youtube.com/watch?v=3pcfCWi3T7o',
	'https://www.youtube.com/watch?v=ccNpYv85PkQ',
	'https://www.youtube.com/watch?v=7JHHZfilMng',
	'https://www.youtube.com/watch?v=xyZzNAj-xDw',
	'https://www.youtube.com/watch?v=_BTaYyIXEdk',
	'https://www.youtube.com/watch?v=fugtxz1znVw',
	'https://www.youtube.com/watch?v=g2QUwW6t3ro',
	'https://www.youtube.com/watch?v=XpAWbMtKO5k',
	'https://www.youtube.com/watch?v=ZOf0K9nFxog',
	'https://www.youtube.com/watch?v=EcDvUUB1H1I',
	'https://www.youtube.com/watch?v=HmWf-aoF_v8',
	'https://www.youtube.com/watch?v=5Xl_2YLg93U',
	'https://www.youtube.com/watch?v=-DnrPwD-fus',
	'https://www.youtube.com/watch?v=jHMi2OJU06k',
	'https://www.youtube.com/watch?v=DPsccKjAf2I',
	'https://www.youtube.com/watch?v=5RaDIBXkU3U',
	'https://www.youtube.com/watch?v=QDsDOlfz-QU',
	'https://www.youtube.com/watch?v=SzT0dvNrFc4',
	'https://www.youtube.com/watch?v=zkQUFb4SswY',
];
var sel = urls[Math.floor(Math.random() * urls.length)];
document.body.innerHTML = '<h1>Taking you to ' + sel + '!</h1>';
window.location.replace(sel);
