# Selected documentation and usage notes for my dotfiles
**Revision No. <b style="font-size: 130%">1012</b>, commit `28c49be`.**

**"adb-ssh-socks5: Forcing SOCK5 proxy everywhere when enabled"**

{TOC}

View changelog since the last revision as [ `diff HEAD~1...HEAD`][2]

The verbosity factor of this document compared to comment lines of code
in this repo is about **5:1**.

If this document is *44.5KiB* in
size, and the approximate size of all comment lines of code is
*78.1KiB* then this document
currently covers about <b style="font-size: 130%;">11.38%</b>
of all implemented features and behavior in this repository.
This is just an [automated guess][1] though.

This document and repository is also mirrored at
[`{AUTHOR}/atelier`]({GIT_REMOTE}/atelier) on GitHub.

Last updated {UPDATED}.

[1]: {GIT_REMOTE}/microsounds.github.io/raw/master/.scripts/dotfiles-ls.sh
[2]: {GIT_REMOTE}/atelier/compare/HEAD~1...HEAD.diff

<!-- header and github badges -->
<!-- github readmes only support align attributes for styling -->
<div style="text-align: center;">

# _dotfiles—"atelier"_![shimeji]
![ico-freq](https://img.shields.io/github/commit-activity/m/microsounds/atelier?logo=github)
![ico-size](https://img.shields.io/github/repo-size/microsounds/atelier?logo=github)
[![ico-ci](https://github.com/microsounds/atelier/actions/workflows/ci.yml/badge.svg)][actions]
<br/>
[![ico-os](https://img.shields.io/badge/Debian-bookworm-%23c70036.svg?logo=debian)][debian]
[![ico-wm](https://img.shields.io/badge/suckless-dwm-%23224488?logo=suckless)][dwm]
[![ico-editor](https://shields.io/badge/Editor-GNU%20nano-%23440077?logo=windows-terminal)][nano]
[![ico-theme](https://img.shields.io/badge/theme-night%20drive-%2363B0B0?logo=github-sponsors)][song]
<br/>
<sup>_shimeji miku [&copy; 2010 canary yellow][miku]_</sup>
</div>

[actions]: https://github.com/microsounds/atelier/actions/workflows/ci.yml "unit tests"
[debian]: https://debian.org/distrib/ "Debian GNU/Linux homepage"
[dwm]: https://dwm.suckless.org/ "suckless dwm homepage"
[nano]: https://nano-editor.org/ "GNU nano homepage"
[song]: https://www.youtube.com/watch?v=UL8IpdFGeHU "effe - night drive ft. 初音ミク"
[miku]: http://canarypop.ciao.jp/shimehatsune.htm "Shimeji Miku homepage"

<!-- start of document -->

This is my primary computing setup, a self-contained graphical shell environment for Debian GNU/Linux.
* Git is used to maintain an identical and reproducible setup across any number of machines.
* A series of [procedural](#On-declarative-OSes) post-install scripts in [`~/.once.d`]({GIT_REMOTE}/atelier/raw/master/.once.d) document and reproduce system-wide deviations from a fresh install.
	* _Git hooks ensure a [consistent running environment](#Applying-changes-automatically-after-state-change) even when the underlying state changes._
	* _A [suite of unit tests]({GIT_REMOTE}/atelier/raw/master/.github/workflows/ci.yml) ensures a reproducible installation with each revision._

Detailed installation instructions are provided, along with some documentation for the most essential components.

<!-- figure 1: desktop screenshot -->
<video loop="loop" autoplay="autoplay" muted="muted" 		poster="https://raw.githubusercontent.com/{AUTHOR}/{AUTHOR}/master/dotfiles/scrot.png"> 		<source type="video/webm" 		src="https://raw.githubusercontent.com/{AUTHOR}/{AUTHOR}/master/dotfiles/scrot.webm" /></video>
_Pictured: Debian stable, a "graphical shell" environment consisting mostly of xorg, dwm, sxhkd and various urxvt clients._

# Quick start
<details style="background-color: #0000001C; padding: 3px;">
<summary><strong>[OPTIONAL] Instructions for a Debian base install with <code>debootstrap</code> for BIOS/UEFI x86 systems.</strong></summary>

## Installing Debian using `debootstrap`
> **WARNING**<br/>
> _This is a quick reference on using `debootstrap` to install Debian manually without using the official Debian installer.
> This is not a comprehensive tutorial on *NIX concepts, you should have some familiarity with administrating a GNU/Linux system before continuing._

1. Boot into a Debian Live CD environment with any DE and partition your boot disk with `gparted`.

	You should always keep a Live CD install media around for use as a rescue disk, regardless of installation method.
	I only do it this way because I don't feel like using `fdisk`.

	_To install packages in the live environment, `apt-get update` first and then `apt-get install gparted`._

	Suggested boot disk layouts:
	* Legacy BIOS systems that support MBR/`msdos` partition tables
	```
	# MBR disks support a maximum of 4 primary partitions
	[ primary part. (root) ] [ extended partition                            ]
	                         [ logical part. (swap) ] [ logical part. (home) ]
	# example /etc/fstab
	/dev/sda1	/       ext4	defaults	0	1
	/dev/sda5	none    swap	defaults	0	0
	/dev/sda6	/home   ext4	defaults	0	2
	```

	* Modern UEFI systems that support GPT/`gpt` partition tables
	```
	# EFI partition must be FAT32 and at least 32MiB
	[ EFI partition ] [ root partition ] [ swap partition ] [ home partition ]

	# example /etc/fstab
	/dev/sda1	/boot/efi   vfat	defaults	0	2
	/dev/sda2	/           ext4	defaults	0	1
	/dev/sda3	none        swap	defaults	0	0
	/dev/sda3	/home       ext4	defaults	0	2
	```

	> **NOTE**<br/>
	> _If your machine uses a slow eMMC-based boot disk, I recommend `f2fs` for modestly improved performance instead of `ext4`.
	> Support for booting from `f2fs` is not provided by default in Debian.<br/>
	> See [this tutorial][f2fs] on adding required `f2fs` modules to `initramfs` for more info._

	[f2fs]: https://howtos.davidsebek.com/debian-f2fs.html#:~:text=Booting%20From%20F2FS
		"Install Debian 10 Buster on an F2FS Partition"

2. Mount your newly created filesystem in `/mnt`, including your home partition to `/mnt/home` if you made one.
3. Install `debootstrap` and install the Debian base system into `/mnt`.
	* `debootstrap --arch [eg. i386, amd64] stable /mnt https://deb.debian.org/debian`
		* _See <https://www.debian.org/ports/> for a full list of platforms available._
4. Chroot into your new system, _all actions from this point onward are within your chrooted system_.
	```sh
	$ sudo su -
	$ for f in proc sys dev run; do mount --make-rslave --rbind /$f /mnt/$f; done
	$ chroot /mnt /bin/bash
	```
5. Configure your `/etc/fstab` to taste.
	* Try `lsblk -f >> /etc/fstab` to identify disks by `UUID=...` instead of device name.
6. Customize your locale by installing and `dpkg-reconfigure`'ng `locales`, and `tzdata`.
7. Edit `/etc/hostname` and `/etc/hosts` with your preferred hostname.
8. Install a suitable linux kernel.
	* Find a suitable kernel meta-package to install with `apt-cache search ^linux-image | grep 'meta'`.
9. Install `network-manager` and the bootloader package `grub2`.

	`grub2` does not install to your boot disk automatically, use the following:
	* Build initial grub configuration with `/sbin/update-grub`
	* For BIOS (installs to magic sector at start of disk)
		* `/sbin/grub-install --root-directory=/ /dev/sda`
	* For UEFI (installs to EFI partition mounted in `/boot/efi`)
		* `/sbin/grub-install --root-directory=/ --efi-directory=/boot/efi /dev/sda`
10. Give your `root` user a password, create your normal user, and assign it a password also.
	* eg. `useradd -m USERNAME -s /bin/bash; passwd USERNAME`
11. You should now have a working system, **login as your user** and skip to Step 2 in the **Quick start** below.
	* _You can reboot from the Live CD environment at this point to check your work but it's not required._

</details>

1. Install Debian stable, perform a base install with no DE selected and no standard utilities when prompted.
	* _Do not perform these steps on `tty1`, `xinit` will launch without `dwm` present and you will be kicked._
2. Install `git`, `wget`, and `sudo`, then add yourself to the `sudo` group.
	* Log back in to apply changes to group membership.
3. Bootstrap the system automatically with a hard git reset from this repo, this is done only once.
	```shell
	$ git clone --bare {GIT_REMOTE}/atelier ~/.config/meta
	$ git --git-dir=$HOME/.config/meta --work-tree=$HOME reset --hard
	# Invoke the login shell to apply changes made to the environment
	$ exec $SHELL -l
	```
4. Run `post-install` in the shell to run post-install scripts automatically. Do not run as root.
	* _Sets up the package manager, installs essential packages, window manager, text editor, etc._
5. Reboot to finish.
	* _[`xinit`]({GIT_REMOTE}/atelier/raw/master/.xinitrc) starts automatically upon login to [`tty1`]({GIT_REMOTE}/atelier/raw/master/.profile)._

<!-- figure 2: mobile screenshot -->
<span style="float: right;">
<a href="https://raw.githubusercontent.com/microsounds/microsounds/master/dotfiles/mobile-scrot.jpg">
<img alt="mobile scrot" width="125" style="text-align: right;"
	src="https://raw.githubusercontent.com/microsounds/microsounds/master/dotfiles/mobile-scrot2.png"/>
</a>
</span>

## Quick start on Termux for Android
> **NOTE**<br/>
> _Android-specific functionality depends on features provided by `Termux:API` and `Termux:Widget` add-on apps and must be installed along with Termux.<br/>
> This is meant to be a lightweight port with modifications, do not initiate a full `post-install`._

1. Install `git`, and bootstrap the system using `git reset --hard` as described above.
2. Post-install: Run only [`~/.once.d/a0-android-termux.sh`]({GIT_REMOTE}/atelier/raw/master/.once.d/a0-android-termux.sh)
	* Applies android-specific hacks and termux specific dotfiles for theming and softkeys.
3. When pulling from upstream, stash changes or `git reset --hard` to prevent merge conflicts.
	* Use `patch -p1 < ~/.termux/diff.patch` to restore changes if stash is lost.

See [attached notes](#Termux-for-Android) for overview of changes from a standard Linux environment.

## List of supported platforms
**Full graphical shell environment**
* Any conventional BIOS/UEFI-compliant x86-based Personal Computer
* x86-based Chromebooks in Developer Mode (SeaBIOS), or liberated with UEFI firmware (Coreboot).
	* _See <https://chrultrabook.github.io/docs/> for more information on unlocking your bootloader._
* [Next Thing Co. PocketC.H.I.P][ntc-chip] armhf-based portable ~~toy computer~~ linux handheld
	* _Final NTC-provided Debian 8 (jessie) OS images from 2016 come with out-of-tree `4.4.13-ntc-mlc` kernel pinned, upgradeable to 10 (buster)._

[ntc-chip]: http://chip.jfpossibilities.com/docs/pocketchip.html "Mirrored PocketCHIP documentation"

**Single-user minimal shell environment**
* Bootstrapping in virtualized container instances for use in CI/CD workflows
* Termux terminal emulator and Linux environment for Android
	* _Non-standard *NIX environment, currently only supports a subset of available features._

## On declarative OSes
While it might be easy to draw parallels to my setup and _NixOS_, my system completely avoids the horrors of _"containerization"_ and the innumerable drawbacks to adopting declarative functional OSes like _NixOS_ and _GNU Guix_.

They're in my shortlist of [timesink software ecosystems](https://news.ycombinator.com/item?id=36262356) that I don't want anything to do with, along with the Rust programming language, equally cult-like in their usage and online communities, all of of which require significant changes to your toolchain and computing lifestyle, requiring you to adapt to their limitations when it really should be the other way around.

# Usage notes
## Using `git meta`
For local-scope changes, files in `$HOME` are versioned and mangled in place using Git.
* `$HOME` is treated as the detached working tree for a git **bare repo** located at `~/.config/meta`
* The `meta` alias prefixes all git commands with `--git-dir=$HOME/.config/meta --work-tree=$HOME`
* `meta status` will ignore files not manually added or tracked by this git repo.
	* _This is achieved using the `status.showUntrackedFiles` option and not via manually updating `~/.gitignore` as is commonly done._
* Invoking `git` outside of a valid git directory will append the `meta` alias automatically.
	* _`init` and `clone` commands are unaffected._

## Using `~/.once.d` post-install scripts
All system-wide changes are performed through automated scripts located in [`~/.once.d`]({GIT_REMOTE}/atelier/raw/master/.once.d), you can run them all at once with shell function `post-install`.
Each script is self-contained, you can run them individually, anytime.

* Some scripts apply only to specific hardware configurations, and will exit even if they are run.
* Scripts affecting `systemd` or the bootloader will be skipped in virtualized container contexts.
* Locally installed software is installed to [`~/.local/bin`]({GIT_REMOTE}/atelier/raw/master/.local/bin) when possible.

| series | function |
| -- | -- |
| `0*` | System-wide changes performed through the package manager. |
| `1*` | Changes to [`~/.local`]({GIT_REMOTE}/atelier/raw/master/.local) file hierarchy, such as locally installed software and resources. |
| `2*` | System-wide changes that bypass the package manager, such as changes to `/etc`.<br/>_These are hacks._ |
| `c*` | System-wide changes affecting chromebook hardware only. |
| `a*` | Android-specific hacks only. |
| `p*` | NTC PocketCHIP-specific hacks only. |

### Essential and *optional package groups
* [ `~/.comforts` ]({GIT_REMOTE}/atelier/raw/master/.comforts) describes a list of non-optional package groups that will be installed through the package manager.
	* _Optional package groups are marked with an *asterisk, you will be prompted to approve these at runtime._

### Essential and *persistent upstream utilities
* [`~/.comforts-git`]({GIT_REMOTE}/atelier/raw/master/.comforts-git) describes the full list of utilities compiled and installed from their upstream git sources.
	* _Repos must have a typical `./configure` and/or `make install PREFIX=...` metaphor to build correctly._
	* _Sources marked with an *asterisk will be persistently installed to `~/.config/${URL##*/}`_

Installation can be customized with user-provided executable install ~~hacks~~ scripts, named `{pre,post}-run`.
These can be placed in [`~/.config/upstream`]({GIT_REMOTE}/atelier/raw/master/.config/upstream) or at the root of a persistently installed utility's install directory as described above

Rationale for doing things this way is summarized in commit [`2fe1c3745`][rat].

[rat]: https://github.com/microsounds/atelier/commit/2fe1c3745 "introduced ~/.once.d/10-git-upstream.sh"

### Applying changes automatically after state change
For git operations that change the underlying state of the `git meta` working tree in `$HOME`, such as merges, pulling from remote, or checking out an older commit, post-install scripts that have changed will be re-run automatically git `post-merge` hook symlinked to [`~/.local/lib/apply-changes`]({GIT_REMOTE}/atelier/raw/master/.local/lib/apply-changes) to ensure a consistent environment.

For changes that affect currently running programs, `apply-changes` will alert the user if the X session or user login should be restarted to finish applying changes.

## Window manager status bar
Status bar daemon [`xwin-statusd`]({GIT_REMOTE}/atelier/raw/master/Scripts/wm_status.sh) is forked
and piped to `xsetroot` at startup to provide a concise `dwm` status bar conditionally listing the following status information when available, including:

* ⚿ `ssh-agent` status
	* _Lists the number of active keys added to the agent, if any._
* ∿ Avg. CPU temperature in ˚F / ↻ Fan speed in RPM
	* _On laptops with active cooling, CPU temps are replaced with fan speed when fans spin up._
* 📶 Network status
	* _Lists name of first active network device reported by `network-manager`._
* ↯ `acpi` status and battery life / 🔌 Power draw
	* _Reports `acpi` battery life information, including net energy-rate in watts as reported by UPower._
* 🔉 PulseAudio sink status
	* _Reports volume and status of the currently active audio sink, detects headphone use._
* 🌦 Geolocated current weather _(via wttr.in)_
	* _Their API caching is very aggressive, emitting stale data often, downtime is common, only displayed when available._
* 🌔 Moonphase and current date
	* _Expresses the ordinal date and the current phase of the moon._
* ⌛ Current time
	* _Expresses the current time in AM/PM._

Status bar output is suppressed to display notification text from `notify-send` when available, see [attached notes](#notify-send) for more info.

## Window manager keybinds
Keyboard layouts and secondary layers are handled by `keyd` globally for better quality of life on non-standard keyboards.
At the X server level, keybinds are handled by a mix of ~~`xkb`~~, `dwm`, `sxhkd` and `fcitx5` in such a way to avoid keybind stomping.

`Caps Lock` is remapped to `Super_L` on all platforms.
`dwm` keybinds are the [defaults][dwm] with several exceptions, the modkey `Mod1` is **super** instead of **alt** because many **alt** combinations are already taken by other applications I use.

[dwm]: https://ratfactor.com/dwm "suckless dwm tutorial"

**Alt**-based keybinds are kept to a minimum because these are commonly taken by applications.

| shift + | alt + | key |
| --: | --: | :-- |
| | kill window | F4 |
| counter-clockwise | switch focused window | tab |

**Super**-based keybinds meant for system and window manager functions.

| shift + | super + | key |
| --: | --: | :-- |
| float window<sup>[toggle]</sup> | monocle window<sup>[toggle]</sup> | space |
| set as master window<sup>[toggle]</sup> | terminal | return |
| move window to previous monitor | focus previous monitor  | , |
| move window to next monitor | focus next monitor | . |
| | launcher | p |
| | file manager | e |
| | ssh-add<sup>[toggle]</sup> | backspace |
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
| | _reserved_ | F12~F24 |

**Special** keybinds that don't fit in other categories.

| alt + | ctrl + | key<sup>[special]</sup> |
| --: | --: | :-- |
| | switch input method<sup>[toggle]</sup> | space |
| | clipboard manager | ; |
| task manager | | delete |
| syslog | | insert |

**Special** mouse keybinds with extended button layouts.
* _This is for generic mice with more than 3 keys, usually with left/right switches on the scroll wheel._

| action | key |
| --: | :-- |
| move window to previous monitor | middle click left |
| move window to next monitor | middle click right |

### Generic 74-key Chromebook layout
Search key is `Super_L`, most missing keys are hidden behind `Right Alt` layer.
Power key has been remapped to `delete` for better usability.

Function `F1-F10` are in the usual places, F11 is lesser used and hidden behind `Right Alt`.
| right alt + | key | remarks |
| --: | :-- | :-- |
| prior | up | |
| next | down | |
| home | left | |
| end | right | |
| XF86Back | F1 | _Right Alt + F* may not work on pre-EC chromebooks_ |
| XF86Forward | F2 | |
| XF86Reload |  F3 | |
| F11 | F4 | opens fullscreen mode in most browsers |
| XF86LaunchA | F5 |
| lower brightness 10%  | F6 | |
| raise brightness 10%  | F7 | |
| mute<sup>[toggle]</sup> | F8 | |
| lower volume 5% | F9 | |
| raise volume 5% | F10 | |
| F11 | delete | same as power key, keystroke repeat not available |
| delete | backspace | keystroke repeat works fine |

# Some environment notes
## X server invocation
No display manager is used, login to `tty1` to start the graphical shell.

All daemons and services required to support the graphical shell are initialized along with the X server and are terminated when the user terminates the session.

`systemd` unit services, cronjobs and similar mechanisms are avoided whenever possible.

At startup, `startx` will pass hardware-specific `xorg.conf` files to the X server, to enable hardware compositing on supported hardware and eliminate screen tearing.

Xorg's security model forbids non-root users from passing arbitrary config files to the X server unless said configs are located in one of several "blessed" directories.
Post-install scripts will create symlink `/etc/X11/$(id -u)-override` that points to `~/.config/xorg` to override this behavior.

## Optional X Window configuration
### `~/.xrandr`
For use with multi-monitor and/or complicated display setups, you can override the default display layout with one or more commands to `xrandr` saved to _optional_ config file `~/.xrandr`

	# e.g. two monitors, right is mounted vertically
	--output HDMI-0 --auto --primary --rotate normal
	--output HDMI-1 --auto --right-of HDMI-0 --rotate right

Commands in this file are passed to [`xrandr-cycle`]({GIT_REMOTE}/atelier/raw/master/Scripts/xrandr_cycle.sh) line by line at startup if it exists.
For example, this configuration would suit a 2 monitor layout with the right monitor mounted vertically.

### `~/.xdecor`
You can designate one or more paths to directories containing images or videos for use as a wallpaper using _optional_ config file `~/.xdecor`

	# prefixing with ~/ is acceptable
	~/Pictures/some/path
	/media/sd_card/some/path

If it exists, [`xwin-decor`]({GIT_REMOTE}/atelier/raw/master/Scripts/xwin_decor.sh) will randomly pick a directory and file within it and set it as the wallpaper for each active monitor on startup.
In the case of video files, a random video frame from that file will be taken and set as the wallpaper using `ffmpeg`.
If this is on a desktop, it'll also de-noise the images and upscale them through [waifu2x](https://github.com/nagadomi/waifu2x), this is GPU-bound so be patient.

## X resources and theming
For consistency, `xinit`, `dwm` and other scripts make use of the C preprocessor to mangle config files and configure color schemes.

Theme settings and individual color schemes are stored as C header files containing preprocessor macros representing color hex codes in [`~/.local/include`]({GIT_REMOTE}/atelier/raw/master/.local/include).
This directory is appended to `$C_INCLUDE_PATH` at login.

* Using shell function `reload` will reload changes to `.xresources` and hard-reset your current terminal instance.
* Use command `palette` to soft-reset color scheme using OSC terminal escapes without losing the current shell.

_Optionally, you can apply another existing color scheme by naming it as an argument.
This can be useful when dealing with TUI applications that force their own background colors._

### List of available macros
* `{FG,BG}COLOR` for terminal fg/bg colors
* `{FG,BG}LIGHT` for UX highlight colors
* `COLOR0..COLOR15` for the 16 standard ANSI terminal colors
* `FN_{TERM,HEADER,TEXT}` for specific font faces
* `FN_{TERM,HEADER}_JP` for matching fallback fonts
* `FN_{TERM,HEADER,TEXT}_SIZE` for matching font sizes
* `FN_EMOJI` for specifying fallback emoji glyphs
* `FN_EMOJI_SIZE` for specifying fallback emoji glyph sizes

## Issues with HiDPI scaling
HiDPI display setups are currently **not** supported, 96dpi is assumed everywhere.

HiDPI scaling brings up innumerable display issues in [every category of graphical software][dpi1]
including [electron-based applications][dpi2] that require polluting scripts and dotfiles to smooth out toolkit scaling issues.
Maintaining mixed-DPI multi-monitor setups in X11 is [even more painful][dpi3].

As of posting, I don't have a >1080p monitor to motivate such changes,
I'm not about to pepper my scripts with toolkit-specific environment variables and conditional logic to support HiDPI scaling.
See [`~/.local/include/theme.h`]({GIT_REMOTE}/atelier/raw/master/.local/include/theme.h) for more info.

[dpi1]: https://wiki.archlinux.org/title/HiDPI "A laundry list of hacks to have consistent-looking fonts everywhere under HiDPI"
[dpi2]: https://blog.yossarian.net/2020/12/24/A-few-HiDPI-tricks-for-Linux "The real HiDPI experience on GNU/Linux"
[dpi3]: http://wok.oblomov.eu/tecnologia/mixed-dpi-x11/#mixeddpiinx11 "Workarounds for mixed DPI multi-monitor setups in X11"

# Non-standard commands
Several commands are extended to include impure functions, such as purposefully mangling config files, and have the following precedence when multiple versions exist:

1. Interactive shell functions defined in [`~/.bashrc`]({GIT_REMOTE}/atelier/raw/master/.bashrc)
2. Non-interactive shell library executables in [`~/.local/lib`]({GIT_REMOTE}/atelier/raw/master/.local/lib)
	* Shell script snippets used by multiple scripts to reduce clutter.
3. Normal executables and symlinks in [`~/.local/bin`]({GIT_REMOTE}/atelier/raw/master/.local/bin)
	* Some are shell functions promoted to scripts so they'll work in `dmenu` or outside of a terminal context.
4. `/usr/bin` system-wide executables

## Interactive shell
![path-gitstatus](https://raw.githubusercontent.com/microsounds/microsounds/master/dotfiles/path-gitstatus.png)

The prompt path will feature embedded `git` information provided by [`path-gitstatus`]({GIT_REMOTE}/atelier/raw/master/Scripts/git_status.sh) highlighting the root of a `git` worktree and it's status.

Outside of `git` worktrees, the path component will be mangled by [`path-shorthand`]({GIT_REMOTE}/atelier/raw/master/.local/lib/path-shorthand) and be truncated to the last `$PATH_WIDTH` characters _(default is 50)_ for improved usability.

## Termux for Android
Single-user shell environment should work as expected on Termux without root access or changes to `$PREFIX/etc` with several caveats described below.

Post-install scripts make the following adjustments statically for existing scripts.
These adjustments will also be saved as a diff patch in `~/.termux/diff.patch` in case these changes are overwritten with `git`.

### `Termux:Widget`
Scripts in [`~/.shortcuts`]({GIT_REMOTE}/atelier/raw/master/.shortcuts) are meant for use with `Termux:Widget` which can be found wherever you got Termux.
This is an optional add-on to Termux that lets you launch foreground or background scripts from an Android homescreen widget.

See the [project page](https://github.com/termux/termux-widget) for documentation and environment notes, it's important to note that scripts launched this way do not source `~/.profile` or `~/.bashrc` like they would running from a Termux instance.

You must give Termux permission to display over other apps via `Settings > Apps > Display over other apps` for this add-on to work properly.

### Standard file descriptors
Shell scripts on Android systems without root access have no access to standard file descriptors `/dev/std{in,out,err}`, use `/proc/self/fd/{0,1,2}` instead.

### `ESC` sequences
Using `\\\\e` to insert escape literals in scripts works for some OSC codes, but not all, use octal `\\\\33` when in doubt.

### `$PREFIX`
Previously, `termux-chroot` was used to ensure FHS-compliance, but it introduced unacceptable performance speed.

Use Termux's own provided envvar `$PREFIX` to refer to standard filesystem locations within scripts or interactively, e.g. `$PREFIX/tmp` which expands to `/data/data/com.termux/files/usr/tmp`.
In practice, shell script shebangs don't need to be rewritten, Termux already rewrites these with some hidden voodoo I don't care to understand.

### Background processes since Android 11
The customized Android images that ship from [Chinese and Korean manufacturers](https://dontkillmyapp.com/) since version 11 have become far more aggressive in pruning "phantom" processes (daemons) in the pursuit of better battery life.

You may experience issues with processes backgrounded with the `&` operator being throttled or killed when multitasking outside of Termux. _Daemons that fork without becoming a child process or `exec`'ing the same process that called it may be killed immediately or shortly after leaving Termux if not called in foreground mode._

In order to prevent Android from prematurely pruning `ssh-agent` while multitasking, it is called as the parent process for the current shell.

Termux developers recommend their very own [termux-services](https://wiki.termux.com/wiki/Termux-services) for running common daemons.
_Launch daemons in foreground mode without forking and preferably with wakelock acquired from the `Notification Bar` or with `termux-wake-lock` if you wish to run a long-running task without being throttled by the operating system._

If you don't mind the limitations of `Termux:Widget`, you can also run long-running scripts as a headless background tasks by putting it in `~/.shortcuts/tasks`.

### `ssh-agent` fingerprint SSH authentication
> **WARNING** <br/>
> _This is an ongoing experiment in balancing convenience and security, your threat model may find the barebones security provided by fingerprint sensors unacceptable._

`ssh-agent` is set up to call [`termux-ssh-askpass`]({GIT_REMOTE}/atelier/raw/master/.local/lib/termux-ssh-askpass) which uses
Android's [hardware-backed keystore](https://developer.android.com/privacy-and-security/keystore) to generate an OpenSSH key passphrase using the fingerprint lock on your Android device.

Specifically, a hardware-backed inaccessible RSA 4096-bit private key named `default` is generated during post-install
and stored in the security chip on the device which is only made available during a short validity period after a successful fingerprint unlock.
This inaccessible private key is used to sign the matching public key for the portable OpenSSH private key being unlocked by `ssh-agent` and friends
to produce a passphrase from the signed nonce value emitted by the security chip on your Android device.

Simply put, _this allows for fingerprint-based SSH authentication_, a massive quality of life improvement over entering case-sensitive passphrases on a smartphone.

#### Important considerations
1. Both the `termux-api` package and the companion add-on app `Termux:API` available from the same place you got Termux are required for this functionality to work.
2. There is no chance of vendor or device lock-in, as you are not using key material from the security chip as your OpenSSH key.
	* The nonce value is not important, it's just convenient seed data used to produce a reproducible passphrase that requires your fingerprint to unlock.
	* The key material locked in the hardware-backed keystore is also not important, you are simply using it to generate passphrases for your existing portable OpenSSH keys.

3. Even though someone with physical access to your Android device _could_ modify the hardware keystore without authentication and _could_ replace keys with identically named keys that have an unlimited validity period, they will not be the same key material used to sign and your portable OpenSSH keys will still be safe.
4. You understand that by replacing passphrases with biometrics, your fingerprint reader becomes your single point of failure, you have been warned.

#### Initial setup
To setup your existing OpenSSH keys for fingerprint-based SSH authentication, use the output of `termux-ssh-askpass` as your new passphrase in `ssh-keygen`.

```
new_pass="$(termux-ssh-askpass ~/.ssh/id_rsa)"
ssh-keygen -p -f ~/.ssh/id_rsa -N "$new_pass" -F 'old passphrase'
```

## `cd`
* The contents of `$OLDPWD` is preserved across `bash` sessions.
* `cd` offers the following extensions:

	| opt | function |
	| -- | -- |
	| `...`, `....`, etc. | Shorthand for `../../`, `../../../` and so on. |
	| `-f <query>` | Interactive fuzzy find and jump into a sub-directory with `fzf` |

## `chromium`
> **NOTE**<br/>
>_On first-run, `chromium` will momentarily exit and restart to rebuild configuration and enable use of externally customized color options._

`chromium` is not meant to be user-serviceable or configurable through plaintext without using system-wide group policy features, `chromium` is a shell script extended to mangle user-hostile internal state files to match the persistent plaintext configs described below:
* [`~/.config/chromium/preferences.conf`]({GIT_REMOTE}/atelier/raw/master/.config/chromium/preferences.conf)
	* _Main browser preferences stored as JSON in `Default/Preferences`._
* [`~/.config/chromium/local_state.conf`]({GIT_REMOTE}/atelier/raw/master/.config/chromium/local_state.conf)
	* _Chromium experiment flags stored as JSON in `Local State`._

C preprocessor syntax is also accepted, hex color values in the form `#RRGGBB` will be converted to a signed integer representing `0xBBGGRRAA` in two's complement hexadecimal with `AA` (alpha channel) always set to `0xFF`

The default browser profile path is derived from the overlay script's name, `~/.local/bin/chromium` will initialize and/or read from `~/.config/chromium`, this allows multiple browser profiles to co-exist by simply renaming or creating a symlink to this script.

* [`~/.config/chromium/omnibox.sql`]({GIT_REMOTE}/atelier/raw/master/.config/chromium/omnibox.sql)
	* _Omnibox settings and Tab-to-search keyword shortcuts stored as SQLite in `Default/Web Data`._


### Managed policy overrides
`chromium` is managed by `/etc/chromium/policies/managed/extensions.json`, set up during [post-install]({GIT_REMOTE}/atelier/raw/master/.once.d/29-chromium-extensions.sh), which automatically installs several useful extensions on first-run, including [uBlock Origin][].

[uBlock Origin]: https://ublockorigin.com "uBlock Origin homepage"

### Configuring Vimium
Use of Vimium is considered optional, as I haven't figured out a way to configure it automatically on first-run.
Its configuration resides in [`~/.config/chromium/vimium`]({GIT_REMOTE}/atelier/raw/master/.config/chromium/vimium)

Run `configure.sh` to rebuild `vimium-options.json` for importing back into Vimium by hand.

### An ongoing experiment
`chromium` has proven difficult to configure non-interactively time and time again.
Plaintext `chromium` configuration is an ongoing experiment of mine.

| non-interactive functionality | status |
| -- | :--: |
| first-run config rebuild | works |
| applying persistent chromium settings | works |
| applying persistent chromium flags | works |
| applying persistent omnibox settings | works |
| extension install on first-run | works _(via group policy)_ |
| applying persistent extension settings | **no** |

## `git`
`git` aliases are defined in [`~/.gitconfig`]({GIT_REMOTE}/atelier/raw/master/.gitconfig) or implemented in interactive shell function `git()`

See *Usage Notes* for more information.

* _This is a critical component of the graphic shell environment, some aliases are cumulative in nature._

	| alias | function |
	| -- | -- |
	| `meta` | Appends `--git-dir=$HOME/.config/meta --work-tree=$HOME` to a `git` command.<br/>_(Added implicitly when outside a git directory.)_ |
	| `past`, `summary` | Outlines the last 17 commits made before `HEAD` with a commit graph. |
	| `future` | Outlines the next 17 commits made after `HEAD` with a commit graph. |
	| `rw` | `checkout` 1 commit backward, alias for `checkout HEAD~1` |
	| `ff` | `checkout` 1 commit forward toward `master` |
	| `list-files` | List all tracked filenames in repo, ideally for use with `xargs`. |
	| `edit-tree [query]` | Interactive tracked plaintext file tree, opens file with `$EDITOR` in new window if `X` is running. |
	| `flatten` | Automatically melds `--fixup/squash` commits out of existence starting from the root commit. |
	| `recommit` | Stages changes to worktree and `commit --amend`s them as part of the last commit. |
	| `checkin` | Commit all changes immediately with a generic timestamp and hostname commit message. |
	| `shove` | Runs `checkin` and pushes immediately. |
	| `sync` | Runs `git meta pull` and then recurses through `~/Git` and runs `git pull` on every existing `git` repo found. |
	| `vacuum` | Runs `git meta gc` and then recurses through `~/Git` and runs `git gc` on every existing `git` repo found. |

## `nano`
> **NOTE**<br/>
> _`nano` keybind macros make use of inline non-printable control characters, you must use `nano` or `cat -v` to view [`~/.nanorc`]({GIT_REMOTE}/atelier/raw/master/.nanorc) correctly._

* `nano` is an alias for [`nano-overlay`]({GIT_REMOTE}/atelier/raw/master/Scripts/nano_overlay.sh) which mangles config files and offers the following extended options:

	| opt | function |
	| -- | -- |
	| `-e, --ctags <tag> <#>` | Jumps into file containing `ctags` definition matching `<tag>`. <br/>_Optional `<#>` selects from multiple matches, `all` will open all of them._ |
	| `-c, --ctags-dict <file1>...` | Enable project-wide autocomplete by appending condensed dictionary of all `ctags` keywords to all files. <br/>_Dictionary will be removed upon exiting._ |
	| `-f, --encrypt <file>` | Open AES encrypted text file with a plaintext password. <br/>_File will be created if it doesn't exist._ |
	| `-j, --rsa <file>` | Open AES encrypted text file with generic RSA keypair in PEM format. <br/>_File will be created if it doesn't exist._ |
	| `-s, --ssh-sign <file>` | Open AES encrypted text file with a nonce value signed with SSH private key. <br/>_File will be created if it doesn't exist._ |
	| `-i, --identity <key>` | Use an OpenSSL compatible keypair to encrypt/decrypt. <br/>_Can be a private key or a public key with private half stored in `ssh-agent`_ |

* Once inside the actual `nano`, the following keybind macros are available:

	| key | function |
	| -- | -- |
	| `M-0` | Execute current line as shell command and pipe contents of buffer as stdin.<br/>_Destructively replaces entire contents of buffer, useful for formatting._ |
	| `M-1` | Execute current line as shell command and paste output in current buffer.<br/>_Commands within inline comments are accepted._ |
	| `M-2` | Select token underneath cursor and jump into its `ctags` definition(s) within the same shell.<br/>_Requires valid `tags` file in current or a parent directory._ |
	| `M-4` | Select token underneath cursor and jump into its `ctags` definition(s) in a new terminal window.<br/>_Requires valid `tags` file in current or a parent directory._ |

## `notify-send`
This particular [`notify-send`]({GIT_REMOTE}/atelier/raw/master/.local/lib/notify-send) implements only `-t` for expiration time in seconds,
because it doesn't tie into any `dbus`-based notification daemon implementing the [Desktop Notifications spec][notify].

[notify]: https://specifications.freedesktop.org/notification-spec/latest/
	"freedesktop.org Desktop Notifications spec"

Instead, it's just a shell script that writes to a named pipe that gets picked up by [`xwin-statusd`]({GIT_REMOTE}/atelier/raw/master/Scripts/wm_status.sh) as a simple way to implement OSD text and single-line notifications.

Unlike other implementations, you can pass notifications/OSD text as an argument or via stdin without using `xargs`.

## `sc` (spreadsheet calculator)
`sc` supports macros to some degree, but its macro implementation is [difficult to understand][sc_macros] and there aren't many examples of it being used successfully anywhere that I've managed to find.

[sc_macros]: https://github.com/n-t-roff/sc/blob/master/SC.MACROS "I'm not even sure this was implemented as written."

Instead, the shell function `sc()` offers an easier to understand macro system for statically mangling `.sc` spreadsheet files at runtime.
* `sc` will automatically run any executable sharing the same initial name as the `.sc` file.
	* _eg. `sheet1.sc` will run `sheet1.sc.1`, `sheet1.scx`, etc. if they exist in the same directory and are executable at runtime._
* You can write an arbitrarily complex pre-run macro script in any language, so long as it's made aware of its own filename at runtime.
	* _Because the `sc` file format is plaintext, you can generate `sc` syntax with just a shell script._

### `sc` pre-run macro example scripts
1. A macro script for an inventory spreadsheet that color-codes cells when specific strings are found.

	```shell
	#!/usr/bin/env sh
	# apply colors to specific strings in column B

	file="${0%.*}" # derive .sc file name from name of this script

	# remove all instances of color from the file in place
	{ rm "$file"; egrep -v '^color' > "$file"; } < "$file"

	cat <<- EOF >> "$file" # set some non-default colors
		color 3 = @black;@red
		color 4 = @black;@yellow
		color 5 = @black;@green
	EOF
	# select only string cells from column B, apply colors based on string contents
	# sc format: leftstring B2 = "example string"
	egrep '^((left|right)string|label)' < "$file" | while read -r cmd cell _ str; do
		case "$cell" in B*)
			case "$str" in
				*broken*) echo "color $cell:$cell 3";;
				*bad*) echo "color $cell:$cell 4";;
				*working*) echo "color $cell:$cell 5";;
			esac;;
		esac
	done >> "$file"
	```

2. A macro script that extracts specific fields from a spreadsheet and mangles them into arbitrary JSON data, I use this to update my [figure collection page ](https://microsounds.github.io/notes/figures.htm) on my personal site.
	 * `sc` is very old and predates most notions of CSV or tab delimited data,
the easiest way to extract fields with spaces is use `expect` to output a colon separated table using the `T` command _"interactively"_,
write it to the default filename ending in `.cln`, and then delete it when finshed.


	```shell
	#!/usr/bin/env sh

	# generate simplified JSON data for website
	file="${0%.*}"

	expect <<- EOF > /dev/null
		spawn sc "$file"
		expect "sc 7.16" {
			send -- "T\\\\n"
		}
		expect "i> tbl" {
			send -- "\\\\n Q\\\\n"
			expect eof
		}
	EOF

	# replace empty colon delimited fields with '(null)' for consistency
	# yes this is very ugly
	cat "${file%.*}.cln" \
		| sed -e '/^::/d' -e 's/^:/(null):/g' -e 's/::/:(null):/g' \
			-e 's/::/:(null):/g' -e 's/:$/:(null)/g' \
		| tr ':' '\\\\t' | cut -f1-5 | tail -n +5 | while read -r status id key desc; do
			case "$desc" in
				knockoff*|counterfeit*|fake*) id="x$id";;
				*)	case "$status" in
						unopened|displayed|storage);;
						wishlist) id="w$id";;
						*) id="p$id";;
					esac;;
			esac
			year="${desc#*	}"
			desc="${desc%	$year}"
			desc="$(echo "$desc" | sed "s/'/\\\\\\\\\\\\\\\\'/g")" # escape quotes
			printf "\\\\t[ '%s', '%s', '%s (%s)' ],\\\\n" \
				"$id" "$key" "$desc" "$year"
	done > "${file%.*}.json"

	rm -f "${file%.*}.cln"
	```

## Games
A few Linux-compatible games I like that also can be fetched easily via the internet exist in this repo as scripts that auto-install the game on first run.
Because these scripts install proprietary software they are not included during the post-install, some implementation notes are included.

Proprietary games will be installed to `~/.local/opt`, configuration beyond the initial installation is outside the scope of this repo.

### `minecraft`
[`minecraft`]({GIT_REMOTE}/atelier/raw/master/.local/bin/minecraft) launches or installs [UltimMC offline launcher](https://github.com/UltimMC/Launcher), and a Java runtime environment if not already installed.

UltimMC is a fork of MultiMC which allows you to play any version of **Minecraft Java Edition** offline _with or without_ a paid Minecraft account, it can manage your mods, resource packs and saved worlds as "instances" you can import or export freely.

While you can play online multiplayer normally with a legitimate paid account, you can also login with just a username on 3rd-party servers that specifically allow unauthenticated ("pirate" or "cracked") clients.

Regardless of which Minecraft version you prefer, using vanilla optimization mods such as
[Sodium](https://modrinth.com/mod/sodium),
[Lithium](https://modrinth.com/mod/lithium),
and [FerriteCore](https://modrinth.com/mod/ferrite-core) can improve framerate, performance lag, and GPU utilization by 2.5x or more.

Minimum requirements for acceptable performance:
* any integrated gfx introduced since ~2008 or so
* 2GB of disk space
* 1GB of RAM

### `genshin-impact`

> **WARNING**<br/>
> _Genshin Impact 4.0.0+ requires at least 170GB of disk space to unzip the game,
> this is on top of of the install size of 32-bit + 64bit Wine which is 1.3GB._

[`genshin-impact`]({GIT_REMOTE}/atelier/raw/master/.local/bin/genshin-impact) launches or installs the Windows version of **Genshin Impact** from official sources.

Before version 3.8.0, this script used a certain Linux patch that [disabled the Linux-hostile anticheat software](https://notabug.org/Krock/dawn).
Because it patched game files, it violated MiHoYo's terms of service and you risked banning your account if used.

While newer versions don't officially support Linux, the game now runs on Wine with some tweaks, patching game files is no longer required.
To date, nobody has reported being banned for [playing on a Steam Deck](https://www.google.com/search?q=genshin+impact+steam+deck) running Linux-based SteamOS.

Refer to troubleshooting guides for
[Windows](https://docs.google.com/spreadsheets/d/1I3aaXaNbHm-igAsFwvlCEHr5xyQKO4Wot8TuywsOhxw/pubhtml)
or [Linux-specific](https://notabug.org/Krock/dawn/src/master/TROUBLESHOOTING.md) problems
if you have issues running the game or logging in.

#### Camera movement issues
A common problem is mouse camera movement being extremely sensitive or unresponsive after switching workspaces, to fix:
1. Go to `Settings` and set display resolution to any _windowed mode_.
2. Click anywhere on the virtual Wine desktop to focus on it.
3. Click on the Genshin Impact titlebar to focus it, _make sure it turns blue_.
4. Go to `Settings` and switch back to fullscreen, mouse movement should now work correctly.

As a workaround, try to get into the habit of switching to a windowed resolution before focusing away from the game.

#### Manual installation
After installing the launcher, if you have barely enough disk space _(at least 90GB)_ for the game but not for unzipping, the Windows troubleshooting guide includes direct download links to the required .zip files.

You can unzip in-memory with half the disk space required using `wget -O - [url] | busybox unzip` directly into `~/.local/opt/genshin-impact/drive_c/Program Files/Genshin Impact/Genshin Impact Game`.

Even if you used the official installer, if you want to download language packs other than English, I would suggest this method, because downloading it in-game _(15-18GB)_ is very slow and cannot be done in the background.

#### Usage
Wine 5.3 or later is required, various prerequsite tools are installed along with the game.
Since this is a Windows game running over Wine using various hacks, this installation script and the steps required are awful and anything but automatic, ***read the script to understand what is being done before installing.***

During the installation, a Wine prefix will be set up, some winetricks, prerequisite MSVC frameworks, along with the official installer will be downloaded and installed, install everything as it pops up.
Follow the `xmessage` prompts as they pop up.

Run `genshin-impact` to launch the game directly, use `-l` flag to open the official launcher to install updates when needed, `-m` to use `mangohud` profiler and `--` to stop accepting flags, all other flags will be passed to the game executable.

Minimum requirements for acceptable performance:
* 2c4t CPU introduced since ~2008 or so _(eg. i5-530, Athlon II X2, etc.)_
* GPU with Vulkan-compatible GPU _(Linux only.)_
* 2GB VRAM _(RX 550, GT 1030 or similar.)_
* 170GB of disk space
* 8GB of RAM
* an always-on internet connection _(this is a live-service F2P gacha!)_


[scrot]: https://raw.githubusercontent.com/microsounds/microsounds/master/dotfiles/scrot.png
[shimeji]: {DOC_ROOT}/static/shimemiku/shime36b.png
# Downloads
* `git clone {GIT_REMOTE}/atelier`
* Alternatively, [download latest revision as a `gzip`'d tarball][tar].

[tar]: {GIT_REMOTE}/atelier/archive/refs/heads/master.tar.gz

>**STATISTICS**<br/>
> _Version numbers for selected long-lived components
> found in the current revision:_
> * `android-termux.sh v1.1`
> * `apply-changes v0.1`
> * `chromium_widevine.sh v0.2`
> * `getquote v0.6`
> * `git_status.sh v0.7`
> * `moonphase-date v0.2`
> * `nano_overlay.sh v1.2 `
> * `nyaa-magnet v0.1`
> * `sfx-synth v0.2`
> * `termux-ssh-askpass v0.3`
> * `wm_status.sh v0.6`
> * `xrandr_cycle.sh v0.3`
> * `xwin_decor.sh v1.0`
> * `xwin_webm.sh v0.6`
> * `xwin_widgets.sh v0.4`
>
>_Total on-disk size of the current revision is
320.02KiB
out of a total compressed git history size of
1020.85KiB._

# Complete source listing

<pre><code><span class="term-prompt">{AUTHOR}@{PC_NAME}</span>:<span class="term-dir">~</span>$ git meta ls-tree --name-only -r master | xargs ls -lhgG
-rw-r--r-- 1  11K   Mar 30 2024 13:04 rev. 145  <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.bashrc">.bashrc</a>
-rw-r--r-- 1 1.3K   May 16 2025 14:11 rev. 101  <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.comforts">.comforts</a>
-rw-r--r-- 1  594   Sep  8 2024 22:16 rev. 13   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.comforts-git">.comforts-git</a>
-rw-r--r-- 1  850   Apr 16 2024 01:14 rev. 5    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/chromium/local_state.conf">.config/chromium/local_state.conf</a>
-rw-r--r-- 1 3.6K   May 25 2023 19:52 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/chromium/omnibox.sql">.config/chromium/omnibox.sql</a>
-rw-r--r-- 1  427   May 25 2023 19:28 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/chromium/preferences.conf">.config/chromium/preferences.conf</a>
-rwxr-xr-x 1  465   Feb 13 2022 22:53 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/chromium/vimium/configure.sh">.config/chromium/vimium/configure.sh</a>
-rw-r--r-- 1  639   Feb 13 2022 22:53 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/chromium/vimium/general.json">.config/chromium/vimium/general.json</a>
-rw-r--r-- 1  608   Feb 12 2022 01:57 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/chromium/vimium/keybinds.conf">.config/chromium/vimium/keybinds.conf</a>
-rw-r--r-- 1  442   Feb 12 2022 01:57 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/chromium/vimium/style.css">.config/chromium/vimium/style.css</a>
-rw-r--r-- 1  807   Dec 24 2021 12:04 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/dmenu/config.h">.config/dmenu/config.h</a>
lrwxrwxrwx 1   14   (symbolic link)   rev. 0    .config/dmenu/pre-run -> ../dwm/pre-run
-rw-r--r-- 1 6.3K   Feb  1 2024 21:01 rev. 32   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/dwm/config.h">.config/dwm/config.h</a>
-rw-r--r-- 1 1.7K   Jan 31 2024 14:15 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/dwm/patches/desktop-icons.diff">.config/dwm/patches/desktop-icons.diff</a>
-rw-r--r-- 1  560   Jul 16 2021 00:35 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/dwm/patches/floating-alwayscenter.diff">.config/dwm/patches/floating-alwayscenter.diff</a>
-rw-r--r-- 1 1.7K   Jul 16 2021 00:35 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/dwm/patches/floating-saveposition.diff">.config/dwm/patches/floating-saveposition.diff</a>
-rw-r--r-- 1  501   Jul 16 2021 00:35 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/dwm/patches/monocle-indicator.diff">.config/dwm/patches/monocle-indicator.diff</a>
-rw-r--r-- 1 1.8K   Jul 16 2021 00:37 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/dwm/patches/rule-ispermanent.diff">.config/dwm/patches/rule-ispermanent.diff</a>
-rw-r--r-- 1  870   Jul 16 2021 00:35 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/dwm/patches/status-allmonitors.diff">.config/dwm/patches/status-allmonitors.diff</a>
-rwxr-xr-x 1  250   Mar 11 2022 22:34 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/dwm/pre-run">.config/dwm/pre-run</a>
-rw-r--r-- 1  242   Apr 28 2023 22:37 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/fcitx5/profile">.config/fcitx5/profile</a>
-rw-r--r-- 1  360   Jul  9 2024 18:14 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/fm/desktop.conf">.config/fm/desktop.conf</a>
-rw-r--r-- 1  719   Jun 10 2025 16:22 rev. 7    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/fm/libfm.conf">.config/fm/libfm.conf</a>
-rw-r--r-- 1  387   Apr  3 2021 21:51 rev. 4    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/fm/pcmanfm.conf">.config/fm/pcmanfm.conf</a>
-rw-r--r-- 1  155   Apr  6 2021 15:35 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/gtk/gtk2.conf">.config/gtk/gtk2.conf</a>
-rw-r--r-- 1  263   Apr  6 2021 15:35 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/gtk/gtk3.conf">.config/gtk/gtk3.conf</a>
-rw-r--r-- 1  967   Jul 18 2021 11:56 rev. 15   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/htop/htoprc">.config/htop/htoprc</a>
-rw-r--r-- 1  872   Nov 28 2023 18:11 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/keyd/chromebook.conf">.config/keyd/chromebook.conf</a>
-rw-r--r-- 1  132   Jun  9 2025 12:19 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/keyd/default.conf">.config/keyd/default.conf</a>
-rw-r--r-- 1  820   Mar  1 2024 22:41 rev. 24   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/mpv/mpv.conf">.config/mpv/mpv.conf</a>
-rwxr-xr-x 1  323   Mar 11 2022 22:34 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/nano/post-run">.config/nano/post-run</a>
-rwxr-xr-x 1  215   Mar 11 2022 22:34 rev. 5    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/nano/pre-run">.config/nano/pre-run</a>
-rw-r--r-- 1  197   Apr  6 2021 15:35 rev. 5    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/sxhkd/chromebook">.config/sxhkd/chromebook</a>
-rw-r--r-- 1 2.7K   May 25 2025 22:32 rev. 48   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/sxhkd/default">.config/sxhkd/default</a>
-rw-r--r-- 1  532   Jun  9 2025 12:19 rev. 4    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/sxhkd/mouse">.config/sxhkd/mouse</a>
-rw-r--r-- 1  134   Sep  8 2024 22:16 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/upstream/azpainter/makefile">.config/upstream/azpainter/makefile</a>
-rwxr-xr-x 1  264   Sep  8 2024 22:16 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/upstream/azpainter/post-run">.config/upstream/azpainter/post-run</a>
-rwxr-xr-x 1  249   Sep  8 2024 22:16 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/upstream/azpainter/pre-run">.config/upstream/azpainter/pre-run</a>
-rwxr-xr-x 1  279   Sep 10 2023 23:30 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/upstream/cmark-gfm-xhtml/pre-run">.config/upstream/cmark-gfm-xhtml/pre-run</a>
-rwxr-xr-x 1  556   Nov 28 2023 17:29 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/upstream/keyd/pre-run">.config/upstream/keyd/pre-run</a>
-rwxr-xr-x 1  519   Oct 26 2023 10:28 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/upstream/sc/pre-run">.config/upstream/sc/pre-run</a>
-rwxr-xr-x 1  231   Mar 10 2022 17:55 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/upstream/x48/post-run">.config/upstream/x48/post-run</a>
-rwxr-xr-x 1  311   Apr 29 2023 09:35 rev. 5    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/upstream/x48/pre-run">.config/upstream/x48/pre-run</a>
-rwxr-xr-x 1  313   Aug  4 2023 16:41 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/upstream/xdiskusage/pre-run">.config/upstream/xdiskusage/pre-run</a>
-rwxr-xr-x 1  235   Dec  6 2021 18:11 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/upstream/yt-dlp/post-run">.config/upstream/yt-dlp/post-run</a>
-rw-r--r-- 1 1019   Dec 16 2021 12:51 rev. 5    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/xkb/chromebook.xkb">.config/xkb/chromebook.xkb</a>
-rw-r--r-- 1 2.2K   Dec 16 2021 07:15 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/xkb/ntc-chip.xkb">.config/xkb/ntc-chip.xkb</a>
-rw-r--r-- 1  199   Sep 23 2020 14:50 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/xorg/amd.conf">.config/xorg/amd.conf</a>
-rw-r--r-- 1  368   Aug 24 2020 22:50 rev. 6    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/xorg/intel.conf">.config/xorg/intel.conf</a>
-rw-r--r-- 1  939   Dec 15 2021 19:58 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/xorg/ntc-chip.conf">.config/xorg/ntc-chip.conf</a>
-rw-r--r-- 1  364   Apr 26 2025 18:42 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.config/xorg/nvidia.conf">.config/xorg/nvidia.conf</a>
-rw-r--r-- 1 2.9K   Jun 16 2025 10:25 rev. 33   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.gitconfig">.gitconfig</a>
-rw-r--r-- 1 4.0K   Apr 26 2025 18:42 rev. 36   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.github/workflows/ci.yml">.github/workflows/ci.yml</a>
-rw-r--r-- 1 2.5K   Sep 15 2022 02:32 rev. 7    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.github/workflows/magnet-dl.yml">.github/workflows/magnet-dl.yml</a>
-rwxr-xr-x 1 1.2K   May 25 2025 22:28 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/adb-ssh-socks5">.local/bin/adb-ssh-socks5</a>
-rw-r--r-- 1 1.5K   Jul 16 2025 12:46 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/adb-ssh-socks5.patch">.local/bin/adb-ssh-socks5.patch</a>
-rwxr-xr-x 1  232   Jan  5 2023 18:36 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/ascii2ps">.local/bin/ascii2ps</a>
-rwxr-xr-x 1 3.2K   Nov 25 2024 11:48 rev. 20   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/chromium">.local/bin/chromium</a>
-rwxr-xr-x 1  181   Sep 25 2022 23:41 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/egrep">.local/bin/egrep</a>
-rwxr-xr-x 1   85   Jul 15 2020 17:12 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/feh">.local/bin/feh</a>
lrwxrwxrwx 1    5   (symbolic link)   rev. 0    .local/bin/fgrep -> egrep
-rwxr-xr-x 1 2.7K   Mar 20 2024 17:43 rev. 9    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/genshin-impact">.local/bin/genshin-impact</a>
-rwxr-xr-x 1 1.8K   Jun 25 2025 15:17 rev. 6    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/getquote">.local/bin/getquote</a>
-rwxr-xr-x 1  100   Jul 15 2020 17:12 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/make">.local/bin/make</a>
-rwxr-xr-x 1  735   Mar 12 2024 13:29 rev. 6    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/minecraft">.local/bin/minecraft</a>
-rwxr-xr-x 1  153   Mar 30 2021 13:19 rev. 4    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/mpv">.local/bin/mpv</a>
lrwxrwxrwx 1   29   (symbolic link)   rev. 0    .local/bin/nano-overlay -> ../../Scripts/nano_overlay.sh
-rwxr-xr-x 1  790   Nov  6 2023 17:44 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/nyaa-magnet">.local/bin/nyaa-magnet</a>
-rwxr-xr-x 1  423   Jan  7 2022 18:03 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/pprofiler">.local/bin/pprofiler</a>
-rwxr-xr-x 1  907   Oct 10 2022 21:50 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/psp-h264">.local/bin/psp-h264</a>
-rwxr-xr-x 1  731   Mar 21 2022 23:26 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/qr">.local/bin/qr</a>
lrwxrwxrwx 1    5   (symbolic link)   rev. 0    .local/bin/rgrep -> egrep
-rwxr-xr-x 1 1.0K   Dec  6 2021 00:36 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/scramble">.local/bin/scramble</a>
-rwxr-xr-x 1  155   Oct 16 2020 13:58 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/scrot">.local/bin/scrot</a>
-rwxr-xr-x 1  671   Nov 28 2023 16:45 rev. 10   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/startx">.local/bin/startx</a>
-rwxr-xr-x 1  367   Dec 16 2022 12:16 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/to-chromium">.local/bin/to-chromium</a>
-rwxr-xr-x 1  659   Mar 21 2022 23:26 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/twopass">.local/bin/twopass</a>
-rwxr-xr-x 1  848   May 20 2024 20:46 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/winenv">.local/bin/winenv</a>
-rwxr-xr-x 1  258   Jul  2 2024 15:08 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/bin/x48-resize">.local/bin/x48-resize</a>
lrwxrwxrwx 1   29   (symbolic link)   rev. 0    .local/bin/xrandr-cycle -> ../../Scripts/xrandr_cycle.sh
lrwxrwxrwx 1   27   (symbolic link)   rev. 0    .local/bin/xwin-decor -> ../../Scripts/xwin_decor.sh
lrwxrwxrwx 1   26   (symbolic link)   rev. 0    .local/bin/xwin-statusd -> ../../Scripts/wm_status.sh
lrwxrwxrwx 1   26   (symbolic link)   rev. 0    .local/bin/xwin-webm -> ../../Scripts/xwin_webm.sh
lrwxrwxrwx 1   29   (symbolic link)   rev. 0    .local/bin/xwin-widgets -> ../../Scripts/xwin_widgets.sh
-rw-r--r-- 1  679   Oct 21 2021 23:42 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/include/colors/campbell.h">.local/include/colors/campbell.h</a>
-rw-r--r-- 1  457   Dec 14 2021 20:37 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/include/colors/ncurses.h">.local/include/colors/ncurses.h</a>
-rw-r--r-- 1  749   Feb 15 2021 00:56 rev. 4    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/include/colors/nightdrive.h">.local/include/colors/nightdrive.h</a>
-rw-r--r-- 1  690   Nov 15 2021 23:00 rev. 5    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/include/colors/overcast.h">.local/include/colors/overcast.h</a>
-rw-r--r-- 1  642   Feb 15 2021 00:56 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/include/colors/xterm.h">.local/include/colors/xterm.h</a>
-rw-r--r-- 1 1.6K   Dec 24 2021 12:04 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/include/theme.h">.local/include/theme.h</a>
-rwxr-xr-x 1 1.1K   Mar  2 2024 19:09 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/apply-changes">.local/lib/apply-changes</a>
-rwxr-xr-x 1  650   Jul 10 2021 23:42 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/conf-append">.local/lib/conf-append</a>
-rwxr-xr-x 1  477   Jul 10 2021 23:42 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/extern">.local/lib/extern</a>
-rwxr-xr-x 1  187   Nov 28 2023 16:45 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/is-chromebook">.local/lib/is-chromebook</a>
-rwxr-xr-x 1  194   Apr 14 2022 20:58 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/is-container">.local/lib/is-container</a>
-rwxr-xr-x 1  376   Mar 11 2022 22:34 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/is-installed">.local/lib/is-installed</a>
-rwxr-xr-x 1  314   Jul 17 2021 22:28 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/is-newer">.local/lib/is-newer</a>
-rwxr-xr-x 1  356   Dec 15 2021 19:58 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/is-ntc-chip">.local/lib/is-ntc-chip</a>
-rwxr-xr-x 1  186   Dec 17 2023 15:36 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/is-termux">.local/lib/is-termux</a>
-rwxr-xr-x 1  258   Jul 10 2021 23:42 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/mk-tempdir">.local/lib/mk-tempdir</a>
-rwxr-xr-x 1 1.3K   Apr  2 2023 19:20 rev. 5    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/moonphase-date">.local/lib/moonphase-date</a>
-rwxr-xr-x 1  526   Dec  3 2021 22:08 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/notify-send">.local/lib/notify-send</a>
-rwxr-xr-x 1 1.1K   Oct 21 2021 21:08 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/palette">.local/lib/palette</a>
lrwxrwxrwx 1   27   (symbolic link)   rev. 0    .local/lib/path-gitstatus -> ../../Scripts/git_status.sh
-rwxr-xr-x 1  553   Jul 10 2021 23:42 rev. 5    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/path-shorthand">.local/lib/path-shorthand</a>
-rwxr-xr-x 1  181   Aug  2 2021 15:47 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/sfx-play">.local/lib/sfx-play</a>
-rwxr-xr-x 1 1020   May 16 2025 14:45 rev. 6    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/sfx-synth">.local/lib/sfx-synth</a>
-rwxr-xr-x 1  526   Dec 28 2023 02:14 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/systemd-sleep">.local/lib/systemd-sleep</a>
-rwxr-xr-x 1 2.5K   Dec 19 2023 23:01 rev. 4    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/termux-ssh-askpass">.local/lib/termux-ssh-askpass</a>
-rwxr-xr-x 1  319   Jul 23 2021 00:58 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/user-confirm">.local/lib/user-confirm</a>
-rwxr-xr-x 1  284   Apr  2 2023 19:27 rev. 6    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/visual">.local/lib/visual</a>
-rwxr-xr-x 1  543   Jun  9 2025 12:19 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/x-sh">.local/lib/x-sh</a>
-rwxr-xr-x 1  355   Mar 18 2024 11:37 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/x-user-confirm">.local/lib/x-user-confirm</a>
-rwxr-xr-x 1  466   Jun  9 2025 12:19 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/lib/xwin-window-wait">.local/lib/xwin-window-wait</a>
-rw-r--r-- 1  172   May 29 2020 11:21 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/share/X11/bitmaps/diag.xbm">.local/share/X11/bitmaps/diag.xbm</a>
-rw-r--r-- 1  280   Aug 14 2021 15:39 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/share/applications/mimeapps.list">.local/share/applications/mimeapps.list</a>
-rw-r--r-- 1   80   Aug 14 2021 15:39 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/share/applications/nano.desktop">.local/share/applications/nano.desktop</a>
-rw-r--r-- 1  685   Mar 31 2021 21:37 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/share/nano/md-kagami.nanorc">.local/share/nano/md-kagami.nanorc</a>
-rw-r--r-- 1  291   Jul 15 2020 16:41 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.local/share/nano/stdc.syntax">.local/share/nano/stdc.syntax</a>
-rw-r--r-- 1   84   Mar 26 2022 20:37 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.mailmap">.mailmap</a>
-rw-r--r-- 1 1.8K   Sep 25 2023 02:10 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.minecraft/resourcepacks/HatsuneMiku_2015/assets/minecraft/textures/entity/alex.png">.minecraft/resourcepacks/HatsuneMiku_2015/assets/minecraft/textures/entity/alex.png</a>
-rw-r--r-- 1 1.8K   Sep 25 2023 02:10 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.minecraft/resourcepacks/HatsuneMiku_2015/assets/minecraft/textures/entity/steve.png">.minecraft/resourcepacks/HatsuneMiku_2015/assets/minecraft/textures/entity/steve.png</a>
-rw-r--r-- 1  114   Sep 25 2023 02:10 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.minecraft/resourcepacks/HatsuneMiku_2015/pack.mcmeta">.minecraft/resourcepacks/HatsuneMiku_2015/pack.mcmeta</a>
-rw-r--r-- 1  32K   Sep 25 2023 02:10 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.minecraft/resourcepacks/HatsuneMiku_2015/pack.png">.minecraft/resourcepacks/HatsuneMiku_2015/pack.png</a>
-rw-r--r-- 1 2.0K   Sep 25 2023 02:10 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.minecraft/resourcepacks/HatsuneMiku_2023/assets/minecraft/textures/entity/alex.png">.minecraft/resourcepacks/HatsuneMiku_2023/assets/minecraft/textures/entity/alex.png</a>
-rw-r--r-- 1  106   Sep 25 2023 02:10 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.minecraft/resourcepacks/HatsuneMiku_2023/pack.mcmeta">.minecraft/resourcepacks/HatsuneMiku_2023/pack.mcmeta</a>
-rw-r--r-- 1  65K   Sep 25 2023 02:10 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.minecraft/resourcepacks/HatsuneMiku_2023/pack.png">.minecraft/resourcepacks/HatsuneMiku_2023/pack.png</a>
-rw-r--r-- 1 1.8K   Jun 16 2025 10:25 rev. 37   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.nanorc">.nanorc</a>
-rwxr-xr-x 1 1.7K   Apr 11 2025 15:05 rev. 24   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/00-apt-repositories.sh">.once.d/00-apt-repositories.sh</a>
-rwxr-xr-x 1  695   Aug 20 2023 20:43 rev. 21   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/01-install-essential.sh">.once.d/01-install-essential.sh</a>
-rwxr-xr-x 1  586   Mar  2 2024 12:39 rev. 6    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/02-meta-config.sh">.once.d/02-meta-config.sh</a>
-rwxr-xr-x 1  213   Oct 22 2022 22:48 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/0p-pocketchip-dpi.sh">.once.d/0p-pocketchip-dpi.sh</a>
-rwxr-xr-x 1 2.5K   Aug 20 2023 20:43 rev. 9    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/10-git-upstream.sh">.once.d/10-git-upstream.sh</a>
-rwxr-xr-x 1  657   Apr 29 2023 09:35 rev. 10   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/13-posix-docs.sh">.once.d/13-posix-docs.sh</a>
-rwxr-xr-x 1 1022   Mar 21 2022 23:26 rev. 11   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/14-sunvox.sh">.once.d/14-sunvox.sh</a>
-rwxr-xr-x 1  549   Aug  2 2021 15:28 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/15-sound-effects.sh">.once.d/15-sound-effects.sh</a>
-rwxr-xr-x 1  512   Apr 26 2025 18:42 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/16-waifu2x.sh">.once.d/16-waifu2x.sh</a>
-rwxr-xr-x 1  499   Nov 21 2020 15:41 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/20-xorg-override.sh">.once.d/20-xorg-override.sh</a>
-rwxr-xr-x 1  387   Jun 18 2021 00:52 rev. 12   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/21-network-manager.sh">.once.d/21-network-manager.sh</a>
-rwxr-xr-x 1  796   Jul  6 2022 16:51 rev. 11   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/22-realtek-rtl8812au.sh">.once.d/22-realtek-rtl8812au.sh</a>
-rwxr-xr-x 1  619   Aug 26 2023 09:24 rev. 17   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/23-grub-config.sh">.once.d/23-grub-config.sh</a>
-rwxr-xr-x 1  298   Nov 30 2021 00:48 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/24-initramfs-resume.sh">.once.d/24-initramfs-resume.sh</a>
-rwxr-xr-x 1  752   Mar 21 2022 23:26 rev. 13   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/25-chromium-widevine.sh">.once.d/25-chromium-widevine.sh</a>
-rwxr-xr-x 1 1.1K   Feb 15 2024 02:34 rev. 7    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/26-freedesktop-tweaks.sh">.once.d/26-freedesktop-tweaks.sh</a>
-rwxr-xr-x 1  178   Mar 13 2021 01:07 rev. 4    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/27-libvirt-rootless.sh">.once.d/27-libvirt-rootless.sh</a>
-rwxr-xr-x 1 1.5K   Mar 21 2022 23:26 rev. 9    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/28-intel-undervolt.sh">.once.d/28-intel-undervolt.sh</a>
-rwxr-xr-x 1  874   May  8 2025 22:37 rev. 9    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/29-chromium-extensions.sh">.once.d/29-chromium-extensions.sh</a>
-rwxr-xr-x 1   58   Nov 30 2021 00:47 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/2a-remove-motd.sh">.once.d/2a-remove-motd.sh</a>
-rwxr-xr-x 1  201   Mar  2 2022 12:39 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/2b-enscript-fonts.sh">.once.d/2b-enscript-fonts.sh</a>
-rwxr-xr-x 1  566   Nov 26 2022 20:37 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/2c-csr8510-bluetooth.sh">.once.d/2c-csr8510-bluetooth.sh</a>
-rwxr-xr-x 1 1.1K   Nov 23 2023 19:59 rev. 2    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/2d-intel-bay-trail.sh">.once.d/2d-intel-bay-trail.sh</a>
-rwxr-xr-x 1 4.3K   Mar 29 2024 21:07 rev. 32   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/a0-android-termux.sh">.once.d/a0-android-termux.sh</a>
-rwxr-xr-x 1  200   Nov 28 2023 16:34 rev. 10   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/c0-chromebook-power-key.sh">.once.d/c0-chromebook-power-key.sh</a>
-rw-r--r-- 1 1.1K   Oct 22 2022 22:48 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/ntc-chip.patch">.once.d/ntc-chip.patch</a>
-rwxr-xr-x 1  199   Nov 28 2023 16:34 rev. 3    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/p0-pocketchip-power-key.sh">.once.d/p0-pocketchip-power-key.sh</a>
-rwxr-xr-x 1  396   Oct 22 2022 22:48 rev. 1    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.once.d/p1-pocketchip-network-manager.sh">.once.d/p1-pocketchip-network-manager.sh</a>
-rw-r--r-- 1  886   Sep 10 2023 23:30 rev. 31   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.profile">.profile</a>
-rw-r--r-- 1  276   Dec 14 2021 20:38 rev. 6    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.scrc">.scrc</a>
-rwxr-xr-x 1 1013   May 11 2025 13:28 rev. 9    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.shortcuts/SSH-Daemon">.shortcuts/SSH-Daemon</a>
-rw-r--r-- 1 2.6K   Jun  9 2025 12:19 rev. 79   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.xinitrc">.xinitrc</a>
-rw-r--r-- 1 2.0K   Dec 29 2023 10:42 rev. 29   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/.xresources">.xresources</a>
-rwxr-xr-x 1 4.3K   May 15 2022 23:36 rev. 32   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/Scripts/git_status.sh">Scripts/git_status.sh</a>
-rwxr-xr-x 1  23K   Jun 25 2022 16:15 rev. 90   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/Scripts/nano_overlay.sh">Scripts/nano_overlay.sh</a>
-rwxr-xr-x 1 6.8K   Jun 30 2024 22:07 rev. 50   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/Scripts/wm_status.sh">Scripts/wm_status.sh</a>
-rwxr-xr-x 1 1.7K   Jun 27 2024 16:38 rev. 8    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/Scripts/xrandr_cycle.sh">Scripts/xrandr_cycle.sh</a>
-rwxr-xr-x 1 3.2K   Apr 26 2025 18:42 rev. 36   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/Scripts/xwin_decor.sh">Scripts/xwin_decor.sh</a>
-rwxr-xr-x 1 1.7K   May 13 2025 15:05 rev. 20   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/Scripts/xwin_webm.sh">Scripts/xwin_webm.sh</a>
-rwxr-xr-x 1 3.0K   Dec 13 2021 02:28 rev. 17   <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/Scripts/xwin_widgets.sh">Scripts/xwin_widgets.sh</a>
-rw-r--r-- 1 2.0K   Mar 12 2022 17:16 rev. 5    <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/Userscripts/youtube_screenshot.user.js">Userscripts/youtube_screenshot.user.js</a>
-rw-r--r-- 1  45K   Apr 26 2025 18:42 rev. 217  <a href="https://raw.githubusercontent.com/{AUTHOR}/atelier/master/readme&#46;md">readme&#46;md</a>
</code></pre>
<!-- created Mon, 19 Aug 2019 22:48:18 -0700 -->
<!-- updated Wed, 16 Jul 2025 12:46:07 -0700 -->
