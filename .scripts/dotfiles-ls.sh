#!/usr/bin/env sh

# re-render ~/readme.md for use as a webpage
# spit out complete listing of dotfiles with inline links
RAW='https://raw.githubusercontent.com/microsounds/atelier/master'
ver="$(git meta rev-list HEAD | wc -l)" # revision count
hash="$(git meta rev-parse --short HEAD)"
mesg="$(git meta log -1 --format=%s)"

{	# document header
	cat <<- EOF
		# Selected documentation and usage notes for my dotfiles
		**Revision No. $ver, commit \`$hash\`.**

		**"$mesg"**

		{TOC}

		This document and repository is also available at
		[\`{AUTHOR}/atelier\`]({GIT_REMOTE}/atelier) on Github.

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
