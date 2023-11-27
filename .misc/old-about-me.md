<span class="blink" style="color: #FFFF00;"><em>New!</em></span> ---
If you want to contact me by e-mail, my contact info is below.<br/>
It's not really a puzzle, just remove spaces and newlines and swap the places of every 2 characters like this, `1MUk -> M1kU`, and decode the resultant mess as `base64`, then `gzip`.

<pre><code><span class="term-prompt">{AUTHOR}@{PC_NAME}</span>:<span class="term-dir">~</span>$ cat contact.txt | gzip -c | base64 -w 0 \
&gt;	| sed -E -e 's/(.)(.)/\\\\2\\\\1/g' -e 's/.&#123;4&#125;/&amp; /g' | fold -s
4HIs AAAA AACA 9AVP QhLA yGRC FXiq 5maF Alkp qcmX mJmb CWkm uFnQ xJbp qODS HuJr
b+cl ZKFn fyFl VKKY SxFU Yq5m pymZ pBcZ JAR/ fkH1 AAAA
</code></pre>

<details>
<summary>Click here for a hint if you're stuck.</summary>
<em>Never run unknown or <a href="http://thejh.net/misc/website-terminal-copy-paste">untrusted shell commands</a>
copy-pasted directly from someone's website.</em>
<br/>
<code>wget -qO- {SITE_HOSTNAME} | sed -n '/^4HIs/{N;p}' | tr -d '\\\\n ' | sed -E 's/(.)(.)/\\\\2\\\\1/g' | base64 -d | zcat</code>
</details>

