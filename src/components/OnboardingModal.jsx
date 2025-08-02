// src/components/OnboardingModal.jsx
import React, { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const reset = () => setStep(1);

  const handleFinalSubmit = () => {
    fetch("https://hooks.zapier.com/hooks/catch/24042000/u419n2c/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    nextStep();
    setTimeout(onFinish, 3000);
  };

  return (
    <div className="modal">
      {step === 1 && (
        <>
          <div className="modal-header">
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
      )}
      {step === 2 && (
        <>
          <div className="modal-header">
            <h2>Your product</h2>
            <div className="progress-bar"><div className="progress" style={{ width: "66%" }} /></div>
          </div>
          <p className="subtitle">Help us generate your onboarding experience.</p>
          <label>Product feature/name<span>*</span></label>
          <input name="feature" placeholder="Add name" onChange={handleChange} />
          <label>Link to your application<span>*</span></label>
          <input name="link" placeholder="Add link" onChange={handleChange} />
          <label>Activation step 1<span>*</span></label>
          <input name="activation1" placeholder="First activation step e.g. create a new project" onChange={handleChange} />
          <label>Activation step 2</label>
          <input name="activation2" placeholder="Second activation step e.g. add a colleague" onChange={handleChange} />
        </>
      )}
      {step === 3 && (
        <>
          <div className="modal-header">
            <h2>Your activation funnels</h2>
            <div className="progress-bar"><div className="progress" style={{ width: "100%" }} /></div>
          </div>
          <p className="subtitle">Add funnel steps and frontend tags.</p>
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
      )}
      {step === 4 && (
        <div className="loading-screen">
          <h2>Hold tight!</h2>
          <p>Generating your onboarding experience...</p>
          <div className="spinner"></div>
        </div>
      )}

      {step < 4 && (
        <div className="modal-footer">
          {step > 1 && <button onClick={prevStep}>Back</button>}
          {step === 3 && <button onClick={reset}>Cancel</button>}
          <button onClick={step === 3 ? handleFinalSubmit : nextStep}>Next</button>
        </div>
      )}
    </div>
  );
};

export default OnboardingModal;
