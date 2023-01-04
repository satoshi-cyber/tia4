import { FormIcon, UncontrolledField } from '../components/Form';

import Logo from '../public/logo.svg';

const labelStyle = 'text-sm text-gray-900 text-left w-full mb-2';

export default function Submit() {
  if (typeof window !== 'undefined') {
    if (window.MediaRecorder == undefined) {
      console.error('MediaRecorder not supported, boo');
    } else {
      MediaRecorder.isTypeSupported('');
      var contentTypes = ['video/webm;codecs=opus'];
      contentTypes.forEach((contentType) => {
        console.log(
          contentType +
            ' is ' +
            (MediaRecorder.isTypeSupported(contentType)
              ? 'supported'
              : 'NOT supported ')
        );
      });
    }
  }

  return (
    <div className="flex flex-1 w-full justify-center items-center py-20">
      <div className="flex flex-col max-w-[600px] w-full px-4 items-center">
        <Logo className="absolute top-6 left-6" width={120} />
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
        <UncontrolledField.Input
          type="text"
          name="fullname"
          placeholder="Lorem Ipsum"
          after={<FormIcon name="HiOutlineUser" size={20} />}
        />
        <p className={labelStyle}>Linkedin:</p>
        <UncontrolledField.Input
          type="email"
          name="email"
          placeholder="lorem@ipsum.com"
          after={<FormIcon name="HiOutlineLink" size={20} />}
        />
        <p className={labelStyle}>Description:</p>
        <UncontrolledField.TextArea
          type="email"
          name="email"
          placeholder="lorem@ipsum.com"
        />
        <p className={labelStyle}>Cv:</p>
        <UncontrolledField.TextArea
          type="email"
          name="email"
          placeholder="lorem@ipsum.com"
        />
        <button className="sticky bottom-6 mt-4 bg-gradient-to-r from-purple-500 w-full p-3 text-sm bg-gray-800 text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm">
          Submit
        </button>
      </div>
    </div>
  );
}
