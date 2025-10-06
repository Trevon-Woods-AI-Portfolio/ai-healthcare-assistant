import React, { useState } from "react";
import { useSocket } from "../context/socketContext";
import { useSelector } from "react-redux";
import Medicines from "./Medicines";

const ResultSection = () => {
  const [showMedicineInfo, setShowMedicineInfo] = useState(false);
  const diagnosis = useSelector((state) => state.diagnosis);
  console.log("Diagnosis in ResultSection: ", diagnosis);

  return (
    <div
      className={
        showMedicineInfo === true
          ? "flex justify-between w-full h-full px-12 py-4"
          : "flex justify-evenly w-full h-full px-12 py-4"
      }
    >
      <div className="border-2 border-black rounded-xl w-[40%] shadow-md shadow-gray-900 hover:shadow-lime-400 p-4">
        {diagnosis !== null && diagnosis.diagnosis.diagnosis}
      </div>
      <div className="flex flex-col items-center w-[10%] gap-4">
        <p className="flex justify-center items-center w-full border border-black border-r-0 border-l-0 border-t-0 text-lime-400 shadow-sm shadow-gray-900 mb-4">Medicines</p>
        {diagnosis !== null &&
          diagnosis.diagnosis.medicines.map((medicine, i) => (
            <Medicines
              key={i}
              medicine={medicine}
              setShowMedicineInfo={setShowMedicineInfo}
              showMedicineInfo={showMedicineInfo}
            />
          ))}
      </div>
      {showMedicineInfo === true ? (
        <div className="border-2 border-black rounded-xl w-[40%] shadow-md shadow-gray-900 hover:shadow-lime-400"></div>
      ) : null}
    </div>
  );
};

export default ResultSection;
