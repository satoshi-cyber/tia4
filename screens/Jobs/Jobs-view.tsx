import React from "react";

import { Header } from "./components";

import { Icon, Layout } from "../../components";

export default function Jobs() {
  return (
    <Layout.Default>
      <Header />
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="flex w-full flex-row justify-between items-center border p-4 rounded-lg shadow-sm">
          <div>
            <p className="text-2xl mb-2">Lorem job</p>
            <p className="text-xs">Deadline: 11/12/2023</p>
          </div>
          <div className="grid grid-cols-2 gap-4 ml-4">
            <Icon name="HiPencil" size={30} className="text-black" />
            <Icon name="HiExternalLink" size={30} className="text-black" />
          </div>
        </div>
        <div className="flex w-full flex-row justify-between items-center border p-4 rounded-lg shadow-sm">
          <div>
            <p className="text-2xl mb-2">Lorem job</p>
            <p className="text-xs">Deadline: 11/12/2023</p>
          </div>
          <div className="grid grid-cols-2 gap-4 ml-4">
            <Icon name="HiPencil" size={30} className="text-black" />
            <Icon name="HiExternalLink" size={30} className="text-black" />
          </div>
        </div>
        <div className="flex w-full flex-row justify-between items-center border p-4 rounded-lg shadow-sm">
          <div>
            <p className="text-2xl mb-2">Lorem job</p>
            <p className="text-xs">Deadline: 11/12/2023</p>
          </div>
          <div className="grid grid-cols-2 gap-4 ml-4">
            <Icon name="HiPencil" size={30} className="text-black" />
            <Icon name="HiExternalLink" size={30} className="text-black" />
          </div>
        </div>
      </div>
    </Layout.Default>
  );
}
