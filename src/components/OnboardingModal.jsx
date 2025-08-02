import React, { useState, useEffect } from "react";
import "../main.css";

const OnboardingModal = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
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
              <button className="close-button" onClick={reset}>×</button>
              <h2>Your product</h2>
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
              <button className="close-button" onClick={reset}>×</button>
              <h2>Your funnels</h2>
              <div className="progress-bar"><div className="progress" style={{ width: "100%" }} /></div>
            </div>
            <p className="subtitle">Add steps of your activation funnel to help generate your onboarding experience.</p>

            <h3>Funnel 1</h3>
            <div className="funnel-row">
              <input name="funnel1step1" placeholder="Step 1" onChange={handleChange} />
              <input name="funnel1step2" placeholder="Step 2" onChange={handleChange} />
              <input name="funnel1step3" placeholder="Step 3" onChange={handleChange} />
            </div>
            <div>
              <label>Frontend tags<span>*</span></label>
              <input name="funnel1tags" placeholder="#selector, [data-testid='cta']" onChange={handleChange} />
            </div>

            <h3>Funnel 2</h3>
            <div className="funnel-row">
              <input name="funnel2step1" placeholder="Step 1" onChange={handleChange} />
              <input name="funnel2step2" placeholder="Step 2" onChange={handleChange} />
              <input name="funnel2step3" placeholder="Step 3" onChange={handleChange} />
            </div>
            <div>
              <label>Frontend tags<span>*</span></label>
              <input name="funnel2tags" placeholder="#selector, [data-testid='cta']" onChange={handleChange} />
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
              <div className="demo-preview">
                <img src="/uber-dashboard.png" alt="Uber demo" className="demo-image" />
                <div className="tooltip" style={{ top: '56%', left: '18%' }}>
                  Enter your destination
                </div>
              <div className="tooltip" style={{ top: '94%', left: '18%' }}>
  Click to see prices
</div>
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
          {step > 1 && (
            <button className="back-button" onClick={prevStep}>
              Back
            </button>
          )}
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
