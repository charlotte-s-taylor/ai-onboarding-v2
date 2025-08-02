// src/components/OnboardingModal.jsx
import React, { useState, useEffect } from "react";
import "../main.css";

const OnboardingModal = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const [showDemo, setShowDemo] = useState(false);
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

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  const reset = () => {
    setStep(1);
    onFinish();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => setShowDemo(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const renderStep = () => {
    if (step === 4 && !showDemo) {
      return (
        <div className="loading-screen">
          <h2>Hold tight!</h2>
          <p>Generating your onboarding experience...</p>
          <div className="spinner"></div>
        </div>
      );
    }

    if (step === 4 && showDemo) {
      return (
        <div className="demo-preview">
          <img src="/uber-dashboard.png" alt="Uber demo" className="demo-image" />
          <div className="tooltip" style={{ top: "60%", left: "10%" }}>
            Enter destination
          </div>
          <div className="tooltip" style={{ top: "60%", left: "60%" }}>
            Find prices
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="modal-header">
          <h2>
            {step === 1 && "Your details"}
            {step === 2 && "Your product"}
            {step === 3 && "Your activation funnels"}
          </h2>
          <button className="close-button" onClick={reset}>×</button>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${step * 25}%` }} />
          </div>
        </div>

        {step === 1 && (
          <>
            <p className="subtitle">Tell us about you.</p>
            <label>Name<span>*</span></label>
            <input name="name" placeholder="Add name" onChange={handleChange} />
            <label>Company<span>*</span></label>
            <input name="company" placeholder="Add company" onChange={handleChange} />
            <label>Role<span>*</span></label>
            <input name="role" placeholder="Add role" onChange={handleChange} />
          </>
        )}

        {step === 2 && (
          <>
            <p className="subtitle">Tell us about your product to help us generate your onboarding experience.</p>
            <label>Product feature/name<span>*</span></label>
            <input name="feature" placeholder="Add name" onChange={handleChange} />
            <label>Link to your application<span>*</span></label>
            <input name="link" placeholder="Add link" onChange={handleChange} />
            <label>Activation step 1<span>*</span></label>
            <input name="activation1" placeholder="e.g. create a new project" onChange={handleChange} />
            <label>Activation step 2</label>
            <input name="activation2" placeholder="e.g. add a colleague" onChange={handleChange} />
          </>
        )}

        {step === 3 && (
          <>
            <p className="subtitle">Add steps of your activation funnel to help generate your onboarding experience.</p>
            <h3>Funnel 1</h3>
            <div className="funnel-steps">
              <input name="funnel1step1" placeholder="Step 1" onChange={handleChange} />
              <input name="funnel1step2" placeholder="Step 2" onChange={handleChange} />
              <input name="funnel1step3" placeholder="Step 3" onChange={handleChange} />
            </div>
            <label>Frontend tags<span>*</span></label>
            <input name="funnel1tags" placeholder="#submit, [data-testid='cta']" onChange={handleChange} />

            <h3>Funnel 2</h3>
            <div className="funnel-steps">
              <input name="funnel2step1" placeholder="Step 1" onChange={handleChange} />
              <input name="funnel2step2" placeholder="Step 2" onChange={handleChange} />
              <input name="funnel2step3" placeholder="Step 3" onChange={handleChange} />
            </div>
            <label>Frontend tags<span>*</span></label>
            <input name="funnel2tags" placeholder="#submit, [data-testid='cta']" onChange={handleChange} />
          </>
        )}
      </>
    );
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
