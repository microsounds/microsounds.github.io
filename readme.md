This is a [`kagami`][kagami] template that renders my personal site at <https://microsounds.github.io/>

![ci]
Branch `master` is for this template, build artifacts from kagami are pushed to `gh-pages`

* Scripts in `.kagami/macros` and `.scripts/` have hard dependencies on my personal shell scripts located [here][atelier].
	* `.local/lib/moonphase-date` — timestamp conversion routines, requires GNU coreutils `date`
	* `readme.md` — required to build `notes/dotfiles.md`

[kagami]: https://github.com/microsounds/kagami
[atelier]: https://github.com/microsounds/atelier
[ci]: https://github.com/microsounds/microsounds.github.io/actions/workflows/build.yml/badge.svg
