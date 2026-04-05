import { useEffect } from "react";

// ✅ এই component যেকোনো page-এ বসালে ad দেখাবে
// adSlot = আপনার AdSense ad unit ID (AdSense dashboard থেকে নিন)
export default function AdBanner({ adSlot, adFormat = "auto", fullWidth = false }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <div style={{
      width: "100%",
      textAlign: "center",
      margin: "12px 0",
      background: "rgba(255,255,255,0.02)",
      border: "1px dashed rgba(255,255,255,0.07)",
      borderRadius: 10,
      padding: "4px",
      minHeight: 90,
    }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: fullWidth ? "100%" : undefined }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // ← আপনার AdSense ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
