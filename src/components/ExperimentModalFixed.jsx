// ExperimentModalFixed.jsx
import React from "react";
import "../main.css";

const ExperimentModalFixed = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-header">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Activation experiment</h2>
        <p className="subtitle">
          Split new users 50/50 into experiment and control groups.
        </p>
      </div>

      <div className="modal-body">
        <label style={{ textAlign: "left" }}>Start Date<span>*</span></label>
        <input placeholder="Enter start date" />

        <label style={{ textAlign: "left" }}>Duration<span>*</span></label>
        <input placeholder="Select duration" />

        <label style={{ textAlign: "left" }}>Activation goal 1<span>*</span></label>
        <input placeholder="e.g. Increase activation of 'create a project'" />

        <label style={{ textAlign: "left" }}>Activation goal 2</label>
        <input placeholder="e.g. Increase activation of 'add a colleague'" />
      </div>

      <div className="modal-footer">
        <button className="back-button" onClick={onClose}>Cancel</button>
        <button className="next-button" onClick={onClose}>Create experiment</button>
      </div>
    </div>
  );
};

export default ExperimentModalFixed;
