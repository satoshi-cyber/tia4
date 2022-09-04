import { Input, FormIcon, TextArea } from "../components/Form";
import Menu from "../components/Menu";

const labelStyle = "text-sm text-gray-900 text-left w-full mb-2";

export default function Submit() {
  return (
    <div className="flex flex-1 flex-col w-full justify-center items-center py-28 md:py-16 md:pl-[70px] ">
      <Menu />
      <div className="flex flex-col max-w-[600px] w-full px-4 items-center">
        <p className="text-3xl mb-4 text-gray-900 text-center">
          Update your profile!
        </p>
        <div className="my-4 w-[100px] h-[100px] border border-gray-200 shadow-sm block flex items-center justify-center text-center rounded-full">
          <p className="text-sm text-gray-600">
            Upload
            <br /> picture
          </p>
        </div>
        <p className={labelStyle}>Fullname:</p>
        <Input
          type="text"
          name="fullname"
          placeholder="Lorem Ipsum"
          after={<FormIcon name="HiOutlineUser" size={20} />}
        />
        <p className={labelStyle}>Linkedin:</p>
        <Input
          type="email"
          name="email"
          placeholder="lorem@ipsum.com"
          after={<FormIcon name="HiOutlineLink" size={20} />}
        />
        <p className={labelStyle}>Description:</p>
        <TextArea type="email" name="email" placeholder="lorem@ipsum.com" />
        <p className={labelStyle}>Cv:</p>
        <TextArea type="email" name="email" placeholder="lorem@ipsum.com" />
        <button className="sticky self-start top-0 bottom-6 mt-4 bg-gradient-to-r from-purple-500 w-full p-3 text-sm bg-gray-800 text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm">
          Submit
        </button>
      </div>
    </div>
  );
}
