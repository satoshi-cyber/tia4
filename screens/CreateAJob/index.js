import {
  Form,
  InputField,
  Layout,
  Title,
  FormIcon,
  PrimaryButton,
} from "../../components";
import { InjecHook } from "../../lib";
import { FormService, JobService } from "../../services";
import { Questions } from "./components/Questions";

const CreateAJob = () => (
  <Layout.Default>
    <Form
      className="w-full"
      actionKey={[JobService.createAJob]}
      optionsHook={[JobService.formOptions]}
    >
      <Title title="Create a job!" />
      <InputField
        name="jobTitle"
        label="Job title:"
        type="text"
        placeholder="Senior software developer"
        after={<FormIcon name="HiOutlineBriefcase" />}
      />
      <InputField
        label="Deadline:"
        type="date"
        name="deadline"
        placeholder="Senior software developer"
      />
      <Questions />
      <InjecHook hookKey={[FormService.submitButton]}>
        <PrimaryButton title="Submit" />
      </InjecHook>
    </Form>
  </Layout.Default>
);

export default CreateAJob;
