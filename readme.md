# ![badge](static/button/badge.png) microsounds.github.io
This is a [`kagami`][kagami] template and accompanying source code that renders my personal site at <https://microsounds.github.io/>

## Validation
This site aims for [Polyglot HTML5/XHTML5][polyglot] compliance for more rigorous syntax validation.

Documents should render equally well when served using MIME types such as `application/xml` and `application/xhtml+xml`, but this results in worse stylesheet page draw performance in every browser I've tried this in.
You can test this yourself using [Schneegan's XHTML Proxy][proxy].
It would probably also [validate as XHTML 1.0 Strict][xml] if it didn't make use of HTML5 features like `audio` tags.

[polyglot]: https://dev.w3.org/html5/html-polyglot/html-polyglot.html
[proxy]: https://schneegans.de/xp/
[xml]: https://validator.w3.org/check?uri=https%3A%2F%2Fmicrosounds.github.io&charset=%28detect+automatically%29&doctype=XHTML+1.0+Strict&group=0

## Deploying
Normally, I run `kagami` and commit build artifacts in `master`.
It's just easier and works everywhere, even on my phone.

* Use something simple like `busybox httpd` to preview changes before pushing, it's what I use.
* You could also comment out `unset DOC_ROOT` in `.kagami/macros` if you want to build for local viewing only.

<!-- this part is not kept up to date -->
* Scripts in `.kagami/macros` and `.scripts/` have hard dependencies on my userland environment located [here][atelier].
	* `.local/lib/moonphase-date` — timestamp conversion routines, requires GNU `date`, `bc`.
	* `readme.md` — required to build `notes/dotfiles.md`, requires GNU `date`, `bc`, `shuf`, also `git`.

### External build processes pushing to this repo
Currently, pushes to my [dotfiles][atelier] trigger an Actions workflow that
performs a simplified version fo the CI/CD behavior described below as a side
effect of testing my userland environment on every revision.

[kagami]: https://github.com/microsounds/kagami
[atelier]: https://github.com/microsounds/atelier

<!-- this should be it's own article -->
## On CI/CD automated page builds
If your plan is to use GitHub Pages with your own static site generator, you
could keep only source code in `master` and automatically `push -f` build
artifacts to a different orphan branch not unlike what GitHub does for pages
using Jekyll.

For GitHub Pages, this requires creating a Personal Access Token with at least `public_repo` permissions and adding it to your repo's secrets.
* _Generate a PAT at `Settings > Developer settings > Personal access tokens`_

The default GitHub Actions token `${{ secrets.GITHUB_TOKEN }}` will not work here as far as I know.

* _An example workflow depicting this automated build behavior can be found [here](static/unused/build.yml)_.

> I don't care to test it, but you may be able to skip making a PAT if you were
> to use GitHub's proprietary Actions workflows like `actions/checkout@v2`, but
> I'd rather just spawn a debian container and don't want to do things in some
> vendor-specific way.

![img](static/starry.jpg)
