#!/usr/bin/env sh

cd ~

# re-renders ~/readme.md for use as a standalone webpage
# spit out complete listing of dotfiles with inline links
RAW='https://raw.githubusercontent.com/microsounds/atelier/master'
ver="$(git meta rev-list HEAD | wc -l)" # revision count
hash="$(git meta rev-parse --short HEAD)"
mesg="$(git meta log -1 --format=%s)"

# estimated documentation completeness
# this document is about 5x more verbose than my comments
# divide size of document in bytes by 5 and it should be comparable
# to the size of all comments found in this repo, in bytes
v_factor=5
this_doc="$(wc -c < ~/readme.md)"
comments="$(git meta list-files | xargs grep -I --exclude=readme.md '#' | sed -E 's/.*(#.*)/\1/g' | wc -c)"
coverage="$(echo "scale=4; (($this_doc / $v_factor) / $comments) * 100" | bc)"
coverage="${coverage%??}%"

{	# document header
	cat <<- EOF
		# Selected documentation and usage notes for my dotfiles
		**Revision No. $ver, commit \`$hash\`.**

		**"$mesg"**

		{TOC}

		The verbosity factor of this document compared to comment lines of code
		in this repo is about **${v_factor}:1**.

		If this document is *$((this_doc / 1024))KiB*, and the size of all
		comment lines of code is approximately *$((comments / 1024))KiB*,
		then this document currently covers about **$coverage** of all
		implemented features and behavior in this repository.

		This document and repository is also mirrored at
		[\`{AUTHOR}/atelier\`]({GIT_REMOTE}/atelier) on GitHub.

		Last updated {CREATED}.

	EOF

	# pick a random shimeji
	shimeji="$(find $DOC_ROOT/static/shimemiku -type f | shuf | head -n 1)"
	shimeji="${shimeji#$DOC_ROOT/}"

	# rewrite relative markdown links
	# replace tabs with 4-space indents
	# replace inline shimeji with a random one
	cat ~/readme.md | sed -E \
		-e 's,\]\(([^http].*)\),\]\({GIT_REMOTE}/atelier/blob/master/\1\),g' \
		-e 's/\t/    /g' \
		-e "s,\[shimeji\]:.*,\[shimeji\]: {DOC_ROOT}/$shimeji,g"

	# interactive source listing
	prompt="$(whoami)@$(uname -n)"

	echo '# Complete source listing'
	printf '%s' '<pre><code>'
	printf '%s %s\n' \
		"<span class=\"term-prompt\">$prompt</span>:<span class=\"term-dir\">~</span>$" \
		'git meta ls-tree --name-only -r master | xargs ls -lhgG'
	git meta ls-tree --name-only -r master \
		| xargs ls -lhgG --time-style='+' | while read -r line; do
		case "$line" in
			l*) # skip symlinks
				echo "$line";;
			*)
				printf '%s' "mtime/revision tally for '$path'" 1>&2
				path="${line##* }"
				printf "%s %s rev. %-${#ver}d %s\n" \
					"${line%%$path}" \
					"$(git meta log -1 --date='format:%b %_d %Y %H:%M' --format='%ad' -- $path)" \
					"$(git meta log --follow --oneline $path | wc -l)" \
					"<a href=\"$RAW/$path\">$path</a>"
				printf '\r\e[K' 1>&2
		esac
	done
	echo '</code></pre>'
	echo "<!-- updated $(git meta log -1 --date=short --format='%ad') -->"
} > "$DOC_ROOT/.src/notes/dotfiles.md"
