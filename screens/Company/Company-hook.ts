import { TOAST_OPTIONS } from '@/config';
import { CompanyInvite, useInviteMemberMutation, useMembersQuery } from '@/graphql';
import { useUser } from '@/hooks';
import { useLayoutEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  SKELETON_MEMBERS, TOAST_MESSAGE,
} from './Company-constants';

export const useCompany = () => {
  const { companyId } = useUser();

  const [{ fetching: submitting }, inviteTeamMember] = useInviteMemberMutation()

  const [inviteTeamMembers, setInviteTeamMembers] = useState(false);

  const [inviteTeamMembersVisible, setInviteTeamMembersVisible] =
    useState(false);

  const form = useForm({
    defaultValues: {
      teamMembers: [{}],
    },
  });

  const handleInviteTeamMembers = () => {
    setInviteTeamMembers(true);
    form.reset();
  };

  const handleCloseForm = () => setInviteTeamMembers(false);

  const onSubmit = async (data: { teamMembers: CompanyInvite[] }) => {

    const invites = data.teamMembers.map(async (invite) => {
      const res =
        await inviteTeamMember({ companyId: companyId!, input: invite }, { additionalTypenames: ['CompanyInvite'] })

      if (res.error) {
        throw res.error
      }

    })

    try {
      await Promise.all(invites)

      toast.success(TOAST_MESSAGE.success, TOAST_OPTIONS)

      form.reset();

      setInviteTeamMembers(false)
    } catch (e) {
      toast.error(TOAST_MESSAGE.error, TOAST_OPTIONS)
    }
  };

  useLayoutEffect(() => {
    setInviteTeamMembersVisible(inviteTeamMembers);
  }, [inviteTeamMembers]);

  const context = useMemo(() => ({ additionalTypenames: ['CompanyInvite'] }), []);

  const [{ data, fetching }] = useMembersQuery({
    variables: { companyId: companyId! },
    pause: !companyId,
    context
  });

  const members = fetching ? SKELETON_MEMBERS : data?.members || [];

  return {
    form,
    members,
    fetching,
    submitting,
    handleCloseForm,
    onSubmit,
    handleInviteTeamMembers,
    inviteTeamMembers,
    inviteTeamMembersVisible,
  }
};
