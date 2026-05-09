import { useMemo, useState } from "react";
import "./History.css";
import { FiSearch, FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  deleteHistoryItem,
  getHistory,
  saveLatestResult,
} from "../utils/storage";

const normalizeHistoryItem = (item) => {
  const totalScore = item.totalScore ?? item.score ?? 0;

  return {
    ...item,
    id: item.id || `history-${item.productName || item.product || "product"}-${totalScore}`,
    productName: item.productName || item.product || "Untitled Product",
    totalScore,
    verdict: item.verdict || "Average Product",
    verdictTone:
      item.verdictTone ||
      (totalScore >= 75 ? "winning" : totalScore >= 50 ? "average" : "weak"),
    displayDate: item.displayDate || item.date || "Unknown date",
  };
};

const History = ({ historyData }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [savedHistory, setSavedHistory] = useState(() =>
    (historyData || getHistory()).map(normalizeHistoryItem)
  );

  const filteredHistory = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return savedHistory;
    }

    return savedHistory.filter((item) =>
      item.productName.toLowerCase().includes(normalizedSearch)
    );
  }, [savedHistory, searchTerm]);

  const handleView = (item) => {
    saveLatestResult(item);
    navigate("/result", {
      state: {
        resultData: item,
      },
    });
  };

  const handleDelete = (itemId) => {
    const nextHistory = deleteHistoryItem(itemId);
    setSavedHistory(nextHistory.map(normalizeHistoryItem));
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>History</h1>

        <div className="history-controls">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="filter-btn">{filteredHistory.length} Saved</div>
        </div>
      </div>

      <div className="history-table-card">
        {filteredHistory.length ? (
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
              {filteredHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.productName}</td>

                  <td>
                    <span
                      className={`score-pill ${
                        item.totalScore >= 75
                          ? "score-green"
                          : item.totalScore >= 50
                          ? "score-yellow"
                          : "score-red"
                      }`}
                    >
                      {item.totalScore}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`verdict-pill ${
                        item.verdictTone === "winning"
                          ? "verdict-green"
                          : item.verdictTone === "average"
                          ? "verdict-yellow"
                          : "verdict-red"
                      }`}
                    >
                      {item.verdict}
                    </span>
                  </td>

                  <td>{item.displayDate}</td>

                  <td>
                    <div className="action-icons">
                      <button type="button" onClick={() => handleView(item)}>
                        <FiEye />
                      </button>

                      <button type="button" onClick={() => handleDelete(item.id)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="history-empty-state">
            <h2>No saved analyses yet</h2>
            <p>Calculate a product score and save it from the results page to see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
