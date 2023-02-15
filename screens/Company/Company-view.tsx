import {
  ButtonIcon,
  Icon,
  PrimaryButton,
  Avatar,
  Form,
  Layout,
  SubmitButton,
} from '@/components';
import TeamMemberFields from '@/components/TeamMemberFields';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from './components/Header';

const Company = () => {
  const [inviteTeamMembers, setInviteTeamMembers] = useState(false);

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

  const onSubmit = () => {};

  return (
    <Layout.Default>
      <Header onClose={inviteTeamMembers ? handleCloseForm : undefined} />

      {inviteTeamMembers ? (
        <Form form={form} onSubmit={onSubmit} className="w-full">
          <TeamMemberFields />
          <SubmitButton title="Send invite" />
        </Form>
      ) : (
        <>
          <PrimaryButton
            className="w-auto mb-14"
            title="Invite team members"
            onClick={handleInviteTeamMembers}
            before={
              <Icon className="text-white" size={30} name="HiPlusCircle" />
            }
          />
          <div className="grid grid-cols-1 gap-4 w-full">
            <div className="flex w-full flex-row justify-between items-center border p-4 rounded-full">
              <div className="flex flex-row items-center">
                <Avatar
                  src="/avatar.jpg"
                  name="Lorem ipsum"
                  size={40}
                  className="mr-2"
                  round
                />
                <p className="text-md md:text-lg text-gray-800 mr-2 break-all">
                  Lorem ipsum <span className="text-sm">(admin)</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 ml-4"></div>
              <ButtonIcon name="HiPencil" />
            </div>
            <div className="flex w-full flex-row justify-between items-center border p-4 rounded-full">
              <div className="flex flex-row items-center">
                <Avatar name="Dorlor sit" size={40} className="mr-2" />
                <p className="text-md md:text-lg text-gray-800 mr-2 break-all">
                  Dorlor sit <span className="text-sm">(member)</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 ml-4"></div>
              <ButtonIcon name="HiPencil" />
            </div>
            <div className="flex w-full flex-row justify-between items-center border p-4 rounded-full">
              <div className="flex flex-row items-center">
                <Avatar
                  email="maecenas.blandit@hotmail.com"
                  size={40}
                  className="mr-2 flex-none"
                  round
                />
                <p className="text-md md:text-lg text-gray-800 mr-2 break-all">
                  maeceasd.blandit@hotmail.com{' '}
                  <span className="text-sm">(invited)</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 ml-4"></div>
              <ButtonIcon name="HiTrash" />
            </div>
          </div>{' '}
        </>
      )}
    </Layout.Default>
  );
};

export default Company;
