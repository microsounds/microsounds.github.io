#!/usr/bin/env sh

# run only via automated CI/CD
! is-container && exit

cd ~

# GNU printf required
# re-renders ~/readme.md for use as self-contained webpage
# spits out complete listing of dotfiles with inline links
ver="$(git meta rev-list HEAD | wc -l | xargs env printf "%'d")" # revision count
hash="$(git meta rev-parse --short HEAD)"
mesg="$(git meta log -1 --format=%s)"

# github direct URL prefixes
# raw.githubusercontent.com/<user>/<repo>/<branch>/<path>
# - very fast
# - doesn't support directory links, returning 404
# github.com/<user>/<repo>/{raw,blob}/<branch>/<path>
# - served much more slowly, */raw/* 302's to the first URL
# - but it automatically redirects to */blob/* on directory links
D_RAW='https://raw.githubusercontent.com/{AUTHOR}/atelier/master'

# estimated documentation completeness
# this document is about 5x more verbose than my comments
# divide size of document in bytes by 5 and it should be comparable
# to the size of all comments found in this repo, in bytes
v_factor=5
this_doc="$(wc -c < ~/readme.md)"
comments="$(git meta list-files \
	| xargs grep -I --exclude=readme.md '#' | sed -E 's/.*(#.*)/\1/g' | wc -c)"
coverage="$(echo "scale=4; (($this_doc / $v_factor) / $comments) * 100" | bc)"
coverage="${coverage%??}%"

# document header
# this is a chaotic mix of multiple syntaxes, plain shell is evaluated first,
# then kagami inline macros, then kagami flavored markdown + inline HTML
{
	cat <<- EOF
		# Selected documentation and usage notes for my dotfiles
		**Revision No. <b style="font-size: 130%">$ver</b>, commit \`$hash\`.**

		**"$mesg"**

		{TOC}

		View changelog since the last revision as [ \`diff HEAD~1...HEAD\`][2]

		The verbosity factor of this document compared to comment lines of code
		in this repo is about **${v_factor}:1**.

		If this document is *$(echo "scale=1; $this_doc / 1024" | bc)KiB* in
		size, and the approximate size of all comment lines of code is
		*$(echo "scale=1; $comments / 1024" | bc)KiB* then this document
		currently covers about <b style="font-size: 130%;">$coverage</b>
		of all implemented features and behavior in this repository.
		This is just an [automated guess][1] though.

		This document and repository is also mirrored at
		[\`{AUTHOR}/atelier\`]({GIT_REMOTE}/atelier) on GitHub.

		Last updated {UPDATED}.

		[1]: {GIT_REMOTE}/microsounds.github.io/raw/master/${0#$DOC_ROOT/}
		[2]: {GIT_REMOTE}/atelier/compare/HEAD~1...HEAD.diff

	EOF

	# reproducibly pick random emoji based on commit hash
	readme="$HOME/readme.md"
	rseed="$DOC_ROOT/.commit-ref"
	trap 'rm -f "$rseed"' 0 1 2 3 6
	git meta rev-parse HEAD > "$rseed"
	shimeji="$(find "$DOC_ROOT/static/shimemiku" -type f \
		| shuf --random-source="$rseed" | head -n 1)"
	shimeji="${shimeji#$DOC_ROOT/}"

	# rewrite relative markdown links
	# rewrite block-level align attributes with CSS
	# replace inline shimeji with a random one
	# replace screenshot with embedded webm, leave it as fallback for safari
	webm="<video loop=\"loop\" autoplay=\"autoplay\" muted=\"muted\" \
		poster=\"${D_RAW%/*/*}/{AUTHOR}/master/dotfiles/scrot.png\"> \
		<source type=\"video/webm\" \
		src=\"${D_RAW%/*/*}/{AUTHOR}/master/dotfiles/scrot.webm\" /></video>"

	cat "$readme" | sed -E \
		-e 's,\]\(([^#http][a-zA-Z0-9._\/-]*)\),\]\({GIT_REMOTE}/atelier/raw/master/\1\),g' \
		-e 's,align="(.*)",style="text-align: \1;",g' \
		-e "s,\[shimeji\]:.*,\[shimeji\]: {DOC_ROOT}/$shimeji,g" \
		-e "s,.*\!\[scrot\].*,$webm,g"

	# downloads and interactive source listing
	prompt='{AUTHOR}@{PC_NAME}'
	command='git meta ls-tree --name-only -r master | xargs ls -lhgG'

	cat <<- EOF
		# Downloads
		* \`git clone {GIT_REMOTE}/atelier\`
		* Alternatively, [download latest revision as a \`gzip\`'d tarball][tar].

		[tar]: {GIT_REMOTE}/atelier/archive/refs/heads/master.tar.gz

		>**STATISTICS**<br/>
		> _Version numbers for selected long-lived components
		> found in the current revision:_
		$(git meta list-files | xargs egrep -Iho '[a-z._-]+ v([0-9].?)+' \
			| sort | uniq | xargs -I '{}' echo '> * `{}`')
		>
		>_Total on-disk size of the current revision is
		$(echo "scale=2; ($(git meta list-files | xargs ls -l \
			| tr -s ' ' '\t' | cut -f5 | paste -s -d '+')) / 1024" | bc)KiB
		out of a total compressed git history size of
		$(git meta count-objects -vH | fgrep 'size-pack' \
			| tr -s ' :' '\t' | cut -f2)KiB._

		# Complete source listing

	EOF
	printf '%s' '<pre><code>'
	printf '%s:%s %s\n' \
		"<span class=\"term-prompt\">$prompt</span>" \
		'<span class="term-dir">~</span>$' \
		"$command"

	# required for use of pipes within a variable expansion
	# omit on-disk mtimes in actual ls command
	sh -c "$command --time-style='+'" | while read -r line; do
		case "$line" in
			l*) # symlinks with placeholder metadata
				link="${line% ->*}"
				link="${link##* }"
				target="${line##* }"
				printf "%s %s rev. %-${#ver}d %s\n" \
					"${line%$link -> $target}" \
					'(symbolic link)  ' \
					'' \
					"$link -> $target";;
			*) # normal files with metadata taken from git
				path="${line##* }"
				printf '%s' "mtime/revision tally for '$path'" 1>&2

				# escape kagami's *.md => *.htm URL rewrites
				unset esc_path
				case "$path" in
					*.md) esc_path="${path%.*}&#46;md";;
				esac

				# rwx---	bytes	mtime	rev-count	raw-link
				printf "%s %s rev. %-${#ver}d %s\n" \
					"${line%%$path}" \
					"$(git meta log -1 \
						--date='format:%b %_d %Y %H:%M' --format='%ad' -- $path)" \
					"$(git meta log --follow --oneline $path | wc -l)" \
					"<a href=\"$D_RAW/${esc_path:-$path}\">${esc_path:-$path}</a>"
				printf '\r\33[K' 1>&2;;
		esac
	done
	echo '</code></pre>'
	echo "<!-- created $(git meta log --date=rfc --format='%ad' -- readme.md | tail -n 1) -->"
	echo "<!-- updated $(git meta log -1 --date=rfc --format='%ad') -->"
} > "$DOC_ROOT/.src/notes/dotfiles.md"
