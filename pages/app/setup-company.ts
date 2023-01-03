import { withAuth } from '@/hocs'

import SetupCompany from '../../screens/SetupCompany'

// const Profile = () => {
//   return (
//     <div className="flex flex-1 flex-col w-full items-center py-28 md:py-16 md:pl-[70px]">
//       <Menu />
//       <div className="flex flex-col max-w-[600px] w-full px-4 items-center">
//         <Title title="Update your profile!" />
//         <p className="text-3xl text-gray-900 text-center"></p>
//         <div className="mb-4 w-[100px] h-[100px] border border-gray-200 shadow-sm block flex items-center justify-center text-center rounded-full">
//           <p className="text-sm text-gray-600">
//             Upload
//             <br /> picture
//           </p>
//         </div>
//         <p className={labelStyle}>Fullname:</p>
//         <UncontrolledField.Input
//           type="text"
//           name="fullname"
//           placeholder="Lorem Ipsum"
//           after={<FormIcon name="HiOutlineUser" />}
//         />
//         <p className={labelStyle}>Linkedin:</p>
//         <UncontrolledField.Input
//           type="email"
//           name="email"
//           placeholder="lorem@ipsum.com"
//           after={<FormIcon name="HiOutlineLink" />}
//         />
//         <p className={labelStyle}>Description:</p>
//         <UncontrolledField.TextArea
//           type="email"
//           name="email"
//           placeholder="lorem@ipsum.com"
//         />
//         <p className={labelStyle}>Cv:</p>
//         <UncontrolledField.TextArea
//           type="email"
//           name="email"
//           placeholder="lorem@ipsum.com"
//         />
//         <button className="sticky self-start top-0 bottom-6 mt-4 bg-gradient-to-r from-purple-500 w-full p-3 text-sm bg-gray-800 text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm">
//           Submit
//         </button>
//       </div>
//     </div>
//   )
// }

export default withAuth(SetupCompany)
