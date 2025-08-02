// src/App.jsx
import React, { useState } from "react";
import OnboardingModal from "./components/OnboardingModal";
import ExperimentModal from "./components/ExperimentModalFixed.jsx";
import ExperimentCard from "./components/ExperimentCard";
import Toast from "./components/Toast";
import "./main.css";

function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showExperimentModal, setShowExperimentModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFinishOnboarding = () => setShowOnboarding(false);
  const handleOpenExperimentModal = () => setShowExperimentModal(true);
  const handleCloseExperimentModal = () => setShowExperimentModal(false);
  const handleCreateExperiment = () => {
    setShowExperimentModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="App">
      {showOnboarding && <OnboardingModal onFinish={handleFinishOnboarding} />}
      {!showOnboarding && (
        <>
          <ExperimentCard onOpenModal={handleOpenExperimentModal} />
          {showExperimentModal && (
            <ExperimentModal
              onClose={handleCloseExperimentModal}
              onCreate={handleCreateExperiment}
            />
          )}
        </>
      )}
      {showToast && (
        <Toast message="Experiment created – check back tomorrow to see results in dashboard" />
      )}
    </div>
  );
}

export default App;
