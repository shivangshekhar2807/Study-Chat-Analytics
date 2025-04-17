import React, { useState } from "react";
import EduHubContent from "./EduHubContent";
import EduHubSent from "./EduHubSent";
import EduHubSideBar from "./EduHubSideBar";

function EduHub() {
  const [activeTab, setActiveTab] = useState("Content");

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <EduHubSideBar setActiveTab={setActiveTab} />

      <div className="flex-grow-1" style={{ overflowY: "auto", backgroundColor: "#343434" }}>
        {activeTab === "Content" && <EduHubContent />}
        {activeTab === "Sent" && <EduHubSent />}
      </div>
    </div>
  );
}

export default EduHub;