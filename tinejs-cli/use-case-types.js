const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const capitalizeFirstLetter = (inputString) => {
  if (typeof inputString !== 'string' || inputString.length === 0) {
    // Handle invalid input
    return inputString;
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

const directoryPath = './useCases'; // Directory path
const outputFile = './useCases/types.ts'; // Output file path

const folders = fs.readdirSync(directoryPath).filter((item) => {
  const itemPath = path.join(directoryPath, item);
  return fs.lstatSync(itemPath).isDirectory();
});

const useCases = folders.map((folder) => ({
  useCase: folder,
  useCaseType: capitalizeFirstLetter(folder),
}));

const constants = folders.join(', ');

const template = `
{{#useCases}}
 import { default as {{useCase}} } from './{{useCase}}'
{{/useCases}}

{{#useCases}}
 export type {{useCaseType}} = typeof {{useCase}}
{{/useCases}}
`;

const compiledTemplate = Handlebars.compile(template);
const generatedCode = compiledTemplate({ useCases, constants });

fs.writeFileSync(outputFile, generatedCode);
