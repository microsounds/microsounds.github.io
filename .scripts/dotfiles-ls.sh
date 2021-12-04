#!/usr/bin/env sh

cd ~

# re-render ~/readme.md for use as a webpage
# spit out complete listing of dotfiles with inline links
RAW='https://raw.githubusercontent.com/microsounds/atelier/master'
ver="$(git meta rev-list HEAD | wc -l)" # revision count
hash="$(git meta rev-parse --short HEAD)"
mesg="$(git meta log -1 --format=%s)"

# estimate documentation completeness
# divide length of this doc by number of comment lines in repo
this_doc="$(wc -c < ~/readme.md)"
comments="$(git meta list-files | xargs grep -I --exclude=readme.md '#'| wc -c)"
coverage="$(echo "scale=4; ($this_doc / $comments) * 100" | bc)"
coverage="${coverage%??}%"
{	# document header
	cat <<- EOF
		# Selected documentation and usage notes for my dotfiles
		**Revision No. $ver, commit \`$hash\`.**

		**"$mesg"**

		{TOC}

		This document, which currently covers about **$coverage** of all
		implemented features and behavior in this repository, is also mirrored
		at [\`{AUTHOR}/atelier\`]({GIT_REMOTE}/atelier) on GitHub.

		Last updated {CREATED}.
	EOF

	# rewrite relative markdown links
	# replace tabs with 4-space indents
	cat ~/readme.md | sed -E \
		-e 's,\]\(([^http].*)\),\]\({GIT_REMOTE}/atelier/blob/master/\1\),g' \
		-e 's/\t/    /g'

	# interactive source listing
	prompt="$(whoami)@$(uname -n)"

	echo '# Complete source listing'
	printf '%s' '<pre><code>'
	cd ~
	printf '%s %s\n' \
		"<span class=\"term-prompt\">$prompt</span>:<span class=\"term-dir\">~</span>$" \
		'git meta ls-tree --name-only -r master | xargs ls -lhgG'
	git meta ls-tree --name-only -r master \
		| xargs ls -lhgG --time-style='+' | while read -r line; do
		case "$line" in
			l*) # skip symlinks
				echo "$line";;
			*)
				path="${line##* }"
				printf "%s %s rev. %-${#ver}d %s\n" \
					"${line%%$path}" \
					"$(git meta log -1 --date='format:%b %_d %Y %H:%M' --format='%ad' -- $path)" \
					"$(git meta log --follow --oneline $path | wc -l)" \
					"<a href=\"$RAW/$path\">$path</a>"
		esac
	done
	echo '</code></pre>'
	echo "<!-- updated $(git meta log -1 --date=short --format='%ad') -->"
} > "$DOC_ROOT/.src/notes/dotfiles.md"
