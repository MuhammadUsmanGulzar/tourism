# 🏔️ Broad Peak Adventures - Northern Pakistan Tourism

Broad Peak Adventures is a premium, immersive, and high-performance Single Page Application (SPA) designed to showcase, plan, and book world-class mountaineering expeditions, trekking adventures, and cultural tours in Gilgit-Baltistan and the Karakoram range of Northern Pakistan.

---

## 🚀 Features

- **Blazing Fast SPA Routing**: Custom React-based hash/path router implemented in `src/App.tsx` that intercept clicks globally to achieve instant page transitions.
- **ScrollTrigger Animation Reinitialization**: Smart route-change listeners that clean up and re-initialize GSAP, ScrollTrigger, and custom animations, avoiding memory leaks and layout bugs.
- **Dynamic Content System**: Full separation of concerns using typed structured data templates (`blogsData.ts` and `expeditionsData.ts`) to render expedition itineraries, maps, stats, and articles.
- **Firebase Firestore Integration**: Direct binding of contact forms and trip inquiry forms to Firebase Firestore database storage.
- **High Visual Premium Aesthetics**: Immersive hero video header, responsive interactive sliders, custom accordion FAQ modules, and glassmorphic designs matching the majesty of the Karakoram.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology |
| :--- | :--- |
| **Core Framework** | React 19, TypeScript, Vite 6 |
| **Styling** | Custom Vanilla CSS (Structure, Typography, Animations, and Layouts) & Tailwind CSS v4 |
| **Database** | Firebase Firestore SDK (v12) |
| **Animations** | GSAP, ScrollTrigger, and Motion |
| **Icons** | Lucide React & Remix Icon (`ri-` classes) |

---

## 📂 Project Directory Structure

```text
tourism/
├── public/                       # Static public assets
│   ├── assets/
│   │   ├── images/               # Restored high-res photos and vector icons
│   │   ├── parallax/             # Parallax layers for scroll effects
│   │   └── videos/               # Immersive hero background videos
│   ├── css/                      # Global style definitions
│   │   ├── style.css             # Main styling system
│   │   └── responsive.css        # Responsive layouts & media queries
│   └── js/                       # Vanilla GSAP / page-level scripts
├── src/                          # React Application Core
│   ├── data/                     # Typed data structures (expeditions, blogs)
│   │   ├── blogsData.ts
│   │   └── expeditionsData.ts
│   ├── pages/                    # 14 modular page components
│   ├── App.tsx                   # App wrapper with global SPA routing & scroll hooks
│   ├── firebase.ts               # Firebase initialization and Firestore db bindings
│   └── main.tsx                  # React DOM entry point
├── package.json                  # Script execution configuration
├── firebase-applet-config.json   # Active Firebase applet credentials
└── firestore.rules               # Firestore security configurations
```

---

## 📄 Pages Explanation

The application houses **14 major pages** inside `src/pages/` mapped to paths through the routing engine in `src/App.tsx`.

### 1. Home (`Home.tsx`)
The gateway page of the site. It hooks users with high-quality media and features multiple interactive sections.
- **Hero Section (`hero`)**: Plays the cinematic looping backdrop video of K2 Base Camp, layered with key statistics (Max Altitude, Active Guides, Success Rates).
- **Featured Expeditions Section (`featured-trips`)**: A horizontal carousel showcasing highlighted tours (e.g., K2, Fairy Meadows, Hunza) with difficulty sliders, altitudes, and action buttons.
- **Value Proposition Section (`who-we-are`)**: Provides context on the brand's local roots, safety protocols, and guiding standards. Includes twin layered images.
- **Trending Activities Section (`trending-activities`)**: Highlights custom adventure sports available (Climbing, Skiing, Cultural, Trekking).
- **Popular Destinations Grid (`dest-regions` context)**: Cards of top regional hubs like Skardu, Hunza, and Deosai.
- **Testimonials Section (`testimonials`)**: Clean cards with slider indicators detailing user stories.
- **FAQ Preview Section (`faq-preview-section`)**: Mini accordion subset answering top-level inquiries.

---

### 2. About Us (`About.tsx`)
Focuses on the company’s history, principles, and team credentials.
- **About Hero (`abt-hero`)**: Premium static mountain header with a parallax gradient overlay.
- **Who We Are Section (`abt-who`)**: Detailed description of the founding mountaineers and their vision.
- **Why Travel With Us (`abt-why`)**: Highlights regional expertise, safety, and porter welfare.
- **Our Values Grid (`abt-values`)**: Displays Core Values (Integrity, Conservation, Authenticity) with clean hover grids.
- **Welcome to Gilgit-Baltistan (`abt-region`)**: A geographic callout of the three mountain ranges meeting (Karakoram, Himalaya, Hindu Kush).
- **Safety Section (`abt-safety`)**: Breakdown of wilderness medical support and emergency communication channels.

---

