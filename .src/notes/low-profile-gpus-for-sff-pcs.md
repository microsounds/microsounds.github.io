<!-- created 2020/10/22 -->
<!-- updated 2025/4/23 -->
# List of low profile GPUs for small form factor PCs (SFFs)
Last updated {UPDATED}.

![img](assets/low_profile_gpu.jpg)

Most GPU marketing materials will use the term **LP** or **"low profile"** to refer to graphics cards that are **69mm**, or half the height of a normal GPU, not full-height short-length GPUs meant for Mini-ITX cases.
As far as discrete graphics go, these are the most space and energy-efficient GPUs available today, ideal for use in space-saving PCs, small form factor PCs (SFFs), home theater PCs (HTPCs), slimline cases, specialty server hardware, converting a used office PC into a budget game console, and other niche applications where size and power draw are constraining factors.
Low profile PCIe cards with power draw requirements below 75W can be powered from the PCIe slot alone and do not require additional PSU power connectors.

Advancements in GPU computing since 2020 have prioritized higher power draw to make larger generational leaps in graphical power, sub-75W cards will soon become a relic of the past as low profile cards with 6/8-pin PCIe power connectors become more common and, in the near future, will become your only option for meaningful performance uplift in a small form factor build.
{TOC}

***This is a reference list of common, rare and/or discontinued low profile 75W PCIe GPUs up to 2 slots wide introduced since 2013.***
Recommended cards are highlighted in **bold**, cards older than 2013 will be worse than your onboard graphics.
_Cards older than **2014** may have their driver support discontinued by the vendor, check compatibility with your operating system before purchasing._

<hr/>
<hr/>

## Notes on upgrading an existing prebuilt desktop PC

![img](assets/optiplex-9020-sff3.jpg)

Some people might find it appealing to drop in a 75W GPU into an existing prebuilt desktop PC to make an entry-level gaming PC, as these often have proprietary power supplies with no additional PCIe cables for expansion cards.

### Voltage throttling
If you do decide to go this route, be aware of the limitations of pre-built OEM motherboards, their BIOS settings often inhibit or prevent customization such as undervolting, fan curve editing, and can often throw startup errors when swapping out OEM equipment such as case fans.

If you decide to swap out the stock PSU for a standard ATX-compliant model, you may also experience inadequate or non-standard voltage regulation issues which can lead to performance throttling.
Things like your CPU not being able to maintain boost clocks, or your motherboard being unable to maintain a solid 75W to the PCIe connector leading to GPU never reaching boost clocks can be the result of your stock PSU being designed for your specific motherboard and providing non-standard voltages at certain pins which ATX PSUs aren't designed to do.

You may very well not be satisfied with the performance gains compared to published benchmarks running on enthusiast-grade hardware.

### PCIe lane cost-cutting
You might also find that some SFF prebuilts have less than ideal PCIe placement.
In the case of many late model [Dell Optiplex SFFs][5], they come outfitted with 2 PCIe slots, with the larger 3.0 16x slot rammed against the power supply, unable to accommodate most modern cards which are 2 slots at the bare minimum.
In this case, you'd have to run a 2-slot 16x card in the much smaller 2.0 4x PCIe slot and accept a performance loss of at least 10% on a GTX 1050ti/1650, potentially more on more powerful cards, your performance will depend on how hard you saturate the PCIe bus.

### Non-free graphics drivers
If you intend to run a [hackintosh][1] system or you refuse to use non-free graphics drivers on GNU/Linux, then your options are AMD and Intel Arc.

Intel Arc cards **require** motherboard platforms with [***Resizable BAR***][6], you will see substantial performance bottlenecks on systems older than 3rd gen AMD Ryzen or 10th gen Intel Core.

AMD's low profile cards have substantially worse price/performance than Nvidia options, the RX 6400 for example, is comparable to a GTX 1050ti yet lacks a hardware video encoder for streaming or video editing, for the time being, please don't pick AMD for low profile builds trying to chase FOSS zealotry.

### Space constraints
![img](assets/gigabyte-rtx-4060-length.jpg)
You should also be mindful of available space in your SFF case, low profile RTX 4060s (and possibly later cards) are much longer than the standard low profile length of **167mm**.

Both the Gigabyte and GALAX low profile versions of the RTX 4060 are **182mm** at their longest point, the Gigabyte version has a **182mm** fan shroud with a 167mm PCB behind it, allowing for a recessed PCIe plug.
ASUS's version has a much longer **188mm** fan shroud and PCB that would very likely not fit in the application above without mods, measure twice and click buy only once!

## A dying breed of graphics card?
Low-profile card are often launched to little fanfare and are quietly announced halfway through the lifecycle of a particular graphics card, they don't represent a very profitable slice of the market for the companies still making them.

The entry-level price/performance floor on dGPUs have stayed roughly the same since 2019, it's stagnated so much that integrated graphics dies on AI-focused Ryzen APUs _(Ryzen AI Max+ series)_ have comparable performance to an RTX 4060, and will likely be a competitive option for entry-level gaming in the near future instead of putting a discrete GPU into a used office PC.

