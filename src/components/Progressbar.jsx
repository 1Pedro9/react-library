// AccuracyMonitor.js
import React, { useEffect, useRef } from 'react';
import './css/progress.css';   // ← same css as before (with gradients, hover, blur, etc.)

export default function AccuracyMonitor({ data = {} }) {
  const toggleRef = useRef(null);

  // Default / fallback (you can remove or adjust)
  const defaultData = {
    primary: 85,
    accuracy: [
      { name: "Product Inventory", percentage: 74 },
      { name: "Stock Inventory", percentage: 100 }
    ],
    levels: [20, 60, 90] // red <20, yellow <60, green ≥60   (your thresholds)
  };

  const {
    primary = defaultData.primary,
    accuracy = defaultData.accuracy,
    levels = defaultData.levels
  } = data;

  // thresholds: [redMax, yellowMax, greenMin]
  const [redMax, yellowMax] = levels; // green is everything above yellowMax

  useEffect(() => {
    if (!toggleRef.current) return;

    // Mini bar = primary value
    const miniBar = toggleRef.current.querySelector('.mini-bar');
    if (miniBar) {
      const val = Number(primary);
      miniBar.style.width = `${val}%`;

      miniBar.className = 'mini-bar'; // reset
      if (val >= yellowMax) {
        miniBar.classList.add('bg-success');
      } else if (val > redMax) {
        miniBar.classList.add('bg-warning');
      } else {
        miniBar.classList.add('bg-danger');
      }
    }
  }, [primary]);

  // Decide gradient class based on your thresholds
  const getAccuracyClass = (pct) => {
    if (pct >= yellowMax) return 'accuracy-high';
    if (pct > redMax)     return 'accuracy-med';
    return 'accuracy-low';
  };

  return (
    <div className="monitor-container">
      <div className="dropdown">
        {/* Thin bar – dropdown toggle */}
        <div
          ref={toggleRef}
          id="monitor-toggle"
          className="monitor-toggle dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          title="Click to see detailed accuracy breakdown"
        >
          <div id="mini-bar" className="mini-bar"></div>
        </div>

        {/* Dropdown content – same dark blurred style */}
        <div
          className="dropdown-menu dropdown-menu-end monitor-dropdown p-0"
          aria-labelledby="monitor-toggle"
        >
          <div style={{ padding: '12px 16px' }}>
            <div className="monitor-title">Data Accuracy</div>

            {/* Primary (headline) accuracy */}
            <div>
              <div className="accuracy-label">Overall / Primary</div>
              <div className="progress">
                <div
                  className={`progress-bar ${getAccuracyClass(primary)}`}
                  style={{ width: `${primary}%` }}
                  role="progressbar"
                  aria-valuenow={primary}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {primary}%
                </div>
              </div>
            </div>

            {/* Dynamic list of named accuracies */}
            {accuracy.map((item, idx) => (
              <div key={idx}>
                <div className="accuracy-label">{item.name}</div>
                <div className="progress">
                  <div
                    className={`progress-bar ${getAccuracyClass(item.percentage)}`}
                    style={{ width: `${item.percentage}%` }}
                    role="progressbar"
                    aria-valuenow={item.percentage}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}