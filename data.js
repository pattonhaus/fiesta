// California Fiesta — Emma & Jake's Marriage & Patton Family Reunion
// All event copy lives here. Edit freely; the page reads from FIESTA_DATA.

window.FIESTA_DATA = {
  // Names & framing
  coupleNames: "Emma & Jake",
  eventName: "California Fiesta",
  subtitle: "A Marriage & Patton Family Reunion Weekend",

  // The main event
  openHouse: {
    label: "Open House",
    date: "Saturday, June 13",
    time: "Open House from 3:00 — 8:00 PM",
    dateISO: "2026-06-13T15:00:00-07:00"
  },

  // Casual weekend mention
  sundayBrunch: {
    label: "Sunday Brunch Bites",
    date: "June 14",
    time: "9:00 — 11:00 AM"
  },

  // Venue
  venue: "The Patton Home",
  address: "330 Tahos Road, Orinda, CA",
  mapsUrl: "https://www.google.com/maps/place/330+Tahos+Rd,+Orinda,+CA",

  // Hosts
  hosts: "Laura & Jeff Patton",
  hostsEmail: "pattonhaus@gmail.com",

  // Hotel block
  hotel: {
    name: "Hyatt House Pleasant Hill",
    description: "About 15 minutes from the house. Breakfast included, swimming pool, comfortable for out-of-town guests.",
    url: "https://www.google.com/maps/place/Hyatt+House+Pleasant+Hill/@37.9428038,-122.0638143,854m/data=!3m1!1e3!4m11!3m10!1s0x80856140a617cd8b:0xc05832031dfdb804!5m4!1s2026-06-12!2i3!4m1!1i2!8m2!3d37.9428038!4d-122.0612394!16s%2Fg%2F1tknknt8?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D"
  },

  // Hosts' note
  hostsNote: {
    headline: "A celebration for everyone we love",
    body: "In January, Emma and Jake were married near a beach in Mexico. The wedding was far away - which meant many family members couldn't be there to witness it. This open house is our way of gathering all of you. Come for Jeff's barbacoa & pulled pork soft tacos and margaritas and stay for the stories. Bring nothing but yourselves. No gifts please. We can't wait.",
    signoff: "With love,",
    signature: "Laura & Jeff Patton"
  },

  // Dress code
  dressCode: {
    title: "Fiesta Festive",
    description: "Casual attire. Think tropical bright colors, florals, and a light sweater or jacket. We have warm days and cool nights. Wear what makes you happy. The dress code is joy.",
    tags: ["Color encouraged", "Florals welcome", "Linen & light fabrics", "Comfortable shoes"]
  },

  // Featured photos (large editorial gallery)
  galleryPhotos: [
    { src: "photos/IMG_6917.jpg", caption: "The kiss",          ratio: "portrait" },
    { src: "photos/IMG_6919.jpg", caption: "Sunset by the water",             ratio: "portrait" },
    { src: "photos/IMG_6918.jpg", caption: "Golden hour",       ratio: "portrait" },
    { src: "photos/IMG_6916.jpg", caption: "Vows, witnessed",                 ratio: "landscape" },
    { src: "photos/IMG_6920.jpg", caption: "Family — the Pattons",           ratio: "landscape" }
  ],

  // Photo wall seed
  wallPhotos: [
    { src: "photos/IMG_6915.jpg", caption: "Jake & Emma — the welcome sign", author: "Mexico" },
    { src: "photos/IMG_6914.jpg", caption: "Just married",                    author: "Mexico" },
    { src: "photos/IMG_6911.jpg", caption: "Where it happened",              author: "Mexico" }
  ],

  // Hero image
  heroImage: "photos/IMG_6912.jpg",

  // ----------------------------------------------------------------
  //  Section copy — every headline & intro paragraph on the page.
  //  Edit these to change what guests read.
  // ----------------------------------------------------------------
  sections: {
    // The big photo at the top
    hero: {
      eyebrow: "You are invited to a",
      script: "California Fiesta honoring",            // the cursive overlay on the photo
      h1: "Emma & Jake",                       // the big serif name on the photo
      cardEyebrow: "A Marriage & Patton Family Reunion Weekend",
      cardHeadline: "A hometown celebration",
      labelWhen: "When",
      labelWhere: "Where",
      labelHosts: "Hosted by",
      weekendPrefix: "Please RSVP below. Staying for the weekend? Drop by for"
    },

    // The personal note from Laura & Jeff
    hostsNote: {
      flourish: "A note from us"              // the cursive line above the headline
    },

    // The gallery of wedding photos
    gallery: {
      eyebrow: "From the wedding",
      headline: "A glimpse of Mexico",
      deck: "A few favorites from the day. We'll share more during the open house."
    },

    // What to wear
    dressCode: {
      eyebrow: "What to wear"
    },

    // The crowdsourced photo wall
    photoWall: {
      eyebrow: "Family Photos",
      headline: "The photo wall",
      deck: "We'd love it if you could upload a recent family photo or a selfie to share with everyone."
    },

    // Hotel / travel block
    travel: {
      label: "Where to stay",
      headline: "For out-of-town guests"
    },

    // The RSVP section heading (the form fields themselves are in rsvp.jsx)
    rsvp: {
      eyebrow: "Please respond by June 7th",
      headline: "RSVP",
      deck: "Fill in your details below. If you're filling this out, we'll count you in — see you at the Fiesta!"
    },

    // The very bottom of the page
    footer: {
      script: "See you in June",
      questionsLine1: "Questions? Email",       // followed by the hostsEmail link
      questionsLine2: "or text Laura directly."
    }
  },

  // Apps Script endpoint — paste your deployed Web App URL here.
  // See Setup.html for the 5-minute guide.
  appsScriptURL: "https://script.google.com/macros/s/AKfycbyqiF_CayL3HrTb_WnLZaVuKheYO45kMh3Wa0di-3KZu-c0WiKnRhK46TDVwHdWBiqgOw/exec",

  // Photo-wall endpoint — paste your deployed Photo Wall Web App URL here.
  // See Setup-PhotoWall.html for the 5-minute guide.
  // Leave as "" to disable uploads (the wall will still show seed photos).
  photoEndpointURL: "https://script.google.com/macros/s/AKfycbx1SWqQncXRknMpieSo1SEe1OOMluRFO9lf1yzTTueTVLvMSHRXhc4a72xHmdqCv0tZ/exec"
};
