import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import { FrontApp } from "./FrontApp";
import { BackApp } from "./BackApp";

function App() {
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <Routes>
          <Route path="/front/*" element={<FrontApp />} />
          <Route path="/back/*" element={<BackApp />} />
          <Navigate to="/front" />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
