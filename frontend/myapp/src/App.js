import React from "react";

import Tasks from "./Tasks/pages/Tasks";
import Layout from "./shared/Layout/Layout";
import MainNavigation from "./shared/navigation/MainNavigation";
import "./App.css";

function App() {
  return (
    <Layout>
      <MainNavigation />
      <Tasks />
    </Layout>
  );
}

export default App;
