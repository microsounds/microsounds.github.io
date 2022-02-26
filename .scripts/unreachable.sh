#!/usr/bin/env sh

# long-running script that crawls all files for URLs and outputs unreachable
# links to $DOC_ROOT/.misc, this will catch false positives such as links with
# HTML entities and servers not supporting the HEAD method

! is-container && exit

cd "$DOC_ROOT"
git list-files | xargs egrep -ohI "https?:[^ <>)'\",]*" \
	| sort | uniq | fgrep -v '$' \
	| xargs -P0 wget --method=HEAD --tries=2 --timeout=10 2>&1 \
	| egrep '(http|HTTP)' | egrep -v '^(Location|URL)' \
	| tee /dev/stderr \
	| tac | sed -E '/^HTTP.*(200|301|302)/,+1d' | tac \
	| sed -E  's/^[0-9 :-]+//g' \
> "$DOC_ROOT/.misc/unreachable-urls.txt"
