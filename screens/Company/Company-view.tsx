import { ButtonIcon, Icon, PrimaryButton, Avatar } from '@/components';
import Header from './components/Header';

const Company = () => {
  return (
    <div className="flex flex-1 flex-col w-full items-center py-28 md:py-16 md:pl-[70px]">
      <div className="flex flex-col max-w-[600px] w-full px-6 items-center">
        <div className="mb-20 flex flex-col w-full items-center">
          <Header />
          <PrimaryButton
            className="w-auto"
            title="Invite a team member"
            before={
              <Icon className="text-white" size={30} name="HiPlusCircle" />
            }
          />
        </div>
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="flex w-full flex-row justify-between items-center border p-4 rounded-full shadow-sm">
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
          <div className="flex w-full flex-row justify-between items-center border p-4 rounded-full shadow-sm">
            <div className="flex flex-row items-center">
              <Avatar name="Dorlor sit" size={40} className="mr-2" />
              <p className="text-md md:text-lg text-gray-800 mr-2 break-all">
                Dorlor sit <span className="text-sm">(member)</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 ml-4"></div>
            <ButtonIcon name="HiPencil" />
          </div>
          <div className="flex w-full flex-row justify-between items-center border p-4 rounded-full shadow-sm">
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
        </div>
      </div>
    </div>
  );
};

export default Company;
