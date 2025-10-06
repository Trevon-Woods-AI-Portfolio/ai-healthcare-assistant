import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";

const Sidebar = ({ setNewDiagnosis, newDiagnosis }) => {
  const getNewDiagnosis = () => {
    if (newDiagnosis === false) {
      setNewDiagnosis(true);
    }
  };
  
  return (
    <section
      id="Sidebar"
      className=" w-[17%] text-white shadow-[2px_0_6px_rgba(0,0,0,0.1)] shadow-lime-400/50 bg-gray-900"
    >
      <div id="Logo" className="flex justify-between items-center p-4 gap-2">
        <div className="flex justify-center items-center w-[15%]">
          <img src={Logo} alt="" className="size-[40px] rounded-full" />
        </div>
        <AutoAwesomeMosaicIcon className="text-lime-400 mr-2 mb-1 cursor-pointer hover:text-lime-200" />
      </div>
      <div id="Options" className="flex flex-col gap-4 p-14 text-[20px] w-full">
        <div className="flex items-center gap-2">
          <Person2Icon className="text-lime-400 mr-2 mb-1" />
          <Link className="text-white hover:text-lime-400">Account</Link>
        </div>
        <div className="flex items-center gap-2">
          <SettingsIcon className="text-lime-400 mr-2 mb-1" />
          <Link className="text-white hover:text-lime-400">Settings</Link>
        </div>
        <div className="flex items-center gap-2">
          <TuneIcon className="text-lime-400 mr-2 mb-1" />
          <Link className="text-white hover:text-lime-400">Customize</Link>
        </div>
        <div className="flex items-center gap-2 mt-10" onClick={getNewDiagnosis}>
          <LibraryAddIcon className="text-lime-400 mr-2 mb-1" />
          <Link className="text-white hover:text-lime-400">New Diagnosis</Link>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
