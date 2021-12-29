#!/usr/bin/env sh

cd ~

# re-renders ~/readme.md for use as a standalone webpage
# spits out complete listing of dotfiles with inline links
ver="$(git meta rev-list HEAD | wc -l)" # revision count
hash="$(git meta rev-parse --short HEAD)"
mesg="$(git meta log -1 --format=%s)"

# github direct URL prefixes
# raw.githubusercontent.com/<user>/<repo>/<branch>/<path>
# - very fast
# - doesn't support directory links, returning 404
# github.com/<user>/<repo>/{raw,blob}/<branch>/<path>
# - served much more slowly, */raw/* 302's to the first URL
# - but it automatically redirects to */blob/* on directory links
D_RAW='https://raw.githubusercontent.com/microsounds/atelier/master'

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
		**Revision No. $ver, commit \`$hash\`.**

		**"$mesg"**

		{TOC}

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

	EOF

	# reproduceably pick random emoji based on commit hash
	readme="$HOME/readme.md"
	rseed="$DOC_ROOT/.commit-ref"
	trap 'rm -f "$rseed"' 0 1 2 3 6
	git meta rev-parse HEAD > "$rseed"
	shimeji="$(find "$DOC_ROOT/static/shimemiku" -type f \
		| shuf --random-source="$rseed" | head -n 1)"
	shimeji="${shimeji#$DOC_ROOT/}"

	# rewrite relative markdown links
	# replace tabs with 4-space indents
	# replace inline shimeji with a random one
	cat "$readme" | sed -E \
		-e 's,\]\(([^http][a-zA-Z0-9._\/-]*)\),\]\({GIT_REMOTE}/atelier/raw/master/\1\),g' \
		-e 's/\t/    /g' \
		-e "s,\[shimeji\]:.*,\[shimeji\]: {DOC_ROOT}/$shimeji,g"

	# interactive source listing
	prompt="$(whoami)@$(uname -n)"
	command='git meta ls-tree --name-only -r master | xargs ls -lhgG'

	cat <<- EOF
		# Complete source listing
		>**STATISTICS**<br>
		>_Total on-disk size of the current revision is
		$(echo "scale=2; ($(git meta list-files | xargs ls -l \
			| tr -s ' ' '\t' | cut -f5 | paste -s -d '+')) / 1024" | bc)KiB
		out of a total compressed git history size of
		$(git meta count-objects -vH | fgrep 'size-pack' \
			| tr -s ' :' '\t' | cut -f2)KiB._

	EOF
	printf '%s' '<pre><code>'
	printf '%s:%s %s\n' \
		"<span class=\"term-prompt\">$prompt</span>" \
		'<span class="term-dir">~</span>$' \
		"$command"

	# req'd for use of pipes within a variable expansion
	# omit on-disk mtimes in actual ls command
	sh -c "$command --time-style='+'" | while read -r line; do
		case "$line" in
			l*) # skip symlinks
				echo "$line";;
			*)
				path="${line##* }"
				printf '%s' "mtime/revision tally for '$path'" 1>&2

				# escape kagami's *.md => *.htm URL rewrites
				unset esc_path
				case "$path" in
					*.md) esc_path="${path%.*}&period;md";;
				esac

				# rwx---	bytes	mtime	rev-count	raw-link
				printf "%s %s rev. %-${#ver}d %s\n" \
					"${line%%$path}" \
					"$(git meta log -1 \
						--date='format:%b %_d %Y %H:%M' --format='%ad' -- $path)" \
					"$(git meta log --follow --oneline $path | wc -l)" \
					"<a href=\"$D_RAW/${esc_path:-$path}\">${esc_path:-$path}</a>"
				printf '\r\33[K' 1>&2
		esac
	done
	echo '</code></pre>'
	echo "<!-- created $(git meta log --date=short --format='%ad' -- readme.md | tail -n 1) -->"
	echo "<!-- updated $(git meta log -1 --date=short --format='%ad') -->"
} > "$DOC_ROOT/.src/notes/dotfiles.md"
