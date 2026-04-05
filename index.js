import Head from "next/head";
import { useState, useEffect } from "react";
import AdBanner from "../components/AdBanner";

const COURIERS = [
  { id: "pathao", name: "Pathao Courier", color: "#FF6B35", icon: "🛵", trackUrl: "https://pathao.com/bn/courier-tracking/?consignment_id=", patterns: [/^P[A-Z]{2}\d{8,12}$/i, /^PAT\d{7,}/i], hint: "PAT দিয়ে শুরু" },
  { id: "redx", name: "RedX", color: "#E63946", icon: "📦", trackUrl: "https://redx.com.bd/track-shipment/?trackingId=", patterns: [/^RX\d{7,12}$/i, /^REDX\d+$/i], hint: "RX দিয়ে শুরু" },
  { id: "paperfly", name: "Paperfly", color: "#2196F3", icon: "✈️", trackUrl: "https://paperfly.com.bd/order_tracking?tracking_no=", patterns: [/^PF\d{8,12}$/i, /^PFBD\d+$/i], hint: "PF দিয়ে শুরু" },
  { id: "steadfast", name: "Steadfast Courier", color: "#4CAF50", icon: "🚚", trackUrl: "https://steadfast.com.bd/t?cn=", patterns: [/^SFC\d{6,12}$/i, /^SF\d{8,}$/i], hint: "SFC বা SF দিয়ে শুরু" },
  { id: "sundarban", name: "Sundarban Courier", color: "#FF9800", icon: "🌿", trackUrl: "https://www.sundarbancourier.com/trackSearch?consignmentno=", patterns: [/^SUN\d{6,}/i, /^\d{11,13}$/], hint: "SUN বা ১১-১৩ সংখ্যা" },
  { id: "sa_paribahan", name: "SA Paribahan", color: "#9C27B0", icon: "🚌", trackUrl: "https://saparibahan.com/track?tracking_no=", patterns: [/^SA\d{7,12}$/i, /^SAP\d+$/i], hint: "SA বা SAP দিয়ে শুরু" },
  { id: "ecourier", name: "eCourier", color: "#FF5722", icon: "💻", trackUrl: "https://ecourier.com.bd/?action=track&track_no=", patterns: [/^EC\d{8,12}$/i, /^ECR\d+$/i], hint: "EC বা ECR দিয়ে শুরু" },
  { id: "janani", name: "Janani Express", color: "#00BCD4", icon: "⚡", trackUrl: "https://jnaniecourier.com/tracking?tracking_code=", patterns: [/^JE\d{7,}/i, /^JAN\d+$/i], hint: "JE বা JAN দিয়ে শুরু" },
  { id: "kopotakhho", name: "Kopotakhho", color: "#607D8B", icon: "🕊️", trackUrl: null, patterns: [/^KP\d{6,}/i], hint: "KP দিয়ে শুরু" },
];

const MOCK_STATUSES = [
  { time: "আজ, ২:৩০ PM", status: "ডেলিভারি সম্পন্ন", location: "ঢাকা - মিরপুর", type: "delivered" },
  { time: "আজ, ১১:০০ AM", status: "ডেলিভারিম্যানের কাছে", location: "ঢাকা হাব", type: "out" },
  { time: "গতকাল, ৮:০০ PM", status: "হাবে পৌঁছেছে", location: "ঢাকা সেন্ট্রাল হাব", type: "hub" },
  { time: "গতকাল, ২:০০ PM", status: "পিকআপ সম্পন্ন", location: "চট্টগ্রাম", type: "pickup" },
  { time: "গতকাল, ১১:০০ AM", status: "অর্ডার নিবন্ধিত", location: "চট্টগ্রাম", type: "created" },
];

const statusColors = { delivered: "#4CAF50", out: "#2196F3", hub: "#FF9800", pickup: "#9C27B0", created: "#607D8B" };

function detectCourier(id) {
  if (!id || id.length < 4) return null;
  const upper = id.trim().toUpperCase();
  for (const c of COURIERS) {
    if (c.patterns.some(p => p.test(upper))) return c;
  }
  return null;
}

