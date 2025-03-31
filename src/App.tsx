import { useState } from "react";
import { ThreeProvider } from "./hooks/useThreeContext";

function App() {
  return (
    <ThreeProvider>
      <></>
      {/* insert scene here */}
    </ThreeProvider>
  );
}

export default App;
