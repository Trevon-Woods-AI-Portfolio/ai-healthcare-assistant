import React from "react";

const Medicines = (medicine, setShowMedicineInfo, showMedicineInfo) => {
    console.log("Medicine prop: ", medicine);
  return <div className="border size-32">
    <img src={medicine.medicine.imageUrl} alt="" />
  </div>;
};

export default Medicines;
