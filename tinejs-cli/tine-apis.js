const fs = require('fs');
const Handlebars = require('handlebars');

const filePath = './useCases/useCases.json';

const useCasesOutput = JSON.parse(fs.readFileSync(filePath));

const useCases = useCasesOutput.map(([useCase, hasInput]) => ({
  useCase,
  hasInput,
}));

const template = `
import {{useCase}} from '@/useCases/{{useCase}}';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs'

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest) => {
  try {
    const ctx = tineCtx({ headers: req.headers, cookies: req.cookies })

    {{#if hasInput}}
    const json = await req.json();

    const res = await {{useCase}}.rawInput(json).run({ ctx });
    {{else}}
    const res = await {{useCase}}.run({ ctx });
    {{/if}}

    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};

export default handler;

`;

useCases.forEach(({ useCase, hasInput }) => {
  const outputFile = `./pages/api/tine/${useCase}.ts`;

  const compiledTemplate = Handlebars.compile(template);
  const generatedCode = compiledTemplate({ useCase, hasInput });

  fs.writeFileSync(outputFile, generatedCode);
});
