import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setDiagnosis } from "../state/state";
import NewResult from "./NewResult";
import Result from "./Result";
import LogoutIcon from "@mui/icons-material/Logout";

const Search = ({ setNewDiagnosis, newDiagnosis }) => {
  const [generateResult, setGenerateResult] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("The user is: ", user);

  useEffect(() => {
    setGenerateResult(!generateResult);
    if (showResults === true) {
      fetchDiagnosis();
    }
  }, [showResults]);

  useEffect(() => {
    if (newDiagnosis === true) {
      setNewDiagnosis(false);
      setGenerateResult(false);
      dispatch(setDiagnosis({ diagnosis: null }));
    }
  }, [newDiagnosis]);

  const fetchDiagnosis = async () => {
    try {
      const res = await fetch("/api/result/saveResult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query, userId: user.user._id }),
      });

      const data = await res.json();

      if (!data) {
        throw new Error(data.error || "Failed to generate response");
      }

      dispatch(setDiagnosis({ diagnosis: data }));
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  const handleLogout = () => {
    const res = fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const success = res.ok;

    if (success) {
      dispatch(setLogout({ user: null }));
    }
  };

  return (
    <section id="Search" className="flex flex-col w-[83%] text-white">
      <div
        id="MainContentLogo"
        className="flex justify-between items-center p-4"
      >
        <h1 className="text-3xl font-bold text-lime-400 ml-4">DiagnoseMe</h1>
        <div
          onClick={() => {
            handleLogout(), dispatch(setLogout());
          }}
        >
          <LogoutIcon className="text-lime-400 mr-2 mb-1 cursor-pointer hover:text-red-500" />
        </div>
      </div>
      {generateResult === true ? (
        <Result />
      ) : (
        <NewResult
          setShowResults={setShowResults}
          showResults={showResults}
          setQuery={setQuery}
        />
      )}
    </section>
  );
};

export default Search;