In order to illustrate that many users can avoid having to buy a low profile GPU at all, the integrated graphics on many recent AMD APUs are <span class="highlight">highlighted</span> below for comparison.
This list also includes workstation cards for completeness.
They tend to offer a much worse price-to-performance ratio compared to cards meant for gaming, customers of workstation cards expect world-class customer support and it comes rolled into the price.

# 1-slot Low Profile under 75W
These can be passively cooled or have a narrow heatsink/fan, requiring only 1 PCIe slot.

| Name | Released | TDP | PassMark G3D Score | Remarks |
| :-- | :--: | :--: |:--: | :-- |
| Nvidia GeForce 210 | 2009 | 26W | 98 | ~~Still sold new~~, worse than integrated. |
| AMD Radeon HD 8490 | 2014 | 35W | 263 | OEM only. |
| Nvidia GeForce GT 610 | 2012 | 29W | 302 | |
| AMD Radeon R5 240 | 2014 | 50W | 519 | OEM only. |
| Nvidia GeForce GT 710 | 2014 | 25W | 636 | Zotac, Asus, VisionTek made passively cooled versions. |
| <span class="highlight">Intel HD Graphics 4600</span> | 2013 | _N/A_ | 630 | Intel Core i5 Haswell-era integrated graphics. |
| AMD Radeon HD 6670 | 2011 | 66W | 748 | |
| Nvidia GeForce GT 730 | 2014 | 49W | 821 | Zotac made passively cooled versions. |
| Nvidia GeForce GT 635 | 2013 | _N/A_ | 831 | |
| AMD Radeon R7 240 | 2013 | 30W  | 869 | |
| <span class="highlight">AMD Radeon Vega 3</span> | 2018 | _N/A_ | 886 | AMD Athlon APU integrated graphics. |
| AMD Radeon HD 8570 | 2013 | 66W | 984 | OEM only. |
| Nvidia GeForce GT 640 | 2011 | 65W | 1187 | |
| AMD Radeon R7 250 | 2013 | 55W | 1106 | |
| AMD Radeon R7 430 | 2017 | 50W | 1102 | OEM only. |
| Nvidia GeForce GT 1010 | 2021 | 30W | 1208 | Chinese domestic market only, features native VGA with Pascal drivers. |
| Nvidia GeForce GTS 450 | 2011 | 106W | 1319 | 6-pin PCIe, low profile Palit version. |
| <span class="highlight">AMD Radeon Vega 8</span> | 2018 | _N/A_ | 1586 | AMD Ryzen 3 APU integrated graphics. |
| Nvidia Quadro P400 | 2018 | 30W | 1591 | Workstation card. |
| AMD Radeon HD 7750 | 2012 | 55W | 1712 | VisionTek low profile card. |
| AMD Radeon Pro WX 2100 | 2017 | 35W | 1771 | Workstation card. |
| <span class="highlight">AMD Radeon Vega RX 11</span> | 2018 | _N/A_ | 2125 | AMD Ryzen 5 APU integrated graphics. |
| Nvidia GeForce GTX 745 | 2014 | 55W | 2173 | OEM only. |
| AMD Radeon Pro WX 3200 | 2019 | 65W | 2473 | Workstation card. |
| Nvidia GeForce GT 1030 | 2017 | 30W | 2525 | Asus, EVGA, MSI made passively cooled versions. |
| AMD Radeon Pro WX 3100 | 2017 | 50W | 2609 | Workstation card. |
| AMD Radeon RX 550 | 2017 | 50W | 2711 | Yeston, MSI, Sapphire, XFX made low profile versions. |
| Nvidia Quadro K1200 | 2015 | 45W | 2854 | Workstation card. |
| Nvidia GeForce GTX 750 | 2014 | 55W | 3374 | MQX made a low profile single-slot version. |
| Nvidia Quadro P620 | 2018 | 40W | 3616 | Workstation card. |
| Nvidia T400 | 2021 | 30W | 3651 | 2GB VRAM, Workstation card. |
| AMD Radeon Pro WX 4100 | 2017 | 50W | 3730 | Workstation card. |
| Nvidia T400 4GB | 2021 | 30W | 3802 | 4GB VRAM, Workstation card. |
| Nvidia Quadro P1000 | 2017 | 47W | 4439 | Workstation card. |
| Intel Arc Pro A40 | 2023 | 50W | 5222 | Workstation card, 6GB VRAM, **Requires CPU with [Resizeable BAR][6]** |
| Nvidia T600 | 2021 | 40W | 6505 | 4GB VRAM, Workstation card. |
| Nvidia Quadro T1000 | 2019 | 50W | 6533 | Workstation card. |
| **AMD Radeon RX 6400** | 2022 | 53W | 6906 | 1050ti-tier, available in single/dual slot LP. |
| AMD Radeon RX 6500 | 2022 | 55W | 7527 | Single slot LP available from [Zephyr][7]. |
| Nvidia T1000 | 2021 | 50W | 7620 | 4GB VRAM, Workstation card. |
| Nvidia T1000 8GB | 2021 | 50W | 7656 | 8GB VRAM, Workstation card. |

