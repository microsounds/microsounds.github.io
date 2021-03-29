<!--updated 2020/10/22-->
# List of low profile GPUs for small form factor PCs (SFFs)
{CREATED}

![img](assets/low_profile_gpu.jpg)

For our purposes **"low profile"** refers to cards that are half the height of a normal GPU, not full-height short-length GPUs meant for Mini-ITX cases.
Think space-saving PCs, small form factor PCs (SFFs), home theater PCs (HTPCs), slimline cases, specialty server hardware, and other niche form-factors.

***This is a shortlist of common, rare and/or discontinued low profile 75W PCIe GPUs up to 2 slots wide introduced since 2013.***
Cards older than this are most likely worse than your onboard graphics.

PCIe cards with power requirements below 75W can be powered from the PCIe slot alone and don't require additional PSU power.

Most of these cards are older than 3 years old, many are now discontinued.
You might still be able to find new-old stock online or where you live.
Don't be afraid to buy a used card if the price is acceptable, you're not likely to buy a heat-damaged GPU from an overclocking or cryptomining enthusiast as these demographics aren't likely to buy weak SFF cards.

This list also includes workstation cards for completeness.
They tend to offer a worse price-to-performance ratio compared to cards meant for gaming.
If you're not looking to drive 4x DisplayPort monitors with a single card, don't bother.
They have no other ports.

***If you intend to run a [hackintosh][1] system or you refuse to use non-free graphics drivers on GNU/Linux, then your only real options are AMD cards and you will have to live with a worse price-to-performance ratio compared to existing Nvidia low profile cards.***

## A note on "upgrading" prebuilt desktop PCs
Some people might find it appealing to drop a 75W GPU into an existing prebuilt desktop PC to make an entry-level gaming PC, as these can have difficult to swap proprietary PSUs and no additional power cables for expansion cards.

If you do decide to go this route, be aware that ***low-end prebuilt desktops may have inadequate motherboard voltage regulation and can exhibit performance throttling*** due to aggressive cost-cutting decisions made by the OEM. Bad VRMs and inadequate power supplied to the motherboard can turn your CPU into a bottleneck when it proves unable to sustain your CPU's intended boost clock speeds.
You may very well not be satisfied with the performance gains compared to published benchmarks running on unencumbered hardware.


You might also find that some SFF prebuilts have less than ideal PCIe placement.
In the case of many late model [Dell Optiplex SFFs][5], they come outfitted with 2 PCIe 2.0 slots, with the larger 16x slot rammed against other components, unable to accomodate most modern cards which are 2 slots at the bare minimum.
In this case, you'd have to run a 2-slot 16x card in the much smaller 4x PCIe slot and accept a performance loss of roughly 10% on a GTX 1050/1650, potentially more on more powerful cards.


# 1-slot Low Profile under 75W
| Name | Released | PassMark G3D Score | Comments |
| :-- | :--: | :--: | :-- |
| Nvidia GeForce 210 | 2009 | 98 | Still sold new, worse than integrated. |
| AMD Radeon HD 8490 | 2014 | 270 | OEM only. |
| AMD Radeon R5 240 | 2014 | 516 | OEM only. |
| Nvidia GeForce GT 710 | 2014 | 636 | Zotac, Asus, VisionTek make passively cooled versions. |
| _Intel HD Graphics 4600_ | 2013 | 640 | _Haswell-era Intel integrated graphics, for reference._ |
| Nvidia GeForce GT 730 | 2014 | 794 | Zotac makes passively cooled versions. |
| Nvidia GeForce GT 635 | 2013 | 826 | |
| AMD Radeon R7 240 | 2013 | 836 | |
| AMD Radeon HD 8570 | 2013 | 1001 | OEM only. |
| Nvidia GeForce GT 640 | 2011 | 1153 | |
| AMD Radeon R7 250 | 2013 | 1181 | |
| AMD Radeon R7 430 | 2017 | 1200 | OEM only. |
| AMD Radeon Pro WX 2100 | 2017 | 1581 | Workstation card. |
| AMD Radeon HD 7750 | 2012 | 1676 | VisionTek low profile card. |
| Nvidia GTX 745 | 2014 | 2205 | OEM only. |
| AMD Radeon RX 550 | 2017 | 2408 | Yeston, MSI, Sapphire, XFX make low profile versions. |
| AMD Radeon Pro WX 3200 | 2019 | 2560 | Workstation card. |
| Nvidia GeForce GT 1030 | 2017 | 2607 | Asus, EVGA, MSI make passively cooled versions. |
| AMD Radeon Pro WX 3100 | 2017 | 2818 | Workstation card. |
| Nvidia Quadro K1200 | 2015 | 2861 | Workstation card. |
| Nvidia Quadro P620 | 2018 | 3639 | Workstation card. |
| AMD Radeon Pro WX 4100 | 2017 | 3758 | Workstation card. |
| Nvidia Quadro P1000 | 2017 | 4345 | Workstation card. |

# 2-slot Low Profile under 75W
| Name | Released | PassMark G3D Score | Comments |
| :-- | :--: | :--: | :-- |
| AMD Radeon RX 560 | 2017 | 3672 | Available from MSI, VisionTek (workstation 1-slot card) |
| AMD Radeon RX 460 | 2016 | 4034 | Available from MSI. |
| Nvidia GeForce GTX 1050 Ti | 2016 | 6398 | ASL makes a [1-slot version][3] for the Chinese market. |
| Nvidia GeForce GTX 1650 | 2019 | 7866 | ASL makes a [1-slot version][4] for the Chinese market. |
| _Nvidia Ampere-based LP card_ | 2021? | ? | _Low-end, low profile iterations of RTX 30* series cards will probably be announced by 2021._ |

[1]: https://en.wikipedia.org/wiki/Hackintosh
[2]: https://www.gnu.org/philosophy/free-software-even-more-important.html
[3]: https://videocardz.net/asl-geforce-gtx-1050-ti-4gb-battle-flag
[4]: https://videocardz.net/asl-geforce-gtx-1650-4gb-war-knife
[5]: https://www.dell.com/support/manuals/us/en/19/optiplex-9020-desktop/opt9020sffom-v2/system-board-components?guid=guid-f9b65300-4829-4b63-9770-237e6c10dcc7


