#!/usr/bin/env sh

# re-render ~/readme.md for use as a webpage
# spit out complete listing of dotfiles with inline links

RAW='https://raw.githubusercontent.com/microsounds/atelier/master'

{	echo '# Selected documentation and usage notes for my dotfiles'
	echo 'This document is also available at [`{AUTHOR}/atelier`]({GIT_REMOTE}/atelier) on Github.'
	echo '\nLast updated {CREATED}.'

	# rewrite relative markdown links
	cat ~/readme.md | sed -E 's,\]\(([^http].*)\),\]\({GIT_REMOTE}/atelier/blob/master/\1\),g'
	echo '# Complete source listing'
	echo '<pre><code>'
	cd ~
	git meta ls-tree --name-only -r master | xargs ls -hgnG --time-style='+'| while read -r line; do
		path="${line##* }"
		case "$path" in
			..*)
				echo "$line";;
			*)
				printf '%s %s %s\n' \
					"${line%%$path}" \
					"$(git meta log -1 --date=iso --format='%ad' -- $path)" \
					"<a href=\"$RAW/$path\">$path</a>"
		esac
	done
	echo '</code></pre>'
	echo "<!-- updated $(git meta log -1 --date=short --format='%ad') -->"
} > "$DOC_ROOT/.src/notes/dotfiles.md"
