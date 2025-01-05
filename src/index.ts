// get generated json file for data
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

dropZone?.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.remove('error');
  dropZoneMessage.textContent = 'Drop blueprint .sbc file here or click to upload';
  dropZone.classList.add('dragover');
})
dropZone?.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
})
dropZone?.addEventListener('drop', (e) => {
  e.preventDefault();
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

  const fileArray = [...e.dataTransfer!.files];
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
  
})

function analyzeBlueprint (content: string) {
  const jsonBP = parser.parse(content);
  console.log(jsonBP);
}