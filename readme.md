This is a [`kagami`][kagami] template that renders my personal site at <https://microsounds.github.io/>

* Scripts in `.kagami/macros` and `.scripts/` have hard dependencies on my userland environment located [here][atelier].
	* `.local/lib/moonphase-date` — timestamp conversion routines, requires GNU `date`, `bc`.
	* `readme.md` — required to build `notes/dotfiles.md`, requires GNU `date`, `bc`, `shuf`, also `git`.

Use something simple like `busybox httpd` to preview changes before deploying.

You could also comment out `unset DOC_ROOT` in `.kagami/macros` if you want to build for local viewing only.

![img](static/starry.png)

[kagami]: https://github.com/microsounds/kagami
[atelier]: https://github.com/microsounds/atelier