### 3. Destinations (`Destinations.tsx`)
A comprehensive atlas of key regions in Northern Pakistan.
- **Intro & Regions (`dest-intro` / `dest-regions`)**: Summarizes the "Three Kingdoms" (Baltistan, Hunza-Nagar, and Gilgit).
- **Travel Seasons Tracker (`dest-seasons`)**: A table/grid detailing weather patterns, accessibility, and highlights per month.
- **Featured Grid (`dest-grid-section`)**: Searchable/filterable cards for every active valley and plateau.

---

### 4. Expeditions (`Expeditions.tsx`)
The primary product catalog listing all active treks and climbing itineraries.
- **Catalog Header (`exp-intro`)**: Introduces the grading system.
- **Filterable Expedition Grid (`exp-grid-section`)**: Interactive filters allowing users to parse trips based on difficulty (Easy, Moderate, Hard) or category (Trekking, Peak Climbing, Safaris).
- **Custom Journeys Panel (`exp-private`)**: Prompts users to design bespoke private departures for corporate groups or solo climbers.

---

### 5. Expedition Detail (`ExpeditionDetail.tsx`)
A dynamic detail builder that parses the URL query parameter (e.g., `?id=k2` or `?id=fairy-meadows`), loads details from `expeditionsData.ts`, and compiles them into a structured page.
- **Facts Grid (`expd-facts`)**: Renders quick details (Max altitude, group size, duration, start/end location).
- **Itinerary Timeline (`expd-itinerary`)**: Vertical timeline accordion containing day-by-day schedules and camp highlights.
- **Inclusions & Exclusions (`expd-inclusions`)**: Clearly labeled lists of what is paid for (Permits, Porters, Flights) vs. excluded (Insurance, Gear).
- **Gallery Carousel (`expd-gallery`)**: Grid of landscape views matching the trek.
- **Inquiry Form (`expd-inquiry`)**: Inline booking module submitting variables directly to Firestore.

---

### 6. Blog (`Blog.tsx`) & 7. Blog Post (`BlogPost.tsx`)
A content hub driving search engine optimization (SEO) and user education.
- **Blog Hub**: Highlights a featured post followed by a paginated index of articles.
- **Blog Post Viewer**: Dynamically fetches and styles clean markdown articles based on ID, offering related reading and floating social share handles.

---

### 8. Contact (`Contact.tsx`)
The primary conversion page for customer service.
- **Contact Details (`con-methods`)**: Details hotlines, WhatsApp shortcuts, and headquarters locations.
- **Detailed Inquiry Form (`con-inquiry-section`)**: An interactive 7-field form (Name, Email, Interest, Target Date, Group Size, Comments) connected to Firebase, redirecting to the Thank You page upon completion.

---

### 9. FAQ (`Faq.tsx`)
Categorized accordion deck sorting 20+ inquiries into tabs: Planning, Expeditions, Safety, Payments, and Custom Trips.

---

### 10. Travel Guides (`TravelGuides.tsx`)
Practical handbook guides discussing gear lists (layering system, boot selection), visa support, altitude sickness protocols, and packing guides.

---

### 11. Privacy Policy (`Privacy.tsx`) & 12. Terms & Conditions (`Terms.tsx`)
Standard, legally compliant agreements defining terms of service, payment schedules, cancellation refunds, and the liability waivers necessary for extreme altitude sports.

---

### 13. Thank You (`ThankYou.tsx`)
A post-submit landing page verifying the user's booking/contact inquiry success. Outlines the next steps of the verification process (e.g., "Representative will contact you via email within 24 hours").

---

### 14. 404 Not Found (`NotFound.tsx`)
Custom "Lost in the Karakoram" fallback page. Includes quick redirect buttons back to active Base Camp routes.

---

## 🛠️ Local Installation & Development

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) installed on your operating system.

### 2. Setup
Clone this repository to your local directory and navigate to the project folder:
```bash
npm install
```

### 3. Firebase Environment Configuration
Create a `.env` or `.env.local` file in the root folder and configure the credentials matched in `firebase-applet-config.json`:
```env
VITE_FIREBASE_API_KEY="AIzaSyAgLMgIMaW69OASsvrrXp2SQ9fiX56Tihc"
VITE_FIREBASE_AUTH_DOMAIN="gen-lang-client-0560878319.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="gen-lang-client-0560878319"
VITE_FIREBASE_STORAGE_BUCKET="gen-lang-client-0560878319.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="704984734200"
VITE_FIREBASE_APP_ID="1:704984734200:web:40ec80096c7c35b14c9e0d"
VITE_FIREBASE_DATABASE_ID="ai-studio-broadpeakadventu-fae44d01-240a-4948-ba1b-38d4080a8aed"
```

### 4. Running the Development Server
Run the local dev server (default port `3000`):
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### 5. Production Compilation
To build the static application bundle:
```bash
npm run build
```
This compiles assets to the `dist` folder. Test the production bundle locally via:
```bash
npm run preview
```
