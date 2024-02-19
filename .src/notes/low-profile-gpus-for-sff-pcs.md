<!-- created 2020/10/22 -->
<!-- updated 2024/2/19 -->
# List of low profile GPUs for small form factor PCs (SFFs)
Last updated {UPDATED}.

![img](assets/low_profile_gpu.jpg)

Most GPU marketing materials will use the term **LP** or **"low profile"** to refer to graphics cards that are half the height of a normal GPU, not full-height short-length GPUs meant for Mini-ITX cases.
As far as discrete graphics go, these are the most space and energy-efficient GPUs that money can buy, ideal for use in space-saving PCs, small form factor PCs (SFFs), home theater PCs (HTPCs), slimline cases, specialty server hardware, and other niche form-factors where size and/or power is a constraining factor.
Low profile PCIe cards with power requirements below 75W can be powered from the PCIe slot alone and do not require require additional PSU power connections.

{TOC}

***This is a reference list of common, rare and/or discontinued low profile 75W PCIe GPUs up to 2 slots wide introduced since 2013.***
Cards older than this are most likely worse than your onboard graphics.
_Cards older than **2014** may have their driver support discontinued by the vendor, check compatibility with your operating system before purchasing._
<hr/>

## Notes on upgrading an existing prebuilt desktop PC
> **NOTE**<br/>
> _This was written before September 2020, this may no longer be the appealing entry-level gaming PC route it once was._

Some people might find it appealing to drop a 75W GPU into an existing prebuilt desktop PC to make an entry-level gaming PC, as these can have difficult to swap proprietary PSUs and no additional power cables for expansion cards.

If you do decide to go this route, be aware that ***low-end prebuilt desktops may have inadequate motherboard voltage regulation and can exhibit performance throttling*** due to aggressive cost-cutting decisions made by the OEM. Bad VRMs and inadequate power supplied to the motherboard can turn your CPU into a bottleneck when it proves unable to sustain your CPU's intended boost clock speeds.
You may very well not be satisfied with the performance gains compared to published benchmarks running on unencumbered hardware.

You might also find that some SFF prebuilts have less than ideal PCIe placement.
In the case of many late model [Dell Optiplex SFFs][5], they come outfitted with 2 PCIe 2.0 slots, with the larger 16x slot rammed against the power supply, unable to accommodate most modern cards which are 2 slots at the bare minimum.
In this case, you'd have to run a 2-slot 16x card in the much smaller 4x PCIe slot and accept a performance loss of at least 10% on a GTX 1050/1650, potentially more on more powerful cards.

***If you intend to run a [hackintosh][1] system or you refuse to use non-free graphics drivers on GNU/Linux, then your only real options are AMD cards and you will have to live with a slightly worse price-to-performance ratio compared to existing Nvidia low profile cards.***

## A dying breed of graphics card?
Low-profile card launches regularly go unannounced, they are not well promoted because they've historically represented a terrible value proposition for the companies making them.

In the last several years, manufacturers have had little incentive to make "budget", or "low-end" iterations of their latest GPU architectures because they have no problem finding a market for their high end products,

Due to an unprecedented quadruple-threat from gamers, ~~AI-generated erotic artwork~~ _"data science"_ enthusiasts, data centers and crypto mining operations alike, manufacturers have been unable to keep their products in stock with their silicon fabs operating at full throttle. With such ideal market conditions, why bother introducing budget cards?
More people are willing to buy low-end binned GPU dies soldered to a gaming laptop than a sub-$250 USD discrete GPU for their existing hardware.

As such, nearly every card on this list is discontinued, some models and configurations may be limited to specific markets.

You might still be able to find new-old stock online or where you live, if you want to take your chances with a used mining GPU, I don't recommend it, but feel free.

