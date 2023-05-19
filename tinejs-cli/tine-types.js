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
import superjson from 'superjson';
import useSwr from 'swr'
import useSWRMutation from 'swr/mutation';
import { TineInferReturn, TineInferInput } from 'tinejs';
import { StatusError } from '@/types'
{{#useCases}}
 import type { {{useCaseType}} } from './types'
{{/useCases}}

const fetchData =
  <T>(url: string, body?: any) =>
    fetch(\`\${url}?sj=true\`, { method: 'POST', body: body ? JSON.stringify(superjson.serialize(body)) : undefined })
      .then(async (res) => {
        if (!res.ok) {
          const error = superjson.deserialize<{ message: string }>(await res.json())

          throw new StatusError(error.message, res.status)
        }

        return superjson.deserialize(await res.json())
      })
      .then((data) => data as T);

export const UseCases = {
{{#useCases}}
  {{#if hasInput}}
   '{{useCase}}': 
      { 
        load: (input: TineInferInput<{{useCaseType}}> | '' | undefined | false) => 
          useSwr(
            input ? ['{{useCase}}', input] : undefined, input ? () => 
            fetchData<TineInferReturn<{{useCaseType}}>>('/api/tine/{{useCase}}', input) : () => undefined,
         ),
        mutate: () => useSWRMutation(
          '{{useCase}}',
          (
            _: string,
            { arg }: { arg: TineInferInput<{{useCaseType}}> }
          ) => fetchData<TineInferReturn<{{useCaseType}}>>('/api/tine/{{useCase}}', arg)
        ),
        getKey: (input?: TineInferInput<{{useCaseType}}>) => {
          if(!input){
            return (key: any) => key && key[0] === '{{useCase}}'
          }
          
          return ['{{useCase}}', input]
        },
      },
  {{else}}
    '{{useCase}}': {
      load: () => useSwr(
        '{{useCase}}', () => fetchData<TineInferReturn<{{useCaseType}}>>('/api/tine/{{useCase}}'),
      ),
      mutate: () => useSWRMutation(
        '{{useCase}}',
        (
          _: string,
        ) => fetchData<TineInferReturn<{{useCaseType}}>>('/api/tine/{{useCase}}')
      ),
      getKey: () => '{{useCase}}',
    },
  {{/if}}
{{/useCases}}
};

`;

const compiledTemplate = Handlebars.compile(template);
const generatedCode = compiledTemplate({ useCases });

fs.writeFileSync(outputFile, generatedCode);
