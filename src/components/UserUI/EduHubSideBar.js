import React from "react";

function EduHubSideBar({ setActiveTab }) {
  return (
    <div
      className="d-flex flex-column p-4 bg-dark"
      style={{
        width: "250px",
        backgroundColor: "#4b4b4b", 
        borderRight: "2px solid #c19a6b",
        height: "100vh",
      }}
    >
      <button
        onClick={() => setActiveTab("Content")}
        className="btn mb-4 fw-bold text-center"
        style={{
          backgroundColor: "#343434", 
          borderColor: "#c19a6b",
          color: "#f0e6d2",
          borderWidth: "2px",
          borderRadius: "10px",
        }}
      >
        📘 Content
      </button>

      <button
        onClick={() => setActiveTab("Sent")}
        className="btn fw-bold text-center"
        style={{
          backgroundColor: "#343434",
          borderColor: "#c19a6b",
          color: "#f0e6d2",
          borderWidth: "2px",
          borderRadius: "10px",
        }}
      >
        ✉️ Sent
      </button>
    </div>
  );
}

export default EduHubSideBar;