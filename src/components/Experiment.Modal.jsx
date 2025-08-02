// src/components/ExperimentModal.jsx
import React, { useState } from "react";

const ExperimentModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    duration: "",
    goal1: "",
    goal2: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Creating experiment:", formData);
    onCreate();
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Your product</h2>
        <div className="progress-bar"><div className="progress" style={{ width: "100%" }} /></div>
      </div>
      <p className="subtitle">Split new users 50/50 experiment vs control to test your onboarding flow.</p>
      <label>Start date<span>*</span></label>
      <input name="startDate" placeholder="Enter start date" onChange={handleChange} />
      <label>Duration<span>*</span></label>
      <input name="duration" placeholder="Select duration" onChange={handleChange} />
      <label>Activation goal 1<span>*</span></label>
      <input name="goal1" placeholder='e.g. "Increase activation of create a project"' onChange={handleChange} />
      <label>Activation goal 2</label>
      <input name="goal2" placeholder='e.g. "Increase activation of add a colleague"' onChange={handleChange} />
      <div className="modal-footer">
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Create experiment</button>
      </div>
    </div>
  );
};

export default ExperimentModal;
