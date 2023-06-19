const fs = require('fs');
const Handlebars = require('handlebars');

const actions = fs
  .readdirSync('./actions')
  .filter((action) => !action.startsWith('.') && action !== 'config');

const template = `
import superjson from 'superjson';
import { StatusError } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next'
import { tineCtx, workflow, TineCtx } from 'tinejs'
{{#actions}}
import { default as {{this}} } from '@/actions/{{this}}';
{{/actions}}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const secret = req.headers['x-tine-secret']

    if(secret !== process.env.TINE_SECRET){
      throw new Error("Unauthorized")
    }

    const actions = new Map()
    {{#actions}}
    actions.set("{{this}}", {{this}})
    {{/actions}}

    const { ctx = tineCtx({
      headers: new Map(Object.entries(req.headers)),
      cookies: new Map(Object.entries(req.cookies)),
    }), workflow: payload } = superjson.deserialize(req.body) as { ctx?: TineCtx, workflow: any };

    ctx.set(".tine-workflow-actions", actions)
    ctx.set('.tine-placeholder-resolver', ($: any, key: string) =>
      new Function('$', \`return \${key}\`)($),
    );

    const data = await workflow(payload).run(ctx)

    return res.status(200).json(superjson.serialize(data));
    
  } catch (e: any) {
    if (e instanceof StatusError) {
      return res.status(e.status).json(superjson.serialize({ error: e.message }));
    }

    return res.status(500).json(superjson.serialize({ error: e.message }));
  }
};

export default handler;
`;

const outputFile = `./pages/api/tine/rpc.ts`;

const compiledTemplate = Handlebars.compile(template);
const generatedCode = compiledTemplate({ actions });

fs.writeFileSync(outputFile, generatedCode);
