<!-- written 2023/12/21 -->
# Termux: SSH fingerprint authentication using Android Keystore
Written on {CREATED}.

If you're unfamiliar with _Termux_, it's an extensible [Android terminal emulator](https://termux.dev) that papers over the user-hostile quirks of the Android operating system to provide a mostly faithful Linux environment for running familiar *nix software. It comes with an extensive [APT package repository](https://packages.termux.dev/) cross-compiled for ARM devices.
You can install it from [F-Droid](https://f-droid.org/en/packages/com.termux) or from [upstream](https://github.com/termux/termux-app).

Does this turn your unrooted Android smartphone into a handheld Linux terminal? Yes. <br/>
Does this ascend your smartphone from a toy computer into your most useful computing device when used to the fullest? Probably. Some people's comfort comes from a portable VT220 emulator, you know.

## I seriously hope you're not doing this.
I don't like assuming the skill level of the reader, so I never write tutorials, but the loudest Termux users seem to be beginners to the *NIX command line in general.
This is why you see many Termux users misusing `termux-fingerprint` as [a simple app lock](https://archive.ph/huXAr) for their Termux installation.

Their use of biometric security starts and ends at checking for a simple return value in their `~/.bashrc`, something that can be bypassed by opening a failsafe session.

## Your phone is literally a YubiKey
It was around this time last year where I thought it would be really cool if `ssh-agent` could use my fingerprint reader instead of a passphrase to add my OpenSSH keys, but I gave up when I saw the return value of `termux-fingerprint` provided by `termux-api`, you only get an authentication success or failure message, no key material is returned which could be used to generate a plaintext passphrase. I initially wrote this off as just another example of *nix software being a second class citizen on Android and giving up.

<video loop="loop" autoplay="autoplay" muted="muted">
	<source type="video/webm" src="{DOC_ROOT}/notes/assets/termux-ssh-askpass.webm" />

</video>
<div class="aside">(Yes, I'm recording the screen because Android doesn't allow screenshots of the fingerprint lock screen.)</div>

But did you know that the [trusted execution environment](https://en.wikipedia.org/wiki/Trusted_execution_environment) _(a.k.a security chip, embedded controller, EC, secure element, etc.)_ on your device is exposed to Android via the [Android Keystore API](https://developer.android.com/privacy-and-security/keystore), providing functionality similar to a [YubiKey](https://en.wikipedia.org/wiki/YubiKey) where it can generate non-extractable encryption keys made available to you only during a customizable validity period after a successful phone unlock attempt?
`termux-api` already exposes this functionality to Termux with `termux-keystore`, there isn't any writing about [connecting the two together](https://archive.ph/I6e0K) for some reason.

OpenSSH already allows for calling arbitrary graphical utilities to collect the passphrase from the user, you can write a drop-in replacement to generate an RSA signed passphrase using fingerprint lock protected encryption keys.

It's really easy and everything just works, you can be as lazy as you want without affecting your opsec _too_ much.

## Writing a drop-in replacement for `ssh-askpass`
> **WARNING** <br/>
> _This is an ongoing experiment in balancing convenience and security, your security threat model may find the barebones security provided by fingerprint sensors unacceptable._

1. You should have the add-on app `Termux:API` and it's companion library Termux package `termux-api` installed before continuing.
2. Create a hardware-backed inaccessible RSA 4096-bit private key named `default` in your hardware-backed keystore.
	* `termux-keystore generate 'default' -a RSA -s 4096 -u 5`
	* `-u` sets the key validity period in seconds after a successful device unlock.
	* `-u 0` disables this functionality, don't do that.

`ssh-agent` and friends call `$SSH_ASKPASS` from your path whenever trying to work with passphrase protected encryption keys.
Set this to the name of the new drop-in replacement you'll be writing to by exporting the following envvars:

	# ~/.profile, or ~/.bashrc if you're extra stupid
	export SSH_ASKPASS='termux-ssh-askpass'
	export SSH_ASKPASS_REQUIRE='force'

Then you drop a shell script in your path that calls `termux-fingerprint`, which only returns some JSON containing `AUTH_RESULT_SUCCESS` if it succeeded.
`termux-fingerprint` can also take some strings to customize user-facing prompt text but these aren't required.

After a successful fingerprint unlock, you have 5 seconds to run `termux-keystore sign` and sign a nonce value. This can be anything, as long as it's unchanging.
I personally sign the matching public key file[^1] for the private key being unlocked, but for simplicity, you can just as easily use the string `'sdhfkdsklfjlksdjfkljdsklf'`.

	#!/usr/bin/env sh

	# termux-ssh-askpass v0.1
	termux-fingerprint -d "$1" | jq -r '.auth_result' | fgrep -q 'AUTH_RESULT_SUCCESS' || exit 1
	echo 'sdhfkdsklfjlksdjfkljdsklf' | termux-keystore sign 'default' SHA256withRSA | base64 -w 0

Then just convert the binary signed nonce data emitted by the security chip to plaintext in any way you like, `base64 -w 0` is fine.

[^1]:
	I wanted to maintain feature parity with other `ssh-askpass` drop-in replacements, OpenSSH passes in a text prompt with the form `'Enter passphrase for /path/to/key: '` meant to be shown to the user.

	Parsing this to get the path to the private key while also accounting for `l18n` is a real pain and this is supposed to be easy.

	You can see [how I wrote mine]({GIT_REMOTE}/atelier/blob/master/.local/lib/termux-ssh-askpass) if you're really interested, but emitting customized prompt text in your fingerprint lock screen and using the matching public key as a nonce value doesn't doesn't add any appreciable security whatsoever.


Now prime the pump by changing the passphrase on your existing key(s) with the output from `termux-ssh-askpass`, though you may want to run it standalone first to make sure everything works.

	SSH_ASKPASS= ssh-keygen -p -f ~/.ssh/id_rsa -N "$(termux-ssh-askpass)" -F 'old passphrase'

If you've done everything correctly, your new passphrase is now a very long string of plaintext

It's basically as seamless as having no passphrase at all.
It requires biometrics to generate, the signing key used to generate it cannot be extracted from your phone's hardware-backed keystore, and while I also get this is absolutely overkill for most people, it's also really convenient!

I use `ssh-keygen -Y sign` and `openssl enc` as the [basis for file encryption]({DOC_ROOT}/notes/dotfiles.md#nano) so you can imagine how much of a quality of life improvement this brings over dealing with `ssh-agent` through Gboard.

## Important considerations
If your threat model hovers somewhere around ***not wanting someone to pretend to be you while having physical access to your device***, I think this does pretty well.

This works with zero chance of vendor or device lock-in, as you are not using key material from the security chip for SSH authentication, it's only used to decrypt your existing SSH key.

Even though someone with physical access to your unlocked Android device ***could*** modify the hardware keystore without authentication and ***could*** replace keys with identically named keys that have an unlimited validity period, they will not be the same key material used to produce your signed passphrase.

You also understand that, by replacing passphrases with biometrics, your ***fingerprint reader becomes your single point of failure***, you really should not be using this kind of thing if your threat model includes _bioluminescent individuals_, you have been warned!

