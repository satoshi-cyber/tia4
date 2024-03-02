import { PrismaClient } from '@prisma/client/edge';
import { findNearestLocation } from '@/lib/disatance';
import tinejsPrisma from 'tinejs.prisma';

import company from './extend/company';
import interview from './extend/interview';
import user from './extend/user';
import { env } from '../config';

const extend = {
  result: {
    company,
    interview,
    user,
  },
};

const clients = [
  // {
  //   lat: 37.3541,
  //   lng: -121.9555,
  //   client: new PrismaClient({
  //     datasources: {
  //       db: {
  //         url: env.SFO_DATABASE_URL,
  //       },
  //     },
  //   }).$extends(extend),
  // },
  // {
  //   lat: 50.1109,
  //   lng: 8.682,
  //   client: new PrismaClient({
  //     datasources: {
  //       db: {
  //         url: env.FRA_DATABASE_URL,
  //       },
  //     },
  //   }).$extends(extend),
  // },
  {
    lat: 40.8041,
    lng: -74.0124,
    client: new PrismaClient({
      datasources: {
        db: {
          url: env.NYC_DATABASE_URL,
        },
      },
    }).$extends(extend),
  },
  // {
  //   lat: -33.8678,
  //   lng: 151.207,
  //   client: new PrismaClient({
  //     datasources: {
  //       db: {
  //         url: env.SYD_DATABASE_URL,
  //       },
  //     },
  //   }).$extends(extend),
  // },
];

const prisma = new PrismaClient().$extends(extend).$extends(
  tinejsPrisma((ctx) => {
    const lat = ctx.get('headers').get('x-vercel-ip-latitude') || 42.6631;
    const lng = ctx.get('headers').get('x-vercel-ip-longitude') || 21.169;

    const req = { lat, lng };

    const {
      location: { client, ...meta },
      distance,
    } = findNearestLocation(
      {
        lat,
        lng,
      },
      clients
    );

    console.log({ ...meta, distance, req });

    return client;
  })
);

export default prisma;

declare global {
  namespace PrismaJson {
    // Prisma JSON fields
    type Question = {
      id: string;
      question: string;
      time: number;
    };

    type Answer = {
      url?: string;
      question: Question;
    };
  }
}
