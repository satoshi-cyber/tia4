import { z } from 'zod';
import { tineInput, tineVar, payload } from 'tinejs';

const input = tineInput(z.object({ name: z.string().nullable().optional() }));

const hello = payload(tineVar(input, ({ name }) => `Hello ${name || 'World'}`));

export default hello.withInput(input);