In order to illustrate that many users can potentially avoid having to buy a discrete GPU at all, several recent AMD <span class="highlight">integrated GPU chipsets</span> are included for comparison.
This list also includes workstation cards for completeness.
They tend to offer a much worse price-to-performance ratio compared to cards meant for gaming.
If you're not looking to drive 4x DisplayPort monitors with a single card, and you are not desperate, don't bother, as they have no other ports.

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
| AMD Radeon R7 250 | 2013 | 75W | 1106 | |
| AMD Radeon R7 430 | 2017 | _N/A_ | 1102 | OEM only. |
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
| Nvidia T400 | 2021 | _N/A_ | 3651 | Workstation card. |
| AMD Radeon Pro WX 4100 | 2017 | 50W | 3730 | Workstation card. |
| Nvidia Quadro P1000 | 2017 | 47W | 4439 | Workstation card. |
| Nvidia T600 | 2021 | _N/A_ | 6505 | Workstation card. |
| Nvidia Quadro T1000 | 2019 | _N/A_ | 6533 | Workstation card. |
| AMD Radeon RX 6400 | 2022 | 53W | 6906 | Available in single/dual slot. |

# 2-slot Low Profile under 75W
These run hot and have heatsink/fan assemblies that are 2 PCIe slots wide.

| Name | Released | TDP | PassMark G3D Score | Remarks |
| :-- | :--: | :--: |:--: | :-- |
| AMD Radeon RX 560 | 2017 | 75W | 3604 | Available from MSI, VisionTek (workstation 1-slot card) |
| Nvidia GeForce GTX 750 Ti | 2014 | 60W | 3910 | MQX made a low profile single-slot version. |
| AMD Radeon RX 460 | 2016 | 75W | 4121 | Available from MSI. |
| Nvidia GeForce GTX 1630 | 2022 | 75W | 4927 | A "display adaptor" """"successor""""" to GT 1030. |
| Intel Arc A380 | 2022 | 75W | 5091 | **Requires CPU with [Resizeable BAR][6]**, available on AMD Ryzen 3xxx or Intel Core 10th gen or higher. |
| Nvidia GeForce GTX 950 | 2015 | 75W | 5357 | Available from GALAX, KUROUTOSHIKOU (玄人志向) for the Japanese market. |
| Nvidia GeForce GTX 1050 Ti | 2016 | 75W | 6301 | ASL made a [1-slot version][3] for the Chinese market. |
| Nvidia GeForce GTX 1650 | 2019 | 75W | 7818 | ASL made a [1-slot version][4] for the Chinese market. |
| Nvidia GeForce RTX 3050 6GB | 2024 | 75W | 10557 | Successor to GTX 1650 LP. |
| Nvidia RTX A2000 | 2021 | 75W | 13825 | Workstation card, 12GB VRAM, most efficient LP card available. |

# 2-slot Low Profile exceeding 75W
> **NOTE**<br/>
> _Consider other form factors if you need this much graphical power, if you don't strictly need an SFF it can be much more economical to opt for cases that fit full-height cards._

These are dual slot low profile and will run very hot on account of requiring external power via PCIe 8-pin connectors.

If your SFF's PSU does not feature PCIe 8-pin connectors, you can draw power from unused SATA power connectors using ***SATA to PCIe 8-pin power adaptors***, but you are also likely to exceed the power limits of your prebuilt's power supply.

Even if your PSU has enough overhead, a 115W card will draw 75W from the PCIe slot and 40W more from PCIe 8-pin---you risk damaging your system if drawing that power from SATA power adaptors as the SATA spec only guarantees 54W and you are most likely already drawing 3W for every connected SATA SSD.

| Name | Released | TDP | PassMark G3D Score | Remarks |
| :-- | :--: | :--: |:--: | :-- |
| Nvidia GeForce RTX 4060 | 2023 | 115W | 19444 | 8GB VRAM, **Requires PCIe 8-pin power.** |

[1]: https://en.wikipedia.org/wiki/Hackintosh
[3]: https://videocardz.net/asl-geforce-gtx-1050-ti-4gb-battle-flag
[4]: https://videocardz.net/asl-geforce-gtx-1650-4gb-war-knife
[5]: https://www.dell.com/support/manuals/en-us/optiplex-9020-desktop/opt9020sffom-v2?guid=guid-f9b65300-4829-4b63-9770-237e6c10dcc7
[6]: https://www.intel.com/content/www/us/en/support/articles/000090831/graphics.html
