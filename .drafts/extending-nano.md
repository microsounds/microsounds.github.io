{UPDATED}

<!-- this one is really boring to write about -->

<!-- created 8/15/2021 -->
<!-- updated 9/30/2021 -->

# Techniques and avenues for extending GNU nano
# Adventures in extending GNU nano --- your one and only editor!
_An outline on techniques and avenues for extending GNU nano functionality using shell scripting and other hacks._

## Some background a.k.a "The ballade of the *nix weenie"
Newcomers to the Unix programming environment will often subject themselves to learning and mastering obtuse, turing-complete text editors such as `vim` or completely self-hosted operating systems masquarading as text editors as in the case of GNU `emacs`.
Once they pick up an editor, they become so conditioned into using it that they refuse to ever learn another one.
Left unchecked, their complexity and customizability can become a source of endless entertainment or an eternal timesink, the line is blured sometimes.

Some users will take the time to read documentation and make an attempt at understanding their editor.
Many will not, and opt to copy other people's existing configurations from any number of sites, usually verbatim.
In doing that, they end up adopting all the plugins that the original author uses, this compounds over time as people copy each other's configurations, and you get a situation where `vim` and all it's derivatives have become the editor of choice for people who have no idea what they're doing.

Did you know that users of the popular vim plugin `powerline` have to install modified versions of their terminal fonts with nonstandard characters for their fancy glyphs to render correctly?
And then they'll proceed to install `powerline` look-a-likes for their interactive `zsh` shell so they can have that same look outside of `vim` and in doing so, they'll call one or more `python` scripts on every terminal prompt redraw, adding what feels like seconds of lag to their terminal, btand call one or more python scripts on terminal

Of course, none of this matters when you're a `vim` user. Because at least you're not a _**"nano user"**_.

<!-- These people will end up with an installed plugin count so high, it requires the use of an editor-specific package manager and a third-party plugin repository, all to manage their dozens of plugins, and all to avoid the stigma of being a _**"nano user"**_. -->

![img](assets/nano_users.png)

