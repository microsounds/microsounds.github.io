# ![badge](static/button/badge.png) microsounds.github.io
This is a [`kagami`][kagami] template and accompanying source code that renders my personal site at <https://microsounds.github.io/>

## ![w3c](static/button/valid-html5-blue.svg) Validation

This site aims for **polyglot HTML5** compliance, a robust well-formed subset of HTML5 and XHTML as defined by [W3C][polyglot] and [WHATWG][polyglot2] for more rigorous syntax validation.
This is sometimes referred to as XHTML5.

Documents should render identically when served as `text/html` or `application/xhtml+xml`.
In practice, modern browsers will render the stylesheet last on webpages served as XHTML,
flashing an unstyled page on every page load which browser caching does not seem to fix.

You can verify this yourself using `busybox httpd` or using [Schneegan's XHTML Proxy][proxy].
Use of modern features such as `audio` elements prevents validating as true [XHTML 1.0 Strict][xml].

[polyglot]: https://dev.w3.org/html5/html-polyglot/html-polyglot.html
[polyglot2]: https://wiki.whatwg.org/wiki/HTML_vs._XHTML
[proxy]: https://schneegans.de/xp/
[xml]: https://validator.w3.org/check?uri=https%3A%2F%2Fmicrosounds.github.io&charset=%28detect+automatically%29&doctype=XHTML+1.0+Strict&group=0

## Deploying
Normally, I run `kagami` and commit build artifacts in `master`.

* Use something simple like `busybox httpd` in the document root to preview changes before pushing.
* You could also comment out `unset DOC_ROOT` in `.kagami/macros` if you want to build for local viewing only.
	* AJAX calls to `file://` URIs will silently fail due to CORS restrictions in modern web browsers.

> **NOTE**<br/>
> This part is not kept up to date.

Scripts in `.kagami/macros` and `.scripts/` have hard dependencies on my userland environment located [here][atelier],
and operate under the assumption that you are me and you have a copy of all my dotfiles sitting in your `$HOME`
* Some examples include:
	* `.kagami/macros` expects my `~/.local/lib/moonphase-date` — timestamp conversion routines, requires GNU `date`, `bc`
	* `.scripts/dotfiles-ls.sh` expects every single file in my userland environment to properly build `notes/dotfiles.md`
	* `.scripts/unreachable.sh` expects git alias `list-files` to spider through this repo to check for broken links.

### External build processes pushing to this repo
Updates to my [userland environment][atelier] trigger an Actions workflow that
performs a simplified version fo the CI/CD behavior described below as a side
effect of testing my dotfiles on every revision.

[kagami]: https://github.com/microsounds/kagami
[atelier]: https://github.com/microsounds/atelier

<!-- this should be it's own article -->
## On CI/CD automated page builds
If your plan is to use GitHub Pages with your own static site generator, you
could keep only source code in `master` and automatically `push -f` build
artifacts to a different orphan branch not unlike what GitHub does for pages
using Jekyll.

If you want to avoid cluttering your commit history with CI commits coming from your account,
use the `github-action` bot's `git` username `github-actions` and email address `github-actions@github.com` when committing.

### Committing to a different repo
The default per-run GitHub Actions token `${{ secrets.GITHUB_TOKEN }}` will not allow you to push new commits to a a different repo you control.

For GitHub Pages, this requires creating a Personal Access Token with at least `public_repo` permissions and adding it to your repo's secrets.
* _Generate a PAT at `Settings > Developer settings > Personal access tokens`_

* _An example workflow depicting this automated build behavior can be found [here](static/unused/build.yml)_.

![img](static/starry.jpg)
