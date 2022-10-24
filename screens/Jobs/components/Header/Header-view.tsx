import Link from "next/link";
import React from "react";

import { CLASS_NAMES, TITLE, SUB_TITLE } from "./Header-constants";
import { CreateJobButton } from "./components";

import { URLS } from "../../../../config";

const Header: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <p className={CLASS_NAMES.title}>{TITLE}</p>
    <p className={CLASS_NAMES.subTitle}>{SUB_TITLE}</p>
    <div className={CLASS_NAMES.ctaWrapper}>
      <Link href={URLS.CREATE_A_JOB}>
        <CreateJobButton />
      </Link>
    </div>
  </div>
);

export default Header;
