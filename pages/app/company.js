import Avatar from 'react-avatar';
import { withAuth } from '@/hocs';

import { ButtonIcon, Text, Icon, PrimaryButton, Title } from '../../components';

export const Company = () => {
  return (
    <div className="flex flex-1 flex-col w-full items-center py-28 md:py-16 md:pl-[70px]">
      <div className="flex flex-col max-w-[600px] w-full px-4 items-center">
        <div className="mb-20 flex flex-col w-full items-center">
          <Avatar src="/twiter.png" size={60} className="mb-4" round />
          <Title
            title="Lorem LLC"
            subTitle="Edit your company, and invite new members!"
            after={<ButtonIcon name="HiCog" />}
          />
          <PrimaryButton
            className="w-auto"
            title="Invite a team member"
            before={
              <Icon className="text-white" size={30} name="HiPlusCircle" />
            }
          />
        </div>
        <div className="grid grid-cols-1 gap-4 w-full">
          <div class="flex w-full flex-row justify-between items-center border p-4 rounded-full shadow-sm">
            <div className="flex flex-row items-center">
              <Avatar
                src="/avatar.jpg"
                name="Lorem ipsum"
                size={40}
                className="mr-2"
                round
              />
              <p class="text-xl text-gray-800 mr-2">Lorem ipsum</p>
              <p class="text-sm text-gray-800">(admin)</p>
            </div>
            <div class="grid grid-cols-2 gap-4 ml-4"></div>
            <ButtonIcon name="HiPencil" />
          </div>
          <div class="flex w-full flex-row justify-between items-center border p-4 rounded-full shadow-sm">
            <div className="flex flex-row items-center">
              <Avatar name="Dorlor sit" size={40} className="mr-2" round />
              <p class="text-xl text-gray-800 mr-2">Dorlor sit</p>
              <p class="text-sm text-gray-800">(member)</p>
            </div>
            <div class="grid grid-cols-2 gap-4 ml-4"></div>
            <ButtonIcon name="HiPencil" />
          </div>
          <div class="flex w-full flex-row justify-between items-center border p-4 rounded-full shadow-sm">
            <div className="flex flex-row items-center">
              <Avatar
                email="maecenas.blandit@hotmail.com"
                size={40}
                className="mr-2"
                round
              />
              <p class="text-xl text-gray-800 mr-2">
                maecenas.blandit@hotmail.com
              </p>
              <p class="text-sm text-gray-800">(invited)</p>
            </div>
            <div class="grid grid-cols-2 gap-4 ml-4"></div>
            <ButtonIcon name="HiTrash" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Company);
