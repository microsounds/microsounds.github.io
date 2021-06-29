#!/usr/bin/env sh

# spit out markdown list of all my dotfiles
{
	cd ~
	echo '# My dotfiles'
	echo 'This document is also available at [`{AUTHOR}/atelier`]({GIT_REMOTE}/atelier) on Github.'
	cat ~/readme.md
	echo '# Complete listing'
	echo '<pre>'
	git meta ls-tree --name-only -r master | xargs ls -hgnG --time-style='+'| while read -r line; do
		path="${line##* }"
		case "$path" in
			..*)
				echo "$line";;
			*)
				printf '%s %s %s\n' \
					"${line%%$path}" \
					"$(git meta log -1 --date=iso --format="%ad" -- $path)" \
					"<a href=\"https://raw.githubusercontent.com/microsounds/atelier/master/$path\">$path</a>"
		esac
	done
	echo '</pre>'
} > .src/dotfiles.md
