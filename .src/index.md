# Homepage

<!-- original: https://gelbooru.com/index.php?page=post&s=view&id=3757995 -->
![heading]({DOC_ROOT}/static/starry.jpg)

## About me
This is my little sanctuary where I bottle up the unix computer zealot in me, you can call me `microsounds` if you want.

I like ~~muted pastels,~~ starry night skies, people watching and the [unix][unix1] [programming][unix2] [environment][unix3].
I like to have [this album][noise] in the background sometimes.

More importantly, I enjoy designing/writing my own tools and extending existing tools to automate things I would otherwise be doing by hand.
Sometimes, I'll do this to force myself to try new things.

<div class="right" style="filter: grayscale(65%); font-style: italic;">

For example, this website,
the superset of github flavored markdown I built up to author this site,
and the static site generator I wrote that ties it all together were a result of me wanting to get into long form writing.

That's the excuse I give myself, anyway.
I don't actually care for long form writing,
I just really like metaprogramming.

It's a never-ending process.

[![ico-scripts]({DOC_ROOT}/static/shimemiku/shime32.png)](notes/dotfiles.md "It's pretty fun though.")

</div>

<hr style="width: 40%;"/>

## Things I've made recently
* _(2019–present)_ my "graphical shell" computing environment — [`{AUTHOR}/atelier`]({DOC_ROOT}/notes/dotfiles.md)
	* _My self-contained and unabridged collection of dotfiles and scripts for Debian GNU/Linux._
* _(2020–present)_ static microblog processor in POSIX shell — [`{AUTHOR}/kagami`]({GIT_REMOTE}/kagami)
	* _A user-extensible macro preprocessor and static webpage generator for blog sites like this one._
* _(2019–present)_ this website and its `kagami` template — [`{AUTHOR}/microsounds.github.io`]({GIT_REMOTE}/microsounds.github.io)
	* _<span id="gh-update">View list of [recent changes]({GIT_REMOTE}/microsounds.github.io/commits).</span>_

## Old projects
* _(2016–2017)_ ***[retired]*** lightweight futaba-like messageboard system in C — [`{AUTHOR}/akari-bbs`]({GIT_REMOTE}/akari-bbs)
* _(2016)_ CPU-based tripcode generator for futaba-like imageboards — [`{AUTHOR}/tripforce`]({GIT_REMOTE}/tripforce)
* _(2016)_ ***[retired]*** command-line utility for scraping Bandcamp albums — [`{AUTHOR}/bc-dl`]({GIT_REMOTE}/bc-dl)
* _(2016)_ command-line stack-based RPN calculator — [`{AUTHOR}/hpsh`]({GIT_REMOTE}/hpsh)

## Contact me

If it's about a project or a page on this website, open an issue or a pull request on GitHub at one of the links above.

## Links
<div class="center">

[![ico-debian]({DOC_ROOT}/static/button/debian.png)](https://debian.org/distrib)
[![ico-nano]({DOC_ROOT}/static/button/nano.png)](https://nano-editor.org)
[![ico-vocaloid]({DOC_ROOT}/static/button/vocaloid.gif)](https://www.youtube.com/watch?v=JmvOuyeqoLw&amp;list=PLJQumuuts49qC9sbhf4Deky0-XZuY09A_)
[![ico-miku3]({DOC_ROOT}/static/button/mikuproved.gif)](/EEEEEEEEEEEEEEEEEEEEEEE)
[![ico-miku1]({DOC_ROOT}/static/button/hatsunemiku1.gif)](https://www.youtube.com/watch?v=3rsBLRFONEs)
[![ico-miku2]({DOC_ROOT}/static/button/miku.gif)](https://www.youtube.com/watch?v=NJAghsisnok)
[![ico-konata]({DOC_ROOT}/static/button/konata.gif)](https://www.youtube.com/watch?v=KGD-mFTY6mw)
[![ico-filler1]({DOC_ROOT}/static/button/88x31pinkmarble.gif)](/eeeeeeeeeeeeeeeeee)
[![ico-html]({DOC_ROOT}/static/button/valid-html5-blue.svg)](https://validator.w3.org/check/referer)
[![ico-css]({DOC_ROOT}/static/button/valid-css-blue.svg)](https://jigsaw.w3.org/css-validator/check/referer)
[![ico-cc]({DOC_ROOT}/static/button/cc.png)]({CC_BY_SA})
[![ico-gpl]({DOC_ROOT}/static/button/gpl.png)]({GNU_GPL})

[![ico-badge]({DOC_ROOT}/static/button/badge.png)]({DOC_ROOT}/static/button/badge.png "static version")
[![ico-badge]({DOC_ROOT}/static/button/badge.gif)]({DOC_ROOT}/static/button/badge.gif "animated version")

<span class="aside">If you enjoyed my website and you'd like to link here, feel free to use my badge on your own site.</span>
</div>

<script type="text/javascript">
	/* fetch date of last update */
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
</script>

<!-- extended reading on unix and adjacent topics -->
<!-- [unix]: http://emulator.pdp-11.org.ru/misc/1978.07_-_Bell_System_Technical_Journal.pdf -->
[unix1]: https://files.catbox.moe/gn20dj.pdf
       "Bell System Technical Journal Vol. 57, No. 6, Part 2, pp. 1905- (July-Aug. 1978), Dennis Ritchie, Ken Thompson"
[unix2]: http://files.catwell.info/misc/mirror/the-unix-programming-environment-kernighan-pike.pdf
       "The Unix Programming Environment (1984), Brian Kernighan, Rob Pike"
[unix3]: http://www.catb.org/~esr/writings/taoup/html/
       "The Art of Unix Programming (2003), Eric S. Raymond"

[noise]: https://effexxx.bandcamp.com/album/from-4jyo-han-to-everywhere-again
       "from 4jyo​-​han to everywhere (2011), effe"
