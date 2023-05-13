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
import useSwr from 'swr'
import useSWRMutation from 'swr/mutation';
import { TineInferReturn, TineInferInput } from 'tinejs';
{{#useCases}}
 import type { {{useCaseType}} } from './types'
{{/useCases}}

export const UseCases = {
{{#useCases}}
  {{#if hasInput}}
   '{{useCase}}': 
      { 
        load: (input: TineInferInput<{{useCaseType}}> | '' | undefined | false) => 
          useSwr(...[
            input ? ['{{useCase}}', input] : undefined, input ? () => fetch('/api/tine/{{useCase}}', 
              { method: "POST", body: JSON.stringify(input) }
            ).then((res) => res.json()).then(
              (data) => data as TineInferReturn<{{useCaseType}}>,
            ) : () => undefined,
          ] as const),
        mutate: () => useSWRMutation(...[
          '{{useCase}}',
          (
            _: string,
            { arg }: { arg: TineInferInput<{{useCaseType}}> }
          ) => {
            return fetch('/api/tine/{{useCase}}', {
              method: 'POST',
              body: JSON.stringify(arg),
            }).then((res) => res.json()).then(
              (data) => data as TineInferReturn<{{useCaseType}}>,
            )
          }
        ] as const),
        getKey: () => (key: any) => key[0] === '{{useCase}}',
      },
  {{else}}
    '{{useCase}}': {
      load: () => useSwr(...[
        '{{useCase}}', () => fetch('/api/tine/{{useCase}}', 
          { method: "POST" }
        ).then((res) => res.json()).then(
          (data) => data as TineInferReturn<{{useCaseType}}>,
        ),
      ] as const),
      getKey: () => '{{useCase}}',
    },
  {{/if}}
{{/useCases}}
};

`;

const compiledTemplate = Handlebars.compile(template);
const generatedCode = compiledTemplate({ useCases });

fs.writeFileSync(outputFile, generatedCode);
