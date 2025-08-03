import React, { useState, useEffect } from "react";
import "../main.css";
import ExperimentModalFixed from "./ExperimentModalFixed";

const ExperimentCard = ({ onCreate }) => (
  <div
    style={{
      position: "absolute",
      bottom: "24px",
      right: "24px",
      width: "280px",
      padding: "16px",
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
    }}
  >
    <h4 style={{ marginBottom: "8px" }}>Test your flow</h4>
    <p style={{ fontSize: "14px", color: "#666", marginBottom: "16px" }}>
      Split new users 50/50 into experiment and control groups.
    </p>
    <button
      onClick={onCreate}
      style={{
        backgroundColor: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "10px 16px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        width: "100%",
      }}
    >
      Create experiment
    </button>
  </div>
);

const OnboardingModal = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showExperimentModal, setShowExperimentModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    feature: "",
    link: "",
    activation1: "",
    activation2: "",
    funnel1step1: "",
    funnel1step2: "",
    funnel1step3: "",
    funnel1tags: "",
    funnel2step1: "",
    funnel2step2: "",
    funnel2step3: "",
    funnel2tags: "",
  });

  useEffect(() => {
    if (step === 4) {
      const timeout = setTimeout(() => setShowPreview(true), 2500);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  const reset = () => {
    setStep(1);
    onFinish();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="modal-header">
              <button className="close-button" onClick={reset}>×</button>
              <h2>Your details</h2>
              <div className="progress-bar">
                <div className="progress" style={{ width: "33%" }} />
              </div>
            </div>
            <p className="subtitle">Tell us about you.</p>
            <label>Name<span>*</span></label>
            <input name="name" placeholder="Add name" value={formData.name} onChange={handleChange} />
            <label>Company<span>*</span></label>
            <input name="company" placeholder="Add company" value={formData.company} onChange={handleChange} />
            <label>Role<span>*</span></label>
            <input name="role" placeholder="Add role" value={formData.role} onChange={handleChange} />
          </>
        );
      case 2:
        return (
          <>
            <div className="modal-header">
              <button className="close-button" onClick={reset}>×</button>
              <h2>Your product</h2>
              <div className="progress-bar">
                <div className="progress" style={{ width: "66%" }} />
              </div>
            </div>
            <p className="subtitle">Tell us about your product to help us generate your onboarding experience.</p>
            <label>Product feature/name<span>*</span></label>
            <input name="feature" placeholder="Add name" value={formData.feature} onChange={handleChange} />
            <label>Link to your application<span>*</span></label>
            <input name="link" placeholder="Add link" value={formData.link} onChange={handleChange} />
            <label>Activation step 1<span>*</span></label>
            <input name="activation1" placeholder="First activation step e.g. create a new project" value={formData.activation1} onChange={handleChange} />
            <label>Activation step 2</label>
            <input name="activation2" placeholder="Second activation step e.g. add a colleague" value={formData.activation2} onChange={handleChange} />
          </>
        );
      case 3:
        return (
          <>
            <div className="modal-header">
              <button className="close-button" onClick={reset}>×</button>
              <h2>Your funnels</h2>
              <div className="progress-bar">
                <div className="progress" style={{ width: "100%" }} />
              </div>
            </div>
            <p className="subtitle">Add steps of your activation funnel to help generate your onboarding experience.</p>
            <h3>Funnel 1</h3>
            <div className="funnel-row">
              <input name="funnel1step1" placeholder="Step 1" value={formData.funnel1step1} onChange={handleChange} />
              <input name="funnel1step2" placeholder="Step 2" value={formData.funnel1step2} onChange={handleChange} />
              <input name="funnel1step3" placeholder="Step 3" value={formData.funnel1step3} onChange={handleChange} />
            </div>
            <div>
              <label>Frontend tags<span>*</span></label>
              <input name="funnel1tags" placeholder="#selector, [data-testid='cta']" value={formData.funnel1tags} onChange={handleChange} />
            </div>
            <h3>Funnel 2</h3>
            <div className="funnel-row">
              <input name="funnel2step1" placeholder="Step 1" value={formData.funnel2step1} onChange={handleChange} />
              <input name="funnel2step2" placeholder="Step 2" value={formData.funnel2step2} onChange={handleChange} />
              <input name="funnel2step3" placeholder="Step 3" value={formData.funnel2step3} onChange={handleChange} />
            </div>
            <div>
              <label>Frontend tags<span>*</span></label>
              <input name="funnel2tags" placeholder="#selector, [data-testid='cta']" value={formData.funnel2tags} onChange={handleChange} />
            </div>
          </>
        );
      case 4:
        return (
          <div className="loading-screen">
            {!showPreview && (
              <>
                <h2>Hold tight!</h2>
                <p>Generating your onboarding experience...</p>
                <div className="spinner"></div>
              </>
            )}
            {showPreview && (
              <div className="demo-preview" style={{ position: "relative" }}>
                <img src="/uber-dashboard.png" alt="Uber demo" className="demo-image" />
                <div className="tooltip" style={{ top: "56%", left: "18%" }}>Enter your destination</div>
                <div className="tooltip" style={{ top: "86%", left: "48%" }}>Click to see prices</div>
                <ExperimentCard onCreate={() => setShowExperimentModal(true)} />
                {showExperimentModal && (
                  <ExperimentModal
                    onClose={() => {
                      setShowExperimentModal(false);
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                    }}
                  />
                )}
                {showToast && (
                  <div style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    background: "#333",
                    color: "#fff",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                  }}>
                    ✅ Experiment created!
                  </div>
                )}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal">
      {renderStep()}
      {step < 4 && (
        <div className="modal-footer">
          {step > 1 && <button className="back-button" onClick={prevStep}>Back</button>}
          <button
            className="next-button"
            onClick={() => {
              if (step === 3) {
                fetch("https://hooks.zapier.com/hooks/catch/24042000/u419n2c/", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });
              }
              nextStep();
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OnboardingModal;
