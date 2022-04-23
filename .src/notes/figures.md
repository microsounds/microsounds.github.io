<!-- started 2022/4/21 -->

# My Collection of Assorted Figurines
Last updated {CREATED}

Here's my small IRL collection of figurines and other assorted cute things.
Most are "prize figures" of the variety you could win from a Japanese "skill" claw machine,
but I do no such thing because I don't live anywhere near one stocked with prize figures I would actually like.

I don't feel like actually making an account on _[myfigurecollection.net](https://myfigurecollection.net)_ to tell people about them though.
This page will do for now, links take you to their catalog entry on _mfc_.

## Collection
_They're in no particular order, only sorted by date I remember getting it, probably._

<div id="fig-thumbs">
<noscript>
<blockquote>
<p><strong>NOTE</strong><br/>
	This page requires JavaScript to function, because I don't feel like using a shell script to generate it statically.</p>
</blockquote>
</noscript>

</div>

<div class="aside right">

| Key | Meaning |
| -- | -- |
| ![ico-fig](https://static.myfigurecollection.net/pics/figure/186.jpg) | **Owned** |
| ![ico-fig-fake](https://static.myfigurecollection.net/pics/figure/186.jpg) | **Fake/Knockoff** |

</div>

## On Counterfeits
If you're into figure collecting, take care not to fall for counterfeits, these are figures of varying quality sold at abnormal prices and/or designs that are years out of production being sold new.
Do not assume that physical outlets located in shopping malls, indoor or outdoor swap meets are honest or have any clue what they are selling, they can and will play dumb if it suits them.
_Understand that even if the price is right, with counterfeits, you will get exactly what you pay for._

## Bonus Gallery
This gallery is automatically generated, click images to see more user-submitted images on _myfigurecollection.net_!

<div class="gallery" id="fig-gallery">
</div>

<style type="text/css">
	[alt*="fig"] {
		border-radius: 10px;
		border: 3px #6b9f5b solid;
		padding: 2px;
		margin: 2px;
		height: 64px;
		width: 64px;
	}
	[alt*="fake"] {
		border: 3px #932525 solid;
	}
</style>

<script type="text/javascript">
/* <![CDATA[ */
'use strict';

var figs = [
	/* ids prepended with x are knockoffs */
	[ '1216990', 'racing miku 2021 espresto' ],
	[ '1035745', "mega 39's breathe you SPM miku" ],
	[ '1112719', 'miku big nuigurumi plush' ],
	[ '756832', 'hatsune miku 2nd season Spring ver.' ],
	[ '776143', 'hatsune miku 2nd season Summer ver.' ],
	[ '4741', 'hatsune miku EX figure 2009' ],
	[ '1150601', 'miku nesoberi nuigurumi (extra tiny)' ],
	[ '798190', 'sakura miku SPM' ],
	[ '720383', 'fate/extella link astolfo SPM' ],
	[ '693275', 'miku mega jumbo nuigurumi plush 2018' ],
	[ '675904', 'gochiusa sxarp nendoroid #929' ],
	[ '689123', 'snow princess miku nendoroid #1000' ],
	[ '464596', 'konosuba megumin nendoroid #725' ],
	[ '440687', 'project diva X SPM miku' ],
	[ '583734', 'izayoi sakura prize figure' ],
	[ '200768', 'funko pop rocks miku #39' ],
	[ '246546', 'project diva F2nd miku' ],
	[ 'x287774', 'umaru-chan nendoroid #524' ],
	[ 'x26113', 'snow miku nendoroid #150' ],
	[ '198604', 'project diva 2nd miku' ],
	[ '47413', 'kogami akira lucky star banpresto' ],
	[ '167123', 'project diva arcade miku 2012' ],
	[ '100292', 'hatsune miku plush great eastern 2012' ],
];

var thumbs = document.getElementById('fig-thumbs');
var gallery = document.getElementById('fig-gallery');

for (var i in figs) {
	var id = figs[i][0];
	var title = figs[i][1];
	var alt = 'ico-fig';
	if (id.charAt(0) == 'x') {
		id = id.slice(1);
		alt = alt + '-fake';
	}

	var l1, l2, l3;

	/* icons */
	l1 = document.createElement('a');
	l1.href= "https://myfigurecollection.net/item/" + id;

		l2 = document.createElement('img');
		l2.alt = alt;
		l2.title = title;
		l2.src = "https://static.myfigurecollection.net/pics/figure/" + id + ".jpg";
		l1.appendChild(l2);

	thumbs.appendChild(l1);

	/* gallery */
	l1 = document.createElement('p');

		l2 = document.createElement('a');
		l2.href = "https://myfigurecollection.net/pictures.php?itemId=" + id;

			l3 = document.createElement('img');
			l3.src = "https://static.myfigurecollection.net/pics/figure/big/" + id + ".jpg";
			l3.title = title;
			l3.alt = 'nolink';
			l2.appendChild(l3);

	l1.appendChild(l2);
	gallery.appendChild(l1);
}

/* ]]> */
</script>

