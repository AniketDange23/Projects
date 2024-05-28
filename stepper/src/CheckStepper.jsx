import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckStepper = ({ stepConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const SteRef = useRef([]);

  useEffect(() => {
    if (SteRef.current.length) {
      setMargins({
        marginLeft: SteRef.current[0].offsetWidth / 2,
        marginRight: SteRef.current[SteRef.current.length - 1].offsetWidth / 2,
      });
    }
  }, [SteRef, stepConfig.length]);

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepConfig.length) {
        if (!isComplete) {
          setIsComplete(true);
          toast.success('Thanks for visiting!');
        }
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };
  

  const calculateProgress = () => {
    return ((currentStep - 1) / (stepConfig.length - 1)) * 100;
  };


  return (
    <>
      <div className="stepper">
        {stepConfig.map((step, index) => (
          <div
            key={step.name}
            ref={(el) => (SteRef.current[index] = el)}
            className={`step ${
              currentStep > index + 1 || isComplete ? "completed" : ""
            } ${currentStep === index + 1 ? "active" : ""}`}
          >
            <div className="step-number">
              {currentStep > index + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (
                step.icon
              )}
            </div>
            <div className="info">
                          <h3 className="step-name">{step.name}</h3>

            </div>
          </div>
        ))}
        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>
      <div className="step-content">
        {stepConfig[currentStep - 1].component()}
      </div>
      {!isComplete && (
        <button className="btn" onClick={handleNext}>
          {currentStep === stepConfig.length ? "Finish" : "Next"}
        </button>
      )}
      <ToastContainer />
    </>
  );
};

export default CheckStepper;
