import React from "react";
import StepWizard from "react-step-wizard";

import VehicleSelection from "./components/VehicleSelection";
import Journey from "./components/Journey";
import Confirmation from "./components/Confirmation";

const NewBooking = () => {
  return (
    
      <StepWizard>
        <VehicleSelection />
        <Journey />
        <Confirmation />
      </StepWizard>
    
  );
};
export default NewBooking;
