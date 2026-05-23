// California Fiesta — main app

/* ============================================================
   Confetti — petals raining
   ============================================================ */
window.celebrate = function celebrate(count = 60) {
  const colors = [
    "#E5326D", // hot pink
    "#F26A4F", // coral
    "#E8A93A", // marigold
    "#2D3F8C", // indigo
    "#F4C6C9", // blush
    "#FFE6B8"  // cream gold
  ];
  const layer = document.createElement("div");
  layer.className = "celebrate";
  document.body.appendChild(layer);
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.left = (Math.random() * 100) + "vw";
    const dur = 3.0 + Math.random() * 2.4;
    piece.style.animationDuration = dur + "s";
    piece.style.animationDelay = (Math.random() * 0.6) + "s";
    piece.style.setProperty("--drift", ((Math.random() - 0.5) * 200) + "px");
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    if (Math.random() < 0.3) {
      piece.style.width = "8px";
      piece.style.height = "10px";
    }
    layer.appendChild(piece);
  }
  setTimeout(() => layer.remove(), 6500);
};

/* ============================================================
   Toast
   ============================================================ */
window.toast = function toast(msg, ms = 2400) {
  document.querySelectorAll(".toast").forEach(el => el.remove());
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.transition = "opacity .3s";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 300);
  }, ms);
};

/* ============================================================
   The App
   ============================================================ */
function App() {
  const D = window.FIESTA_DATA;
  const formRef = React.useRef(null);

  const submitRSVP = async (form) => {
    window.celebrate(80);

    const payload = {
      timestamp: new Date().toISOString(),
      name: form.name,
      phone: form.phone,
      additional: form.additional,
      arrival: form.arrival,
      departure: form.departure,
      dietary: form.dietary,
      questions: form.questions
    };

    if (D.appsScriptURL) {
      try {
        await fetch(D.appsScriptURL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn("Apps Script post failed (RSVP still confirmed locally):", err);
      }
    } else {
      console.info("[demo mode] RSVP captured locally. Wire data.js → appsScriptURL to send to Sheets + email.");
    }
    return new Promise(r => setTimeout(r, 700));
  };

  // Tweaks
  const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
    "showWeekendNote": true
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULS);

  // Update the photo wall photos prop to take the full data
  // (the new PhotoWall reads data.sections.photoWall internally)
  return (
    <div className="app">
      <window.Hero data={D} />
      <window.HostsNote data={D} />
      <window.Gallery data={D} />
      <window.DressCode data={D} />
      <window.PhotoWall data={D} />
      <window.Travel data={D} />

      <section data-screen-label="07 RSVP">
        <div className="container tight">
          <div className="section-heading">
            <div className="eyebrow">{D.sections.rsvp.eyebrow}</div>
            <h2>{D.sections.rsvp.headline}</h2>
            <p className="deck">{D.sections.rsvp.deck}</p>
          </div>
          <window.RSVPForm onSubmit={submitRSVP} formRef={formRef} />
        </div>
      </section>

      <window.FiestaFooter data={D} />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Interactions">
          <window.TweakButton onClick={() => window.celebrate(120)}>
            Throw rose petals
          </window.TweakButton>
        </window.TweakSection>

        <window.TweakSection title="Setup">
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.55 }}>
            To wire RSVPs to a Google Sheet + email notifications to
            pattonhaus@gmail.com, open <strong>Setup.html</strong> and follow
            the 5-minute guide.
          </div>
          <window.TweakButton onClick={() => window.open("Setup.html", "_blank")}>
            Open setup guide
          </window.TweakButton>
        </window.TweakSection>
      </window.TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
