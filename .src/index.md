# Homepage
<noscript>
	<p><em>You have JavaScript disabled, dynamic content and multimedia will not work.</em></p>
</noscript>

![heading]({DOC_ROOT}/static/starry.jpg)
<span class="aside"><sup>_Original illustration [&copy; 2015 tanakatam][illust]_</sup></span>

## About me
This is my little sanctuary where I bottle up the unix computer zealot in me, you can call me `microsounds` if you want.

I like ~~muted pastels,~~ starry night skies, people watching and the [unix][unix1] [programming][unix2] [environment][unix3].
This site is my ongoing effort to rekindle my lived, neglected and [potentially imagined][nostalgia] experiences from the recent past.

[nostalgia]: https://en.wiktionary.org/wiki/anemoia

<div class="aside right">

"I bet you have soft hands and have trouble in loud environments"<br/>
--- [/g/ post No.85561792](https://desuarchive.org/g/thread/85512771/#85561792)

</div>

The echoes of the old world I once loved and lost have grown dissonant and almost unrecognizable,
and even though the world I used to know has all but bitrotted away,
I can still make out the last remnants of those dreamlike days,
the [_sentimental microsounds_][sasakure.uk] and the [sweet nothings][effe] spared the ravages of time.

But aside from that, I enjoy designing/writing my own tools and extending existing tools to automate things I would otherwise be doing by hand.
Both as a form of puzzle solving, and sometimes to force myself to try new things.

<div class="right" style="filter: grayscale(65%); font-style: italic;">
<h2 class="center"><em>"The promise and wonder of sharing what we know"</em></h2>

Personally written web pages where individuals can share their knowledge, dreams and desires through the low tech, open and psuedononymous nature of the world wide web have all but disappeared.
Unfettered access to the world's useful information is slowly being eroded in the pursuit of user data analytics and short term financial gain at the expense of everyone else.

I rolled my own static site generator and my own superset of markdown to author this site and to show that things don't have to end this way.
Anyone can create their own personal sandbox on the web and put as much or as little effort into it as they'd like.

I would be lying if I said I was interested in long form writing, I want to share what I like through the lens of metaprogramming and have fun doing it.

It's a never-ending process.

[![ico-scripts]({DOC_ROOT}/static/shimemiku/miku.gif)](notes/dotfiles.md "It's pretty fun though.")

<div class="aside">

"This is a website for a person who is nostalgic for the past. They remember fondly the world they used to know, and although it has all but disappeared, they can still make out the last remnants of it. They want to share their memories with others who may feel the same way and create a community of like-minded people." <br/>
--- **OpenAI GPT-3** after being [prompt injected](https://simonwillison.net/2022/Sep/12/prompt-injection/) with this website.

"your internet personality is the gayest thing ive ever seen---i love it" <br/>
--- [/g/ post No.90164467](https://desuarchive.org/g/thread/90152692/#90164467)

</div>

<!-- firefox renders this hr element above this entire floated div if not placed here -->
<hr style="width: 70%;
	border-width: 5px;
	color: #FFF;
	transform: rotate(120deg);
	opacity: 40%;" />
</div>

## Things I've made recently
I have a collection of notes and writings located at [`/notes`](notes/index.md) if you're interested.

* _(2019–present)_ my "graphical shell" computing environment — [`{AUTHOR}/atelier`]({DOC_ROOT}/notes/dotfiles.md)
	* _My self-contained and unabridged collection of dotfiles and scripts for Debian GNU/Linux._
* _(2020–present)_ static microblog processor in POSIX shell — [`{AUTHOR}/kagami`]({GIT_REMOTE}/kagami)
	* _A user-extensible macro preprocessor and static webpage generator for blog sites like this one._
* _(2018–present)_ this website and its `kagami` template — [`{AUTHOR}/microsounds.github.io`]({GIT_REMOTE}/microsounds.github.io)
	* _<span id="gh-update">View the [`git` changelog]({GIT_REMOTE}/microsounds.github.io/commits) or [RSS feed]({SITE_HOSTNAME}/rss.xml) to see most recent changes.</span>_

## Old projects
* _(2016–2017)_ ***[retired]*** lightweight futaba-like messageboard system in C — [`{AUTHOR}/akari-bbs`]({GIT_REMOTE}/akari-bbs)
* _(2016)_ CPU-based tripcode generator for futaba-like imageboards — [`{AUTHOR}/tripforce`]({GIT_REMOTE}/tripforce)
* _(2016)_ ***[retired]*** command-line utility for scraping Bandcamp albums — [`{AUTHOR}/bc-dl`]({GIT_REMOTE}/bc-dl)
* _(2016)_ command-line stack-based RPN calculator — [`{AUTHOR}/hpsh`]({GIT_REMOTE}/hpsh)

## Even older
* _(2015-2018)_ An older, abandoned iteration of this website — [`microsounds.neocities.org`](https://microsounds.neocities.org)
	* _I was never much for writing then either._
* _(2012-2015)_ <span class="blink" style="color: #FFA5B5;"><em>NSFW!</em></span>
a collection of _"About Mes"_ previously published on Last.fm
— [`/misc/last-fm.htm`](/misc/last-fm.htm)
	* _Warning: 45,056K of animated images._

## Contact me
I'm <span id="discord-name"></span> on d*scord, feel free to message me anytime, I receive push notifications even when offline.
Currently <span id="discord-status"></span>.
<span class="footer" style="color: #CCC;">Powered by [Lanyard API](https://github.com/Phineas/lanyard)</span>

If it's about a project or a page on this website, open an issue or a pull request on GitHub at one of the links above.

<span class="blink" style="color: #FFFF00;"><em>New!</em></span> ---
If you want to contact me by e-mail, my contact info is below.<br/>
It's not really a puzzle, just remove spaces and newlines and swap the places of every 2 characters like this, `1MUk -> M1kU`, and decode the resultant mess as `base64`, then `gzip`.

<pre><code><span class="term-prompt">{AUTHOR}@{PC_NAME}</span>:<span class="term-dir">~</span>$ cat contact.txt | gzip -c | base64 -w 0 \
&gt;	| sed -E -e 's/(.)(.)/\\\\2\\\\1/g' -e 's/.&#123;4&#125;/&amp; /g' | fold -s
4HIs AAAA AACA 9AVP QhLA yGRC FXiq 5maF Alkp qcmX mJmb CWkm uFnQ xJbp qODS HuJr
b+cl ZKFn fyFl VKKY SxFU Yq5m pymZ pBcZ JAR/ fkH1 AAAA
</code></pre>

<details>
<summary>Click here for a hint if you're stuck.</summary>
<em>Never run unknown or <a href="http://thejh.net/misc/website-terminal-copy-paste">untrusted shell commands</a>
copy-pasted directly from someone's website.</em>
<br/>
<code>wget -qO- {SITE_HOSTNAME} | sed -n '/^4HIs/{N;p}' | tr -d '\\\\n ' | sed -E 's/(.)(.)/\\\\2\\\\1/g' | base64 -d | zcat</code>
</details>

## Links
<div class="center">

[![ico-debian]({DOC_ROOT}/static/button/debian.png)](https://debian.org/distrib)
[![ico-nano]({DOC_ROOT}/static/button/nano.png)](https://nano-editor.org)
[![ico-vocaloid]({DOC_ROOT}/static/button/vocaloid.gif)](https://www.youtube.com/watch?v=JmvOuyeqoLw&amp;list=PLJQumuuts49qC9sbhf4Deky0-XZuY09A_)
[![ico-miku3]({DOC_ROOT}/static/button/mikuproved.gif)](/EEEEEEEEEEEEEEEEEEEEEEE)
[![ico-miku1]({DOC_ROOT}/static/button/hatsunemiku1.gif)](https://www.youtube.com/watch?v=3rsBLRFONEs)
[![ico-miku2]({DOC_ROOT}/static/button/miku.gif)](https://www.youtube.com/watch?v=Z7VnvCWCOww)
[![ico-konata]({DOC_ROOT}/static/button/konata.gif)](https://www.youtube.com/watch?v=KGD-mFTY6mw)
[![ico-filler1]({DOC_ROOT}/static/button/88x31pinkmarble.gif)](/eeeeeeeeeeeeeeeeee)
[![ico-html]({DOC_ROOT}/static/button/valid-html5-blue.svg)](https://validator.w3.org/check/referer)
[![ico-css]({DOC_ROOT}/static/button/valid-css-blue.svg)](https://jigsaw.w3.org/css-validator/check/referer)
[![ico-cc]({DOC_ROOT}/static/button/cc.png)]({CC_BY_SA})
[![ico-gpl]({DOC_ROOT}/static/button/gpl.png)]({GNU_GPL})

[![ico-badge]({DOC_ROOT}/static/button/badge.png)]({DOC_ROOT}/static/button/badge.png "static version")
[![ico-badge]({DOC_ROOT}/static/button/badge.gif)]({DOC_ROOT}/static/button/badge.gif "animated version")

<span class="aside">Best viewed at 380px or wider, feel free to use my meme badge on your own site.</span>
<br/>
<span class="aside">A member site of [1MB Club][1mb], written in [polyglot HTML5][xhtml], reject JS frameworks and spit on all their advocates!</span>

</div>

[1mb]: https://1mb.club#:~:text=microsounds.github.io
[xhtml]: {GIT_REMOTE}/microsounds.github.io#-validation

<!-- TODO: if this gets any bigger this should be it's own .js file -->
<script type="text/javascript">
/* <![CDATA[ */
	/* fetch date of last site commit
	 * github API rate limits to 60 GETs per hour
	 */
	var api = 'https://api.github.com/repos/{AUTHOR}/microsounds.github.io/branches/master';
	var req = new XMLHttpRequest();
	req.open('GET', api, true);
	req.onload = function() {
		if (this.status == 200) {
			document.getElementById('gh-update').innerHTML += ' Last updated on ' +
				new Date(JSON.parse(this.response).commit.commit.author.date).toLocaleDateString() + '.';
		}
	};
	req.send();

	/* fetch discord presence with lanyard API
	 * https://github.com/Phineas/lanyard
	 */
	uid = '194678252806078466';
	api = 'https://api.lanyard.rest/v1/users/' + uid;
	req = new XMLHttpRequest();
	req.open('GET', api, true);
	req.onload = function() {
		if (this.status == 200) {
			/* name and avatar */
			document.getElementById('discord-name').innerHTML +=
				'<em><a title="Click to add me directly!" href="https://discord.com/users/' + uid + '">' +
				'<img src="https://cdn.discordapp.com/avatars/' + uid +
				'/' + JSON.parse(this.response).data.discord_user.avatar + '.png?size=40" /> ' +
				JSON.parse(this.response).data.discord_user.username + '#' +
				JSON.parse(this.response).data.discord_user.discriminator + '</a></em>';

			/* presence */
			var f = document.getElementById('discord-status');
			switch (JSON.parse(this.response).data.discord_status) {
				case 'online': f.innerHTML += '<span class="blink" style="color: #BDFFB9;"><strong>online</strong></span>'; break;
				case 'idle': f.innerHTML += '<span class="blink" style="color: #FFFAB9;"><strong>idle</strong></span>'; break;
				case 'dnd': f.innerHTML += '<span class="blink" style="color: #FFB9CF;"><strong>busy</strong></span>'; break;
				case 'offline': f.innerHTML += '<strong>offline</strong>'; return;
			}

			/* activities
			 * https://discord.com/developers/docs/game-sdk/activities
			 */
			var act = JSON.parse(this.response).data.activities;
			if (act.length > 0)
				f.innerHTML += ', last seen';
			else {
				f.innerHTML += ' and not doing anything';
				return;
			}
			for (var i in act) {
				switch (act[i].type) {
					case 0: f.innerHTML += ' playing '; break;
					case 1: f.innerHTML += ' streaming '; break;
					case 2: f.innerHTML += ' listening to '; break;
					case 3: f.innerHTML += ' watching '; break;
					case 5: f.innerHTML += ' competing in '; break; /* ??? */
					/* custom status */
					case 4: f.innerHTML += ' saying '; act[i].name = '"' + act[i].state + '"'; break;
				}
				f.innerHTML += '<em><strong>' + act[i].name + '</strong></em>';
				if (act.length > 1 && i != act.length - 1)
					f.innerHTML += ' and';
			}
		}
		else
			document.getElementById('discord-status').innerHTML += 'Lanyard API is down and this feature is broken..';
	};
	req.send();
/* ]]> */
</script>

<!-- extended reading on unix and adjacent topics -->
[unix1]: http://emulator.pdp-11.org.ru/misc/1978.07_-_Bell_System_Technical_Journal.pdf
       "Bell System Technical Journal Vol. 57, No. 6, Part 2, pp. 1905- (July-Aug. 1978), Dennis Ritchie, Ken Thompson"
[unix2]: http://files.catwell.info/misc/mirror/the-unix-programming-environment-kernighan-pike.pdf
       "The Unix Programming Environment (1984), Brian Kernighan, Rob Pike"
[unix3]: http://www.catb.org/~esr/writings/taoup/html/
       "The Art of Unix Programming (2003), Eric S. Raymond"

<!-- two of my all-time favorite musical albums -->
[effe]: https://effexxx.bandcamp.com/album/from-4jyo-han-to-everywhere-again
       "from 4jyo​-​han to everywhere (2011), effe"
[sasakure.uk]: https://www.youtube.com/watch?v=NHmghVWPdQU&list=OLAK5uy_khzI0hCPcRjfp3VWqqpTD1UwPxtvWntbE
	"Do Vocaloids Dream of Doomsday Birds? (2011), sasakure.UK"

[illust]: https://gelbooru.com/index.php?page=post&s=view&id=3757995
