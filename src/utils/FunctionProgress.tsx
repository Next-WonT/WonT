import React from "react";
import Lottie from "react-lottie-player";
import function_progress from "@/lib/functionprogress/functionProgress.json";

function FunctionProgress() {
  return (
    <div>
      <Lottie
        loop
        animationData={function_progress}
        play
        // style 은 선택
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}

export default FunctionProgress;
