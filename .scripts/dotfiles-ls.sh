#!/usr/bin/env sh

RAW='https://raw.githubusercontent.com/microsounds/atelier/master'

# spit out markdown list of all my dotfiles
{
	echo '# My dotfiles'
	echo 'This document is also available at [`{AUTHOR}/atelier`]({GIT_REMOTE}/atelier) on Github.'
	echo '\nLast updated {CREATED}.'

	cat ~/readme.md | sed -E "s,\(([^http].*)\),({GIT_REMOTE}/atelier/blob/master/\1),g" # rewrite relative links
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
					"$(git meta log -1 --date=iso --format="%ad" -- $path)" \
					"<a href=\"$RAW/$path\">$path</a>"
		esac
	done
	echo '</code></pre>'
	echo "<!-- updated $(date --iso-8601) -->"
} > .src/dotfiles.md
