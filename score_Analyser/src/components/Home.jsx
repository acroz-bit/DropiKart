import { useState } from "react";
import "./Home.css";
import {
  FiArrowRight,
  FiAward,
  FiPlayCircle,
  FiAlertTriangle,
  FiTrendingUp,
  FiBarChart2,
  FiTarget,
  FiShield,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import neckMassager from "../assets/neckMassager.jpg";
import petGloves from "../assets/petGloves.webp";
import blender from "../assets/blender.webp";
import lamp from "../assets/lamp.webp";
import scrubber from "../assets/scrubber.webp";

const Home = () => {
  const [criteriaScore] = useState(() => Math.floor(Math.random() * 81));
  const [marketScore] = useState(() => Math.floor(Math.random() * 16));
  const [competitionScore] = useState(() => Math.floor(Math.random() * 6));
  const [googleTrends] = useState(() => Math.floor(Math.random() * 101));
  const [adsCount] = useState(() => Math.floor(Math.random() * 50) + 1);

  const totalScore = criteriaScore + marketScore + competitionScore;
  const verdictTone =
    totalScore >= 75 ? "winning" : totalScore >= 50 ? "average" : "weak";

  const products = [
    { name: "Neck Massager", score: 89, tag: "Trending", image: neckMassager },
    { name: "Pet Grooming Glove", score: 79, tag: "High Margin", image: petGloves },
    { name: "Portable Blender", score: 76, tag: "High Demand", image: blender },
    { name: "Sunset Projector Lamp", score: 74, tag: "Trending", image: lamp },
    { name: "Silicone Face Scrubber", score: 70, tag: "Medium Demand", image: scrubber },
  ];

  const stats = [
    { icon: <FiBarChart2 />, value: "500+", title: "Products Analyzed", desc: "And counting" },
    { icon: <FiAward />, value: "78", title: "Average Winning Score", desc: "For successful products" },
    { icon: <FiTarget />, value: "13", title: "Proven Criteria", desc: "Data-backed scoring system" },
    { icon: <FiShield />, value: "100%", title: "Data-Driven", desc: "No guesswork, just data" },
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-left">
          <h1>
            FIND WINNNING
            <br />
            DROPSHIPPING
            <br />
            PRODUCTS.
            <br />
          </h1>
          <p>
            Score products on 13 proven criteria, analyse market
            <br />
            demand and competetion, and make <span>data-driven decisions.</span>
          </p>
          <div className="hero-buttons">
            <Link to="/analyse" className="primary-btn">
              Analyse a Product <FiArrowRight />
            </Link>
            <button type="button" className="secondary-btn">
              <FiPlayCircle /> How it Works
            </button>
          </div>
        </div>
        <div className="hero-right">
          <ScoreCard
            score={totalScore}
            criteriaScore={criteriaScore}
            marketScore={marketScore}
            competitionScore={competitionScore}
            googleTrends={googleTrends}
            adsCount={adsCount}
            verdictTone={verdictTone}
          />
        </div>
      </section>

      <TrendingProducts products={products} />
      <StatsSection stats={stats} />
    </div>
  );
};

const ScoreCard = ({
  score,
  criteriaScore,
  marketScore,
  competitionScore,
  googleTrends,
  adsCount,
  verdictTone,
}) => {
  const isWinning = verdictTone === "winning";
  const isWeak = verdictTone === "weak";
  const badgeText = isWinning ? "Winning Product" : isWeak ? "Weak Product" : "Average Product";
  const badgeClassName = isWinning ? "winning-box" : "average-box";
  const scoreRingColor = isWinning ? "#22c55e" : isWeak ? "#ef4444" : "#6d35f5";

  return (
    <div className="score-card">
      <div className="score-left">
        <h3>Product Score</h3>

        <div
          className="circle-score"
          style={{
            background: `conic-gradient(${scoreRingColor} ${score * 3.6}deg, var(--ring-track) 0deg)`,
          }}
        >
          <div className="circle-inner">
            <h2>{score}</h2>
            <p>/100</p>
          </div>
        </div>

        <div className={badgeClassName}>
          {isWinning ? <FiAward /> : <FiAlertTriangle />}
          {badgeText}
        </div>

        <p className="success-text">
          {isWinning
            ? "High potential for success!"
            : isWeak
            ? "Needs major validation before testing."
            : "Needs better product validation."}
        </p>
      </div>

      <div className="score-right">
        <h3>Score Breakdown</h3>

        <Progress label="Criteria Score" value={criteriaScore} max={80} />
        <Progress label="Market Score" value={marketScore} max={15} />
        <Progress label="Competition Score" value={competitionScore} max={5} />

        <div className="market-insights">
          <h4>Market Insights</h4>

          <div className="insight-grid">
            <div className="insight-box">
              <p>Google Trends</p>
              <h3>{googleTrends}/100</h3>
              <svg className="mini-graph" viewBox="0 0 120 50">
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

            <div className="insight-box">
              <p>Active Ads Count</p>
              <h3>{adsCount}</h3>
              <span>
                {adsCount <= 50
                  ? "Low Competition"
                  : adsCount <= 250
                  ? "Medium Competition"
                  : "High Competition"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Progress = ({ label, value, max }) => {
  const percent = (value / max) * 100;

  return (
    <div className="progress-box">
      <div className="progress-info">
        <span>{label}</span>
        <strong>
          {value}/{max}
        </strong>
      </div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

const TrendingProducts = ({ products }) => {
  return (
    <section className="trending-section">
      <div className="section-header">
        <div>
          <h2>
            <FiTrendingUp /> Trending Products
          </h2>
          <p>Top scoring products this week</p>
        </div>

        <Link to="/analyse" className="view-all">
          View All <FiArrowRight />
        </Link>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.name}>
            <img src={product.image} alt={product.name} />

            <div className="product-info">
              <div>
                <h3>{product.name}</h3>
                <span>{product.tag}</span>
              </div>

              <div
                className={
                  product.score >= 75
                    ? "product-score score-good"
                    : "product-score score-mid"
                }
              >
                {product.score}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const StatsSection = ({ stats }) => {
  return (
    <section className="stats-section">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.title}>
          <div className="stat-icon">{stat.icon}</div>

          <div>
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
            <span>{stat.desc}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;
