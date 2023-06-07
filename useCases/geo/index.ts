import { task } from 'tinejs';

const geo = task((ctx) => {
  const lat = ctx.get('headers').get('X-Vercel-IP-Latitude') as number;
  const lon = ctx.get('headers').get('X-Vercel-IP-Longitude') as number;

  return { lat, lon };
});

export default geo.noInput();
