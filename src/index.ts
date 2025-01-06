// get generated json file for data
import { assert } from 'node:console';
import costs from './data/costs.json';
import { XMLParser } from 'fast-xml-parser';

// read & parse xml from blueprint

// calculate cost


/**
 *
 *  Base navigation and UI for app
 * 
*/

const parser = new XMLParser();
const dropZone = document.getElementById('drop_zone') ?? document.createElement('div');
const dropZoneMessage = document.querySelector('#drop_zone p')?? document.createElement('p');
const dropZoneInput = document.getElementById('blueprint') ?? document.createElement('input');
const dlcListElement = document.getElementById('dlc-list') ?? document.createElement('div');
const blockListElement = document.getElementById('block-list') ?? document.createElement('div');
const componentListElement = document.getElementById('component-list') ?? document.createElement('div');
const errorElement = document.getElementById('error') ?? document.createElement('div');

type blockCostType = {[blockType: string]: {[materialType: string]: number}}
const blockCosts = costs as blockCostType;
type countTypeList ={[blockType: string]: number}

function resetUI() {
  errorElement.classList.remove('visible');
  dlcListElement.classList.remove('visible');
  dlcListElement.innerHTML = '<ul><li>None</li></ul>';
  componentListElement.classList.remove('visible');
  componentListElement.innerHTML = '<ul><li>None</li></ul>';
}

dropZoneInput.addEventListener('change', (e:any) => {
  const file = e.target!.files[0];
  resetUI();
  readFile(file);
})
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.remove('error');
  dropZoneMessage.textContent = 'Drop blueprint .sbc file here or click to upload';
  dropZone.classList.add('dragover');
})
dropZone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
})
dropZone.addEventListener('click', () => {
  dropZoneInput.click();
})

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  resetUI();
  dropZone.classList.remove('dragover');
  if (e.dataTransfer?.items[0].kind !== 'file') {
    dropZoneMessage.textContent = 'No file dropped!';
    dropZone.classList.add('error');
  }
  if (e.dataTransfer!.items.length > 1) {
    dropZoneMessage.textContent = 'Too many files dropped!';
    dropZone.classList.add('error');
  }

  const file = e.dataTransfer?.items[0].getAsFile();
  if (!file) {
    dropZoneMessage.textContent = 'No file dropped!';
    dropZone.classList.add('error');
  }
  if (!file?.name.endsWith('.sbc')) {
    dropZoneMessage.textContent = 'Not a .sbc file!';
    dropZone.classList.add('error');
  }
  readFile(file!);
})

function readFile(file: File) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const blueprint = event.target?.result;
    if (typeof blueprint !== 'string') {
      throw new Error("blueprint is not a string, but >" + typeof blueprint + "< instead");
    }
    analyzeBlueprint(blueprint);
  }
  reader.onerror = () => {
    dropZoneMessage.textContent = 'Not a .sbc file!';
    dropZone.classList.add('error');
  }
  reader.readAsText(file?? new Blob());
}

function analyzeBlueprint (content: string) {
  const jsonBP = parser.parse(content);
  const bp = jsonBP.Definitions.ShipBlueprints.ShipBlueprint;
  const dlc:Array<string> = bp.DLC;
  listDLC(dlc);
  const grids = bp.CubeGrids.CubeGrid;
  const count:countTypeList = {};
  if (grids.hasOwnProperty('BlockGroups')) {
    countMaterials(grids, count);
  } else {
    for (let i = 0; i < grids.length; i++) {
      const element = grids[i];
      countMaterials(element, count);
    }
  }
  const costs:countTypeList = {}; 
  for (const block in count) {
    if (block === undefined || block.length === 0) {
      console.error('block is undefined or empty');
      continue;
    }
    if (!blockCosts.hasOwnProperty(block)) {
      errorElement.classList.add('visible');
      errorElement.textContent = 'Block ' + block + ' not found!';
      return;
    }
    for (const material in blockCosts[block]) {
      const need = blockCosts[block][material];
      if (Object.prototype.hasOwnProperty.call(costs, material)) {
        costs[material] = costs[material] + need * count[block];
      } else {
        costs[material] = need;
      }
    }
  }
  listBlocksOrComponents(count,blockListElement);
  listBlocksOrComponents(costs,componentListElement);
}

function listDLC (dlc: Array<string>) {
  if (dlc === undefined || dlc.length === 0) {
    return;
  }
  if (typeof dlc === 'string') {
    dlc = [dlc];
  }
  const dlcList = document.createElement('ul');
  for (let i = 0; i < dlc.length; i++) {
    const li = document.createElement('li');
    li.textContent = dlc[i];
    dlcList.appendChild(li);
  }
  dlcListElement.classList.add('visible');
  dlcListElement.innerHTML = '';
  dlcListElement.appendChild(dlcList);
}

function countMaterials(grid:any, count:countTypeList) {
  grid.CubeBlocks.MyObjectBuilder_CubeBlock.forEach((el: { SubtypeName: string; }) => {
    if (count.hasOwnProperty(el.SubtypeName)) {
      count[el.SubtypeName] = count[el.SubtypeName] + 1;
    } else {
      count[el.SubtypeName] = 1;
    }
  });
}

function listBlocksOrComponents(cost:countTypeList, parent:HTMLElement) {
  const costList = document.createElement('ul');
  for (const material in cost) {
    if (material === undefined || material.length === 0) {
      console.error('material is undefined or empty');
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(cost, material)) {
      const li = document.createElement('li');
      li.textContent = material + ': ' + cost[material];
      costList.appendChild(li);
    }
  }
  parent.innerHTML = '';
  parent.appendChild(costList);
  parent.classList.add('visible');
}
