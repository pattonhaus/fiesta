// California Fiesta — content sections (hero, hosts, gallery, dress, wall, travel, footer)
// All copy is sourced from window.FIESTA_DATA — edit data.js to change wording.

const { useState, useEffect, useRef } = React;

/* ---------- Floral ornament (SVG, used between sections) ---------- */
function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
        <path d="M12 3 C 14 7, 14 7, 12 9 C 10 7, 10 7, 12 3 Z" fill="currentColor" stroke="none" opacity="0.85" />
        <path d="M12 21 C 14 17, 14 17, 12 15 C 10 17, 10 17, 12 21 Z" fill="currentColor" stroke="none" opacity="0.85" />
        <path d="M3 12 C 7 14, 7 14, 9 12 C 7 10, 7 10, 3 12 Z" fill="currentColor" stroke="none" opacity="0.85" />
        <path d="M21 12 C 17 14, 17 14, 15 12 C 17 10, 17 10, 21 12 Z" fill="currentColor" stroke="none" opacity="0.85" />
      </svg>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero({ data }) {
  const s = data.sections.hero;
  return (
    <header className="hero" data-screen-label="01 Hero">
      <div className="hero-image-wrap">
        <img src={data.heroImage} alt="Emma & Jake recessional" />
        <div className="hero-overlay">
          <div className="eyebrow">{s.eyebrow}</div>
          <div className="script">{s.script}</div>
          <h1>{s.h1}</h1>
        </div>
      </div>

      <div className="container">
        <div className="hero-card">
          <div className="eyebrow">{s.cardEyebrow}</div>
          <h2 className="mt-2">{s.cardHeadline}</h2>

          <div className="hero-detail">
            <div className="row-line">
              <div className="label">{s.labelWhen}</div>
              <div className="value"><strong>{data.openHouse.date}</strong> · {data.openHouse.time}</div>
            </div>
            <div className="row-line">
              <div className="label">{s.labelWhere}</div>
              <div className="value">
                {data.venue}<br />
                <a href={data.mapsUrl} target="_blank" rel="noreferrer">{data.address}</a>
              </div>
            </div>
            <div className="row-line">
              <div className="label">{s.labelHosts}</div>
              <div className="value">{data.hosts}</div>
            </div>
          </div>
          <div className="rsvp-cta">
            <a href="#rsvp" className="rsvp-cta-link">
              Please RSVP below <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="weekend-note">
            {s.weekendPrefix}{" "}
            <strong>{data.sundayBrunch.label}</strong> on {data.sundayBrunch.date}, {data.sundayBrunch.time}.
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hosts note ---------- */
function HostsNote({ data }) {
  const s = data.sections.hostsNote;
  return (
    <section data-screen-label="02 Hosts">
      <div className="container tight">
        <div className="hosts-note">
          <div className="script">{s.flourish}</div>
          <h2>{data.hostsNote.headline}</h2>
          <Ornament />
          <p className="mt-3">{data.hostsNote.body}</p>
          <p className="mt-2 muted" style={{ fontSize: 15 }}>{data.hostsNote.signoff}</p>
          <div className="signature">{data.hostsNote.signature}</div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery — feature wedding photos ---------- */
function Gallery({ data }) {
  const s = data.sections.gallery;
  return (
    <section data-screen-label="03 Gallery">
      <div className="container">
        <div className="section-heading">
          <div className="eyebrow">{s.eyebrow}</div>
          <h2>{s.headline}</h2>
          <p className="deck">{s.deck}</p>
        </div>

        <div className="gallery">
          {data.galleryPhotos.map((p, i) => (
            <div className={"g-tile " + (p.ratio || "portrait")} key={i}>
              <img src={p.src} alt={p.caption} loading="lazy" />
              <div className="cap">{p.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Dress code ---------- */
function DressCode({ data }) {
  const s = data.sections.dressCode;
  return (
    <section data-screen-label="04 Dress">
      <div className="container tight">
        <div className="section-heading">
          <div className="eyebrow">{s.eyebrow}</div>
        </div>
        <div className="dress-card">
          <h2>{data.dressCode.title}</h2>
          <Ornament />
          <p className="mt-3">{data.dressCode.description}</p>
          <div className="tag-row">
            {data.dressCode.tags.map((t, i) => (
              <span className="tag" key={i}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Photo wall ---------- */
// Resize a File to a JPEG data URL (max edge px). Keeps payloads sane.
async function resizeImage(file, maxEdge = 1600, quality = 0.85) {
  const dataUrl = await new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = dataUrl;
  });
  let { width, height } = img;
  const scale = Math.min(1, maxEdge / Math.max(width, height));
  width = Math.round(width * scale);
  height = Math.round(height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality);
}

function PhotoWall({ data }) {
  const s = data.sections.photoWall;
  const seed = data.wallPhotos || [];
  const endpoint = data.photoEndpointURL || "";

  const [uploaded, setUploaded] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Fetch live photos on mount (and after each upload)
  const refresh = async () => {
    if (!endpoint) return;
    setLoading(true);
    try {
      const r = await fetch(endpoint + "?t=" + Date.now());
      const j = await r.json();
      if (j.ok && Array.isArray(j.photos)) {
        setUploaded(j.photos);
      }
    } catch (e) {
      // silent — wall just shows seed
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { refresh(); }, []);

  const onPickFile = () => fileInputRef.current?.click();

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset so same file can be picked again
    if (!file) return;
    if (!endpoint) {
      setError("Photo uploads aren't wired up yet. Ask Laura.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const dataUrl = await resizeImage(file, 1600, 0.85);
      const base64 = dataUrl.split(",")[1];
      const author = (localStorage.getItem("fiesta-name") || "").trim();
      const res = await fetch(endpoint, {
        method: "POST",
        // text/plain avoids a CORS preflight against Apps Script
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          filename: file.name,
          mimeType: "image/jpeg",
          dataBase64: base64,
          author
        })
      });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error || "Upload failed");
      // Optimistic: add the new photo immediately
      setUploaded(prev => [{ id: j.id, src: j.url, author }, ...prev]);
      // And refresh to stay in sync
      refresh();
    } catch (err) {
      setError("Couldn't upload that one. Try a smaller photo?");
    } finally {
      setUploading(false);
    }
  };

  // Compose tiles: uploaded (newest first) + seed, padded to a tidy grid
  const tiles = [
    ...uploaded.map(p => ({ src: p.src, caption: p.author || "" })),
    ...seed.map(p => ({ src: p.src, caption: p.caption || "" }))
  ];
  const minTiles = 7; // 7 + the "add" tile = 8
  while (tiles.length < minTiles) {
    tiles.push({ placeholder: true });
  }

  return (
    <section data-screen-label="05 PhotoWall">
      <div className="container">
        <div className="section-heading">
          <div className="eyebrow">{s.eyebrow}</div>
          <h2>{s.headline}</h2>
          <p className="deck">{s.deck}</p>
        </div>

        <div className="photo-wall">
          {/* Add-a-photo tile, always first */}
          <button
            type="button"
            className={"tile add" + (uploading ? " busy" : "")}
            onClick={onPickFile}
            disabled={uploading}
            aria-label="Add a photo"
          >
            {uploading ? (
              <span className="add-label">Uploading…</span>
            ) : (
              <>
                <span className="add-plus" aria-hidden="true">+</span>
                <span className="add-label">Add a photo</span>
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: "none" }}
          />

          {tiles.map((p, i) => (
            <div
              key={i}
              className={"tile" + (p.placeholder ? " placeholder" : "")}
              title={p.caption || ""}
            >
              {p.placeholder ? (
                <span style={{ opacity: 0.5 }}>+</span>
              ) : p.src ? (
                <img src={p.src} alt={p.caption} loading="lazy" />
              ) : null}
            </div>
          ))}
        </div>

        {error && <div className="wall-error">{error}</div>}
        {!endpoint && (
          <div className="wall-hint">
            Photo uploads aren't configured yet. See <a href="Setup-PhotoWall.html">Setup-PhotoWall.html</a> for the 5-minute guide.
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Travel / hotel ---------- */
function Travel({ data }) {
  const s = data.sections.travel;
  return (
    <section data-screen-label="06 Travel">
      <div className="container tight">
        <div className="travel-card">
          <div className="label-mini">{s.label}</div>
          <h3>{s.headline}</h3>
          <p>{data.hotel.description}</p>
          <a className="btn outline" href={data.hotel.url} target="_blank" rel="noreferrer">
            {data.hotel.name}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function FiestaFooter({ data }) {
  const s = data.sections.footer;
  return (
    <footer className="fiesta-footer">
      <Ornament />
      <div className="script mt-3">{s.script}</div>
      <p>
        {s.questionsLine1} <a href={"mailto:" + data.hostsEmail}>{data.hostsEmail}</a>
        <br />{s.questionsLine2}
      </p>
      <p style={{ fontSize: 12, opacity: 0.7, marginTop: 24 }}>
        {data.openHouse.date} · {data.venue} · Orinda, California
      </p>
    </footer>
  );
}

Object.assign(window, {
  Ornament, Hero, HostsNote, Gallery, DressCode, PhotoWall, Travel, FiestaFooter
});
