import { useState } from "react";
import "./AnalysePdct.css";
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiHelpCircle,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { calculateProductScore } from "../utils/scoring";
import { saveLatestResult } from "../utils/storage";

const initialFormValues = {
  productName: "",
  productLength: "",
  productWidth: "",
  productHeight: "",
  sellingPrice: "",
  productCostPrice: "",
  metaAdsRunning: "",
  googleTrendStart: "",
  googleTrendCurrent: "",
  improvesConfidence: "",
  improvesConvenience: "",
  savesTime: "",
  solvesRealProblem: "",
  improvesQualityOfLife: "",
  uniqueProduct: "",
  highPerceivedValue: "",
  womenDominantCustomerBase: "",
  easyToMarketWithVideos: "",
};

const requiredNumberFields = [
  "productLength",
  "productWidth",
  "productHeight",
  "sellingPrice",
  "productCostPrice",
  "metaAdsRunning",
  "googleTrendStart",
  "googleTrendCurrent",
];

const requiredChoiceFields = [
  "improvesConfidence",
  "improvesConvenience",
  "savesTime",
  "solvesRealProblem",
  "improvesQualityOfLife",
  "uniqueProduct",
  "highPerceivedValue",
  "womenDominantCustomerBase",
  "easyToMarketWithVideos",
];

const AnalysePdct = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errorMessage, setErrorMessage] = useState("");

  const trimmedProductName = formValues.productName.trim();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleChoiceChange = (fieldName, value) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    setErrorMessage("");
  };

  const isFormComplete = () => {
    const hasProductName = formValues.productName.trim().length > 0;
    const allNumbersPresent = requiredNumberFields.every(
      (fieldName) => formValues[fieldName] !== ""
    );
    const allChoicesSelected = requiredChoiceFields.every(
      (fieldName) => formValues[fieldName] !== ""
    );

    return hasProductName && allNumbersPresent && allChoicesSelected;
  };

  const openResearchPage = (platform) => {
    if (!trimmedProductName) {
      setErrorMessage("Enter the product name first, then use the research buttons.");
      return;
    }

    const encodedProductName = encodeURIComponent(trimmedProductName);
    const targetUrl =
      platform === "google-trends"
        ? `https://trends.google.com/trends/explore?date=today%201-m&q=${encodedProductName}`
        : `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=${encodedProductName}`;

    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormComplete()) {
      setErrorMessage("Fill all fields first so the formula can calculate an accurate score.");
      return;
    }

    const result = calculateProductScore(formValues);

    saveLatestResult(result);
    navigate("/result", {
      state: {
        resultData: result,
      },
    });
  };

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
          <FiHelpCircle /> Fill every input to calculate the final score.
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="criteria-grid">
          <div className="criteria-card">
            <h3>Product Dimensions</h3>

            <Input
              label="Product Length"
              name="productLength"
              placeholder="Enter length in cm"
              value={formValues.productLength}
              onChange={handleInputChange}
            />
            <Input
              label="Product Width"
              name="productWidth"
              placeholder="Enter width in cm"
              value={formValues.productWidth}
              onChange={handleInputChange}
            />
            <Input
              label="Product Height"
              name="productHeight"
              placeholder="Enter height in cm"
              value={formValues.productHeight}
              onChange={handleInputChange}
            />
          </div>

          <div className="criteria-card">
            <h3>Business Viability</h3>

            <Input
              label="Product Name"
              name="productName"
              placeholder="Enter product name"
              value={formValues.productName}
              onChange={handleInputChange}
            />

            <div className="research-panel">
              <p>Research shortcuts</p>
              <div className="research-actions">
                <button
                  type="button"
                  className="research-btn"
                  onClick={() => openResearchPage("google-trends")}
                >
                  Google Trends <FiExternalLink />
                </button>

                <button
                  type="button"
                  className="research-btn"
                  onClick={() => openResearchPage("meta-ads")}
                >
                  Meta Ads Library <FiExternalLink />
                </button>
              </div>
              <span>
                These open the current product name in a new tab so you can check the data and come back.
              </span>
            </div>

            <Input
              label="Selling Price"
              name="sellingPrice"
              placeholder="Enter selling price"
              value={formValues.sellingPrice}
              onChange={handleInputChange}
            />
            <Input
              label="Product Cost Price"
              name="productCostPrice"
              placeholder="Enter buying price"
              value={formValues.productCostPrice}
              onChange={handleInputChange}
            />
            <Input
              label="Meta Ads Running"
              name="metaAdsRunning"
              placeholder="Number of active ads"
              value={formValues.metaAdsRunning}
              onChange={handleInputChange}
            />
          </div>

          <div className="criteria-card">
            <h3>Market Trend</h3>

            <Input
              label="Google Trend - Start of Month"
              name="googleTrendStart"
              placeholder="Enter value 0-100"
              value={formValues.googleTrendStart}
              onChange={handleInputChange}
            />
            <Input
              label="Google Trend - Current Value"
              name="googleTrendCurrent"
              placeholder="Enter value 0-100"
              value={formValues.googleTrendCurrent}
              onChange={handleInputChange}
            />
          </div>

          <div className="criteria-card">
            <h3>Customer Psychology</h3>

            <Option
              label="Improves confidence"
              value={formValues.improvesConfidence}
              onChange={(value) => handleChoiceChange("improvesConfidence", value)}
            />
            <Option
              label="Improves convenience"
              value={formValues.improvesConvenience}
              onChange={(value) => handleChoiceChange("improvesConvenience", value)}
            />
            <Option
              label="Saves time"
              value={formValues.savesTime}
              onChange={(value) => handleChoiceChange("savesTime", value)}
            />
            <Option
              label="Solves real problem"
              value={formValues.solvesRealProblem}
              onChange={(value) => handleChoiceChange("solvesRealProblem", value)}
            />
            <Option
              label="Improves quality of life"
              value={formValues.improvesQualityOfLife}
              onChange={(value) => handleChoiceChange("improvesQualityOfLife", value)}
            />
          </div>

          <div className="criteria-card">
            <h3>Market Edge</h3>

            <LevelOption
              label="Unique product"
              value={formValues.uniqueProduct}
              onChange={(value) => handleChoiceChange("uniqueProduct", value)}
            />
            <LevelOption
              label="High perceived value"
              value={formValues.highPerceivedValue}
              onChange={(value) => handleChoiceChange("highPerceivedValue", value)}
            />
            <Option
              label="Women-dominant customer base"
              value={formValues.womenDominantCustomerBase}
              onChange={(value) =>
                handleChoiceChange("womenDominantCustomerBase", value)
              }
            />
            <Option
              label="Easy to market with videos"
              value={formValues.easyToMarketWithVideos}
              onChange={(value) =>
                handleChoiceChange("easyToMarketWithVideos", value)
              }
            />
          </div>
        </div>

        <div className="analyse-actions">
          <Link to="/" className="back-btn">
            <FiArrowLeft />
            Back
          </Link>

          <button type="submit" className="next-btn">
            Calculate Score <FiArrowRight />
          </button>
        </div>

        {errorMessage ? <p className="form-message">{errorMessage}</p> : null}
      </form>
    </div>
  );
};

