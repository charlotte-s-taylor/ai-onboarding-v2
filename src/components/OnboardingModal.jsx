// src/components/OnboardingModal.jsx
import React, { useState } from "react";
import "../main.css";

const OnboardingModal = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    feature: "",
    link: "",
    activation1: "",
    activation2: "",
    funnel1steps: "",
    funnel1tags: "",
    funnel2steps: "",
    funnel2tags: "",
  });

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
              <h2>Your details</h2>
              <button className="close-button" onClick={reset}>×</button>
              <div className="progress-bar"><div className="progress" style={{ width: "33%" }} /></div>
            </div>
            <p className="subtitle">Tell us about you.</p>
            <label>Name<span>*</span></label>
            <input name="name" placeholder="Add name" onChange={handleChange} />
            <label>Company<span>*</span></label>
            <input name="company" placeholder="Add company" onChange={handleChange} />
            <label>Role<span>*</span></label>
            <input name="role" placeholder="Add role" onChange={handleChange} />
          </>
        );
      case 2:
        return (
          <>
            <div className="modal-header">
              <h2>Your product</h2>
              <button className="close-button" onClick={reset}>×</button>
              <div className="progress-bar"><div className="progress" style={{ width: "66%" }} /></div>
            </div>
            <p className="subtitle">Tell us about your product to help us generate your onboarding experience.</p>
            <label>Product feature/name<span>*</span></label>
            <input name="feature" placeholder="Add name" onChange={handleChange} />
            <label>Link to your application<span>*</span></label>
            <input name="link" placeholder="Add link" onChange={handleChange} />
            <label>Activation step 1<span>*</span></label>
            <input name="activation1" placeholder="First activation step e.g. create a new project" onChange={handleChange} />
            <label>Activation step 2</label>
            <input name="activation2" placeholder="Second activation step e.g. add a colleague" onChange={handleChange} />
          </>
        );
      case 3:
        return (
          <>
            <div className="modal-header">
              <h2>Your activation funnels</h2>
              <button className="close-button" onClick={reset}>×</button>
              <div className="progress-bar"><div className="progress" style={{ width: "100%" }} /></div>
            </div>
            <p className="subtitle">Add steps of your activation funnel to help generate your onboarding experience.</p>
            <h3>Funnel 1</h3>
            <div className="funnel-row">
              <div>
                <label>Steps in the funnel<span>*</span></label>
                <input name="funnel1steps" placeholder="Step 1, Step 2, Step 3" onChange={handleChange} />
              </div>
              <div>
                <label>Frontend tags<span>*</span></label>
                <input name="funnel1tags" placeholder="#profile-pic, [data-testid='cta-button']" onChange={handleChange} />
              </div>
            </div>
            <h3>Funnel 2</h3>
            <div className="funnel-row">
              <div>
                <label>Steps in the funnel<span>*</span></label>
                <input name="funnel2steps" placeholder="Step 1, Step 2, Step 3" onChange={handleChange} />
              </div>
              <div>
                <label>Frontend tags<span>*</span></label>
                <input name="funnel2tags" placeholder="#profile-pic, [data-testid='cta-button']" onChange={handleChange} />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <div className="loading-screen">
            <h2>Hold tight!</h2>
            <p>Generating your onboarding experience...</p>
            <div className="spinner"></div>
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
          {step > 1 && <button onClick={prevStep}>Back</button>}
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
