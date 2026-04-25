import React, { useState } from "react";
import Form_Class from "../Class/Form_Class";
import { useDataContext } from "../Context";
import List_Class from "../Class/List_Class";

function Class() {
  const { formClass, setFormClass } = useDataContext();
  return (
    <React.Fragment>
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between mr-4">
          <span className="flex items-center gap-2">
            <i className="fa-solid fa-list text-xl mt-1"></i>
            <h2 className="text-xl font-bold">Class List</h2>
          </span>
        </div>
        <div
          onClick={() => setFormClass(true)}
          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 mr-4 p-1 rounded cursor-pointer"
        >
          <i className="fa-solid fa-plus text-[15px] text-white"></i>
          <h2 className="text-[15px] font-medium text-white">Add New Class</h2>
        </div>
      </div>
      <List_Class />
      {formClass ? <Form_Class setFormClass={setFormClass} /> : null}
    </React.Fragment>
  );
}

export default Class;
