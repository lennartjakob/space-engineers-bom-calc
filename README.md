# space-engineers-bom-calc
A new version of the BoM calculator for Space Engineers Blueprints

**This currently lacks any fancy UI, which is the next step in development!**

It reads in blueprint files and and calculates components, ~~ores, and time~~ needed to build the Blueprint.

A running version can be found [here](https://se-bom.lj-apps.de/)

## Features
- [X] loads Blueprints in ```.sbc```-file format
- [X] counts uses of Block Types
- [X] references game-data to calculate total cost in Components
- [ ] also calculates Ore cost
- [ ] calculates time needed for refining and assembling
- [ ] Docker packaging and hosting
- [ ] *Export to ISY and other Autocrafting script formats?*
- [ ] *Steam Workshop import?*
- [ ] Support for SE 2

## How to build and host yourself
1. Clone this repo
2. Copy SE Files into ```src/data```:
   - ```<SE install folder>/Cube```
3. ```npm i && npm run generate```
4. ```npm run pack```
5. Edit the ```<base>```Tag in ```dist/index.html``` to resemble your infra
6. Upload everything in the dist folder to a basic LAMP server

### Why do it this way, with the whole copying files spiel?
Simply put: I just don't want to deal with the copyright headache of distributing KSH's property, i.e. textures & game-data
### Why a two step build?
Honestly, I was just too lazy to figure out how to make it work in one script and with the limitation mentioned above, I don't really think I could.

## Future Plans
idk, maybe redo this to some framework or something similar, at this scale it just doesn't need to have fancy UI framework features
- __Support for SE2__

### Feel free to fork, add issues and PRs