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

const filePath = './useCases/useCases.json';
const outputFile = './useCases/index.ts';

const useCasesOutput = JSON.parse(fs.readFileSync(filePath));

const useCases = useCasesOutput.map(([useCase, hasInput]) => ({
  useCase: useCase,
  useCaseType: capitalizeFirstLetter(useCase),
  hasInput,
}));

const template = `
{{#useCases}}
 import type { {{useCaseType}} } from './types'
{{/useCases}}

export const UseCases = {
{{#useCases}}
  {{#if hasInput}}
   '{{useCase}}': 
      { 
        mutate: [
          '{{useCase}}',
          (
            _: string,
            { arg }: { arg: Parameters<{{useCaseType}}['input']>[0] }
          ) => {
            return fetch('/api/tine/{{useCase}}', {
              method: 'POST',
              body: JSON.stringify(arg),
            }).then((res) => res.json()).then(
              (data) =>
                data as Awaited<ReturnType<ReturnType<{{useCaseType}}['input']>['run']>>,
            )
          }
        ] as const,
        getKey: () => (key: any) => key[0] === '{{useCase}}',
        input: (input: Parameters<{{useCaseType}}['input']>[0] | '' | undefined | false) => 
          [
            input ? ['{{useCase}}', input] : undefined, input ? () => fetch('/api/tine/{{useCase}}', 
              { method: "POST", body: JSON.stringify(input) }
            ).then((res) => res.json()).then(
              (data) =>
                data as Awaited<ReturnType<ReturnType<{{useCaseType}}['input']>['run']>>,
            ) : () => undefined,
          ] as const,
        rawInput: (input: unknown) => 
          [
            ['{{useCase}}', input], () => fetch('/api/tine/{{useCase}}', 
              { method: "POST", body: JSON.stringify(input) }
            ).then((res) => res.json()).then(
              (data) =>
                data as Awaited<ReturnType<ReturnType<{{useCaseType}}['input']>['run']>>,
            ),
          ] as const,
      },
  {{else}}
    '{{useCase}}': [
      '{{useCase}}', () => fetch('/api/tine/{{useCase}}', 
        { method: "POST" }
      ).then((res) => res.json()).then(
        (data) =>
          data as Awaited<ReturnType<{{useCaseType}}['run']>>,
      ),
    ] as const,
  {{/if}}
{{/useCases}}
};

`;

const compiledTemplate = Handlebars.compile(template);
const generatedCode = compiledTemplate({ useCases });

fs.writeFileSync(outputFile, generatedCode);
