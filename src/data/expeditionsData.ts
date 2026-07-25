export interface ItineraryItem {
  day: string;
  title: string;
  desc: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Expedition {
  id: string;
  tagline: string;
  title: string;
  desc: string;
  difficulty: "Easy" | "Moderate" | "Hard" | "Extreme";
  difficultyClass: string;
  duration: string;
  maxAltitude: string;
  bestSeason: string;
  groupSize: string;
  accommodation: string;
  startingPrice: string;
  overviewSubtitle: string;
  overviewTitle: string;
  overviewDescs: string[];
  overviewImage: string;
  itinerary: ItineraryItem[];
  inclusions: string[];
  exclusions: string[];
  gallery: string[];
  faqs: FAQItem[];
}

export const expeditionsData: Record<string, Expedition> = {
  "k2": {
    id: "k2",
    tagline: "THE ULTIMATE KARAKORAM EXPEDITION",
    title: "K2 BASE CAMP TREK",
    desc: "Journey through the legendary Baltoro Glacier to the foot of the world's second-highest mountain and experience one of the greatest trekking adventures on Earth.",
    difficulty: "Extreme",
    difficultyClass: "extreme",
    duration: "21 Days",
    maxAltitude: "5,150m",
    bestSeason: "June – August",
    groupSize: "12 Travelers",
    accommodation: "Camping + Hotels",
    startingPrice: "$2,450",
    overviewSubtitle: "THE JOURNEY",
    overviewTitle: "AN ADVENTURE LIKE NO OTHER",
    overviewDescs: [
      "The K2 Base Camp Trek is widely considered one of the world's most spectacular and demanding adventure journeys. Following the rushing torrents of the Braldu River, the trek leads deep into the high mountain wilderness of Baltistan, where the massive Baltoro Glacier acts as a highway to the highest peaks on the planet.",
      "As you traverse the lateral moraine of the Baltoro Glacier, towering towers of granite like the Trango Towers and Cathedral Peak rise dramatically on either side. You will march up to Concordia, the famous glacial confluence dubbed the 'Throne Room of the Mountain Gods', which offers an unmatched 360-degree amphitheater of snow-capped peaks, including Broad Peak, Gasherbrum, and K2 itself.",
      "This expedition is more than a physical challenge; it is a deep immersion into the unique mountain culture of Baltistan. Supported by the legendary Balti porters and guides, you will experience authentic mountain hospitality, shared stories around campsites, and the raw, spiritual power of the Karakoram Range."
    ],
    overviewImage: "/assets/images/who-we-are-main.webp",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Islamabad",
        desc: "Upon arrival at Islamabad International Airport, our team transfers you to the hotel. We gather for an evening briefing, go over gear checklists, and enjoy a welcome dinner."
      },
      {
        day: "Day 2",
        title: "Flight to Skardu",
        desc: "We board a scenic flight to Skardu, capturing aerial views of Nanga Parbat and the Indus River. Spend the afternoon exploring local bazaars and acclimatizing to 2,230m elevation."
      },
      {
        day: "Day 3",
        title: "Preparation & Acclimatization",
        desc: "A dedicated day in Skardu for final government briefings, gear checks, packing, and a short walk to Kharpocho Fort for stunning valley views."
      },
      {
        day: "Day 4–6",
        title: "Journey to Askole & Jhola",
        desc: "We take off in 4x4 jeeps through the rugged Shigar Valley to Askole, the last road-head village. We begin trekking, crossing the Braldu River to reach our first wild campsites at Jhola."
      },
      {
        day: "Day 7–10",
        title: "Baltoro Glacier Trek",
        desc: "We ascend onto the mighty Baltoro Glacier, trekking past Paiju and Urdukas. Towering monoliths like Trango Towers and Cathedral Peak dominate the skyline as we ascend above 4,000m."
      },
      {
        day: "Day 11",
        title: "Concordia",
        desc: "We march up to Concordia, the famous glacial junction. Camp surrounded by the highest concentration of giant peaks on earth, looking directly at the mighty pyramid of K2."
      },
      {
        day: "Day 12",
        title: "K2 Base Camp",
        desc: "A challenging day-hike leads us to K2 Base Camp (5,150m) and the Art Gilkey Memorial. Stand directly beneath the gargantuan mountain wall before returning to Concordia."
      },
      {
        day: "Day 13–20",
        title: "Return Journey",
        desc: "We begin our descent back down the Baltoro Glacier, or optionally cross the Gondogoro La Pass if conditions permit. We return to Askole, take jeeps back to Skardu, and fly back to Islamabad."
      },
      {
        day: "Day 21",
        title: "Departure",
        desc: "Hotel check-out and transfer to Islamabad International Airport for your international return flight home."
      }
    ],
    inclusions: [
      "Professional government-certified mountain guides",
      "Trekking permits and National Park entry fees",
      "Hotel accommodations in Islamabad and Skardu",
      "Full board meals during the entire trek",
      "High-quality camping equipment (tents, mess tents, sleeping mats)",
      "All land transport (jeeps and domestic flights)",
      "Porter services for personal gear (up to 15kg)",
      "First-aid kit, satellite communication, and emergency support"
    ],
    exclusions: [
      "International flights to and from Islamabad",
      "Personal medical and travel insurance (mandatory evacuation cover)",
      "Pakistan entry visa fees",
      "Personal trekking gear and clothing",
      "Tips for guide, porters, and kitchen staff",
      "Additional hotel nights outside the group itinerary"
    ],
    gallery: [
      "/assets/images/k2.webp",
      "/assets/images/passu-cones.webp",
      "/assets/images/snow-lake.webp",
      "/assets/images/deosai-sunrise.webp"
    ],
    faqs: [
      {
        question: "How physically demanding is this trek?",
        answer: "This is an extremely demanding trek. You will be walking for 6 to 8 hours daily over rugged moraine and rough glaciers at high altitudes. Prior multi-day trekking experience, excellent cardiovascular fitness, and leg strength are highly recommended."
      },
      {
        question: "Do I need previous trekking experience?",
        answer: "Yes. While it is not a technical climb, you must be comfortable trekking for multiple consecutive days on uneven, loose glacial terrain, and sleeping in cold outdoor tents above 4,000m."
      },
      {
        question: "What gear is essential?",
        answer: "Essential personal items include well-broken-in trekking boots, a down jacket rated for -15°C, a 4-season sleeping bag, thermal base layers, UV-protection sunglasses, and a sturdy 60L duffel bag for the porters."
      }
    ]
  },
  "basho-valley": {
    id: "basho-valley",
    tagline: "LUSH ALPINE PASTURES & COLD SPRINGS",
    title: "BASHO VALLEY TREK",
    desc: "Discover the emerald meadows, pine forests, and crystal-clear streams of Basho, a hidden alpine paradise in Baltistan.",
    difficulty: "Easy",
    difficultyClass: "easy",
    duration: "7 Days",
    maxAltitude: "3,200m",
    bestSeason: "May – October",
    groupSize: "12 Travelers",
    accommodation: "Cottages & Camping",
    startingPrice: "$850",
    overviewSubtitle: "THE EMERALD GEM",
    overviewTitle: "BALTISTAN'S FAIRYLAND",
    overviewDescs: [
      "Basho Valley is a breathtaking valley located in Roundu District of Baltistan. Known for its lush green meadows, towering pine forests, and crystal-clear mountain streams, Basho offers a stark and stunning contrast to the otherwise dry, rocky landscape of the surrounding Skardu district.",
      "The trek in Basho leads you through local stone villages, grazing pastures, and beautiful forests, culminating in scenic viewpoints where you can gaze upon the roaring Indus River and surrounding peaks.",
      "With gentle elevations, warm local hospitality, and basic eco-lodges, Basho is the perfect adventure for nature lovers, families, and anyone seeking a peaceful mountain sanctuary."
    ],
    overviewImage: "/assets/images/deosai-sunrise.webp",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Islamabad",
        desc: "Meet at airport, transfer to hotel, and enjoy a welcome briefing and dinner."
      },
      {
        day: "Day 2",
        title: "Scenic Flight to Skardu",
        desc: "Fly to Skardu (2,230m) with incredible views of Nanga Parbat. Check into hotel and explore local markets."
      },
      {
        day: "Day 3",
        title: "Drive to Basho Valley",
        desc: "Drive in 4x4 jeeps to Roundu, cross the suspension bridge over the Indus, and head up to Basho Valley."
      },
      {
        day: "Day 4",
        title: "Trek to Basho Meadows",
        desc: "Hike through aromatic pine forests to the wide, high meadows. Camp beside crystal streams."
      },
      {
        day: "Day 5",
        title: "Explore Waterfall & Springs",
        desc: "Spend the day exploring the stunning Basho Waterfall, cold fresh springs, and interacting with local shepherds."
      },
      {
        day: "Day 6",
        title: "Return to Skardu & Islamabad",
        desc: "Drive back to Skardu, board your flight to Islamabad, and relax at your hotel."
      },
      {
        day: "Day 7",
        title: "Departure",
        desc: "Transfer to Islamabad Airport for your outbound flight."
      }
    ],
    inclusions: [
      "Certified local tour coordinator and guide",
      "Standard hotel stays in Islamabad & Skardu, and camp gear in Basho",
      "All ground transfers (jeeps and private coasters)",
      "Daily fresh hot meals during the trek",
      "Porters for personal gear (up to 12kg)",
      "Permits and community entry fees"
    ],
    exclusions: [
      "International flights and visa fees",
      "Personal trekking clothes and boots",
      "Tips for guides and porters"
    ],
    gallery: [
      "/assets/images/deosai-sunrise.webp",
      "/assets/images/passu-cones.webp",
      "/assets/images/snow-lake.webp"
    ],
    faqs: [
      {
        question: "Is Basho Valley suitable for children?",
        answer: "Yes! The trails are gentle and the altitude is relatively low (under 3,200m), making it ideal for families and children."
      },
      {
        question: "What is the best season to visit?",
        answer: "The best season is from May to October, when the meadows are brilliantly green and wildflowers are in bloom."
      }
    ]
  },
  "tormik-valley": {
    id: "tormik-valley",
    tagline: "SECLUDED PASTURES & HISTORIC VILLAGES",
    title: "TORMIK VALLEY DISCOVERY",
    desc: "Venture off-the-beaten-path into the serene Tormik Valley, famous for its steep terraced fields, pristine streams, and Balti culture.",
    difficulty: "Moderate",
    difficultyClass: "moderate",
    duration: "8 Days",
    maxAltitude: "3,400m",
    bestSeason: "June – September",
    groupSize: "10 Travelers",
    accommodation: "Camping & Guesthouses",
    startingPrice: "$950",
    overviewSubtitle: "THE HIDDEN VALLEY",
    overviewTitle: "TRADITIONAL BALTI HERITAGE",
    overviewDescs: [
      "Tormik Valley is a hidden gem tucked away in the mountain recesses of Baltistan. Known for its historical stone villages and terraced agricultural fields climbing up the hillsides, it represents one of the most authentic and untouched rural landscapes in the region.",
      "The trek in Tormik takes you along historical trails used by shepherds for centuries, crossing cold glacial rivers and climbing to panoramic viewpoints looking out to rugged Karakoram peaks.",
      "This journey is designed for cultural adventurers who want to experience true Balti mountain life, pristine wilderness, and complete solitude far from common tourist trails."
    ],
    overviewImage: "/assets/images/passu-cones.webp",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Islamabad",
        desc: "Meet at airport, transfer to hotel, and explore the grand Faisal Mosque."
      },
      {
        day: "Day 2",
        title: "Flight to Skardu",
        desc: "Scenic mountain flight to Skardu (2,230m). Spend the afternoon acclimatizing and exploring organic village."
      },
      {
        day: "Day 3",
        title: "Drive to Tormik Valley",
        desc: "Take 4x4 jeeps to Tormik Valley. Setup camp beside a rushing stream near a traditional stone village."
      },
      {
        day: "Day 4–5",
        title: "Shepherds' Trail Trek",
        desc: "Trek along traditional agricultural trails, ascending to high pastures (3,400m) with stunning mountain views."
      },
      {
        day: "Day 6",
        title: "Cultural Exchange in Tormik",
        desc: "Interact with local farmers, learn about traditional irrigation systems, and enjoy local Balti cuisine."
      },
      {
        day: "Day 7",
        title: "Return to Skardu & Islamabad",
        desc: "Drive back to Skardu, fly to Islamabad, and enjoy a farewell group dinner."
      },
      {
        day: "Day 8",
        title: "Departure",
        desc: "Transfer to Islamabad Airport for outbound flights."
      }
    ],
    inclusions: [
      "Professional English/Balti-speaking guide",
      "All jeep and coaster transport",
      "Full board camping meals cooked fresh daily",
      "High-quality tents and camp gear",
      "Porter services and park entry fees"
    ],
    exclusions: [
      "International flights and travel visa",
      "Personal gear and travel insurance",
      "Tips for guiding and support staff"
    ],
    gallery: [
      "/assets/images/passu-cones.webp",
      "/assets/images/k2.webp",
      "/assets/images/snow-lake.webp"
    ],
    faqs: [
      {
        question: "How difficult is the trekking in Tormik?",
        answer: "It is rated as Moderate. It involves walking for 4 to 5 hours daily on dirt paths and gravel riverbeds with a moderate incline."
      }
    ]
  },
  "bilamik-valley": {
    id: "bilamik-valley",
    tagline: "UNTOUCHED MOUNTAIN WILDERNESS",
    title: "BILAMIK VALLEY SANCTUARY",
    desc: "Explore the wild, pristine pastures and high ridges of Bilamik, a peaceful valley offering absolute solitude in Baltistan.",
    difficulty: "Moderate",
    difficultyClass: "moderate",
    duration: "9 Days",
    maxAltitude: "3,600m",
    bestSeason: "June – September",
    groupSize: "10 Travelers",
    accommodation: "Camping",
    startingPrice: "$1,050",
    overviewSubtitle: "THE SECRETS OF BALTISTAN",
    overviewTitle: "PRISTINE WILDERNESS",
    overviewDescs: [
      "Bilamik Valley is one of the most secluded and untouched valleys in the Karakoram foothills. Home to alpine meadows, high pine forests, and grazing grounds for local yaks and goats, it offers a tranquil haven for wild trekking.",
      "The trail leads past sparkling mountain creeks and through dense woods, eventually opening up to expansive valleys with dramatic granite rock walls rising above.",
      "For hikers looking to disconnect from the modern world and sleep under unpolluted, star-studded skies, the Bilamik Valley Sanctuary is an unparalleled, quiet journey."
    ],
    overviewImage: "/assets/images/snow-lake.webp",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Islamabad",
        desc: "Meet at airport, transfer to hotel, and evening briefing."
      },
      {
        day: "Day 2",
        title: "Flight to Skardu",
        desc: "Acclimatize in Skardu. Hike up to Kharpocho Fort for sunset views over the Indus."
      },
      {
        day: "Day 3",
        title: "Drive to Bilamik Roadhead",
        desc: "Board 4x4 jeeps for a scenic drive along the Indus gorge to the trailhead of Bilamik."
      },
      {
        day: "Day 4–6",
        title: "Deep Valley Trekking",
        desc: "Ascend past pine forests to Bilamik pastures (3,600m). Set up camp surrounded by snow-capped peaks."
      },
      {
        day: "Day 7–8",
        title: "Return to Skardu & Islamabad",
        desc: "Descend to the roadhead, jeep to Skardu, fly to Islamabad, and relax."
      },
      {
        day: "Day 9",
        title: "Departure",
        desc: "Transfer to airport for departure."
      }
    ],
    inclusions: [
      "Experienced mountain guide and chef",
      "Camping permits and community fees",
      "High-quality 4-season tents and mats",
      "Fresh meals and ground transfers"
    ],
    exclusions: [
      "International flights and visa",
      "Personal hiking gear",
      "Tips and optional snacks"
    ],
    gallery: [
      "/assets/images/snow-lake.webp",
      "/assets/images/deosai-sunrise.webp",
      "/assets/images/k2.webp"
    ],
    faqs: [
      {
        question: "Is there cell service in Bilamik Valley?",
        answer: "No, cell coverage is extremely limited or non-existent in Bilamik. We carry a satellite tracker for emergency communications."
      }
    ]
  },
  "haramosh-pass": {
    id: "haramosh-pass",
    tagline: "THE ULTIMATE HIGH-ALTITUDE TRAVERSE",
    title: "HARAMOSH PASS EXPEDITION",
    desc: "Cross the formidable Haramosh Pass, connecting the rugged Haramosh Glacier with Kutwal Valley in a challenging, epic crossing.",
    difficulty: "Extreme",
    difficultyClass: "extreme",
    duration: "16 Days",
    maxAltitude: "4,800m",
    bestSeason: "July – August",
    groupSize: "8 Travelers",
    accommodation: "Camping",
    startingPrice: "$1,850",
    overviewSubtitle: "THE EXTREME OVERPASS",
    overviewTitle: "AN EPIC CROSSING",
    overviewDescs: [
      "The Haramosh Pass Expedition is one of the most challenging and high-altitude trekking crossings in Gilgit-Baltistan. Connecting the rugged Haramosh glacier with the beautiful Kutwal valley, this trek traverses extreme terrain of snow, ice, and vertical scree.",
      "Standing at the pass (4,800m), you are rewarded with unparalleled views of Haramosh Peak (7,409m), Laila Peak, and Spantik. Navigating the crevassed glacier fields requires roping up and utilizing mountaineering safety protocols.",
      "This trip is strictly suited for experienced hikers who possess excellent physical fitness and are comfortable in harsh alpine wilderness settings."
    ],
    overviewImage: "/assets/images/k2.webp",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Islamabad",
        desc: "Airport transfer and hotel stay."
      },
      {
        day: "Day 2",
        title: "Flight to Gilgit",
        desc: "Scenery flight to Gilgit. Gear checks and team briefing."
      },
      {
        day: "Day 3–4",
        title: "Drive to Sassi & Trek to Haramosh Base",
        desc: "Drive to Sassi village, then begin trekking up the gorge to Haramosh Glacier."
      },
      {
        day: "Day 5–8",
        title: "Glacier Ascent to Pass",
        desc: "Ascend onto the glacier field, rope up to navigate ice falls, and reach high camp below the pass."
      },
      {
        day: "Day 9",
        title: "Cross Haramosh Pass",
        desc: "Cross the high Haramosh Pass (4,800m), using fixed ropes for descent into Kutwal valley."
      },
      {
        day: "Day 10–13",
        title: "Descent through Kutwal & Gilgit",
        desc: "Trek past Kutwal Lake, descend to roadhead, and drive back to Gilgit."
      },
      {
        day: "Day 14–16",
        title: "Flight to Islamabad & Departure",
        desc: "Fly to Islamabad and connect with outbound international flights."
      }
    ],
    inclusions: [
      "Government-certified mountain guides and climbing assistants",
      "Fixed ropes, harness, and high-altitude safety gear",
      "Full board alpine meals and reinforcement camping gear",
      "Trekking permits and national park fees"
    ],
    exclusions: [
      "International flights and visa",
      "Personal mountaineering boots and crampons",
      "Travel/rescue insurance (evacuation cover mandatory)"
    ],
    gallery: [
      "/assets/images/k2.webp",
      "/assets/images/snow-lake.webp",
      "/assets/images/passu-cones.webp"
    ],
    faqs: [
      {
        question: "Do I need climbing experience for Haramosh Pass?",
        answer: "Prior high-altitude glacier walking experience is required. Roping up and descending steep snow slopes will be coordinated by our expert guides."
      }
    ]
  },
  "kutwal-lake": {
    id: "kutwal-lake",
    tagline: "MIRROR OF THE HARAMOSH PEAK",
    title: "KUTWAL LAKE TREK",
    desc: "Trek to the magnificent alpine Kutwal Lake, surrounded by heavy glaciers and the dramatic wall of Haramosh Peak.",
    difficulty: "Hard",
    difficultyClass: "hard",
    duration: "10 Days",
    maxAltitude: "3,800m",
    bestSeason: "June – September",
    groupSize: "12 Travelers",
    accommodation: "Camping",
    startingPrice: "$1,250",
    overviewSubtitle: "THE BLUE REFLECTION",
    overviewTitle: "KUTWAL MEADOWS & LAKE",
    overviewDescs: [
      "Kutwal Lake is a stunning, high-altitude alpine lake nestled in the Haramosh Valley of Gilgit district. Ringed by pine trees and mirror-like reflecting fields, the lake offers a panoramic view of the towering Haramosh Peak (7,409m) reflecting on its crystal-clear water.",
      "The trek starts from Sassi and follows a gorge trail, passing beautiful forests and traditional mud-brick settlements of the Haramosh people.",
      "With high glaciers, active wildlife, and beautiful green meadows, Kutwal Lake represents the classic Himalayan wilderness experience."
    ],
    overviewImage: "/assets/images/destination_deosai_1783185627767.webp",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Islamabad",
        desc: "Airport transfer and hotel stay."
      },
      {
        day: "Day 2",
        title: "Flight to Gilgit",
        desc: "Scenic flight and exploration of Gilgit Bazar and local heritage."
      },
      {
        day: "Day 3",
        title: "Drive to Sassi & Trek to Dassu",
        desc: "Jeep drive to Sassi, start walking along the river gorge to Dassu village."
      },
      {
        day: "Day 4–6",
        title: "Trek to Kutwal Lake",
        desc: "Hike through forests and summer pastures to Kutwal Lake (3,800m). Pitch tents beside the water."
      },
      {
        day: "Day 7–10",
        title: "Return via Sassi & Gilgit to Islamabad",
        desc: "Descend back to Sassi, take jeeps to Gilgit, and fly to Islamabad for departure."
      }
    ],
    inclusions: [
      "Expert local guide and camp staff",
      "Comfortable tents, sleeping bags, and mess tents",
      "Coaster and 4x4 jeep transport",
      "Full board hot meals on the trek"
    ],
    exclusions: [
      "International flights and visa",
      "Personal clothing and boots",
      "Tips for guides and porters"
    ],
    gallery: [
      "/assets/images/deosai-sunrise.webp",
      "/assets/images/k2.webp",
      "/assets/images/passu-cones.webp"
    ],
    faqs: [
      {
        question: "Can I rent a horse for the trek?",
        answer: "Yes, horses can be rented from Sassi or local villages for cargo or riding if you want to ease the walking load."
      }
    ]
  },
  "minimarg": {
    id: "minimarg",
    tagline: "PRISTINE FORESTS & ALPINE BLOSSOMS",
    title: "MINIMARG VALLEY ESCAPE",
    desc: "Journey to Minimarg, a fairytale valley of lush rolling green pastures, dense pine forests, and rustic wooden cottages.",
    difficulty: "Easy",
    difficultyClass: "easy",
    duration: "8 Days",
    maxAltitude: "2,845m",
    bestSeason: "June – September",
    groupSize: "15 Travelers",
    accommodation: "Wooden Cabins & Hotels",
    startingPrice: "$1,100",
    overviewSubtitle: "THE HIMALAYAN BORDERLAND",
    overviewTitle: "A FAIRYTALE IN THE MOUNTAINS",
    overviewDescs: [
      "Minimarg is a picture-perfect, lush green valley situated in the Astore district of Gilgit-Baltistan. Accessible via the Burzil Pass, this remote borderland valley is famous for its dense pine forests, rolling alpine meadows, and traditional wooden huts.",
      "The valley remains untouched by mass commercialism, preserving a clean, peaceful lifestyle with crystal streams and wild blossoms blooming in abundance.",
      "Our package combines light nature walks, traditional organic meals, and stays in beautiful wooden cottages, offering a peaceful retreat in one of the most stunning valleys in Asia."
    ],
    overviewImage: "/assets/images/destination_fairy_meadows_1783185607151.webp",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Islamabad",
        desc: "Welcome to Pakistan. Meet and transfer to hotel."
      },
      {
        day: "Day 2",
        title: "Drive along Karakoram Highway",
        desc: "Scenic drive along the Indus River to Chilas or Naran."
      },
      {
        day: "Day 3",
        title: "Drive to Astore & Chilam",
        desc: "Jeep drive to Astore Valley, then continue to Chilam Chowki (base of Burzil Pass)."
      },
      {
        day: "Day 4",
        title: "Burzil Pass to Minimarg",
        desc: "Cross the historic Burzil Pass (4,100m) in 4x4 jeeps, descending into the lush green Minimarg valley."
      },
      {
        day: "Day 5–6",
        title: "Explore Minimarg & Pine Forests",
        desc: "Walk through pine woodlands, visit local wooden cottages, and explore alpine flower meadows."
      },
      {
        day: "Day 7–8",
        title: "Return to Islamabad & Departure",
        desc: "Drive back via Astore & Babusar Pass to Islamabad, followed by airport transfer."
      }
    ],
    inclusions: [
      "Special local area permits and entry coordination",
      "Stay in boutique hotels and wooden log cabins",
      "Private 4x4 jeep transport throughout",
      "All meals and local guide support"
    ],
    exclusions: [
      "International flights and visa",
      "Tips for local guides and drivers",
      "Personal items"
    ],
    gallery: [
      "/assets/images/destination_fairy_meadows_1783185607151.webp",
      "/assets/images/deosai-sunrise.webp",
      "/assets/images/attabad-lake.webp"
    ],
    faqs: [
      {
        question: "Do we need special permits for Minimarg?",
        answer: "Yes. Minimarg requires special security permits due to its close proximity to the border. Broad Peak Adventures handles all permit processing for you."
      }
    ]
  },
  "domel": {
    id: "domel",
    tagline: "LAND OF THE RAINBOW LAKE",
    title: "DOMEL & RAINBOW LAKE",
    desc: "Camp beside the legendary Rainbow Lake in Domel, an alpine wonderland of vibrant wildflowers, crystal streams, and scenic hills.",
    difficulty: "Easy",
    difficultyClass: "easy",
    duration: "6 Days",
    maxAltitude: "2,900m",
    bestSeason: "June – September",
    groupSize: "16 Travelers",
    accommodation: "Camps & Wooden Cabins",
    startingPrice: "$980",
    overviewSubtitle: "THE COLOURED WATER",
    overviewTitle: "RAINBOW LAKE SANCTUARY",
    overviewDescs: [
      "Domel is a pristine valley situated adjacent to Minimarg in Astore District. It is home to the famous Rainbow Lake, a crystal-clear, high-altitude lake populated by trout fish and surrounded by soft grassy banks and vibrant wildflowers.",
      "The valley is a natural spectacle of green hills, winding streams, and snow-dusted peaks, providing an idyllic setting for glamping and photography.",
      "We set up premium camps right on the banks of Rainbow Lake, allowing you to wake up to misty mountains reflecting on the emerald water."
    ],
    overviewImage: "/assets/images/destination_attabad_lake_1783185617186.webp",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Islamabad",
        desc: "Meet at airport and transfer to hotel."
      },
      {
        day: "Day 2",
        title: "Drive to Astore",
        desc: "Drive past the junction of Karakoram, Hindu Kush, and Himalaya ranges to Astore."
      },
      {
        day: "Day 3",
        title: "Drive to Domel via Burzil Pass",
        desc: "Cross Burzil Pass in 4x4 jeeps to reach Domel. Set up luxury tents beside Rainbow Lake."
      },
      {
        day: "Day 4",
        title: "Explore Rainbow Lake & Glamping",
        desc: "Spend the day enjoying trout-watching, light hiking to glacier views, and lakeside glamping."
      },
      {
        day: "Day 5–6",
        title: "Return to Islamabad & Departure",
        desc: "Retrace our path back to Islamabad for flight home."
      }
    ],
    inclusions: [
      "Full local security clearances and travel permits",
      "Glamping camps and cottage accommodations",
      "Private 4x4 jeeps and all meals",
      "Trouting license and expert coordinator"
    ],
    exclusions: [
      "International flights and visa",
      "Tips and personal expenses"
    ],
    gallery: [
      "/assets/images/attabad-lake.webp",
      "/assets/images/deosai-sunrise.webp",
      "/assets/images/k2.webp"
    ],
    faqs: [
      {
        question: "Can we fish in Rainbow Lake?",
        answer: "Yes! Rainbow Lake is famous for brown trout. A fishing permit is required, which we organize as part of our service."
      }
    ]
  },
  "hoper-valley": {
    id: "hoper-valley",
    tagline: "BLACK GLACIERS AND DEEP NAGAR CULTURE",
    title: "HOPER VALLEY EXPLORER",
    desc: "Witness the moving Hoper Glacier and discover the ancient Nagar culture in the shadow of Spantik (Golden Peak).",
    difficulty: "Moderate",
    difficultyClass: "moderate",
    duration: "5 Days",
    maxAltitude: "2,800m",
    bestSeason: "April – October",
    groupSize: "14 Travelers",
    accommodation: "Hotels & Camps",
    startingPrice: "$750",
    overviewSubtitle: "THE ICE FIELD",
    overviewTitle: "NAGAR & HOPER GLACIER",
    overviewDescs: [
      "Hoper Valley is a scenic, fertile valley located in Nagar District. It is famous for the active, black-moraine Hoper Glacier (Bualtar Glacier) which flows dramatically right beside the green orchards of the valley.",
      "Trek down onto the glacier moraine, meet the welcoming Nagar community, and look up to Golden Peak (Spantik) and Bawalter Peak rising in the background.",
      "With fruit blossoms in spring, rich golden foliage in autumn, and active glacier routes, Hoper Valley represents one of the most accessible and culturally rich adventures in Nagar."
    ],
    overviewImage: "/assets/images/hunza.webp",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Islamabad",
        desc: "Airport transfer to hotel."
      },
      {
        day: "Day 2",
        title: "Scenic Flight to Gilgit",
        desc: "Fly to Gilgit. Drive along the Karakoram Highway to Nagar district."
      },
      {
        day: "Day 3",
        title: "Trek Hoper Glacier",
        desc: "Walk from Hoper village down into the active glacier valley, exploring the ice moraine."
      },
      {
        day: "Day 4–5",
        title: "Drive back to Gilgit, Islamabad & Departure",
        desc: "Drive back to Gilgit, fly to Islamabad, and connect with outbound international flights."
      }
    ],
    inclusions: [
      "Licensed guide and private coasters",
      "Standard hotel accommodation in Gilgit and Nagar",
      "Full board fresh meals daily",
      "Entry permits to Nagar valley"
    ],
    exclusions: [
      "International flights and visa",
      "Tips and personal incidentals"
    ],
    gallery: [
      "/assets/images/hunza.webp",
      "/assets/images/passu-cones.webp",
      "/assets/images/deosai-sunrise.webp"
    ],
    faqs: [
      {
        question: "Is Hoper Glacier safe to walk on?",
        answer: "Yes, our guides lead you along designated, safe moraine trails. Crampons or ropes are generally not required for the standard tourist path."
      }
    ]
  }
};
