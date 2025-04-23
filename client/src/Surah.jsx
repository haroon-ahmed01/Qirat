import React from "react";
import "./surah.css";

const Surah = () => {
  return (
    <div className="surah-container">
      <div className="surah-header">
        <h1>Qirat App</h1>
        <p>Learn and practice Quranic recitation</p>
      </div>

      <div className="surah-content">
        <div className="surah-welcome">
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <p>Building Qirat App</p>
            {/* Spinning Loader */}
            <div className="loader"></div>
            <p style={{ color: "#666", marginTop: "10px" }}>Coming soon with more features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surah;
