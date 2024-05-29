# Draft Schematic Maker
This tool is meant to create the details for schematics. It was made to be a lightweight simplistic editor.
Simply input details in each drop-down and text field and press generate script at the bottom (green button).
I'd highly suggest using [Borrie's Lua Object Factory 1.0](https://modthegalaxy.com/index.php?resources/borries-lua-object-factory.102/) to create the base schematic script, then use this to fill it in.

## Installation
1. Clone down the repo
2. Open the index.html file with your browser
    1. A local server is not required to run this; however, you can do that with the same results.

## Notes
1. When wanting multiple objects as additional templates, press the add additional objects button.
    1. The object in the object text field will be the base template object.
2. You can manually write in any resource and/or object type, but it will attempt to autocomplete for you.
3. Take care not to use any objects that shouldn't be used but are in the autocomplete.

## Known issues / bugs
1. As of now, I am aware of some resources missing from the autocomplete feature.
2. Objects that shouldn't be used as crafting ingredients or final products are listed with autocomplete.
3. The layout and coloring are essentially ugly.