export default function Home() {
  const [trackingId, setTrackingId] = useState("");
  const [detectedCourier, setDetectedCourier] = useState(null);
  const [manualCourier, setManualCourier] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("track");
  const [animateIn, setAnimateIn] = useState(false);
  const [showManualList, setShowManualList] = useState(false);
  const [detectAnim, setDetectAnim] = useState(false);

  const activeCourier = manualCourier || detectedCourier;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bd_track_history");
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const handleInput = (val) => {
    setTrackingId(val);
    setResult(null);
    setManualCourier(null);
    setDetectAnim(false);
    const found = detectCourier(val);
    setDetectedCourier(found);
    if (found) setTimeout(() => setDetectAnim(true), 50);
  };

  const handleTrack = () => {
    if (!trackingId.trim() || !activeCourier) return;
    setLoading(true);
    setResult(null);
    setAnimateIn(false);
    setTimeout(() => {
      setResult({ id: trackingId, courier: activeCourier, timeline: MOCK_STATUSES });
      setLoading(false);
      setAnimateIn(true);
      try {
        const newHistory = [{ id: trackingId, courier: activeCourier, time: new Date().toLocaleString("bn-BD") }, ...history.slice(0, 9)];
        setHistory(newHistory);
        localStorage.setItem("bd_track_history", JSON.stringify(newHistory));
      } catch (e) {}
    }, 1600);
  };

  return (
    <>
      <Head>
        <title>BD Courier Tracker — সকল কুরিয়ার ট্র্যাকিং</title>
      </Head>

      <div className="app-bg">
        <div className="container">

          {/* ── TOP AD (Leaderboard 728x90) ── */}
          {/* AdSense review পাওয়ার পর uncomment করুন */}
          {/* <AdBanner adSlot="1234567890" adFormat="horizontal" /> */}

          {/* Header */}
          <div className="header">
            <div className="badge">🇧🇩 Bangladesh Courier Tracker</div>
            <h1>সকল কুরিয়ার ট্র্যাকিং</h1>
            <p>নম্বর দিলেই কুরিয়ার অটো-ডিটেক্ট হবে ✨</p>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {[["track", "🔍 ট্র্যাক"], ["history", `📋 ইতিহাস (${history.length})`], ["guide", "📖 গাইড"]].map(([tab, label]) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-btn ${activeTab === tab ? "active" : ""}`}>{label}</button>
            ))}
          </div>

          {/* ── TRACK TAB ── */}
          {activeTab === "track" && (
            <>
              <div className="card">
                <p className="label">ট্র্যাকিং নম্বর</p>
                <div style={{ position: "relative" }}>
                  <input
                    className="track-input"
                    placeholder="যেমন: RX1234567 বা SFC123456..."
                    value={trackingId}
                    onChange={e => handleInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleTrack()}
                    style={{ borderColor: activeCourier ? activeCourier.color + "77" : undefined }}
                  />
                  {trackingId && (
                    <button className="clear-btn" onClick={() => { setTrackingId(""); setDetectedCourier(null); setManualCourier(null); setResult(null); setShowManualList(false); }}>✕</button>
                  )}
                </div>

                {/* Auto detect badge */}
                {detectedCourier && !manualCourier && (
                  <div className="detect-badge" style={{ background: `${detectedCourier.color}18`, borderColor: `${detectedCourier.color}44`, animation: detectAnim ? "popIn 0.3s ease" : "none" }}>
                    <div className="detect-left">
                      <span style={{ fontSize: 22 }}>{detectedCourier.icon}</span>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, color: detectedCourier.color, fontSize: 13 }}>{detectedCourier.name}</p>
                        <p style={{ margin: 0, color: "#666", fontSize: 11 }}>✨ অটো-ডিটেক্ট হয়েছে</p>
                      </div>
                    </div>
                    <button className="change-btn" onClick={() => setShowManualList(v => !v)}>পরিবর্তন করুন</button>
                  </div>
                )}

                {/* Not detected */}
                {trackingId.length >= 3 && !detectedCourier && !manualCourier && (
                  <div className="warn-box">
                    <p>⚠️ অটো-ডিটেক্ট হয়নি — ম্যানুয়ালি বেছে নিন</p>
                    <button className="change-btn" onClick={() => setShowManualList(true)}>📋 কুরিয়ার বেছে নিন</button>
                  </div>
                )}

                {/* Manual badge */}
                {manualCourier && (
                  <div className="detect-badge" style={{ background: `${manualCourier.color}18`, borderColor: `${manualCourier.color}44` }}>
                    <div className="detect-left">
                      <span style={{ fontSize: 22 }}>{manualCourier.icon}</span>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, color: manualCourier.color, fontSize: 13 }}>{manualCourier.name}</p>
                        <p style={{ margin: 0, color: "#666", fontSize: 11 }}>✋ ম্যানুয়ালি বেছেছেন</p>
                      </div>
                    </div>
                    <button onClick={() => { setManualCourier(null); setShowManualList(false); }} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 18 }}>✕</button>
                  </div>
                )}

                {/* Manual grid */}
                {showManualList && (
                  <div className="courier-grid">
                    {COURIERS.map(c => (
                      <button key={c.id} className="courier-btn" onClick={() => { setManualCourier(c); setShowManualList(false); }}>
                        <span>{c.icon}</span> {c.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Track button */}
                <button
                  className="track-btn"
                  onClick={handleTrack}
                  disabled={!trackingId || !activeCourier || loading}
                  style={{ background: activeCourier && trackingId ? `linear-gradient(135deg, ${activeCourier.color}, ${activeCourier.color}bb)` : undefined, boxShadow: activeCourier && trackingId ? `0 4px 20px ${activeCourier.color}44` : "none" }}
                >
                  {loading ? "⏳ লোড হচ্ছে..." : activeCourier ? `${activeCourier.icon} ${activeCourier.name} — ট্র্যাক করুন` : "ট্র্যাকিং নম্বর দিন"}
                </button>

                {activeCourier?.trackUrl && trackingId && (
                  <button className="official-btn" onClick={() => window.open(activeCourier.trackUrl + trackingId, "_blank")}>
                    🔗 {activeCourier.name}-এর অফিশিয়াল সাইটে ট্র্যাক করুন
                  </button>
                )}
              </div>

              {/* ── MIDDLE AD (result এর আগে) ── */}
              <AdBanner adSlot="0987654321" adFormat="auto" fullWidth />

              {/* Loading */}
              {loading && (
                <div className="loading-box">
                  <div className="spinner" style={{ borderTopColor: activeCourier?.color || "#FF6B35" }} />
                  <p>{activeCourier?.name}-এ তথ্য খোঁজা হচ্ছে...</p>
                </div>
              )}

              {/* Result */}
              {result && !loading && (
                <div className="card result-card" style={{ opacity: animateIn ? 1 : 0, transform: animateIn ? "translateY(0)" : "translateY(16px)", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
                  <div className="result-header">
                    <div>
                      <span className="courier-tag" style={{ background: `${result.courier.color}22`, color: result.courier.color, border: `1px solid ${result.courier.color}44` }}>
                        {result.courier.icon} {result.courier.name}
                      </span>
                      <p className="tracking-id-display">{result.id}</p>
                    </div>
                    <span className="delivered-tag">✓ ডেলিভারি সম্পন্ন</span>
                  </div>

                  <p className="label">টাইমলাইন</p>
                  {result.timeline.map((step, i) => (
                    <div key={i} className="timeline-row" style={{ paddingBottom: i < result.timeline.length - 1 ? 16 : 0 }}>
                      {i < result.timeline.length - 1 && <div className="timeline-line" />}
                      <div className="timeline-dot" style={{ background: i === 0 ? statusColors[step.type] : "transparent", border: `2px solid ${statusColors[step.type]}`, boxShadow: i === 0 ? `0 0 10px ${statusColors[step.type]}77` : "none" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "#fff" : "#777" }}>{step.status}</p>
                          <span style={{ color: "#444", fontSize: 10, fontFamily: "'Space Mono'", whiteSpace: "nowrap", marginLeft: 8 }}>{step.time}</span>
                        </div>
                        <p style={{ margin: "2px 0 0", fontSize: 11, color: "#444" }}>📍 {step.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── BOTTOM AD ── */}
              {result && <AdBanner adSlot="1122334455" adFormat="auto" fullWidth />}
            </>
          )}

          {/* ── HISTORY TAB ── */}
          {activeTab === "history" && (
            <div className="card">
              <p className="label">সাম্প্রতিক ট্র্যাকিং</p>
              {history.length === 0 ? (
                <div className="empty-box">
                  <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
                  <p>এখনো কোনো ট্র্যাকিং করা হয়নি</p>
                </div>
              ) : history.map((item, i) => (
                <div key={i} className="history-row" onClick={() => { setTrackingId(item.id); setManualCourier(item.courier); setDetectedCourier(null); setActiveTab("track"); }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{item.courier.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: 12, fontFamily: "'Space Mono'", color: "#fff" }}>{item.id}</p>
                      <p style={{ margin: 0, fontSize: 10, color: "#444" }}>{item.courier.name}</p>
                    </div>
                  </div>
                  <span style={{ color: "#333", fontSize: 10 }}>{item.time}</span>
                </div>
              ))}
              {history.length > 0 && (
                <button className="delete-btn" onClick={() => { setHistory([]); try { localStorage.removeItem("bd_track_history"); } catch (e) {} }}>
                  🗑️ ইতিহাস মুছুন
                </button>
              )}
            </div>
          )}

          {/* ── GUIDE TAB ── */}
          {activeTab === "guide" && (
            <div className="card">
              <p className="label">কুরিয়ার নম্বর প্যাটার্ন</p>
              {COURIERS.map(c => (
                <div key={c.id} className="guide-row" style={{ background: `${c.color}10`, border: `1px solid ${c.color}22` }}>
                  <span style={{ fontSize: 20 }}>{c.icon}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: c.color }}>{c.name}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#555" }}>{c.hint}</p>
                  </div>
                </div>
              ))}
              {/* Ad in guide tab */}
              <AdBanner adSlot="5566778899" adFormat="auto" fullWidth />
            </div>
          )}

          <p className="footer-note">
            ⚠️ এটি একটি ডেমো। Real tracking-এর জন্য প্রতিটি কুরিয়ারের API integration প্রয়োজন।
          </p>
        </div>
      </div>
    </>
  );
}
