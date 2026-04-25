import React, { useState } from "react";
import List_teacher from "../Teacher/List_teacher";
import Teacher_Book from "../Teacher/Teacher_Book";
import { useDataContext } from "../Context";

function Teachers() {
  const { setShowFormTeacherBook, showTeacherBook, setShowTeacherBook } =
    useDataContext();
  return (
    <div className="flex flex-col gap-2 my-1 mx-2 bg-white p-2 md:mr-4 rounded">
      <div className="flex items-center justify-between md:mr-4">
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-list text-sm md:text-xl text-gray-700"></i>
          <h2 className="text-sm md:text-xl font-bold text-gray-700">
            Teachers List
          </h2>
        </span>
        {showTeacherBook ? (
          ""
        ) : (
          <div
            onClick={() => setShowFormTeacherBook(true)}
            className="md:px-3 md:py-1 py-0.5 px-1 cursor-pointer rounded-md text-white bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 "
          >
            <h2 className="text-sm font-medium">Add Teacher Book</h2>
          </div>
        )}

        {/* View Toggle only */}
      </div>
      <div className="flex items-center gap-2 md:my-2">
        <h2
          className={`cursor-pointer px-2 md:px-3 md:py-1 rounded-md ${showTeacherBook ? "border text-black" : "text-white  bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 py-1"}`}
          onClick={() => setShowTeacherBook(false)}
        >
          Teachers
        </h2>
        <h2
          className={`cursor-pointer px-2 md:px-3 md:py-1 rounded-md ${showTeacherBook ? "text-white  bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 py-1" : "border text-black"}`}
          onClick={() => setShowTeacherBook(true)}
        >
          Teacher Book
        </h2>
      </div>
      {showTeacherBook ? <Teacher_Book /> : <List_teacher />}
    </div>
  );
}

export default Teachers;
