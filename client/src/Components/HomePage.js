import React from "react";
import AwardsPage from "./AwardsPage";
import HighlightsofHouses from "./HighlightsofHouses";
import QuestionsPage from "./QuestionsPage";
import LandingPage from "./LandingPage";
import "./homepage.css"; 

function HomePage() {
  return (
    <div id="homepage-container">
      <LandingPage />
      <AwardsPage />
      <br /><br /><br />
      <HighlightsofHouses />
      <br /><br /><br /><br />
      <QuestionsPage />
    </div>
  );
}

export default HomePage;
