import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Search from "../components/Search";
import { useSelector } from "react-redux";

const MainContent = () => {
  const [newDiagnosis, setNewDiagnosis] = useState(false);
  const user = useSelector((state) => state.user);
  console.log("The logged in user is: ", user);
  return (
    <div className="flex min-w-screen min-h-screen">
        <Sidebar setNewDiagnosis={setNewDiagnosis} newDiagnosis={newDiagnosis}/>
        <Search setNewDiagnosis={setNewDiagnosis} newDiagnosis={newDiagnosis}/>
    </div>
  );
};

export default MainContent;
