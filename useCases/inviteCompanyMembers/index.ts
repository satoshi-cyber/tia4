import { z } from 'zod';
import { condition, payload, tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import { inviteCompanyMembersSchema } from '@/types';
import prisma from '@/actions/prisma';
import sendMail from '@/actions/sendMail';
import s3 from '@/actions/s3';

const input = tineInput(
  z.intersection(
    inviteCompanyMembersSchema,
    z.object({ companyId: z.string() })
  )
);

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const inviteCompanyMembers = payload(
  tineVar(input, ({ teamMembers }) =>
    teamMembers.map(($member) => {
      const isMember = prisma.companyMember.findFirst({
        where: {
          companyId: tineVar(claims, 'companyId'),
          user: {
            email: $member.recipientEmail,
          },
        },
      });

      const invite = prisma.companyInvite.create({
        data: {
          company: { connect: { id: tineVar(claims, 'companyId') } },
          role: $member.role,
          recipientEmail: $member.recipientEmail,
        },
        select: {
          recipientEmail: true,
          companyId: true,
          role: true,
          company: true,
        },
      });

      const sendInvite = sendMail({
        to: tineVar(invite, 'recipientEmail'),
        template: 'InviteMember',
        props: {
          company: {
            id: tineVar(claims, 'companyId'),
            name: tineVar(invite, 'company.name'),
            avatar: tineVar(
              s3.presignedGet({
                bucketName: 'company-avatars',
                objectName: tineVar(
                  input,
                  ($input) => `${$input.companyId}.jpg`
                ),
                expires: 604800,
              })
            ),
          },
        },
      });

      const inviteMember = condition([
        tineVar(isMember, ($isMember) => Boolean($isMember)),
        undefined,
        tineVar(sendInvite),
      ]);

      return tineVar(inviteMember);
    })
  )
);

export default inviteCompanyMembers.withInput(input);
