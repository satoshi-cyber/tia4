import { TOAST_OPTIONS } from '@/config';
import { useUser } from '@/hooks';
import { UseCases } from '@/useCases';
import { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

import { SKELETON_MEMBERS, TOAST_MESSAGE } from './Company-constants';
import { CompanyRoles, inviteCompanyMembersSchema } from '@/types';
import Zod from 'zod';

export const useCompany = () => {
  const { companyId, companyRole } = useUser();

  const { trigger: triggerInviteTeamMembers } =
    UseCases.inviteCompanyMembers.mutate();

  const [inviteTeamMembers, setInviteTeamMembers] = useState(false);

  const [inviteTeamMembersVisible, setInviteTeamMembersVisible] =
    useState(false);

  const form = useForm<Zod.infer<typeof inviteCompanyMembersSchema>>({
    defaultValues: {
      teamMembers: [{}],
    },
  });

  const handleInviteTeamMembers = () => {
    setInviteTeamMembers(true);
    form.reset();
  };

  const handleCloseForm = () => setInviteTeamMembers(false);

  const onSubmit = async (
    data: Zod.infer<typeof inviteCompanyMembersSchema>
  ) => {
    if (!companyId) {
      return;
    }

    const toastMessage =
      data.teamMembers.length === 1 ? TOAST_MESSAGE.one : TOAST_MESSAGE.many;

    try {
      const rows = await triggerInviteTeamMembers({ ...data, companyId });

      if (rows?.some((row) => !row)) {
        throw new Error('Some invites failed!');
      }

      toast.success(toastMessage.success, TOAST_OPTIONS);
    } catch (e) {
      toast.error(toastMessage.error, TOAST_OPTIONS);
    } finally {
      form.reset();

      mutate(UseCases.companyMembers.getKey());

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

  const isAdmin = companyRole === CompanyRoles.adminMember;

  return {
    form,
    members,
    isLoading,
    handleCloseForm,
    onSubmit,
    handleInviteTeamMembers,
    inviteTeamMembers,
    inviteTeamMembersVisible,
    isAdmin,
  };
};
