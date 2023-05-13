const fs = require('fs');
const Handlebars = require('handlebars');

const filePath = './useCases/useCases.json';

const useCasesOutput = JSON.parse(fs.readFileSync(filePath));

const useCases = useCasesOutput.map(([useCase, hasInput]) => ({
  useCase,
  hasInput,
}));

const template = `
import { StatusError } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs'
{{#useCases}}
import {{useCase}} from '@/useCases/{{useCase}}'
{{/useCases}}

export const config = {
  runtime: 'experimental-edge',
};

const useCasesWithInput = {
{{#useCases}}
 {{#if hasInput }}
 {{useCase}}: {{useCase}},
 {{/if}}
{{/useCases}}
}

const useCases = {
  {{#useCases}}
  {{#if hasInput}}
  {{ else }}
  {{useCase}}: {{useCase}},
  {{/if}}
  {{/useCases}}
}

const handler = async (req: NextRequest) => {
  try {
    const params = new URL(req.url).searchParams;

    const endpoint = params.get('endpoint') as string

    const ctx = tineCtx({ headers: req.headers, cookies: req.cookies })

    if(endpoint in useCasesWithInput){
      const json = await req.json();

      const data = await useCasesWithInput[endpoint as keyof typeof useCasesWithInput].rawInput(json).run(ctx);

      return NextResponse.json(data);
    } 

    const data = await useCases[endpoint as keyof typeof useCases].run(ctx);

    return NextResponse.json(data);
  } catch (e: any) {
    if (e instanceof StatusError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }

    return NextResponse.json({ error: e.message });
  }
};

export default handler;

`;

const outputFile = `./pages/api/tine/[endpoint].ts`;

const compiledTemplate = Handlebars.compile(template);
const generatedCode = compiledTemplate({ useCases });

fs.writeFileSync(outputFile, generatedCode);
