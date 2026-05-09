import React from "react";
import "./AnalysePdct.css";
import { FiArrowLeft, FiArrowRight, FiHelpCircle } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

const AnalysePdct = () => {
  return (
    <div className="analyse-page">
      <div className="analyse-header">
        <h1>Calculate Score</h1>

        <div className="steps">
          <div className="step active">
            <div className="step-circle">1</div>
            <p>Calculate Score</p>
          </div>

          <div className="step">
            <div className="step-circle">2</div>
            <p>Result</p>
          </div>
        </div>
      </div>

      <div className="criteria-header">
        <h2>Product Analysis Form</h2>
        <span>
          <FiHelpCircle /> Need help?
        </span>
      </div>

      <div className="criteria-grid">
        <div className="criteria-card">
          <h3>Product Dimensions</h3>

          <Input label="Product Length" placeholder="Enter length in cm" />
          <Input label="Product Width" placeholder="Enter width in cm" />
          <Input label="Product Height" placeholder="Enter height in cm" />
        </div>

        <div className="criteria-card">
          <h3>Business Viability</h3>
          <Input
            label="Product Name"
            placeholder="Enter product name"
          />

          <Input label="Selling Price" placeholder="Enter selling price" />
          <Input label="Product Cost Price" placeholder="Enter buying price" />
          <Input label="Meta Ads Running" placeholder="Number of active ads" />
        </div>

        <div className="criteria-card">
          <h3>Market Trend</h3>

          <Input label="Google Trend - Start of Month" placeholder="Enter value 0-100" />
          <Input label="Google Trend - Current Value" placeholder="Enter value 0-100" />
        </div>

        <div className="criteria-card">
          <h3>Customer Psychology</h3>

          <Option label="Improves confidence" />
          <Option label="Improves convenience" />
          <Option label="Saves time" />
          <Option label="Solves real problem" />
          <Option label="Improves quality of life" />
        </div>

        <div className="criteria-card">
          <h3>Market Edge</h3>

          <LevelOption label="Unique product" />
          <LevelOption label="High perceived value" />
          <Option label="Women-dominant customer base" />
          <Option label="Easy to market with videos" />
        </div>
      </div>

      <div className="analyse-actions">
      <Link to="/" className="back-btn">
  <FiArrowLeft />
  Back
</Link>

        <Link to="/result" className="next-btn">
  Calculate Score <FiArrowRight />
</Link>
      </div>
    </div>
  );
};

const Input = ({ label, placeholder }) => {
  return (
    <div className="input-group">
      <label>{label}</label>

      <input
        type={
          label === "Product Name"
            ? "text"
            : "number"
        }
        placeholder={placeholder}
      />
    </div>
  );
};

const Option = ({ label }) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="option-row">
      <p>{label}</p>

      <div className="option-buttons">
        <button
          className={selected === "yes" ? "active-option" : ""}
          onClick={() => setSelected("yes")}
        >
          Yes
        </button>

        <button
          className={selected === "no" ? "active-option" : ""}
          onClick={() => setSelected("no")}
        >
          No
        </button>
      </div>
    </div>
  );
};
const LevelOption = ({ label }) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="option-row vertical">
      <p>{label}</p>

      <div className="option-buttons">
        <button
          className={selected === "low" ? "active-option" : ""}
          onClick={() => setSelected("low")}
        >
          Low
        </button>

        <button
          className={selected === "medium" ? "active-option" : ""}
          onClick={() => setSelected("medium")}
        >
          Medium
        </button>

        <button
          className={selected === "high" ? "active-option" : ""}
          onClick={() => setSelected("high")}
        >
          High
        </button>
      </div>
    </div>
  );
};


export default AnalysePdct;