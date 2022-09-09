import { Form, FormIcon, InputField, SelectField } from "../components/Form";
import Icon from "../components/Icon";
import { Title } from "../components/Title";
import SubmitButton from "../components/SubmitButton";
import { Layout } from "../components/Layout";

export default function CreateJob() {
  return (
    <Layout>
      <Form className="w-full" hookKey={"asdasd"}>
        <Title title="Create a job!" />
        <InputField
          label="Job title:"
          type="text"
          name="fullname"
          placeholder="Senior software developer"
          after={<FormIcon name="HiOutlineBriefcase" />}
        />
        <InputField
          label="Deadline:"
          type="date"
          name="fullname"
          placeholder="Senior software developer"
          after={<FormIcon name="HiOutlineBriefcase" />}
        />
        <p className="text-sm text-gray-900 text-left w-full mb-2">
          Questions:
        </p>
        <div className="border border-gray-300 w-full p-4 rounded-lg mb-4 flex flex-row relative pt-6 shadow-sm">
          <Icon
            name="HiXCircle"
            size={24}
            className="absolute right-2 top-2 text-gray-600"
          />
          <div className="w-full mr-4">
            <InputField
              label="question:"
              type="text"
              name="fullname"
              placeholder="Senior software developer"
            />
          </div>
          <div>
            <SelectField
              label="time:"
              type="text"
              name="fullname"
              placeholder="Senior software developer"
            >
              <option value={10000}>10 min</option>
              <option value={5000}>5 min</option>
              <option value={2000}>2 min</option>
              <option value={1000}>1 min</option>
            </SelectField>
          </div>
        </div>
        <button className="border border-gray-300 sticky self-start top-0 bottom-6 w-full p-3 text-sm focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm mb-4">
          Add a question
        </button>
        <SubmitButton title="Submit" />
      </Form>
    </Layout>
  );
}
