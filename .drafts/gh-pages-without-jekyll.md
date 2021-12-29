<!-- created 2021/12/27 -->
<!-- not sure if this should be one article or three -->

# Automating GitHub Pages without using Jekyll
Written on {CREATED}

Maybe I'm not like other people, I _really really_ enjoy using `git` and discovering new excuses to work it into more and more and more aspects of my life.
It bills itself as _"the stupid content tracker,"_ and it's really well suited for all kinds of iterative works, even when they're not plaintext.

I really don't enjoy [vendor lock-in][lock-in] however, so you can understand why I would feel conflicted about some of the ways GitHub,
the biggest and most visible `git` repo hosting platform and a [wholly owned subsidiary][ms lock-in] of Microsoft,
encourages non-portable uses of the standard `git` client to [advance their business interests][eee].

[lock-in]: https://en.wikipedia.org/wiki/Vendor_lock-in
[ms lock-in]: https://en.wikipedia.org/wiki/Criticism_of_Microsoft#Vendor_lock-in
[eee]: https://en.wikipedia.org/wiki/Embrace,_extend,_and_extinguish

{THEMATIC_BREAK}

From this point onward, I'm shortening _GitHub Pages_ to _Pages_ for brevity.

This is a guide on how to automate page builds using your preferred static site generator on Pages, but in a portable way.

I'm only writing this because I had to figure it out myself from trial and error,
this is very much not an officially supported way to use Pages.
You're expected to commit the build artifacts emitted by your static site generator into
the same repo if you're not willing to use their entire vendor-provided toolchain, like me.

I don't have anything against their toolchain, but it's very 

The default user experience is very different, you commit some plaintext markdown to your `<username>.github.io` repo and it automatically gets built by their CI/CD service called _Actions_ and pushed to your repo under a different branch named `gh-pages` which becomes the publically served webpage.

They don't make it very clear how to recreate this functionality yourself.

Since this is a very abstract thing you'd want to do, and since this is very
much not an officially supported way to use Pages, here's a shortlist of search
queries I had to make to find scraps of information on how to do this.

* _github pages static site generator -jekyll_
* _github actions push to own repo_
* _github actions workflow syntax_
* _github actions GITHUB_TOKEN push to own repo_
* _github GITHUB_TOKEN permissions_


The default user experience on Pages has you building your site from plaintext markdown files using 

If GitHub ever pulls the plug, or if you ever get banned, or if for some reason Microsoft makes you feel unwelcome there in the future, you can just take your website elsewhere.


GitHub Pages is a free service GitHub offers that gives you a subdomain and a soft limit 1GB of free static web hosting with very few apparent rules that I could tell
The default user experience on GitHub pages
You know how the default GitHub Pages templates automatically build your
Anyway, this is a guide on how to use your preferred static site generator with GitHub Pages

<div class="aside right">
<hr>

### On the spiritual vendor lock-in of `git` perpetuated by GitHub's aggressive marketing


There's a good likelihood that you[^1] have encountered people in your life[^2] that _will_ have heard of `git` _and_ GitHub, and have been mislead into believing they are _**one and the same thing**_, either by sheer ignorance, or due to very effective marketing.

Wanna suggest using `git` to anyone? For anything in particular, for any reason? How about making that suggestion to _non-programmers_?
You might get confused looks, or actual aversion to the idea of uploading their stuff to GitHub, maybe they don't want to make their things publically available?

Barring having to explain the benefits of version control tools to non-programmers, It never really entered their minds that you can use `git` without being connected to the internet, and if you did want to upload to a remote `git` hosting server, it doesn't have to be GitHub.

They might even believe that the `git` version control tool _(est. 2005)_ was created _**by**_ GitHub exclusively for use on their code hosting platform _(est. 2008)_ instead of the other way around.

It's not all bad however, GitHub made it fashionable for people to simply upload their projects simply because they saw everyone else doing it, the value

[^1]: Yes, specifically you, if you managed to find your way here.
[^2]: Or on the internet, which is far more likely, if we're being honest.

<hr>
</div>

ksjklajdkjsal
