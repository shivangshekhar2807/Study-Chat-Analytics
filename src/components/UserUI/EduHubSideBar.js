import React from "react";
import { useSelector } from "react-redux";

function EduHubSideBar({ setActiveTab }) {
  const totalcontent = useSelector((state) => state.Study.eduhubcontent);
  const totalsent = useSelector((state) => state.Study.eduhubsent);
  const badgeStyle = {
    backgroundColor: '#c19a6b',
    color: '#4b4b4b',
    fontWeight: 'bold',
    borderRadius: '12px',
    padding: '0.25em 0.6em',
    fontSize: '0.8rem',
    marginLeft: '8px',
  };
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
        <span style={badgeStyle}>{totalcontent}</span>
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
        <span style={badgeStyle}>{totalsent}</span>
      </button>
    </div>
  );
}

export default EduHubSideBar;