# 2-slot Low Profile under 75W
These run hot and have heatsink/fan assemblies that are 2 PCIe slots wide, you probably don't need more than this if you're hoping for light gaming at 1080p.

| Name | Released | TDP | PassMark G3D Score | Remarks |
| :-- | :--: | :--: |:--: | :-- |
| AMD Radeon RX 560 | 2017 | 75W | 3604 | Available from MSI, VisionTek (workstation 1-slot card) |
| Nvidia GeForce GTX 750ti | 2014 | 60W | 3910 | MQX made a low profile single-slot version. |
| AMD Radeon RX 460 | 2016 | 75W | 4121 | Available from MSI. |
| Nvidia GeForce GTX 1630 | 2022 | 75W | 4927 | A "display adaptor" """"successor""""" to GT 1030. |
| **Intel Arc A310** | 2023 | 30-75W | 5437 | 4GB VRAM, single and OC'd dual slot versions, **Requires CPU with [Resizeable BAR][6]** |
| Intel Arc Pro A50 | 2023 | 75W | 5222 | Workstation card, 6GB VRAM, **Requires CPU with [Resizeable BAR][6]** |
| **Intel Arc A380** | 2022 | 75W | 6239 | 6GB VRAM, **Requires CPU with [Resizeable BAR][6]** |
| Nvidia GeForce GTX 950 | 2015 | 75W | 5357 | Available from GALAX, KUROUTOSHIKOU (玄人志向) for the Japanese market. |
| **Nvidia GeForce GTX 1050ti** | 2016 | 75W | 6301 | Power efficient and enough for pre-2020 games, ASL made a [1-slot version][3] for the Chinese market. |
| **Nvidia GeForce GTX 1650** | 2019 | 75W | 7818 | Successor to GTX 1050ti LP, ASL made a [1-slot version][4] for the Chinese market. |
| **Nvidia GeForce RTX 3050 6GB** | 2024 | 75W | 10557 | Successor to GTX 1650 LP, Intel and AMD have caught up in perf/$. |
| Nvidia RTX A2000 | 2021 | 75W | 13592 | Workstation card, 6GB VRAM. |
| Nvidia RTX A2000 12GB | 2021 | 75W | 13700 | Workstation card, 12GB VRAM. |
| Nvidia RTX 2000 Ada Generation | 2024 | 70W | 17437 | Workstation card, 16GB VRAM, most power efficient LP card available. |

# 2-slot Low Profile exceeding 75W
> **NOTE**<br/>
> _Consider other form factors if you need this much graphical power, if you don't strictly need an SFF it can be much more economical to opt for a build with a used 2-3 year old full-height card._

These are dual slot low profile and will run very hot on account of requiring external power via PCIe 8-pin connectors and are not recommended for use with the stock PSU in your SFF.

If your SFF's PSU does not feature PCIe 6/8-pin connectors, you can draw power from unused SATA power connectors using ***SATA to PCIe power adaptors***, but you are also likely to exceed the power limits of your SATA rails either from the PSU or the power delivery on the motherboard.

Even if your PSU has enough overhead, a 115W card will draw 75W from the PCIe slot and 40W more from PCIe 8-pin---you risk damaging your system if drawing that power from SATA power adaptors as the SATA spec only guarantees 54W per rail and you are most likely already drawing 3W for every connected SATA SSD.

Do yourself a favor and replace the stock PSU in your SFF if you want to go this route, you'll unlock a whole upgrade path and even improve cooling if you opt for a flex ATX model.

| Name | Released | TDP | PassMark G3D Score | Remarks |
| :-- | :--: | :--: |:--: | :-- |
| **Nvidia GeForce RTX 4060** | 2023 | 115W | 19444 | GTX 1080ti performance in a low profile card, 8GB VRAM, **PCIe 6/8-pin power.** |
| <span class="highlight">AMD Ryzen AI Max+ PRO 395</span> | 2025 | N/A | 19000? | AMD Ryzen AI Max+ integrated graphics. |
| Nvidia GeForce RTX 5060 | 2025 | 145W | 21388? | 8GB VRAM GDDR7, **PCIe 8-pin, holy shit what are you DOING** |

[1]: https://en.wikipedia.org/wiki/Hackintosh
[3]: https://videocardz.net/asl-geforce-gtx-1050-ti-4gb-battle-flag
[4]: https://videocardz.net/asl-geforce-gtx-1650-4gb-war-knife
[5]: https://www.dell.com/support/manuals/en-us/optiplex-9020-desktop/opt9020sffom-v2?guid=guid-f9b65300-4829-4b63-9770-237e6c10dcc7
[6]: https://www.intel.com/content/www/us/en/support/articles/000090831/graphics.html
[7]: https://videocardz.com/newz/amd-radeon-rx-6500-non-xt-spotted-features-1024-cores-4gb-64-bit-memory-and-55w-tbp
