import { PrismaClient } from '@prisma/client/edge';
import findNearestLocation from 'map-nearest-location';
import tinejsPrisma from 'tinejs.prisma';

import company from './extend/company';
import interview from './extend/interview';
import user from './extend/user';
import { env } from '../config';

const clients = [
  {
    lat: 40.8041,
    lng: -74.0124,
    client: new PrismaClient({
      datasources: {
        db: {
          url: env.NYC_DATABASE_URL,
        },
      },
    }).$extends({
      result: {
        company,
        interview,
        user,
      },
    }),
  },
  {
    lat: -33.8678,
    lng: 151.207,
    client: new PrismaClient({
      datasources: {
        db: {
          url: env.SYD_DATABASE_URL,
        },
      },
    }).$extends({
      result: {
        company,
        interview,
        user,
      },
    }),
  },
];

const prisma = new PrismaClient()
  .$extends({
    result: {
      company,
      interview,
      user,
    },
  })
  .$extends(
    tinejsPrisma((ctx) => {
      const lat = ctx.get('headers').get('X-Vercel-IP-Latitude') || 42.6631;
      const lng = ctx.get('headers').get('X-Vercel-IP-Longitude') || 21.169;

      const {
        location: { client },
      } = findNearestLocation(
        {
          lat,
          lng,
        },
        clients
      );

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
