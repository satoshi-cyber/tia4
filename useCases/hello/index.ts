import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import payload from 'tinejs.payload';

const input = tineInput(z.object({ name: z.string().nullable().optional() }));

const hello = payload(tineVar(input, ({ name }) => `Hello ${name || 'World'}`));

export default hello.withInput(input);
