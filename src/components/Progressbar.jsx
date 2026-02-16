import React, { useEffect, useRef } from 'react';
import styles from '../css/progress.module.css';

export default function Progressbar({ data = {} }) {
  const toggleRef = useRef(null);

  const defaultData = {
    primary: 85,
    accuracy: [
      { name: "Product Inventory", percentage: 74 },
      { name: "Stock Inventory", percentage: 100 }
    ],
    levels: [20, 60, 90] // [red max, yellow max, green from here]
  };

  const {
    primary = defaultData.primary,
    accuracy = defaultData.accuracy,
    levels = defaultData.levels
  } = data;

  const [redMax, yellowMax] = levels;

  useEffect(() => {
    if (!toggleRef.current) return;

    const miniBar = toggleRef.current.querySelector(`.${styles.miniBar}`);
    if (miniBar) {
      const val = Number(primary);
      miniBar.style.width = `${val}%`;

      miniBar.className = styles.miniBar; // base class
      if (val >= yellowMax) {
        miniBar.classList.add('bg-success');
      } else if (val > redMax) {
        miniBar.classList.add('bg-warning');
      } else {
        miniBar.classList.add('bg-danger');
      }
    }
  }, [primary, yellowMax, redMax]);

  const getAccuracyClass = (pct) => {
    if (pct >= yellowMax) return styles.accuracyHigh;
    if (pct > redMax)     return styles.accuracyMed;
    return styles.accuracyLow;
  };

  return (
    <div className={styles.progressMonitorContainer}>
      <div className="dropdown">
        <div
          ref={toggleRef}
          id="progressbar-toggle"
          className={`${styles.progressMonitorToggle} dropdown-toggle`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          title="Click to see detailed accuracy breakdown"
        >
          <div className={styles.miniBar}></div>
        </div>

        <div
          className={`dropdown-menu dropdown-menu-end ${styles.progressMonitorDropdown} p-0`}
          aria-labelledby="progressbar-toggle"
        >
          <div style={{ padding: '12px 16px' }}>
            <div className={styles.progressMonitorTitle}>Data Accuracy</div>

            {/* Primary */}
            <div>
              <div className={styles.accuracyLabel}>Overall / Primary</div>
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

            {/* Dynamic items */}
            {accuracy.map((item, idx) => (
              <div key={idx}>
                <div className={styles.accuracyLabel}>{item.name}</div>
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