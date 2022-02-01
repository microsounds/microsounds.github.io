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
		<html>
		<head>
			<title>Redirect</title>
			<meta http-equiv="refresh" content="2; url=${new}"/>
			<link rel="canonical" href="${new}"/>
			<link rel="shortcut icon" type="image/x-icon" href="/static/sky.ico"/>
		</head>
		<body>
			<h1>Please update your bookmarks.</h1>
			<p>This page has moved to <a href="${new}">${new}</a>,
				you will be redirected shortly.</p>
		</body>
		</html>
	EOF
done <<- EOF
EOF
