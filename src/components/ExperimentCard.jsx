// src/components/ExperimentCard.jsx
import React from "react";

const ExperimentCard = ({ onOpenModal }) => {
  return (
    <div className="experiment-card">
      <h2>Experiment overview</h2>
      <p>No experiment created yet.</p>
      <button onClick={onOpenModal}>Create experiment</button>
    </div>
  );
};

export default ExperimentCard;
