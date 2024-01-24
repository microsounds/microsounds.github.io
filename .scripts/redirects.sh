#!/usr/bin/env sh

# generate static redirects for outdated URLs to avoid link rot
cd "$DOC_ROOT"

# redirect list format: '/old/link.htm	/new/link.htm'
# use literal tab and newline as delimiters
IFS='
	'
while read -r old new; do
	cat <<- EOF > "${old#*/}"
		<!DOCTYPE html>
		<html xmlns="http://www.w3.org/1999/xhtml" lang="en-US" xml:lang="en-US">
		<head>
			<title>Redirect</title>
			<meta http-equiv="refresh" content="10; url=${new}" />
			<link rel="canonical" href="${new}" />
			<link rel="shortcut icon" type="image/x-icon" href="/static/sky.ico" />
		</head>
		<body>
			<img src="/static/button/badge.png" />
			<h1>Please update your bookmarks!</h1>
			<h2>
				This page has been moved to <a href="${new}">${new}</a>,
				you will be redirected in 10 seconds.
			</h2>
			<p>This redirect page will be kept to prevent link rot for now,
				but please update your bookmarks with the new URL.</p>
		</body>
		</html>
	EOF
done <<- EOF
	/notes/on-chromebooks.htm	/notes/chromebooks.htm
EOF
