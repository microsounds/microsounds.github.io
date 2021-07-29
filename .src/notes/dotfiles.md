# Selected documentation and usage notes for my dotfiles
Revision No. 624, commit `1f8658c`.
This document is also available at [`{AUTHOR}/atelier`]({GIT_REMOTE}/atelier) on Github.

Last updated {CREATED}.
# <div align="center">_dotfiles—"atelier"_![shimeji]</div>
<div align="center">
	<img src="https://img.shields.io/github/commit-activity/m/microsounds/atelier?logo=github">
	<img src="https://img.shields.io/github/repo-size/microsounds/atelier?logo=github">
	<a href="https://github.com/microsounds/atelier/actions/workflows/ci.yml"><img src="https://github.com/microsounds/atelier/actions/workflows/ci.yml/badge.svg"></a>
	<br>
	<a href="https://debian.org/distrib/"><img src="https://img.shields.io/badge/Debian-bullseye-%23c70036.svg?logo=debian"></a>
	<a href="https://dwm.suckless.org/"><img src="https://img.shields.io/badge/suckless-dwm-%23224488?logo=suckless"></a>
	<a href="https://nano-editor.org/"><img src="https://shields.io/badge/Editor-GNU%20nano-%23440077?logo=windows-terminal"></a>
	<a href="https://www.youtube.com/watch?v=UL8IpdFGeHU"><img src="https://img.shields.io/badge/theme-night drive-%2363B0B0?logo=github-sponsors"></a>
</div>

This is my primary computing setup, a self-contained graphical shell environment for Debian GNU/Linux.
* Git is used to maintain an identical and reproducible setup across multiple machines.
* A series of post-install scripts in [`~/.once.d`]({GIT_REMOTE}/atelier/blob/master/.once.d) document and reproduce system-wide deviations from a fresh install.
	* _Unit testing ensures a reproducible installation with each new change to post-install scripts._

Basic installation instructions are provided, along with some documentation for the most essential components.

![scrot]
> _Pictured: Debian stable, a "graphical shell" environment consisting mostly of Xorg, dwm, sxhkd, and urxvtd._

# Quick start
1. Install Debian stable, perform a base install with no DE selected and no standard utilities when prompted.
	* _Do not perform these steps on `tty1`, `xinit` will launch without `dwm` present and you will be booted._
2. Install `git`, `gnupg1`, `wget`, and `sudo`, then add yourself to the `sudo` group.
	* Log back in to apply changes to group membership.
3. Bootstrap the system automatically with a hard git reset from this repo, this is done only once.
	```shell
	$ git clone --bare {GIT_REMOTE}/atelier ~/.config/meta
	$ git --git-dir=$HOME/.config/meta --work-tree=$HOME reset --hard
	# Invoke the login shell to apply changes made to the environment
	$ exec $SHELL -l
	```
4. Run `post-install` in the shell to run post-install scripts automatically.
	* _Sets up the package manager, installs essential packages, compiles the window manager, etc._
5. Reboot to finish.
	* _[`xinit`]({GIT_REMOTE}/atelier/blob/master/.xinitrc) starts automatically upon login to [`tty1`](.profile)._

<a href="https://github.com/microsounds/microsounds/raw/master/dotfiles/mobile-scrot.jpg">
	<img height="150px" align="right" src="https://github.com/microsounds/microsounds/raw/master/dotfiles/mobile-scrot.jpg">
</a>

## Quick start on Termux for Android
Currently, only a basic shell environment in single-user mode is supported.

1. Install `git`, and bootstrap the system using `git reset --hard` as described above.
2. Post-install: Run only `~/.once.d/a0-android-termux.sh` to apply android-specific hacks and terminal emulator theming.

# Usage notes
## Using `git meta`
For local-scope changes, files in `$HOME` are versioned and mangled in place using Git.
* `$HOME` is considered the detached working tree for a git **bare repo** located at `~/.config/meta`
* The `meta` alias prefixes all git commands with `--git-dir=$HOME/.config/meta --work-tree=$HOME`
* `meta status` will ignore files not manually added or tracked by this git repo.
* Invoking `git` outside of a valid git directory will append the `meta` alias automatically.
	* _`init` and `clone` commands are unaffected._

