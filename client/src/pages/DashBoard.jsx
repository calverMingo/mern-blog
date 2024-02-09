import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";

export default function DashBoard() {
  const location = useLocation();
  const [Tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const TabFromURL = urlParams.get("tab");
    if (TabFromURL) {
      setTab(TabFromURL);
    }
    console.log(TabFromURL);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}

        <DashSideBar />
      </div>
      {Tab === "profile" && <DashProfile />}
      {/* profile */}
    </div>
  );
}
