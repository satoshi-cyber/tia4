const fs = require('fs');
const Handlebars = require('handlebars');

const filePath = './useCases/useCases.json';

const useCasesOutput = JSON.parse(fs.readFileSync(filePath));

const useCases = useCasesOutput.map(([useCase, hasInput]) => ({
  useCase,
  hasInput,
}));

const template = `
import superjson from 'superjson';
import { StatusError } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs'
{{#useCases}}
import {{useCase}} from '@/useCases/{{useCase}}'
{{/useCases}}

export const config = {
  runtime: 'edge',
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
  const params = new URL(req.url).searchParams;

  const endpoint = params.get('endpoint') as string

  const ctx = tineCtx({
    headers: new Map(req.headers),
    cookies: new Map(req.cookies),
  });

  try {
    if(endpoint in useCasesWithInput){
      let input;

      try {
        input = superjson.deserialize(await req.json());
      } catch (e){
        throw new Error("Input is required")
      }

      const data = await useCasesWithInput[endpoint as keyof typeof useCasesWithInput].rawInput(input).run(ctx)

      return NextResponse.json(superjson.serialize(data));
    } 

    const data = await useCases[endpoint as keyof typeof useCases].run(ctx);

    return NextResponse.json(superjson.serialize(data));
  } catch (e: any) {
    if (e instanceof StatusError) {
      return NextResponse.json(superjson.serialize({ error: e.message }), { status: e.status });
    }

    return NextResponse.json(superjson.serialize({ error: e.message }), { status: 500 });
  } finally {
    fetch('https://logtrigger.vercel.app/api/tine/tine', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(superjson.serialize(ctx))
    })
  }
};

export default handler;

`;

const outputFile = `./pages/api/tine/[endpoint].ts`;

const compiledTemplate = Handlebars.compile(template);
const generatedCode = compiledTemplate({ useCases });

fs.writeFileSync(outputFile, generatedCode);