## Using `~/.once.d` post-install scripts
All system-wide changes are performed through automated scripts located in [`~/.once.d`]({GIT_REMOTE}/atelier/blob/master/.once.d), you can run them all at once with shell function `post-install`. Each script is self-contained, you can run them individually, anytime.

* Some scripts only apply to specific hardware configurations, and will exit even if they are run.
* Scripts affecting `systemd` or the bootloader will be skipped in virtualized container contexts.
* Sideloaded software is installed to [`~/.local/bin`]({GIT_REMOTE}/atelier/blob/master/.local/bin) when possible.
* [`~/.comforts-git`]({GIT_REMOTE}/atelier/blob/master/.comforts-git) describes small sideloaded utilities that will be installed automatically at runtime via git.
	* Repos must have a valid makefile install recipe using the `$(PREFIX)` metaphor.
* [`~/.comforts`]({GIT_REMOTE}/atelier/blob/master/.comforts) describes the full list of non-optional package groups that will be installed.
	* Optional package groups are marked with an *asterisk, you will be prompted to approve these at runtime.

| series | function |
| -- | -- |
| `0*` | System-wide changes performed **through** the package manager. |
| `1*` | Changes to [`~/.local`]({GIT_REMOTE}/atelier/blob/master/.local) file hierarchy, such as sideloaded 3rd party software. |
| `2*` | System-wide changes that bypass the package manager, such as changes to `/etc`.<br>_These are hacks._ |
| `c*` | System-wide changes affecting chromebook hardware only. |
| `a*` | Android-specific hacks only. |

