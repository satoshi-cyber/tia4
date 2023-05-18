const fs = require('fs');
const { Generator } = require('tinejs.openapi');

const generator = new Generator({
  targetFile: './useCases/zod.schemas.ts',
  tsConfigFile: './tsconfig.json',
});

const filePath = './useCases/useCases.json';

const useCasesOutput = JSON.parse(fs.readFileSync(filePath));

const capitalizeFirstLetter = (inputString) => {
  if (typeof inputString !== 'string' || inputString.length === 0) {
    // Handle invalid input
    return inputString;
  }

  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

generator
  .generate([
    {
      file: './useCases/.return-types.ts',
      type: useCasesOutput.map(
        ([useCase]) => `${capitalizeFirstLetter(useCase)}ReturnSchema`
      ),
    },
  ])
  .then((file) => file.save());
