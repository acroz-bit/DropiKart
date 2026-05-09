import React from "react";
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
import { Link } from "react-router-dom";

const Result = ({ resultData }) => {
  const data = resultData || {
    totalScore: 86,
    criteriaScore: 72,
    marketScore: 10,
    competitionScore: 4,
    googleTrends: 78,
    activeAds: 120,
    strengths: [
      "Solves real problem",
      "High perceived value",
      "Improves convenience",
      "Easy to market with videos",
      "High profit margin",
    ],
    weaknesses: [
      "Not a unique product",
      "Not very small in size",
      "Medium competition in market",
    ],
    tips: [
      "Try to highlight uniqueness in your marketing.",
      "Focus on a specific niche audience.",
    ],
  };

  const isWinning = data.totalScore >= 75;

  const getCompetitionLevel = (ads) => {
    if (ads < 100) return "Low Competition";
    if (ads <= 500) return "Medium Competition";
    return "High Competition";
  };

  const competitionLevel = getCompetitionLevel(data.activeAds);

  return (
    <div className="result-page">
      <h1>Results</h1>

      <div className="result-steps">
        <div className="result-step completed">
          <div className="step-circle"><FiCheck /></div>
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
          <div
            className="result-circle"
            style={{
              background: `conic-gradient(${
                isWinning ? "#22c55e" : "#f97316"
              } ${data.totalScore * 3.6}deg, #eef0f6 0deg)`,
            }}
          >
            <div className="result-circle-inner">
              <h2>{data.totalScore}</h2>
              <p>/100</p>
            </div>
          </div>

          <div className={isWinning ? "result-winning" : "result-average"}>
            {isWinning ? <FiAward /> : <FiAlertTriangle />}
            {isWinning ? "Winning Product" : "Average Product"}
          </div>

          <p className="result-message">
            {isWinning
              ? "This product has high potential for success!"
              : "This product needs improvement before scaling."}
          </p>
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
              <h3>{data.googleTrends}<span>/100</span></h3>

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
                    competitionLevel === "Low Competition"
                      ? "low-comp"
                      : competitionLevel === "Medium Competition"
                      ? "medium-comp"
                      : "high-comp"
                  }
                >
                  {competitionLevel}
                </span>
              </div>

              <FiUsers />
            </div>
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

        <button className="save-btn">
          <FiSave /> Save to History <FiArrowRight />
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

      {items.map((item, index) => (
        <div className="info-row" key={index}>
          <FiCheck />
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default Result;