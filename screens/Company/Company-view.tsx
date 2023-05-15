import {
  Icon,
  PrimaryButton,
  Form,
  Layout,
  SubmitButton,
  LoadingProvider,
} from '@/components';
import TeamMemberFields from '@/components/TeamMemberFields';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

import {
  CLASS_NAMES,
  INVITE_TEAM_MEMBERS_BUTTON_PROPS,
  INVITE_TEAM_MEMBERS_ICON_PROPS,
  SEND_INVITE_BUTTON_PROPS,
  TRANSITION_PROPS,
} from './Company-constants';
import { useCompany } from './Company-hook';
import Header from './components/Header';
import Item from './components/Item';

const Company = () => {
  const {
    inviteTeamMembers,
    inviteTeamMembersVisible,
    handleCloseForm,
    form,
    onSubmit,
    members,
    handleInviteTeamMembers,
    isLoading,
    isAdmin,
  } = useCompany();

  return (
    <Layout.Default>
      <Header
        onClose={inviteTeamMembers ? handleCloseForm : undefined}
        isAdmin={isAdmin}
      />
      {inviteTeamMembers ? (
        <Transition
          {...TRANSITION_PROPS}
          show={inviteTeamMembersVisible}
          as={Fragment}
        >
          <div className={CLASS_NAMES.formContainer}>
            <Form form={form} onSubmit={onSubmit} className={CLASS_NAMES.form}>
              <TeamMemberFields />
              <SubmitButton {...SEND_INVITE_BUTTON_PROPS} />
            </Form>
          </div>
        </Transition>
      ) : (
        <>
          {isAdmin && (
            <PrimaryButton
              {...INVITE_TEAM_MEMBERS_BUTTON_PROPS}
              onClick={handleInviteTeamMembers}
              before={<Icon {...INVITE_TEAM_MEMBERS_ICON_PROPS} />}
            />
          )}
          <LoadingProvider isLoading={isLoading}>
            <div className={CLASS_NAMES.listContainer}>
              {members.map((member) => (
                <Item
                  member={member}
                  key={
                    'user' in member ? member.user.id : member.recipientEmail
                  }
                />
              ))}
            </div>
          </LoadingProvider>
        </>
      )}
    </Layout.Default>
  );
};

export default Company;
