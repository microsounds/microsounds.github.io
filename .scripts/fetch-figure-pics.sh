#!/usr/bin/env sh

# 2024/11: temporarily disabled because i got github IPs blacklisted from MFC lol
exit 0

# run only via automated CI/CD
! is-container && exit

# MFC.net has taken to appending a randomly rotating 6 character hex key to all
# their filenames to break my scripts that generate image urls hotlinking to
# their website.
# Fetching the updated keys client-side would be very slow and cross-domain
# XMLHttpRequests are blocked because of CORS policy, so I have to do it
# statically with a cron job.

API='https://static.myfigurecollection.net/upload/items/0'
TARGET="$DOC_ROOT/.src/notes/figures.md"

# 2024/07: MFC started blocking GETs from non-browsers
UA_STRING="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 \
(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.2903.63"

# 2025/08: attempt to fake being a web browser
wget_fake() {
	wget -q \
		--header="User-Agent: $UA_STRING" \
		--header='Accept: image/jpeg' \
		--header='Connection: keep-alive' \
		"$@"
}

echo "Scraping current filename keys for MFC figure pics" 1>&2
{
	egrep -o "\[ .* \]," | tr -s "[]\', " '\t' | cut -f2,3 \
		| while read -r id key; do
		# strip leading identifiers
		case "${id%${id#?}}" in [a-z]) id="${id#?}"; esac

		# if current key is bad, scrape for new filename keys and rewrite
		# document in place
		printf 'testing entry %s...\r' "$id"
		if ! wget_fake --method=HEAD "$API/$id-$key.jpg"; then
			unset new_key
			while [ -z "$new_key" ]; do
				new_key="$(wget_fake -qO - https://myfigurecollection.net/item/$id \
					| egrep -o "$id-[a-z0-9]+" | head -n 1)"
				new_key="${new_key#*-}"
			done
			sed "s/'$key'/'$new_key'/g" -i "$TARGET"
			echo "fetching entry $id" "old: $key" "new: $new_key" 1>&2
		fi
	done
} < "$TARGET"

