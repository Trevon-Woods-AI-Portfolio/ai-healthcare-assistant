import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const NewResult = ({setShowResults, showResults, setQuery}) => {
  const handleShowResults = () => {

    setShowResults(!showResults);
  };

  return (
    <section className="flex flex-col justify-center items-center h-[75%]">
      <h1 className="text-3xl text-white p-2 ml-4 mt-4">
        What are your symptoms?
      </h1>
      <div className="w-[50%]">
        <input
          type="text"
          className="w-full bg-gray-900 text-lime-400 rounded-full border-2 border-blue-900 focus:outline-none focus:ring-lime-400 focus:border-lime-400 h-14 mt-6 pl-14"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="relative left-4 top-[-42px] w-[30px] h-[30px] rounded-full hover:bg-gray-800">
          <AddIcon className="text-lime-400 ml-[3px] mt-[1px] cursor-pointer" />
        </div>
        <div className="relative left-[750px] top-[-70px] w-[30px] h-[30px] rounded-full" onClick={handleShowResults}>
          <ArrowCircleRightIcon className="text-lime-400 mr-2 mb-1 cursor-pointer hover:text-lime-200" />
        </div>
      </div>
      <p className="text-md text-gray-500 ml-4">
        You can start a new diagnosis by clicking the{" "}
        <b className="text-lime-400">"New Diagnosis"</b> button on the sidebar.
      </p>
    </section>
  );
};

export default NewResult;
