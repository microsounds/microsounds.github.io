#!/usr/bin/env sh
# minecraft server uptime and player activity tracker

SERVER='185.228.82.241'
API='https://api.mcsrvstat.us/3'
NOW="$(date -u --rfc-3339='seconds')"

touch leaderboard.tsv activity.tsv
trap 'rm -rvf "$SERVER.json"' 0 1 2 3 6

wget -O - "$API/$SERVER" | jq . > "$SERVER.json"

# player count history
# -1 means offline
player_count="$(jq -r '.players.online' < "$SERVER.json")"
[ "$player_count" = 'null' ] && player_count='-1'
printf '%s\t%s\n' \
	"$NOW" "$player_count" >> activity.tsv

# create graph from last 30 days of activity data
{ cat <<- EOF; cat activity.tsv | sort; } | gnuplot > activity.png
	set terminal png transparent

	set datafile separator "\t"
	set title "/s4scraft/ player count (last 30 days)"
	set grid
	unset key

	set xlabel "time (UTC)"
	set xdata time
	set timefmt "%Y-%m-%d %H:%M:%S"
	set xrange [time(0) - $((60 * 60 * 24 * 30)):time(0)]
	set autoscale x
	set format x "%m/%d\n%H:%M"

	set ylabel "number of players (-1 = server down)"
	set yrange[-1:20]
	set ytics 1
	set xtics rotate by 90 offset 0,-2.3 out nomirror


	plot "-" using 1:2 with lines linewidth 3
EOF
optipng -o7 activity.png


IFS='
'
# active player leaderboard
# shows most active players by how often they're seen online
if [ $player_count -gt 0 ]; then
	jq -r '.players.list[].name' < "$SERVER.json" | while read -r name; do
		count="$(grep "^$name" < leaderboard.tsv | cut -f2)"
		count=$(( count + 1 ))
		if [ $count -gt 1 ]; then
			sed -i "s/$name.*/$name\t$count\t$NOW/" leaderboard.tsv
		else
			printf '%s\t%s\t%s\n' "$name" "$count" "$NOW" >> leaderboard.tsv
		fi
	done
fi

# sort by most active players
{ rm leaderboard.tsv; sort -nk 2 | tac > leaderboard.tsv; } < leaderboard.tsv

# generates leaderboard to embed on page, rewrites timestamps to relative dates
# TODO: make into a pretty rendered HTML table
render_leaderboard() (
	unset IFS
	cat leaderboard.tsv | while read -r name count date; do
		printf "$name\t$count\t"
		[ "$date" = "$NOW" ] && printf '[!!!] Online NOW!' \
			|| dateutils.ddiff "$date" "$NOW" -f "%Y %m %w %d %H %M" | while read -r y mo w d h min; do
			for f in y mo w d h min; do
				eval "[ \$${f} -gt 0 ] && printf '%s%s %s' \$${f} $f ago && break"
			done
		done
		printf '\n'
	done | column -ts '	' | nl
)

# regenerate static webpage
cat <<- EOF | cmark-gfm --unsafe > ../s4scraft.htm
	<!DOCTYPE html>
	<html xmlns="http://www.w3.org/1999/xhtml" lang="en-US" xml:lang="en-US">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="Cache-Control" content="no-cache" />
		<meta http-equiv="Cache-Control" content="no-store" />
		<meta http-equiv="Cache-Control" content="must-revalidate" />
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="0" />
		<meta http-equiv="refresh" content="600" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="shortcut icon" type="image/x-icon" href="/static/sky.ico" />
		<title>/s4scraft/ activity tracker | sentimental µsounds</title>
		<style type="text/css">
		html {
			font-family: "Liberation Sans", "Arial", "Helvetica", sans;
			font-size: 12px;
			line-height: 12px;
			min-height: 100%;
			margin: 0 10px 10px 10px;
			color: maroon;
			background: #FFE url("s4scraft-tracker/fade.png") top center repeat-x;
		}
		img { max-width: 100%; } /* mobile */
		</style>
	</head>

	[![ico](/static/button/badge.png) _Back to homepage_](../)

	<img src="/misc/s4scraft-tracker/s4scraft.png" width="400" align="right" />

	# /s4scraft/ activity tracker
	## Server Address: $SERVER
	Le [s4s] minecraf survival serbur for [s4s] frens.

	Java 1.20.2 and Bedrock (via [GeyserMC](https://geysermc.org/) on port 25565)

	Latest news: [&gt;&gt;&gt;/s4s/s4scraft](https://archive.4plebs.org/s4s/search/subject/s4scraft)

	# 💤 About —
	**Rules**
	* Be nice!
	* No griefing/stealing
	* No hacks/cheats
	* 18+
	* Overall use common sense.

	**Features**
	* Supports both Microsoft and Cracked accounts!
	* No /tp, /home, etc, you'll need to walk!
	* No telemetry :^)
	* Permanent hard difficulty!
	* Includes a death plugin so you don't lose yuore hard earned loot!
	* Custom mob head drops!
	* Map art???

	# ✨ Player Count —
	Server online since Feburary 2024, all times UTC. <p id="offset"></p>

	Last updated <code>$NOW</code>, statistics refreshed every 10 minutes, unless GitHub Actions throttles me again cus I don't wanna pay for a VPS.

	![player_count](s4scraft-tracker/activity.png)

	# 👑 Most Commonly Seen Players —
	Rank, username, times spotted, date last spotted

		$(render_leaderboard)

	Made with Free Software™, [view source code](https://github.com/microsounds/microsounds.github.io/blob/master/misc/s4scraft-tracker/status.sh) for this page.

	<script type="text/javascript">
		var d = new Date()
		var utc_off = -d.getTimezoneOffset() / 60;
		document.getElementById("offset").innerHTML += "Your local time is UTC" + utc_off + '.';
	</script>

	</html>
EOF

