import { useMembersQuery } from '@/graphql';
import { useUser } from '@/hooks';
import { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  SKELETON_MEMBERS,
} from './Company-constants';

export const useCompany = () => {
  const { companyId } = useUser();

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

  const onSubmit = () => { };

  useLayoutEffect(() => {
    setInviteTeamMembersVisible(inviteTeamMembers);
  }, [inviteTeamMembers]);

  const [{ data, fetching }] = useMembersQuery({
    variables: { companyId: companyId! },
    pause: !companyId,
  });

  const members = fetching ? SKELETON_MEMBERS : data?.members || [];

  return {
    form,
    members,
    fetching,
    handleCloseForm,
    onSubmit,
    handleInviteTeamMembers,
    inviteTeamMembers,
    inviteTeamMembersVisible,
  }
};
