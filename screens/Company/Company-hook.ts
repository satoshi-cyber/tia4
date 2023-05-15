import { TOAST_OPTIONS } from '@/config';
import {
  CompanyInvite,
  CompanyMemberRole,
  useInviteMemberMutation,
} from '@/graphql';
import { useUser } from '@/hooks';
import { UseCases } from '@/useCases';
import { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

import { SKELETON_MEMBERS, TOAST_MESSAGE } from './Company-constants';

export const useCompany = () => {
  const { companyId, companyRole } = useUser();

  const [{ fetching: submitting }, inviteTeamMember] =
    useInviteMemberMutation();

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
      const res = await inviteTeamMember(
        { companyId: companyId!, input: invite },
        { additionalTypenames: ['CompanyInvite'] }
      );

      if (res.error) {
        throw res.error;
      }
    });

    const toastMessage =
      invites.length === 1 ? TOAST_MESSAGE.one : TOAST_MESSAGE.many;

    try {
      await Promise.all(invites);

      toast.success(toastMessage.success, TOAST_OPTIONS);

      mutate(UseCases.companyMembers.getKey());
    } catch (e) {
      toast.error(toastMessage.error, TOAST_OPTIONS);
    } finally {
      form.reset();

      setInviteTeamMembers(false);
    }
  };

  useLayoutEffect(() => {
    setInviteTeamMembersVisible(inviteTeamMembers);
  }, [inviteTeamMembers]);

  const { data, isLoading } = UseCases.companyMembers.load(
    companyId && { companyId }
  );

  const members = isLoading ? SKELETON_MEMBERS : data || [];

  const isAdmin = companyRole === CompanyMemberRole.AdminMember;

  return {
    form,
    members,
    isLoading,
    submitting,
    handleCloseForm,
    onSubmit,
    handleInviteTeamMembers,
    inviteTeamMembers,
    inviteTeamMembersVisible,
    isAdmin,
  };
};
