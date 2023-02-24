#!/usr/bin/env sh

# run only via automated CI/CD
! is-container && exit

# MFC.net has taken to appending a randomly rotating 6 character hex key to all
# their filenames to break my scripts that generate image urls hotlinking to
# their website.
# Fetching the updated keys client-side would be very slow and cross-domain
# XMLHttpRequests are blocked because of CORS policy, so I have to do it
# statically with a cron job.

TARGET="$DOC_ROOT/.src/notes/figures.md"
echo "Scraping current filename keys for MFC figure pics" 1>&2
{
	egrep -o "\[ .* \]," | tr -s "[]\', " '\t' | cut -f2,3 \
		| while read -r id key; do
		# strip leading 'x'
		[ "${id%${id#?}}" = 'x' ] && id="${id#?}"

		# scrape for new filename keys
		new_key="$(wget -qO - https://myfigurecollection.net/item/$id \
			| egrep -o "$id-[a-z0-9]+" | head -n 1)"
		new_key="${new_key#*-}"

		# search and replace keys
		sed "s/'$key'/'$new_key'/g" -i "$TARGET"
		echo "fetching entry $id" "old: $key" "new: $new_key" 1>&2
	done
} < "$TARGET"

