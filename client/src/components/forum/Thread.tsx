import React from "react";
import { useNavigate } from "react-router-dom";

const Thread = () => {
  const navigate = useNavigate();
  
  const handleNavigateBack = () => {
    navigate(-1);
  }

  return (
    <>
      <button onClick={handleNavigateBack}>Back</button>
      <div>Thread</div>
    </>
  );
};

export default Thread;