const Input = ({ label, name, placeholder, value, onChange }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={name === "productName" ? "text" : "number"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={name === "productName" ? undefined : "0"}
        max={name.includes("googleTrend") ? "100" : undefined}
      />
    </div>
  );
};

const Option = ({ label, value, onChange }) => {
  return (
    <div className="option-row">
      <p>{label}</p>

      <div className="option-buttons">
        <button
          type="button"
          className={value === "yes" ? "active-option" : ""}
          onClick={() => onChange("yes")}
        >
          Yes
        </button>

        <button
          type="button"
          className={value === "no" ? "active-option" : ""}
          onClick={() => onChange("no")}
        >
          No
        </button>
      </div>
    </div>
  );
};

const LevelOption = ({ label, value, onChange }) => {
  return (
    <div className="option-row vertical">
      <p>{label}</p>

      <div className="option-buttons">
        <button
          type="button"
          className={value === "low" ? "active-option" : ""}
          onClick={() => onChange("low")}
        >
          Low
        </button>

        <button
          type="button"
          className={value === "medium" ? "active-option" : ""}
          onClick={() => onChange("medium")}
        >
          Medium
        </button>

        <button
          type="button"
          className={value === "high" ? "active-option" : ""}
          onClick={() => onChange("high")}
        >
          High
        </button>
      </div>
    </div>
  );
};

export default AnalysePdct;
