import Avatar from 'react-avatar';
import { withAuth } from '@/hocs';

import { ButtonIcon, Text, Icon, PrimaryButton } from '../../components';

export const Company = () => {
  return (
    <div className="flex flex-1 flex-col w-full items-center py-28 md:py-16 md:pl-[70px]">
      <div className="flex flex-col max-w-[600px] w-full px-4 items-center">
        <div className="mb-20 flex flex-col w-full items-center">
          <Avatar src="/twiter.png" size={60} className="mb-4" round />
          <div className="flex flex-row w-full items-center mb-2">
            <Text
              text="Lorem LLC"
              className="text-3xl  flex-1 text-center ml-[30px]"
            />
            <ButtonIcon
              name="HiCog"
              size={30}
              className="text-gray-600 hover:text-black transition-all ease-in-out"
            />
          </div>
          <Text
            className="text-lg text-gray-500 mb-10"
            text="Edit your company, and invite new members!"
          />
          <PrimaryButton
            className="w-auto"
            title="Invite a team member"
            before={
              <Icon className="mr-2 text-white" size={30} name="HiPlusCircle" />
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
            <ButtonIcon
              name="HiPencil"
              size={30}
              className="text-gray-600 hover:text-black transition-all ease-in-out"
            />
          </div>
          <div class="flex w-full flex-row justify-between items-center border p-4 rounded-full shadow-sm">
            <div className="flex flex-row items-center">
              <Avatar name="Dorlor sit" size={40} className="mr-2" round />
              <p class="text-xl text-gray-800 mr-2">Dorlor sit</p>
              <p class="text-sm text-gray-800">(member)</p>
            </div>
            <div class="grid grid-cols-2 gap-4 ml-4"></div>
            <ButtonIcon
              name="HiPencil"
              size={30}
              className="text-gray-600 hover:text-black transition-all ease-in-out"
            />
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
            <ButtonIcon
              name="HiTrash"
              size={30}
              className="text-gray-600 hover:text-black transition-all ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Company);
