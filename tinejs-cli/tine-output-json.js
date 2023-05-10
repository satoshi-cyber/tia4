const fs = require('fs');
const Handlebars = require('handlebars');

const outputFile = './useCases/useCases.test.ts';

const template = `
import fs from 'fs'

jest.mock('query-string' , () => ({
  //mock whatever you use from query-string
  parse :jest.fn(),
  stringify: jest.fn()
}));

import { output } from './.types'

describe('Tine', () => {
  it('compiles', () => {
    const jsonString = JSON.stringify(output, null, 2);

    fs.writeFileSync('./useCases/useCases.json', jsonString);
  
    expect(true).toEqual(true);
  })
});
`;

const compiledTemplate = Handlebars.compile(template);

const generatedCode = compiledTemplate();

fs.writeFileSync(outputFile, generatedCode);
