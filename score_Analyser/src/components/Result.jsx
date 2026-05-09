import { useEffect, useState } from "react";
import "./Result.css";
import {
  FiCheck,
  FiAward,
  FiAlertTriangle,
  FiRefreshCw,
  FiSave,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import {
  getLatestResult,
  isResultSaved,
  saveLatestResult,
  saveResultToHistory,
} from "../utils/storage";

const Result = ({ resultData }) => {
  const location = useLocation();
  const data = location.state?.resultData || resultData || getLatestResult();
  const [, setSavedVersion] = useState(0);

  useEffect(() => {
    if (location.state?.resultData) {
      saveLatestResult(location.state.resultData);
    }
  }, [location.state]);

  if (!data) {
    return (
      <div className="result-page">
        <h1>Results</h1>

        <div className="result-empty-state">
          <h2>No calculation found</h2>
          <p>Go to the analysis form, enter the product details, and calculate the score first.</p>
          <Link to="/analyse" className="reset-btn">
            <FiRefreshCw /> Analyse a Product
          </Link>
        </div>
      </div>
    );
  }

  const isWinning = data.verdictTone === "winning";
  const isWeak = data.verdictTone === "weak";
  const saved = isResultSaved(data.id);
  const verdictClassName = isWinning
    ? "result-winning"
    : isWeak
    ? "result-weak"
    : "result-average";
  const ringColor = isWinning ? "#22c55e" : isWeak ? "#ef4444" : "#f97316";

  const handleSave = () => {
    saveResultToHistory(data);
    saveLatestResult(data);
    setSavedVersion((currentValue) => currentValue + 1);
  };

  return (
    <div className="result-page">
      <h1>Results</h1>

      <div className="result-steps">
        <div className="result-step completed">
          <div className="step-circle">
            <FiCheck />
          </div>
          <p>Calculate Score</p>
        </div>

        <div className="step-line"></div>

        <div className="result-step active">
          <div className="step-circle">2</div>
          <p>Results</p>
        </div>
      </div>

      <div className="result-main">
        <div className="final-score-card">
          <p className="result-product-name">{data.productName}</p>

          <div
            className="result-circle"
            style={{
              background: `conic-gradient(${ringColor} ${
                data.totalScore * 3.6
              }deg, var(--surface-step) 0deg)`,
            }}
          >
            <div className="result-circle-inner">
              <h2>{data.totalScore}</h2>
              <p>/100</p>
            </div>
          </div>

          <div className={verdictClassName}>
            {isWinning ? <FiAward /> : <FiAlertTriangle />}
            {data.verdict}
          </div>

          <p className="result-message">{data.message}</p>
        </div>

        <div className="result-details">
          <h2>Score Breakdown</h2>

          <div className="breakdown-grid">
            <ScoreBox label="Criteria Score" value={data.criteriaScore} max={80} />
            <ScoreBox label="Market Score" value={data.marketScore} max={15} />
            <ScoreBox label="Competition Score" value={data.competitionScore} max={5} />
          </div>

          <h2 className="insight-title">Market Insights</h2>

          <div className="market-grid">
            <div className="market-card">
              <p>Google Trends Score</p>
              <h3>
                {data.googleTrends}
                <span>/100</span>
              </h3>

              <svg className="result-mini-graph" viewBox="0 0 120 50">
                <polyline
                  points="0,38 18,25 35,30 52,14 70,28 88,18 105,26 120,8"
                  fill="none"
                  stroke="#6d35f5"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="120" cy="8" r="4" fill="#6d35f5" />
              </svg>
            </div>

            <div className="market-card ads-card">
              <div>
                <p>Active Ads Count</p>
                <h3>{data.activeAds}</h3>
                <span
                  className={
                    data.competitionLevel === "Low Competition"
                      ? "low-comp"
                      : data.competitionLevel === "Medium Competition"
                      ? "medium-comp"
                      : "high-comp"
                  }
                >
                  {data.competitionLevel}
                </span>
              </div>

              <FiUsers />
            </div>
          </div>

          <h2 className="insight-title">Formula Highlights</h2>

          <div className="breakdown-grid">
            {(data.formulaBreakdown || []).map((item) => (
              <ScoreBox key={item.label} label={item.label} value={item.value} max={item.max} />
            ))}
          </div>
        </div>
      </div>

      <div className="analysis-grid">
        <InfoCard title="Strengths" type="strength" items={data.strengths} />
        <InfoCard title="Weaknesses" type="weakness" items={data.weaknesses} />
        <InfoCard title="Improvement Tips" type="tips" items={data.tips} />
      </div>

      <div className="result-actions">
        <Link to="/analyse" className="reset-btn">
          <FiRefreshCw /> Reset
        </Link>

        <button type="button" className="save-btn" onClick={handleSave} disabled={saved}>
          <FiSave /> {saved ? "Saved to History" : "Save to History"} <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

const ScoreBox = ({ label, value, max }) => {
  return (
    <div className="score-box">
      <p>{label}</p>
      <h3>
        {value}
        <span>/{max}</span>
      </h3>
    </div>
  );
};

const InfoCard = ({ title, type, items }) => {
  return (
    <div className={`info-card ${type}`}>
      <h3>{title}</h3>

      {items.map((item) => (
        <div className="info-row" key={item}>
          <FiCheck />
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default Result;
