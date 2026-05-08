import React , { useState } from 'react'
import './Home.css';
import { FiArrowRight, FiAward, FiPlayCircle ,FiAlertTriangle } from 'react-icons/fi';
import { Link } from 'react-router-dom';



const Home = () => {
  const [criteriaScore] = useState(() => Math.floor(Math.random() * 81));
  const [marketScore] = useState(() => Math.floor(Math.random() * 16));
  const [competitionScore] = useState(() => Math.floor(Math.random() * 6));
  const [googleTrends] = useState(() => Math.floor(Math.random() * 101));
  const [adsCount] = useState(() => Math.floor(Math.random() * 50));

  const totalScore = criteriaScore + marketScore + competitionScore;

  return (
    <div className='home-page'>
      <section className='hero-section'>
        <div className='hero-left'>
        <h1>
        FIND WINNNING<br/>
        DROPSHIPPING<br/>
        PRODUCTS.<br/>
        </h1>
        <p>
          Score products on 13 proven criteria, analyse market<br/>
          demand and competetion, and make <span>data-driven decisions.</span>
        </p>
        <div className='hero-buttons'>
          <Link to='/analyse' className='primary-btn'>
          Analyse a Product <FiArrowRight/>
          </Link>
        <button className='secondary-btn'> 
          <FiPlayCircle/> How it Works
          </button>
        </div>
        </div>
        <div className='hero-right'>
          <ScoreCard 
          score={totalScore}
          criteriaScore={criteriaScore}
          marketScore={marketScore}
          competitionScore={competitionScore}
          googleTrends={googleTrends}
          adsCount={adsCount}
          />
        </div>
      </section>
    </div>
  )
}

const ScoreCard = ({
  score,
  criteriaScore,
  marketScore,
  competitionScore,
  googleTrends,
  adsCount,
}) => {
  const isWinning = score >= 70;

  return (
    <div className="score-card">
      <div className="score-left">
        <h3>Product Score</h3>

        <div
          className="circle-score"
          style={{
            background: `conic-gradient(#6d35f5 ${
              score * 3.6
            }deg, #ece9ff 0deg)`,
          }}
        >
          <div className="circle-inner">
            <h2>{score}</h2>
            <p>/100</p>
          </div>
        </div>

        <div className={isWinning ? "winning-box" : "average-box"}>
                {
          isWinning
          ? (
              <>
                <FiAward />
                Winning Product
              </>
            )
          : (
              <>
                <FiAlertTriangle />
                Average Product
              </>
            )
        }
        </div>

        <p className="success-text">
          {isWinning
            ? "High potential for success!"
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
              <div className="fake-graph"></div>
            </div>

            <div className="insight-box">
              <p>Active Ads Count</p>
              <h3>{adsCount}</h3>
              <span>{adsCount <= 15 ? "Low Competition" : "High Competition"}</span>
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

export default Home;
