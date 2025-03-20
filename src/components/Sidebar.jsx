// components/Sidebar.js
import React from 'react';
import { patient_info } from '../data';

const Sidebar = () => {
  const rbcData = [
    { type: 'Angled Cells', count: 222, percentage: 67 },
    { type: 'Borderline Ovalocytes', count: 50, percentage: 20 },
    { type: 'Burr Cells', count: 87, percentage: 34 },
    { type: 'Fragmented Cells', count: 2, percentage: 0.12 },
    { type: 'Ovalocytes', count: 0, percentage: 0 },
    { type: 'Rounded RBC', count: 0, percentage: 0 },
    { type: 'Teardrops', count: 0, percentage: 0 },
  ];

  const wbcData = [
    { type: 'Basophil', count: 222, percentage: 67 },
    { type: 'Eosinophil', count: 50, percentage: 20 },
    { type: 'Lymphocyte', count: 87, percentage: 34 },
    { type: 'Monocyte', count: 2, percentage: 0.12 },
  ];

  const plateletsData = { count: 222, percentage: 222 };

  return (
    <div className="sidebar">
      <div className="back-button-container">
        <button className="back-button">←</button>
      </div>

      <div className="findings-container">
        <div className="finding-section">
          <h3 className="section-title">RBC</h3>
          <table className="findings-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {rbcData.map((item, index) => (
                <tr key={index} className={item.count > 0 ? 'has-count' : ''}>
                  <td>{item.type}</td>
                  <td>{item.count || 'NA'}</td>
                  <td>{item.percentage || '0'}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="finding-section">
          <h3 className="section-title">WBC</h3>
          <table className="findings-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {wbcData.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.count}</td>
                  <td>{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="finding-section">
          <h3 className="section-title">Platelets</h3>
          <table className="findings-table">
            <thead>
              <tr>
                <th>Count</th>
                <td>{plateletsData.count}</td>
              </tr>
              <tr>
                <th>Percentage</th>
                <td>{plateletsData.percentage}%</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
