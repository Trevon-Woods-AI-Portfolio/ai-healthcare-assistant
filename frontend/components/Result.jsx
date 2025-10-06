import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ResultSection from "./ResultSection";

const Result = () => {

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <ResultSection />
      <div className="flex flex-col justify-center justify-items-end items-center w-full">
        <p className="text-md text-gray-500 ml-4">
          You can start a new diagnosis by clicking the{" "}
          <b className="text-lime-400">"New Diagnosis"</b> button on the
          sidebar.
        </p>
        <div className="w-[50%]">
          <input
            type="text"
            className="w-full bg-gray-900 text-lime-400 rounded-full border-2 border-blue-900 focus:outline-none focus:ring-lime-400 focus:border-lime-400 h-14 mt-3 pl-14"
          />
          <div className="relative left-4 top-[-42px] w-[30px] h-[30px] rounded-full hover:bg-gray-800">
            <AddIcon className="text-lime-400 ml-[3px] mt-[1px] cursor-pointer" />
          </div>
          <div className="relative left-[750px] top-[-70px] w-[30px] h-[30px] rounded-full">
            <ArrowCircleRightIcon className="text-lime-400 mr-2 mb-1 cursor-pointer hover:text-lime-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;