## Window manager
`dwm` keybinds are the [defaults](https://ratfactor.com/dwm) with several exceptions.
Primary modkey `Mod1` is super instead of alt.

| shift + | alt + | key |
| --: | --: | :-- |
| | kill window | F4 |
| counter-clockwise | switch focused window | tab |
| **shift +** | **super +** | **key** |
| float window<sup>[toggle]</sup> | monocle window<sup>[toggle]</sup> | space |
| set as master window<sup>[toggle]</sup> | terminal | return |
| | launcher | p |
| | file manager | e |
| partial screenshot | screenshot | print |
| | _reserved_ | scroll lock |
| | _reserved_ | pause |
| reboot | shutdown | F1 |
| hibernate | sleep | F2 |
| hibernate + reboot | display off | F3 |
| configure networking | calculator | F4 |
| configure displays | switch active display<sup>[toggle]</sup> | F5 |
| minimum brightness | lower brightness 10% | F6 |
| maximum brightness | raise brightness 10% | F7 |
| configure audio | mute<sup>[toggle]</sup> | F8 |
| | lower volume 5% | F9 |
| | raise volume 5% | F10 |
| | randomize wallpaper | F11 |
| | _reserved_ | F12 |
| | **ctrl + alt +** | **key**<sup>[special]</sup> |
| | task manager | delete |
| | syslog | insert |

### Reduced layout for Chromebooks
Search/Everything/Caps lock key serves as the super key. Same as above, with the following changes:

| alt gr + | key | remarks |
| --: | :-- | :-- |
| prior | up | |
| next | down | |
| home | left | |
| end | right | |
| delete | backspace | |
| F11 | delete | same as power key, keystroke repeat not available |

# Some environment notes
## X server invocation
No login manager is used, login to `tty1` to start the graphical shell.
All daemons and services required to support the graphical shell are initialized along with the X server and are terminated when the user terminates the session.

`systemd` unit services, cronjobs and similar mechanisms are avoided.

At startup, `startx` will pass hardware-specific `xorg.conf` files to the X server, to enable hardware compositing on supported hardware and eliminate screen tearing.

Xorg's security model forbids non-root users from passing arbitrary config files to the X server unless they are located in one of several "blessed" directories.
Post-install scripts will create symlink `/etc/X11/$(id -u)-override` that points to `~/.config/xorg` to override this behavior.

## Optional X Window configuration
### `~/.xrandr`
For use with multi-monitor and/or complicated display setups, you can override the default display layout with one or more commands to `xrandr` saved to _optional_ config file `~/.xrandr`

```
# two monitors, right is vertical
--output HDMI-0 --auto --primary --rotate normal
--output HDMI-1 --auto --right-of HDMI-0 --rotate right
```
Commands in this file are passed to [`xrandr-cycle`]({GIT_REMOTE}/atelier/blob/master/Scripts/xrandr_cycle.sh) line by line at startup if it exists.
For example, this configuration would suit a 2 monitor layout with the right monitor mounted vertically.

### `~/.xdecor`
You can designate one or more paths to directories containing images or videos for use as a wallpaper using _optional_ config file `~/.xdecor`
```
~/Pictures/some/path
/media/sd_card/some/path
```

If it exists, [`xwin-decor`]({GIT_REMOTE}/atelier/blob/master/Scripts/xwin_decor.sh) will randomly pick a directory and file within it and set it as the wallpaper on startup.
In the case of video files, a random video frame from that file will be taken and set as the wallpaper using `ffmpeg`.

## X resources and theming
For consistency, `xinit`, `dwm` and other scripts make use of the C preprocessor to mangle config files and configure color schemes.

Theme settings and indivdual color schemes are stored as C header files containing preprocessor macros representing color hex codes in [`~/.local/include`]({GIT_REMOTE}/atelier/blob/master/.local/include).
This directory is appended to `$C_INCLUDE_PATH` at login.

* Invoking shell function `reload` will reload changes to `.xresources` and refresh your terminal instance.
	* _Optionally, you can temporarily apply another existing color scheme by naming it as an argument._

### List of available macros
* `{FG,BG}COLOR` for terminal fg/bg colors
* `{FG,BG}LIGHT` for UX highlight colors
* `COLOR0..COLOR15` for the 16 standard ANSI terminal colors
* `FN_{TERM,HEADER,TEXT}` for specific font faces
* `FN_{TERM,HEADER}_JP` for matching fallback fonts
* `FN_{TERM,HEADER,TEXT}_SIZE` for matching font sizes

## Non-standard commands
Several commands are extended to include impure functions, such as purposefully mangling config files, and have the following precedence when multiple versions exist:

1. Interactive shell functions defined in [`~/.bashrc`]({GIT_REMOTE}/atelier/blob/master/.bashrc)
2. Non-interactive shell library functions [`~/.local/lib`]({GIT_REMOTE}/atelier/blob/master/.local/lib)
	* Shell script snippets used by multiple scripts to reduce clutter.
3. Normal executables and symlinks in [`~/.local/bin`]({GIT_REMOTE}/atelier/blob/master/.local/bin)
	* Some are shell functions promoted to scripts so they'll work in `dmenu` or outside of a terminal context.
4. `/usr/bin` system-wide executables

## `cd`
* The contents of `$OLDPWD` is preserved between sessions.
* `cd` offers the following extensions:

	| opt | function |
	| -- | -- |
	| `...`, `....`, etc. | Shorthand for `../../`, `../../../` and so on. |
	| `-e <dirname>` | Fuzzy find and jump into a sub-directory. |

## `chromium`
`chromium` was extended to mangle the user-hostile per-profile `Preferences` and global `Local State` JSON files with a series of chained `jq` filters stored in the following files, applying persistent settings in order.
* [`~/.config/chromium/preferences.conf`]({GIT_REMOTE}/atelier/blob/master/.config/chromium/preferences.conf)
* [`~/.config/chromium/local_state.conf`]({GIT_REMOTE}/atelier/blob/master/.config/chromium/local_state.conf)

C preprocessor syntax is also accepted, hex color values in the form `#RRGGBB` will be converted to a signed integer representing `0xBBGGRRAA` in two's complement hexadecimal with `AA` (alpha channel) always set to `0xFF`

## `nano`
_Note: `nano` keybind macros make use of inline non-printable control characters, you must use `nano` or `cat -v` to view [`~/.nanorc`]({GIT_REMOTE}/atelier/blob/master/.nanorc) correctly._

* `nano` is an alias for [`nano-overlay`]({GIT_REMOTE}/atelier/blob/master/Scripts/nano_overlay.sh) which mangles config files and offers the following extended options:

	| opt | function |
	| -- | -- |
	| `-e, --ctags`<br>`<tag> <#>`  | Jumps into file containing `ctags` definition matching `<tag>`.<br>Optional `<#>` selects from multiple matches, `all` will open all of them. |
	| `-f, --encrypt`<br>`<file>` | Open AES encrypted text file with a plaintext password. <br>File will be created if it doesn't exist. |
	| `-j, --rsa`<br>`<file>` | Open AES encrypted text file with generic RSA keypair in PEM format. <br>File will be created if it doesn't exist. |
	| `-s, --ssh-sign`<br>`<file>` | Open AES encrypted text file with a nonce value signed with SSH private key. <br>File will be created if it doesn't exist. |
	| `-i, --identity`<br>`<key>` | Use an OpenSSL compatible keypair to encrypt/decrypt. <br>Can be a private key or a public key with private half stored in `ssh-agent` |

* Once inside the actual `nano`, the following keybind macros are available:

	| key | func |
	| -- | -- |
	| `M-0` | Execute current line as shell command and pipe contents of buffer as stdin.<br>_Destructively replaces entire contents of buffer, useful for formatting._ |
	| `M-1` | Execute current line as shell command and paste output in current buffer.<br>_Inline comments ok._ |
	| `M-2` | Select token underneath cursor and jump into it's `ctags` definition(s).<br>_Requires valid `tags` file in current or a parent directory._ |

[scrot]: https://github.com/microsounds/microsounds/raw/master/dotfiles/scrot.png
[shimeji]: https://github.com/microsounds/microsounds/raw/master/dotfiles/shimeji.png
# Complete source listing
<pre><code><b style="color: #63B0B0;">{AUTHOR}@effe</b>:<b style="color: #5786BC;">~</b>$ git meta ls-tree --name-only -r master | xargs ls -lhgG
-rw-r--r-- 1 6.0K   Jul 26 2021 18:06 rev. 106 <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.bashrc">.bashrc</a>
-rw-r--r-- 1 1.1K   Jul 23 2021 15:18 rev. 64  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.comforts">.comforts</a>
-rw-r--r-- 1  271   Apr 29 2021 21:37 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.comforts-git">.comforts-git</a>
-rw-r--r-- 1  234   Jul  4 2021 01:04 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/chromium/local_state.conf">.config/chromium/local_state.conf</a>
-rw-r--r-- 1  393   Jul  3 2021 23:09 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/chromium/preferences.conf">.config/chromium/preferences.conf</a>
-rw-r--r-- 1  732   Jul 17 2021 16:20 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/dmenu/config.h">.config/dmenu/config.h</a>
-rw-r--r-- 1 6.0K   Jul 17 2021 16:20 rev. 28  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/dwm/config.h">.config/dwm/config.h</a>
-rw-r--r-- 1  560   Jul 16 2021 00:35 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/dwm/patches/floating-alwayscenter.diff">.config/dwm/patches/floating-alwayscenter.diff</a>
-rw-r--r-- 1 1.7K   Jul 16 2021 00:35 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/dwm/patches/floating-saveposition.diff">.config/dwm/patches/floating-saveposition.diff</a>
-rw-r--r-- 1  501   Jul 16 2021 00:35 rev. 3   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/dwm/patches/monocle-indicator.diff">.config/dwm/patches/monocle-indicator.diff</a>
-rw-r--r-- 1 1.8K   Jul 16 2021 00:37 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/dwm/patches/rule-ispermanent.diff">.config/dwm/patches/rule-ispermanent.diff</a>
-rw-r--r-- 1  870   Jul 16 2021 00:35 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/dwm/patches/status-allmonitors.diff">.config/dwm/patches/status-allmonitors.diff</a>
-rw-r--r-- 1  700   Apr 26 2021 17:03 rev. 5   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/fm/libfm.conf">.config/fm/libfm.conf</a>
-rw-r--r-- 1  387   Apr  3 2021 21:51 rev. 4   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/fm/pcmanfm.conf">.config/fm/pcmanfm.conf</a>
-rw-r--r-- 1  155   Apr  6 2021 15:35 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/gtk/gtk2.conf">.config/gtk/gtk2.conf</a>
-rw-r--r-- 1  263   Apr  6 2021 15:35 rev. 3   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/gtk/gtk3.conf">.config/gtk/gtk3.conf</a>
-rw-r--r-- 1  967   Jul 18 2021 11:56 rev. 15  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/htop/htoprc">.config/htop/htoprc</a>
-rw-r--r-- 1  559   May 18 2021 22:36 rev. 15  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/mpv/mpv.conf">.config/mpv/mpv.conf</a>
-rw-r--r-- 1  197   Apr  6 2021 15:35 rev. 5   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/sxhkd/chromebook">.config/sxhkd/chromebook</a>
-rw-r--r-- 1 1.7K   Jul 18 2021 11:56 rev. 34  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/sxhkd/default">.config/sxhkd/default</a>
-rw-r--r-- 1 1.3K   Sep 14 2020 22:04 rev. 4   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/xkb/chromebook.xkb">.config/xkb/chromebook.xkb</a>
-rw-r--r-- 1  199   Sep 23 2020 14:50 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/xorg/amd.conf">.config/xorg/amd.conf</a>
-rw-r--r-- 1  368   Aug 24 2020 22:50 rev. 6   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/xorg/intel.conf">.config/xorg/intel.conf</a>
-rw-r--r-- 1  289   Aug 29 2020 21:25 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.config/xorg/nvidia.conf">.config/xorg/nvidia.conf</a>
-rw-r--r-- 1  628   Jan 18 2021 21:56 rev. 20  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.gitconfig">.gitconfig</a>
-rw-r--r-- 1 2.8K   Jul 20 2021 23:44 rev. 17  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.github/workflows/ci.yml">.github/workflows/ci.yml</a>
-rwxr-xr-x 1 1.3K   Jul 10 2021 19:16 rev. 11  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/chromium">.local/bin/chromium</a>
-rwxr-xr-x 1   85   Jul 15 2020 17:12 rev. 3   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/feh">.local/bin/feh</a>
-rwxr-xr-x 1 2.1K   Jul  4 2021 01:04 rev. 3   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/genshin-impact">.local/bin/genshin-impact</a>
-rwxr-xr-x 1  100   Jul 15 2020 17:12 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/make">.local/bin/make</a>
-rwxr-xr-x 1  153   Mar 30 2021 13:19 rev. 4   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/mpv">.local/bin/mpv</a>
lrwxrwxrwx 1   29  .local/bin/nano-overlay -> ../../Scripts/nano_overlay.sh
-rwxr-xr-x 1  728   May  6 2021 00:27 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/qr">.local/bin/qr</a>
-rwxr-xr-x 1 1020   Jul 23 2021 01:29 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/scramble">.local/bin/scramble</a>
-rwxr-xr-x 1  155   Oct 16 2020 13:58 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/scrot">.local/bin/scrot</a>
-rwxr-xr-x 1  762   Jul 17 2021 22:28 rev. 7   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/startx">.local/bin/startx</a>
-rwxr-xr-x 1  656   May 11 2021 15:58 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/twopass">.local/bin/twopass</a>
-rwxr-xr-x 1  224   Jul 11 2020 15:41 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/bin/visual">.local/bin/visual</a>
lrwxrwxrwx 1   29  .local/bin/xrandr-cycle -> ../../Scripts/xrandr_cycle.sh
lrwxrwxrwx 1   27  .local/bin/xwin-decor -> ../../Scripts/xwin_decor.sh
lrwxrwxrwx 1   26  .local/bin/xwin-statusd -> ../../Scripts/wm_status.sh
lrwxrwxrwx 1   26  .local/bin/xwin-webm -> ../../Scripts/xwin_webm.sh
lrwxrwxrwx 1   29  .local/bin/xwin-widgets -> ../../Scripts/xwin_widgets.sh
-rw-r--r-- 1  749   Feb 15 2021 00:56 rev. 4   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/include/colors/nightdrive.h">.local/include/colors/nightdrive.h</a>
-rw-r--r-- 1  690   Feb 15 2021 00:56 rev. 4   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/include/colors/overcast.h">.local/include/colors/overcast.h</a>
-rw-r--r-- 1  642   Feb 15 2021 00:56 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/include/colors/xterm.h">.local/include/colors/xterm.h</a>
-rw-r--r-- 1  468   Apr  6 2021 15:35 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/include/theme.h">.local/include/theme.h</a>
-rwxr-xr-x 1  650   Jul 10 2021 23:42 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/lib/conf-append">.local/lib/conf-append</a>
-rwxr-xr-x 1  477   Jul 10 2021 23:42 rev. 3   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/lib/extern">.local/lib/extern</a>
-rwxr-xr-x 1  162   Jul 10 2021 23:42 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/lib/is-chromebook">.local/lib/is-chromebook</a>
-rwxr-xr-x 1  160   Jul 11 2021 11:12 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/lib/is-container">.local/lib/is-container</a>
-rwxr-xr-x 1  314   Jul 17 2021 22:28 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/lib/is-newer">.local/lib/is-newer</a>
-rwxr-xr-x 1  258   Jul 10 2021 23:42 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/lib/mk-tempdir">.local/lib/mk-tempdir</a>
-rwxr-xr-x 1 1.3K   Jul 10 2021 23:42 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/lib/moonphase-date">.local/lib/moonphase-date</a>
lrwxrwxrwx 1   27  .local/lib/path-gitstatus -> ../../Scripts/git_status.sh
-rwxr-xr-x 1  553   Jul 10 2021 23:42 rev. 5   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/lib/path-shorthand">.local/lib/path-shorthand</a>
-rwxr-xr-x 1  319   Jul 23 2021 00:58 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/lib/user-confirm">.local/lib/user-confirm</a>
-rw-r--r-- 1  685   Mar 31 2021 21:37 rev. 3   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/share/nano/md-kagami.nanorc">.local/share/nano/md-kagami.nanorc</a>
-rw-r--r-- 1  291   Jul 15 2020 16:41 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/share/nano/stdc.syntax">.local/share/nano/stdc.syntax</a>
-rw-r--r-- 1  172   May 29 2020 11:21 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.local/share/X11/bitmaps/diag.xbm">.local/share/X11/bitmaps/diag.xbm</a>
-rw-r--r-- 1  44K   Dec 17 2019 22:28 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.minecraft/resourcepacks/HatsuneMiku.zip">.minecraft/resourcepacks/HatsuneMiku.zip</a>
-rw-r--r-- 1 1.4K   Jul 28 2021 22:45 rev. 28  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.nanorc">.nanorc</a>
-rwxr-xr-x 1 1.2K   Jun 28 2021 18:35 rev. 13  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/00-apt-repositories.sh">.once.d/00-apt-repositories.sh</a>
-rwxr-xr-x 1  805   Jul 23 2021 00:58 rev. 14  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/01-install-essential.sh">.once.d/01-install-essential.sh</a>
-rwxr-xr-x 1  463   Mar 24 2021 21:09 rev. 5   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/02-meta-config.sh">.once.d/02-meta-config.sh</a>
-rwxr-xr-x 1  817   Jul 17 2021 16:30 rev. 23  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/10-dwm-install.sh">.once.d/10-dwm-install.sh</a>
-rwxr-xr-x 1  611   Apr  6 2021 11:28 rev. 3   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/11-utilities-git.sh">.once.d/11-utilities-git.sh</a>
-rwxr-xr-x 1 1.2K   Mar 31 2021 22:48 rev. 6   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/12-gnu-nano.sh">.once.d/12-gnu-nano.sh</a>
-rwxr-xr-x 1  289   Mar 29 2021 17:03 rev. 6   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/13-posix-docs.sh">.once.d/13-posix-docs.sh</a>
-rwxr-xr-x 1  798   Mar 31 2021 20:37 rev. 8   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/14-sunvox.sh">.once.d/14-sunvox.sh</a>
-rwxr-xr-x 1  499   Nov 21 2020 15:41 rev. 3   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/20-xorg-override.sh">.once.d/20-xorg-override.sh</a>
-rwxr-xr-x 1  387   Jun 18 2021 00:52 rev. 12  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/21-network-manager.sh">.once.d/21-network-manager.sh</a>
-rwxr-xr-x 1  720   May 26 2021 16:02 rev. 9   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/22-realtek-rtl8812au.sh">.once.d/22-realtek-rtl8812au.sh</a>
-rwxr-xr-x 1  541   Jul 17 2021 19:41 rev. 14  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/23-grub-config.sh">.once.d/23-grub-config.sh</a>
-rwxr-xr-x 1   58   Nov 21 2020 15:41 rev. 2   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/24-motd.sh">.once.d/24-motd.sh</a>
-rwxr-xr-x 1  747   Mar 30 2021 13:19 rev. 11  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/25-chromium-widevine.sh">.once.d/25-chromium-widevine.sh</a>
-rwxr-xr-x 1  576   Jul 24 2021 15:03 rev. 3   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/26-systemd-tweaks.sh">.once.d/26-systemd-tweaks.sh</a>
-rwxr-xr-x 1  178   Mar 13 2021 01:07 rev. 4   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/27-libvirt-rootless.sh">.once.d/27-libvirt-rootless.sh</a>
-rwxr-xr-x 1 1.5K   May 23 2021 23:13 rev. 8   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/28-intel-undervolt.sh">.once.d/28-intel-undervolt.sh</a>
-rwxr-xr-x 1 2.2K   Jul 27 2021 08:36 rev. 12  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/a0-android-termux.sh">.once.d/a0-android-termux.sh</a>
-rwxr-xr-x 1  200   Jun 18 2021 00:52 rev. 9   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/c0-chromebook-delete-key.sh">.once.d/c0-chromebook-delete-key.sh</a>
-rwxr-xr-x 1  533   Mar 30 2021 13:19 rev. 6   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.once.d/c1-chromebook-i915.sh">.once.d/c1-chromebook-i915.sh</a>
-rw-r--r-- 1  723   Jul 24 2021 15:29 rev. 23  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.profile">.profile</a>
-rw-r--r-- 1  13K   Jul 28 2021 22:45 rev. 127 <a href="https://raw.githubusercontent.com/microsounds/atelier/master/readme.md">readme.md</a>
-rw-r--r-- 1  136   Feb 16 2021 22:46 rev. 1   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.scrc">.scrc</a>
-rwxr-xr-x 1 3.3K   Mar 15 2021 11:34 rev. 23  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/Scripts/git_status.sh">Scripts/git_status.sh</a>
-rwxr-xr-x 1  20K   Jul 28 2021 22:45 rev. 73  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/Scripts/nano_overlay.sh">Scripts/nano_overlay.sh</a>
-rwxr-xr-x 1 4.7K   Jul 24 2021 15:29 rev. 41  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/Scripts/wm_status.sh">Scripts/wm_status.sh</a>
-rwxr-xr-x 1 1.8K   May  4 2021 22:40 rev. 5   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/Scripts/xrandr_cycle.sh">Scripts/xrandr_cycle.sh</a>
-rwxr-xr-x 1 1.7K   May  5 2021 14:33 rev. 27  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/Scripts/xwin_decor.sh">Scripts/xwin_decor.sh</a>
-rwxr-xr-x 1 1.3K   May 11 2021 15:58 rev. 18  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/Scripts/xwin_webm.sh">Scripts/xwin_webm.sh</a>
-rwxr-xr-x 1 1.6K   May  5 2021 01:09 rev. 15  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/Scripts/xwin_widgets.sh">Scripts/xwin_widgets.sh</a>
-rw-r--r-- 1  965   Jan 28 2020 18:34 rev. 3   <a href="https://raw.githubusercontent.com/microsounds/atelier/master/Userscripts/youtube_screenshot.user.js">Userscripts/youtube_screenshot.user.js</a>
-rw-r--r-- 1 1.4K   Jul 24 2021 15:29 rev. 58  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.xinitrc">.xinitrc</a>
-rw-r--r-- 1 1.7K   May  3 2021 17:14 rev. 22  <a href="https://raw.githubusercontent.com/microsounds/atelier/master/.xresources">.xresources</a>
</code></pre>
<!-- updated 2021-07-28 -->
