import React from "react";

import { CLASS_NAMES, TITLE, ICON_PROPS } from "./CreateJobButton-constants";

import { Icon } from "../../../../../../components";

const CreateJobButton: React.FC = (props) => (
  <button className={CLASS_NAMES.button} {...props}>
    <Icon {...ICON_PROPS} />
    <p className={CLASS_NAMES.title}>{TITLE}</p>
  </button>
);

export default CreateJobButton;
