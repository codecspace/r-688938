export interface ProjectDataType {
  id: string;
  propertyName: string;  // Changed from 'title'
  developerName: string; // New field
  location: string;
  image: string;
  description: string;
  longDescription?: string;
  fullAddress?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  heroImage?: string;
  images?: string[];
  amenities?: string[];
  specifications?: Record<string, any>;
}

export const projectsData: ProjectDataType[] = [
  {
    id: "aipl-joy-district",
    propertyName: "AIPL Joy District Sector 88 Gurgaon",
    developerName: "AIPL",
    location: "Sector - 88, Gurugram",
    image: "https://i.imgur.com/VIVNtTM.png",
    heroImage: "https://i.postimg.cc/N0dcJVDT/AIPL-Joy-District-Sector-88-Gurgaon-1719656222.webp",
    fullAddress: "Sector 88, Gurugram, Haryana 122101, India",
    description: "A landmark commercial development in Sector 88, Gurugram, combining a high-street retail mall with premium office and leisure spaces — designed for brands that want visibility and footfall in one address.",
    longDescription: "AIPL Joy District Sector 88 Gurgaon is a newly launched landmark commercial development project located strategically at the prime area Sector 88 of Gurgaon city. The one-of-a-kind commercial project AIPL at Sector 88 Gurgaon is known for its innovation and excellence in the commercial domain.",
    isNew: true,
    isFeatured: true,
    images: [
      "https://i.postimg.cc/N0dcJVDT/AIPL-Joy-District-Sector-88-Gurgaon-1719656222.webp",
      "https://i.imgur.com/qPI8uVd.png"
    ],
    specifications: {
      overview: [
        "High Street with Partial AC Mall",
        "LEED/GRIHA Certified",
        "Number of Floors: G+4",
        "Double Basements",
        "500 – 1000 SQ. FT",
        "18 Passenger & 21 Service Lifts",
        "Escalators: Yes"
      ],
      "leasing strategy": [
        "Hypermarket with Travellator in LGF/Basement",
        "Ground & First: High-End Retail",
        "2nd Floor: High-End Retail & Rooftop Restaurants",
        "3rd Floor: Multiplex, Entertainment, Rooftop Restaurant, Food Court"
      ]
    },
    amenities: [
      "Gym", "Bar-Lounge", "Swimming Pool", "24 hrs Security", 
      "Car Parking", "Cafe Lounge", "Mini Theatre", "Power Back-up", 
      "Restaurant", "Barbeque", "High Speed Elevator", "Indoor Games", "Salon"
    ]
  },
  {
    id: "godrej-aristocrat",
    propertyName: "Godrej Aristocrat Gurgaon",
    developerName: "Godrej",
    location: "Sector - 49, Gurugram",
    image: "https://i.imgur.com/Tm5t9pp.jpg",
    heroImage: "https://i.postimg.cc/vBpHhk8h/image.png",
    fullAddress: "Sector 49, Gurugram, Haryana 122018, India",
    description: "Set in Sector 49 along the Golf Course Extension Road, Godrej Aristocrat offers spacious 3 and 4 BHK apartments behind a triple-height entrance lobby, an 18-hole golf course view, a landscaped terrace, a swimming pool, and a luxury clubhouse.",
    longDescription: "Soon to be launched Godrej Aristocrat Gurgaon development has generated quite a stir. There are several reasons to choose Godrej Aristocrat Gurgaon that go into making this fabulous project stand out.",
    isNew: true,
    isFeatured: true,
    images: [
      "https://i.postimg.cc/vBpHhk8h/image.png",
      "https://i.postimg.cc/XqdNzLpb/image.png",
      "https://i.imgur.com/Tm5t9pp.jpg"
    ],
    specifications: {
      overview: [
        "Towers: 6",
        "Floors: 31",
        "Units: 728",
        "Total Project Area: 9.56 acres (38.7K sq.m.)",
        "Structure: RCC frame structure"
      ],
      "tiles and flooring": [
        "Imported Marble Flooring are given in the kitchen, living & dining area",
        "Laminated wooden flooring is given in bedrooms",
        "Anti-skid tiles are provided in the toilet and balcony"
      ],
      walls: [
        "Acrylic emulsion is used on internal walls",
        "Weatherproof paint is used on external walls",
        "Premium Tiles are used for bathroom walls"
      ],
      fittings: [
        "There is a sink attached to the counters",
        "Digital Door Lock is given in the apartments",
        "CP fittings or equivalent are given in the Kitchen and other areas"
      ],
      "doors & windows": [
        "A teak wood frame is given in the main door",
        "Red meranti is used in the internal doors",
        "An aluminum frame with glass is used for windows",
        "Sliding doors windows or equivalent are given in the rooms"
      ],
      "bathroom specification": [
        "Shower Panel is given in the bathrooms",
        "Premium Bath fittings are given in the bathrooms",
        "Premium Tiles are used for Bathroom floors and walls",
        "There is a Geyser in every bathroom of the apartment"
      ]
    },
    amenities: [
      "Swimming Pool", "Gym", "Clubhouse", "Kids Play Area", 
      "Landscaped Gardens", "Jogging Track", "Sports Facilities", 
      "Security", "Power Backup", "Community Hall"
    ]
  },
  {
    id: "hero-homes",
    propertyName: "HERO HOMES Sector 104 Gurugram",
    developerName: "Hero Realty",
    location: "Sector - 104, Gurugram",
    image: "https://i.imgur.com/1qjWa6d.jpg",
    heroImage: "https://i.postimg.cc/dVmnGZmN/image.png",
    fullAddress: "Sector 104, Gurugram, Haryana 122001, India",
    description: "A premium residential development in Sector 104, Gurugram, spread across 11 acres with five high-rise towers. Hero Homes offers 3 and 4 BHK apartments built for modern urban families and professionals.",
    longDescription: "Hero Homes Gurgaon Sector 104 is a residential project which is coming up with 4 BHK apartments in Gurgaon. This residential building will be developed at Hero Realty Group at Gurgaon Sector 104.",
    isNew: true,
    isFeatured: true,
    images: [
      "https://i.postimg.cc/dVmnGZmN/image.png",
      "https://i.imgur.com/1qjWa6d.jpg"
    ],
    amenities: [
      "Swimming Pool", "Gym", "Clubhouse", "Kids Play Area", 
      "Landscaped Gardens", "Jogging Track", "Sports Facilities", 
      "Security", "Power Backup", "Community Hall", "Indoor Games",
      "Playground", "BBQ Area", "Zen Garden"
    ]
  },
  {
    id: "aipl-joy-square",
    propertyName: "AIPL Joy Square Sector 63A Gurgaon",
    developerName: "AIPL",
    location: "Sector - 63A, Gurugram",
    image: "https://i.imgur.com/V3ZYKie.jpg",
    heroImage: "https://i.postimg.cc/MHQmHnpD/image.png",
    fullAddress: "Sector 63A, Gurugram, Haryana 122001, India",
    description: "AIPL Joy Square and its sister development, AIPL Joy District, redefine commercial real estate with double-height retail frontage, expansive basements, dedicated escalators and lifts, and a landscaped sky garden — built for retail, F&B, and corporate tenants alike.",
    longDescription: "Experience the epitome of integrated retail and commercial development at AIPL Joy Square, Gurugram, India. Crafted by DP Architects, this visionary project embodies the essence of integrated retail and commercial spaces.",
    isNew: true,
    isFeatured: true,
    images: [
      "https://i.postimg.cc/MHQmHnpD/image.png",
      "https://i.imgur.com/V3ZYKie.jpg"
    ],
    specifications: {
      overview: [
        "Integrated retail and commercial development",
        "Crafted by DP Architects",
        "High street marketplace concept",
        "Total Area: 2.84 acres",
        "Floors: G+9",
        "Ample basement and surface parking"
      ]
    },
    amenities: [
      "Shopping Outlets", "Supermarkets", "Dining Options", 
      "Serviced Apartments", "Parking", "24/7 Security", 
      "High-Speed Elevators", "Power Backup", "Food Court"
    ]
  },
  {
    id: "birla-arika",
    propertyName: "Birla Arika Sector 31 Gurgaon",
    developerName: "Birla Estates",
    location: "Sector 31, Gurgaon",
    image: "https://i.postimg.cc/NFWpPcFN/image.png",
    heroImage: "https://i.postimg.cc/NFWpPcFN/image.png",
    fullAddress: "Sector 31, Gurugram, Haryana 122001, India",
    description: "Birla Estates Private Limited, a 100 per cent wholly owned subsidiary of Century Textiles and Industries Limited.",
    longDescription: "Birla Estates Private Limited, a 100 per cent wholly owned subsidiary of Century Textiles and Industries Limited, the over Rs. 8000 crore flagship Company of the B. K. Birla Group, is involved in creating iconic spaces.",
    isFeatured: true,
    images: [
      "https://i.postimg.cc/NFWpPcFN/image.png",
      "https://i.postimg.cc/0y1VYPLj/image.png"
    ],
    amenities: [
      "Swimming Pool", "Gym", "Clubhouse", "Kids Play Area", 
      "Landscaped Gardens", "Jogging Track", "Sports Facilities", 
      "Security", "Power Backup", "Community Hall"
    ]
  },
  {
    id: "tarc-ishva",
    propertyName: "Tarc Ishva Sector 63A Gurugram",
    developerName: "TARC",
    location: "Sector - 63A, Gurugram",
    image: "https://i.imgur.com/YQSL3gr.jpg",
    heroImage: "https://i.postimg.cc/rF59LRby/image.png",
    fullAddress: "Sector 63A, Gurugram, Haryana 122001, India",
    description: "At TARC Ishva, experience a blend of luxurious and harmonious lifestyle that celebrates the essence of your aspirations.",
    longDescription: "At TARC Ishva, experience a blend of luxurious and harmonious lifestyle that celebrates the essence of your aspirations. Inspired by the four directions, TARC Ishva embodies the nurturing spirit of the south, the potential of new beginnings from the east, the reality of dreams in the west and the ambition to achieve in the north.",
    isFeatured: true,
    images: [
      "https://i.postimg.cc/rF59LRby/image.png",
      "https://i.postimg.cc/nhkYXbp6/image.png",
      "https://i.postimg.cc/d0VRdH0D/image.png",
      "https://i.postimg.cc/vB1W24fs/image.png"
    ],
    amenities: [
      "Jogging Track", "Children's Play Area", "Gymnasium", 
      "Car Parking", "Spa", "Swimming Pool", "Indoor Games Room", 
      "CCTV Surveillance"
    ]
  }
];
