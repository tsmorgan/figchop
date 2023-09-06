# figchop
Node code to chop tall images into 4000px chunks so they don't get resized when importing into Figma.

# background 
Figma seems [to only be able to import files that are 4096px](https://help.figma.com/hc/en-us/articles/360040028034-Add-images-and-videos-to-design-files#:~:text=Figma%20downsizes,is%20less%20than%204096%20pixels.) in any direction. I tend to want to drag screengrabs of an existing website into it so I can monkey with them to present new designs. So I need to quickly chop files that are mostly taller than 4000px into chunk that I can individiually drag into Figma and recombine without losing quality.
