import React from "react";
import "./History.css";
import { FiSearch, FiChevronDown, FiEye, FiTrash2 } from "react-icons/fi";

const History = ({ historyData }) => {
  const data = historyData || [
    {
      product: "Sunset Projector Lamp",
      score: 86,
      verdict: "Winning Product",
      date: "May 24, 2024",
    },
    {
      product: "Neck Massager",
      score: 82,
      verdict: "Winning Product",
      date: "May 23, 2024",
    },
    {
      product: "Pet Grooming Glove",
      score: 81,
      verdict: "Winning Product",
      date: "May 22, 2024",
    },
    {
      product: "Portable Blender",
      score: 79,
      verdict: "Test Potential",
      date: "May 21, 2024",
    },
    {
      product: "Wireless Earbuds",
      score: 58,
      verdict: "Avoid",
      date: "May 20, 2024",
    },
  ];

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>History</h1>

        <div className="history-controls">
          <div className="search-box">
            <FiSearch />
            <input type="text" placeholder="Search products..." />
          </div>

          <button className="filter-btn">
            Filter <FiChevronDown />
          </button>
        </div>
      </div>

      <div className="history-table-card">
        <table className="history-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Score</th>
              <th>Verdict</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.product}</td>

                <td>
                  <span
                    className={`score-pill ${
                      item.score >= 80
                        ? "score-green"
                        : item.score >= 70
                        ? "score-yellow"
                        : "score-red"
                    }`}
                  >
                    {item.score}
                  </span>
                </td>

                <td>
                  <span
                    className={`verdict-pill ${
                      item.verdict === "Winning Product"
                        ? "verdict-green"
                        : item.verdict === "Test Potential"
                        ? "verdict-yellow"
                        : "verdict-red"
                    }`}
                  >
                    {item.verdict}
                  </span>
                </td>

                <td>{item.date}</td>

                <td>
                  <div className="action-icons">
                    <button>
                      <FiEye />
                    </button>

                    <button>
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;