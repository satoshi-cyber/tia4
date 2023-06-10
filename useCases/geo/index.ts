import { task } from 'tinejs';

const geo = task((ctx) => {
  const lat = ctx.get('headers').get('x-vercel-ip-latitude') as number;
  const lon = ctx.get('headers').get('x-vercel-ip-longitude') as number;

  return { lat, lon };
});

export default geo.noInput();
