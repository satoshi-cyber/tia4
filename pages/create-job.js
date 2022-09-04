import { Input, FormIcon, Select } from "../components/Form";
import Menu from "../components/Menu";
import Icon from "../components/Icon";

const labelStyle = "text-sm text-gray-900 text-left w-full mb-2";

export default function CreateJob() {
  return (
    <div className="flex flex-1 flex-col w-full justify-center items-center py-28 md:py-16 md:pl-[70px] ">
      <Menu />
      <div className="flex flex-col max-w-[600px] w-full px-4 items-center">
        <p className="text-3xl mb-4 text-gray-900 text-center mb-10">
          Create a job!
        </p>
        <p className={labelStyle}>Job title:</p>
        <Input
          type="text"
          name="fullname"
          placeholder="Senior software developer"
          after={<FormIcon name="HiOutlineBriefcase" />}
        />
        <p className={labelStyle}>Deadline:</p>
        <Input
          type="date"
          name="fullname"
          placeholder="Senior software developer"
        />
        <p className={labelStyle}>Questions:</p>
        <div className="border border-gray-300 w-full p-4 rounded-lg mb-4 flex flex-row relative pt-6 shadow-sm">
          <Icon
            name="HiXCircle"
            size={24}
            className="absolute right-2 top-2 text-gray-600"
          />
          <div className="w-full mr-4">
            <p className={labelStyle}>question:</p>
            <Input
              type="text"
              name="fullname"
              placeholder="Senior software developer"
            />
          </div>
          <div>
            <p className={labelStyle}>time:</p>
            <Select
              type="text"
              name="fullname"
              placeholder="How did you hear about this position?"
              defaultValue={2000}
            >
              <option value={10000}>10 min</option>
              <option value={5000}>5 min</option>
              <option value={2000}>2 min</option>
              <option value={1000}>1 min</option>
            </Select>
          </div>
        </div>
        <div className="border border-gray-300 w-full p-4 rounded-lg mb-4 flex flex-row relative pt-6 shadow-sm">
          <Icon
            name="HiXCircle"
            size={24}
            className="absolute right-2 top-2 text-gray-600"
          />
          <div className="w-full mr-4">
            <p className={labelStyle}>question:</p>
            <Input
              type="text"
              name="fullname"
              placeholder="Senior software developer"
            />
          </div>
          <div>
            <p className={labelStyle}>time:</p>
            <Select
              type="text"
              name="fullname"
              placeholder="How did you hear about this position?"
              defaultValue={2000}
            >
              <option value={10000}>10 min</option>
              <option value={5000}>5 min</option>
              <option value={2000}>2 min</option>
              <option value={1000}>1 min</option>
            </Select>
          </div>
        </div>
        <div className="border border-gray-300 w-full p-4 rounded-lg mb-4 flex flex-row relative pt-6 shadow-sm">
          <Icon
            name="HiXCircle"
            size={24}
            className="absolute right-2 top-2 text-gray-600"
          />
          <div className="w-full mr-4">
            <p className={labelStyle}>question:</p>
            <Input
              type="text"
              name="fullname"
              placeholder="Senior software developer"
            />
          </div>
          <div>
            <p className={labelStyle}>time:</p>
            <Select
              type="text"
              name="fullname"
              placeholder="How did you hear about this position?"
              defaultValue={2000}
            >
              <option value={10000}>10 min</option>
              <option value={5000}>5 min</option>
              <option value={2000}>2 min</option>
              <option value={1000}>1 min</option>
            </Select>
          </div>
        </div>
        <button className="border border-gray-300 sticky self-start top-0 bottom-6 w-full p-3 text-sm focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm mb-4">
          Add a question
        </button>
        <button className="sticky self-start top-0 bottom-6 mt-4 bg-gradient-to-r from-purple-500 w-full p-3 text-sm bg-gray-800 text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm">
          Submit
        </button>
      </div>
    </div>
  );
}
