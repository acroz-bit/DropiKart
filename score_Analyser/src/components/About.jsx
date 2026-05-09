import React from "react";
import "./About.css";
import {
  FiCode,
  FiDatabase,
  FiLinkedin,
  FiTrendingUp,
} from "react-icons/fi";

const About = () => {
  return (
    <div className="about-page">

      <div className="about-hero">
        <div className="about-badge">
          <FiTrendingUp />
          Dropshipping Product Analyzer
        </div>

        <h1>
          About <span>DropiKart</span>
        </h1>

        <p>
          DropiKart is a smart product evaluation platform designed to help
          dropshippers identify winning products using data-driven analysis.
          The application evaluates products using market trends, product
          psychology, competition analysis, pricing, and business viability
          factors to generate a final product score.
        </p>
      </div>

      <div className="team-grid">

        <div className="team-card">
          <div className="team-icon frontend">
            <FiCode />
          </div>

          <h2>Frontend Development</h2>

          <h3>Shaurya Sharma</h3>

          <p>
            Designed and developed the complete frontend UI/UX of the
            application using React.js, CSS, routing, reusable components,
            responsive layouts, and interactive product analysis interfaces.
          </p>

          <a
            href="#"
            className="linkedin-btn"
          >
            <FiLinkedin />
            Shaurya
          </a>
        </div>

        <div className="team-card">
          <div className="team-icon backend">
            <FiDatabase />
          </div>

          <h2>Backend Development</h2>

          <h3>Devansh Aggrawal</h3>

          <p>
            Responsible for backend logic, calculations, scoring systems,
            product evaluation algorithms, data handling, and integration of
            application functionality with the frontend interface.
          </p>

          <a
            href="#"
            className="linkedin-btn"
          >
            <FiLinkedin />
            Devansh
          </a>
        </div>

      </div>

      <div className="about-footer-card">
        <h2>Project Goal</h2>

        <p>
          The goal of this project is to simplify product research for
          dropshippers by converting multiple decision-making factors into a
          clear scoring system. Instead of relying on guesswork, users can use
          measurable product insights to make better business decisions.
        </p>
      </div>

    </div>
  );
};

export default About;