## The _**other**_ editor for people who have no idea what they're doing
GNU `nano` is ~~_for people too stupid to learn `vim`_~~ a simple to use terminal text editor, a free software clone of University of Washington's `pico` editor (1989), originally meant for composing e-mail and Usenet posts. It's main appeal is it's low learning curve, it's modeless operation and a discoverable interface. It bears much in common with no frills editors like `It's main appeal is it's low learning curve, it's modeless operation and it's discoverable interface. It's keyboard shortcuts are immediately available on-screen. It's become the defacto editor

Newcomers will often use it for a few weeks and then deny it ever happened as they slowly turn into the type of *nix user described above.

It comes with a few useful and lesser-known features conducive for editing source code, including:
* Context-unaware syntax highlighting using extended POSIX regular expressions
* Ability to convert tabs to spaces, or display tabs at varying widths
* Keystroke macro recording and playback
* Word fragment autocomplete within the same buffer only
* Open files at specific line numbers, or at first or last occurrance of a string or regex
* Non-destructively pasting the output of a shell command into the current or a new buffer
* Destructively replacing the current buffer by piping it's contents into a shell command
* Binding a string of one or more keystrokes and control code literals to a particular key

The last several features are especially useful, since `nano` doesn't feature a runtime scripting language for writing plugins or controlling editor behavior.

`nano` can be used for far more than just "quick edits" to your config files.
This article outlines some lesser-known `nano` functionality and how they can be misused and extended in order to implement some much needed quality of life code comprehension features.
This article outlines some lesser-known `nano` functionality and how they can be misused to add some quality of life features to an otherwise simple text editor, by order of complexity.

> Note that this article uses `nano` conventions for describing keybinds:
><br> A leading `^` is `Ctrl +`, a leading `M-` is `Alt +`, and `Sh-` means `Shift +`.
><br> When in doubt, be sure to `man nano` and `man nanorc` to learn about specific options not covered in this tutorial.

## Enabling syntax-aware autocomplete
By default, `nano` supports autocomplete for word fragments found within the current buffer, but only for normal written prose.
You can extend this to work with variables and other identifiers in your programming language of choice by adding their special characters to the `set wordchars` option in `.nanorc`
```
# eg. shell $vars, snake-case, C++ namespaces::, .member operator, underscore_case, etc.
set wordchars "$-:._"
```

insert a gif over here

Start typing a word fragment, or put your cursor at the end of a given fragment and press `^]` to cycle through all matches.
As this is simply pattern-matching, this will not magically cycle through previously unmentioned keywords found elsewhere in your project like an [LSP-based][5] plugin would.

Do you really need that, though?

# Enable project-wide word fragment autocomplete
* insert a condensed dictionary of all tags found within `tags` to the file so they'll be picked by the autocomplete

## Enabling jump-to-definition using POSIX `ctags`
`ctags` is a [static code comprehension tool][4] that maintains a list of all identifiers (tags) found in your codebase, the specific file they were found in, and at what line they were found.
This is kept in a `tags` file at the root of your project directory.
```
# tags file format:
# <identifier>\\t<filename>\\t<ex command or line number>;"<extended garbage>
main	dwm.c	/^main(int argc, char *argv[])$/;"  f
main	transient.c	/^int main(void) {$/;"	f
var1	dwm.c	?^  int var1;$?;" m   struct:__anon13
MACRO1	dwm.c	57;"    d

```
Originally designed for use in `vi`, `ctags` will, by default, list the actual line where the identifier appears, known as an `ex` search command.
This `ex` command will continue to work even if lines are reordered, deleted or moved around without having to refresh the `tags` file.
However, they have the significant drawback of always taking you to the first _(forwards search)_ or last occurance _(backwards search)_ of that tag in a file.
You can avoid this by using line numbers instead, but this has the drawback of no longer being accurate if that source file is constantly being edited.
> If you forward declare a struct or function and define it in the same C file, your `ex` search command might point you to the forward declaration when you really wanted the function.
> Use `ctags -B` backwards searching mode if this affects you, or `ctags -n` numeric mode to always use line numbers.

How does this help for use in `nano` though?

### Easy mode
Since `nano 4.x`, in addition to line numbers (`+34`), `nano` natively supports forward (`+/`) and backwards (`+?`) searching `ex` commands in front of a filename.

This can be used as the basis for an _**overlay**_ utility shell script that, in it's simplest form:
* searches the current directory and all directories above it for a `tags` file
* `egrep`s through the first column of the `tags` file using a search string you specify
* automatically composes and executes a `nano` command using the `ex` command found on the matching line
```
./ctags.sh 'main'
nano +r'/^main(int argc, char *argv[])$/' dwm.c
```

If you have multiple matches, you can choose to disambiguate with a prompt or just display all matches found at the same time, `nano` lets you open multiple files, after all.
```
./ctags.sh 'main'
Specify a match or use 'all' to select all matches.
 1	main	dwm.c	/^main(int argc, char *argv[])$/;"	f
 2	main	transient.c	/^int main(void) {$/;"	f
./ctags.sh 'main' all
```

This forms the basis for semi-native **jump-to-definition** functionality in `nano`. 

## 
At this point, I'll go into the implementation details of my personal `nano_overlay` script, which implements a ctags `tags` file lookup and `ex` command conversion r



### Hard modo
As it so happens, I thought to do without realizing 
As it happens, I ended up writing a shell script to also interpret `ex` commands and translating them to plain line numbers.
As it happens, I had thought to do this without ever checking if newer versions of nano supported

At this point, I'll go into the implementation details of my personal `nano_overlay` script, which implements a ctags `tags` file lookup and `ex` command conversion to plain line numbers for nano versions before `4.x`.

_Links to the full implementation are available below._

```
# simplified version
# cherrypick match(es) based on first column
[ ! -z "$1" ] || exit 1
SEARCH_TERM="$1"
cat tags | egrep -i "^\\w*${SEARCH_TERM}\\w* .*$" \
	| while read -r tag file addr; do
```

## H

## Outline the basics of using macros

## Enabling vim-like jump-to-definition using POSIX `ctags`
* writeup on ctags and it's use in vim
* detail how to write a ctags parser in shell
* detail how you wrote yours
* offer it for download

## Jumping to `ctags` definitions from within `nano`
* explain the specifics of ^R^X
* explain bypassing it to pop a shell in the current nano instance
* explain using this to automatically jump to definitions within nano
* explain popping new nano instances in another window in a X environment
* offer `visual` script for download as an example

## Enabling seamless file encryption using `ssh-agent`

`nano` doesn't have anything in the way of a bespoke scripting language.
In order to add any sort of functionality, you must call out to the shell from within nano or ~~preprocess~~ massage commandline arguments to `nano` to get what you want.

## Example Code <sup>[GPLv3+]</sup>
* [`.nanorc`][1] --- Example nano configuration
	* _Contains inline control characters, you must use an editor that can display non-printable characters._
* [`nano_overlay.sh`][2] --- My personal external overlay script for GNU nano
* [`visual`][3] --- X window wrapper script for terminal applications

[1]: https://raw.githubusercontent.com/microsounds/atelier/master/.nanorc
[2]: https://raw.githubusercontent.com/microsounds/atelier/master/Scripts/nano_overlay.sh
[3]: https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/visual
[4]: https://en.wikipedia.org/wiki/Ctags
[5]: https://microsoft.github.io/language-server-protocol
