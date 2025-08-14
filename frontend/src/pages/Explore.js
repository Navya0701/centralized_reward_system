import React, { useState, useMemo } from "react";
import "./Explore.css";

// --- MOCK DATA ---
const initialPointsData = [
  { id: 'gpay', icon: 'G', text: 'GPay', points: 300, color: '#4285F4' },
  { id: 'paytm', icon: 'P', text: 'Paytm', points: 250, color: '#00B2DD' },
  { id: 'phonepe', icon: 'PP', text: 'PhonePe', points: 400, color: '#6739B7' },
  { id: 'amazon', icon: 'A', text: 'Amazon Pay', points: 900, color: '#FF9900' },
];

const rewardItems = [
  { id: 'voucher1', title: 'Amazon Gift Card', value: '$10', cost: 1000, category: 'E-Commerce' },
  { id: 'voucher2', title: 'Streaming Credit', value: '$15', cost: 1500, category: 'Entertainment' },
  { id: 'voucher3', title: 'Coffee Shop Voucher', value: '$5', cost: 500, category: 'Food & Drink' },
  { id: 'donation1', title: 'Donate to Charity', value: '$20', cost: 2000, category: 'Social Good' },
  { id: 'product1', title: 'Exclusive T-Shirt', value: 'Merch', cost: 2500, category: 'Swag' },
];

// --- HELPER COMPONENTS ---
const PointListItem = ({ icon, text, color, points }) => ( <div className="point-item"> <div className="point-icon" style={{ backgroundColor: color }}>{icon}</div> <div className="point-details"> <span className="point-text">{text}</span> <span className="point-label">Points</span> </div> <span className="point-amount">{points}</span> </div> );
const RewardCard = ({ item, onRedeem, urtBalance }) => ( <div className="reward-card"> <div className="reward-info"> <span className="reward-category">{item.category}</span> <h3>{item.title}</h3> <p>Value: {item.value}</p> </div> <div className="reward-action"> <span className="reward-cost">{item.cost.toLocaleString()} URT</span> <button onClick={() => onRedeem(item)} className="redeem-btn" disabled={urtBalance < item.cost}> Redeem </button> </div> </div> );

function Explore() {
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState('balance');
  const [urtBalance, setUrtBalance] = useState(4500);
  const [pointsData, setPointsData] = useState(initialPointsData);
  const [selectedApp, setSelectedApp] = useState(initialPointsData[0]?.id || '');
  const [pointsToConvert, setPointsToConvert] = useState('');

  // --- MEMOIZED CALCULATIONS ---
  const CONVERSION_RATE = 10;
  const urtToReceive = useMemo(() => {
    const points = parseFloat(pointsToConvert);
    return (isNaN(points) || points <= 0) ? 0 : points / CONVERSION_RATE;
  }, [pointsToConvert, CONVERSION_RATE]);

  const selectedAppPoints = useMemo(() => {
    return pointsData.find(app => app.id === selectedApp)?.points || 0;
  }, [selectedApp, pointsData]);

  // --- EVENT HANDLERS ---
  const handleConvert = () => {
    const pointsNum = parseFloat(pointsToConvert);
    if (urtToReceive > 0 && pointsNum <= selectedAppPoints) {
      setUrtBalance(prev => prev + urtToReceive);
      setPointsData(prev => prev.map(app => 
        app.id === selectedApp ? { ...app, points: app.points - pointsNum } : app
      ));
      alert(`Successfully converted ${pointsToConvert} points to ${urtToReceive.toFixed(2)} URT!`);
      setPointsToConvert('');
      setView('balance');
    } else {
      alert('Invalid amount or not enough points to convert.');
    }
  };

  const handleRedeem = (item) => {
    if (urtBalance >= item.cost) {
      setUrtBalance(prev => prev - item.cost);
      alert(`Successfully redeemed "${item.title}"!`);
    } else {
      alert('You do not have enough URT to redeem this item.');
    }
  };

  // --- RENDER LOGIC ---
  return (
    <div className="wallet-screen">
      <div className="wallet-container">
        {view === 'balance' && (
          <>
            <header className="wallet-header">
              <h2>Your Balance</h2>
              <h1>{urtBalance.toLocaleString()} <span className="urt-label">URT</span></h1>
            </header>
            <main className="points-card">
              {pointsData.map(item => <PointListItem key={item.id} {...item} />)}
            </main>
          </>
        )}
        {view === 'convert' && (
          <>
            <header className="convert-header"><h1>Convert Points</h1><p>Turn loyalty points into URT.</p></header>
            <main className="conversion-form">
              <div className="form-group"><label>Select App</label><select value={selectedApp} onChange={(e) => setSelectedApp(e.target.value)} className="app-select">{pointsData.map(app => (<option key={app.id} value={app.id}>{app.text} (Available: {app.points} pts)</option>))}</select></div>
              <div className="form-group"><label>Points to Convert</label><input type="number" value={pointsToConvert} onChange={(e) => setPointsToConvert(e.target.value)} placeholder="e.g., 100" className="points-input" max={selectedAppPoints} /></div>
              <div className="conversion-result"><h2>You will receive</h2><p><span>{urtToReceive.toFixed(2)}</span> URT</p></div>
              <button onClick={handleConvert} className="action-btn convert">Confirm Conversion</button>
            </main>
          </>
        )}
        {view === 'spend' && (
          <>
            <header className="spend-header"><h1>Spend Rewards</h1><p>Use URT to redeem items.</p></header>
            <main className="rewards-grid">
                {rewardItems.map(item => (<RewardCard key={item.id} item={item} onRedeem={handleRedeem} urtBalance={urtBalance} />))}
            </main>
          </>
        )}
      </div>
      <footer className="wallet-footer-nav">
        <button onClick={() => setView('balance')} className={view === 'balance' ? 'active' : ''}>Balance</button>
        <button onClick={() => setView('convert')} className={view === 'convert' ? 'active' : ''}>Convert</button>
        <button onClick={() => setView('spend')} className={view === 'spend' ? 'active' : ''}>Spend</button>
      </footer>
    </div>
  );
}

export default Explore;
