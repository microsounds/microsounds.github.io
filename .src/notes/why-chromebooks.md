<!-- written 2024/1/1 -->

# Friendship ended with Thinkpad, now Chromebook (w/ Coreboot) is my best friend
Posted on {CREATED}.

In this article, I go over my personal philosophy in choosing a general purpose laptop computer for everyday use,
and why that computer should be an _inexpensive, readily available, and effectively disposable_ `x86_64` **Chromebook**
that you reflashed into a **normal computer** by pressing 3 keys, disconnecting the battery, and running one (1) shell script.

_You can [click here](#Turning-your-Chromebook-into-a-normal-UEFI-laptop) to skip over my gushy minimalist opinions on laptops._

<figure class="aside left">
	<p><img alt="chromebook" src="assets/chromebook.jpg" /></p>
	<figcaption>Samsung Chromebook 4 (2019), and yes, the keyboard is already seeing ABS shine!</figcaption>
</figure>

## Laptops should NOT have moving parts
Many personal sites similar to mine like to prominently list the author's computing setup, complete with model numbers and performance specs.
Maybe they didn't know what to write about and thought listing their used Thinkpad full of aftermarket parts would interest some people,
I can commend anyone who can stick with a laptop long enough to blog about it, but I can't really relate.
Maybe you can attribute it to my minimalist computer zealotry, but from 2008 to 2019, my only computing devices were low end laptops, later replaced with used mid-specced Thinkpads.

They also had a habit of becoming functionally useless as a laptop within 12 to 16 months of use.
Price was never really an issue, it became very clear from this long list of e-waste that laptops from every market segment were all built as disposable commodity trash not meant to last beyond the warranty period.

My miserable pile of e-waste, from 2008 to 2019:
* 2008 **Acer Aspire 4720z**, has a dead battery and dim yellowing CCFL display, rusted itself inside out.
* 2009 **Acer Aspire 5810tz**, has a cracked LED display, and also dead battery probably.
* 2009 **Acer Aspire One D255** netbook, also rusted itself inside out, some chiclet keys broke in half.
* 2004 **IBM Thinkpad T41**, lifting from the wrong corner bent the mobo and produced BGA hairline cracks in the integrated gfx.
	* _This one pained me the most, my only ever SXGA+ 4:3 laptop, I tried to salvage this one for months by stuffing cardboard between the mobo and keyboard, but it was getting sad._
* 2009 **Lenovo Thinkpad T400**, sudden fan death, overheated, blew some microfuses, nuked the CCFL inverter and will no longer boot.
	* _Probably my fault, I blocked the cooling fans using it in bed, still shouldn't have happened so fast though._
* Another **2009 Lenovo Thinkpad T400**, because I liked it a lot, took better care of it but batteries still died and CCFL screen still yellowed.
* 2008 **Lenovo Thinkpad X200**, extremely loud fan grinding noises, fan died, replacement fans did not work, motherboard issues to blame, also battery died.
	* _BIOS would throw `Fan error` unless I used compressed air to spin the fans at boot._
	* _Still used it for months with no active cooling and watched my CPU temps so it wouldn't shut off at 212°F_.
* 2017 **HP Stream 11**, soldered eMMC died 11 months into 1 year warranty, battery inflated and died 2 months later.
* 2011 **Lenovo Thinkpad X230**, 10 minute battery, only one on this list that isn't fried or inoperable yet, only because it was barely used.

I still have every single one, they sit in a storage tote somewhere, the rubber materials off-gassing, leaking plasticizer and turning to brittle, sticky goo.
Thinkpad HDD rubber rails are [infamous for releasing toxic gas](https://archive.ph/rJuTE), the 18650 battery cells are probably waiting to rupture and leak electrolyte any day now.

I can't name anything that falls apart faster than a laptop does, deterioration only accelerates when you stop looking at them, it's like they yearn to return to the Earth.
Laptop fans will eventually fail, any mobile chipset capable of overheating and causing thermal damage to itself will inevitably do so.

Aside from the unavoidable stuff like hinges and battery chemistry, **laptops should NOT have moving parts**.

## Laptops are disposable trash and you should stop caring
When you make peace with all laptops being disposable trash,
it enables you as careless as you want with your devices, you can throw them around, you can beat them up, take them anywhere, just one less thing to worry about.

Since this applies at all price points, it made me content with _buying the cheapest thing available_ and progressively lowering my hardware requirements to compensate.
* If you buy a model with a _passively cooled chipset_, you no longer have to worry about it overheating.
* If you buy a model that cost you _pocket change_, you don't even have to worry about having to replace it.

Somewhere along the way in the PC market's multi-decade race to the bottom, it accidentally laid the framework for the ideal laptop.
It was sometime in 2016, when even the most inexpensive x86 laptops available started offering advantages that could make you overlook all their flaws.

Entry-level Chromebooks and budget 11.6" laptops, modern day expressions of [Netbooks](https://en.wikipedia.org/wiki/Netbook) introduced just 10 years prior, were now all shipping with:
* 14nm 1.1GHz dual core CPUs drawing 6W at full load
* 1366x768 displays _(they're ok)_
* 4GB of ram, soldered
* 16GB of internal eMMC storage, also soldered
* The least amount of hardware acceleration required to render a webpage
* But most important of all, ***zero moving parts***, _it's passively cooled!_

In exchange for those anemic, passively cooled specs, they provided 10+ hours of battery life on a 40Wh cell.
Pair it with a 74Wh USB power bank _(typically 20,000mAh @ 3.7V)_, and you could carry another 18.5 hours of battery life.

You will never find a more unresponsive and miserable out of the box experience.
Have you ever seen a Windows Celeron-based laptop
[run out of disk space](https://answers.microsoft.com/en-us/windows/forum/all/all-windows-10-devices-with-16-gb-emmc-as-c-drive/1af1355c-dbf6-4d04-9248-8dc274729f8e)
during it's first Windows Update?

Of course, they ran like hot garbage when used with the preloaded OS, but they could be <span class="blink">made to fly</span> if your choice of OS and desktop environment were [minimal enough]({DOC_ROOT}/notes/dotfiles.md "like mine").
Their performance has [only improved with time](https://www.cpubenchmark.net/compare/2762vs2907vs3239vs3683vs5157),
I assert that a sub-$120 Gemini Lake Chromebook released in 2019 is good enough to run any
[non-gaming related task](https://www.youtube.com/watch?v=cTuSXC4ZAxo "genshin lol") you could be doing outside on a laptop.[^gaming]

[^gaming]: While I don't suggest getting a Chromebook for gaming, it's not the worst idea.

	If you're willing to cut your battery life from from 10 hours to 3, you can get ***Minecraft Java Edition*** to run at a stable 60fps on a Gemini Lake Chromebook using the rendering optimization mods [Sodium](https://modrinth.com/mod/sodium), [Lithium](https://modrinth.com/mod/lithium) and optionally [FerriteCore](https://modrinth.com/mod/ferrite-core).
	If you're still worried about battery life while gaming, you can just lock the framerate to 30fps and get 6 hours on a full charge.

	I would record footage demonstrating this, but I can't maintain this framerate while also capturing the X display.

If you feel like spending more, you get more contemporary features like convertible 360° swiveling, touchscreens, fingerprint sensors and pen tablet displays.

The inherent value provided by cheaply produced trash now far exceeds that of it's physical longevity or build quality.

There are now industries dedicated to selling refurbished Chromebooks used in education because schools churn through so many,
Google's [update sunset policy](https://support.google.com/chrome/a/answer/6220366)
basically guarantees a [flood of refurbished Chromebooks](https://pirg.org/edfund/resources/chromebook-churn-report-highlights-problems-of-short-lived-laptops-in-schools/)
getting liquidated for the [cost of shipping](https://www.ebay.com/sch/i.html?_nkw=chromebook&_sacat=0&LH_BIN=1&_sop=15) before they hit the landfill.

Even brand new ones can go below $100 during [certain post-Thanksgiving sales](https://blackfridayarchive.com/Ad/WalMart/2021) every year,
just make sure it comes with _USB-C PD_ and a microSD card slot.

For those reasons and more, I only buy ~~disposable trash~~ cheap Chromebooks now.<br />
My performance requirements aren't very high, 4GB of RAM is enough to the point where I never need swap, and the absolute performance floor in laptops far exceeded my needs sometime in 2016.
I invite you to re-examine how much computing power you actually need, and learn to decouple the abstract fruits of computing from the mass produced ~~trash~~ physical husks that bore them.

If you're wondering why I'm not recommending standard UEFI "cloud" or "value" laptops that come preloaded with _Windows 11S_,
they tend to cost more for the same features and level of performance, I'm not about to start paying the
[Windows tax](https://en.wikipedia.org/wiki/Bundling_of_Microsoft_Windows#The_%22Windows_tax%22) again.

## Chromebooks are uncool, and likely always will be
You can take this however you like, but Chromebooks are uncool, installing Linux on one will be very unlikely to give you any kind of trendy "hacker" cred now, or in the future.

Any time I suggest a used Chromebook to anyone, they reflexively think I want to subject them to using ChromeOS, and tell me off as such.
Their marketing isn't helpful either,
they're touted as a platform [completely unrelated to PCs](https://www.youtube.com/watch?v=Nk8mp4gqEMQ), _"the web, in a computer-shaped object"_, a literal web appliance.

Almost paradoxically, Chromebook hardware is more open than any smartphone or contemporary laptop today.
Having an open source UEFI bootloader and embedded controller (EC) already puts well above most devices for providing a truly rare example of FOSS computing that respects most of your
[software freedoms](https://www.gnu.org/philosophy/free-sw.en.html) at the firmware level.

Does that really mean something to the end user? Probably not, but it's a bountiful gift to anyone trying to keep e-waste out of landfills.
It also gives you """""hacker"""""""" cred. Previously, this distinction was held by a few models like RMS's MIPS-based [Lemote Yeeloong](https://stallman.org/stallman-computing.html#:~:text=Lemote%20Yeeloong)
netbook and several aging Thinkpad models such as the X200, T400s and X60 that now command high prices because simply having Libreboot compatibility was enough to make them collectibles.

"Liberating" a Thinkpad with a FOSS bootloader requires external chip programming tools to flash Libreboot, Chromebooks don't even need special tools to liberate.

Do I want refurbished corebooted Chromebooks to become cool?<br />
Not really, I remember a time when Thinkpads were actually _disposably cheap_.
All you need is some YouTuber with a large audience making a video with the right framing directing the public to your _infinite money-saving glitch_ and you can kiss it goodbye.
It's also really unlikely, most people are only interested in running _Windows_ and 16GB of storage is barely enough for that.

## Turning your Chromebook into a normal UEFI laptop

Resources for liberating your Chromebook has been documented at length elsewhere, so I won't repeat them here:
* [Chrultrabook Docs](https://chrultrabook.github.io/docs/)
	* _Through guide on installing Windows, MacOS or Linux on Chromebook hardware._
* [List of Supported Chromebooks](https://chrultrabook.github.io/docs/docs/firmware/supported-devices.html)
	* _Nearly all x86-based Chromebooks are supported, you should still check before buying though._
* [MrChromebox firmware](https://mrchromebox.tech/)
	* _Firmware documentation from the developers, much of this is included in Chrultrabook Docs though._
* [37C3: Turning Chromebooks into regular laptops](https://media.ccc.de/v/37c3-11929-turning_chromebooks_into_regular_laptops)
	* _(38 min) Chrultrabook devs presenting at 37th Chaos Communication Congress on 12/28/2023._

But in short, the process is really simple:
1. Press `Esc + Refresh + Power` to enter Developer Mode.
2. Open up the back and disconnect the battery from the motherboard to disable the _write-protect_ on the firmware chip.
	* _Models that predate the CR50 embedded controller (EC) used a write-protect screw._
3. Boot up while on AC power, enter `tty2` with `Ctrl + Alt + F2`, `curl` and run MrChromebox's [Firmware Utility Script](https://mrchromebox.tech/#fwscript).
4. Afterwards, install your OS normally using regular install media, your warranty is probably void at this point.

And you're done. You didn't have to spend a single second using ChromeOS.

## What about the keyboard, though?

<figure class="aside left">
	<p><img width="400" alt="chromebook-layout" src="assets/chromebook-layout.png" /></p>
	<figcaption>It's like a 60% keyboard, but actually good.</figcaption>
</figure>

Some people may object to the standard 74-key US ANSI-esque Chromebook layout, how could they possibly become comfortable with a keyboard that lacks all function, nav cluster keys and even the super key?
Remap them however you like.

There's no shortage of ways to do this on Linux systems,
I used `xkb` in the past but I won't [pretend to understand]({GIT_REMOTE}/atelier/blob/e2fa617/.config/xkb/chromebook.xkb) how it works anymore and so now I use [`rvaiya/keyd`](https://github.com/rvaiya/keyd) because it's just [easier to define]({GIT_REMOTE}/atelier/blob/master/.config/keyd/chromebook.conf) keyboard layers.

It's also kernel based, so it works outside of X sessions, including the virtual console, it effectively replaces `xmodmap`, `loadkeys` or whatever you were using before.

### Super key
The `Search` key that takes the place of `Caps Lock` serves as the `Super_L` key internally in the embedded controller, you don't need to configure this.
I actually came to like this placement so much that now I set `Caps Lock` to `Super` on all my machines.

### F1〜F10
On pre-EC Chromebooks, the top row of media keys send F1-F10 internally, newer ones send media key scancodes, and need to be remapped.
As I was grappling with this fact, I found you can change virtual consoles without access to the function row using `chvt 2` to switch to `tty2`.

### Nav Cluster keys
I found it the most convenient to create a keyboard modifier layer using `Right Alt + arrow keys` to produce `PgUp/PgDn/Home/End`.
You press `Right Alt` with your right index finger, and press the arrow keys with the right ring finger.

I don't even think about it at all, so it's quite intuitive once you get used to it.
Some people prefer `Left Ctrl` or even `Super`, you can experiment with whatever won't conflict with your window manager or give you carpal tunnel.

### Delete/F11
By default, the power key on the top-right will power off the device, set `HandlePowerKey=ignore` in `/etc/systemd/logind.conf` on `systemd` based distros to disable this.

Even though it takes the place of `F11`, I just use `Delete` more.
You can still configure it to send `F11` when holding down the `Right Alt`.
If you really need `F11` more, you can set `Right Alt + Backspace` to produce `Delete`, which I also use interchangeably with the other `Delete` key.

### F12 and beyond
I actually don't use `F12` for anything, so I didn't bother, you can set this to whatever you want.
`Right Alt + number row` could be used to reach up to `F21` if that's what you really wanted to.
