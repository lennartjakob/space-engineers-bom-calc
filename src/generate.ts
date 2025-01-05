import { XMLParser } from 'fast-xml-parser';
import {readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';

//TODO make this work with a url as param, so it works with supplying the install directory

// read all sbc files
const options = {
  ignoreAttributes : false
};
const blocksFolder = 'build/Blocks';

const parser = new XMLParser(options);

if (! existsSync(blocksFolder)) {
  console.error('build/Blocks folder not found');
}

// separate out the costs & Media sources
const blockFiles = readdirSync(blocksFolder);
const costs = new Map();
const icons = new Map();

blockFiles.forEach(file => {
  const xmlDataStr = readFileSync(`${blocksFolder}/${file}`, 'utf-8');
  let jsonObj = parser.parse(xmlDataStr);
  const data = jsonObj.Definitions.CubeBlocks.Definition;
  data.forEach((block: { Id: { SubtypeId: any; }; Icon: any; Components: { Component: { [x: string]: string; }[]; }; }) => {
    const name = block.Id.SubtypeId;
    icons.set(name, block.Icon);
    const components:{[Name: string]: number} = {};
    if (Array.isArray(block.Components.Component)) {
      block.Components.Component.forEach((component: { [x: string]: string; }) => {
        if (components[component["@_Subtype"]]) {
          components[component["@_Subtype"]] = components[component["@_Subtype"]] + Number.parseInt(component['@_Count']);
        } else {
          components[component["@_Subtype"]] = Number.parseInt(component['@_Count']);
        }
      })
    } else {
      components[block.Components.Component["@_Subtype"]] = Number.parseInt(block.Components.Component['@_Count']);
    }
    costs.set(name, components);
  });
})

// save them all to a json file & collect the media files in a folder
const iconString = JSON.stringify(Object.fromEntries(icons), null, 2);
const costString = JSON.stringify(Object.fromEntries(costs), null, 2);

writeFileSync('src/data/icons.json', iconString);
writeFileSync('src/data/costs.json', costString);