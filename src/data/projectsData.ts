// TypeScript interface for ProjectDataType (id removed)
export interface ProjectDataType {
  title: string;
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

// Function to deep clone an object
function deepClone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

// Original projectsData array without ids
const projectsData: ProjectDataType[] = [
  {
    title: "Birla Arika",
    location: "Sector - 88, Gurugram",
    image: "https://i.imgur.com/VIVNtTM.png",
    heroImage: "https://i.postimg.cc/N0dcJVDT/AIPL-Joy-District-Sector-88-Gurgaon-1719656222.webp",
    fullAddress: "Sector 88, Gurugram, Haryana 122101, India",
    description: "Birla Arika Super-Paljari 4 bhk + staff residences are designed for those who desire grandeur. With 4200 – 4900 square feet to extended size, these houses offer a unique lifestyle of specificity and elegance set within a reputed and cool enclave.",
    longDescription: "AIPL Joy District Sector 88 Gurgaon is a newly launched landmark commercial development project located strategically at the prime area Sector 88 of Gurgaon city. The one-of-a-kind commercial project AIPL at Sector 88 Gurugram is known for its innovation and excellence in the commercial domain. The project offers retail shops and office spaces to the businesses, start-ups and offices to enable them to carry out their daily operations without any hassle.",
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
    title: "The Palatial Sector 49 Gurugram",
    location: "Sector - 49, Gurugram",
    image: "https://i.imgur.com/Tm5t9pp.jpg",
    heroImage: "https://i.postimg.cc/vBpHhk8h/image.png",
    fullAddress: "Sector 49, Gurugram, Haryana 122018, India",
    description: "Located in Sector 49, the Golf Course presents an artistic and huge 3 and 4 BHK apartments with the extension roads, Gurugram, Godrej Aristocrat Utility areas. This work of craftsmanship has a triple-hit entrance lobby, an 18-hole golf course, landscaped terrace, a swimming pool, a luxury clubhouse, and more-which reduces the lifestyle of sophistication and indulgence.",
    longDescription: "Soon to be launched Godrej Aristocrat Gurgaon development has generated quite a stir. There are several reasons to choose Godrej Aristocrat Gurgaon that go into making this fabulous project so well liked. Set in sector 49 Gurgaon, the project offers close proximity to a variety of important destinations like school, college, bus stand, hospital, metro station and more which makes living here truly enjoyable.",
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
    title: "The Palatial Sector 104 Gurugram",
    location: "Sector - 104, Gurugram",
    image: "https://i.imgur.com/1qjWa6d.jpg",
    heroImage: "https://i.postimg.cc/dVmnGZmN/image.png",
    fullAddress: "Sector 104, Gurugram, Haryana 122001, India",
    description: "Sector 104, settled in Sector 104, is a premium residential project by Gurgaon, Hero Realty, extending with five high-growing towers in 11 acres. While offering 3 and 4 BHK apartments, this development is designed for modern urban families and professionals, which basically combines luxury and convenience in a rich place.",
    longDescription: "Hero Homes Gurgaon Sector 104 is a residential project which is coming up with 4 BHK apartments in Gurgaon. This residential building will be developed at Hero Realty Group at Gurgaon Sector 104. Hero Homes new tower will have 4 BHK apartments for sale in Gurgaon. If you see, there are so many upcoming real estate projects in Gurgaon. And if you truly wish to live in a beautiful home that perfectly suits your style and provides a luxury living experience, then buy Hero Homes Gurgaon that will be the right choice and a dream home for you. There are several reasons on why Hero Homes 4 BHK in Gurgaon apartments are the best new pre launch project in Gurgaon. This project the most discussed properties in the real estate market in Gurgaon. And the reason is Hero Realty has achieved expertise in the real estate sector by constantly providing the homebuyers a house that they would love to have.",
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
    title: "AIPL Joy District, Gurgaon",
    location: "Sector - 63A, Gurugram",
    image: "https://i.imgur.com/V3ZYKie.jpg",
    heroImage: "https://i.postimg.cc/MHQmHnpD/image.png",
    fullAddress: "Sector 63A, Gurugram, Haryana 122001, India",
    description: "AIPL Joy Square (Sector 62A) and AIPL Joy District (Sector 88) redefine commercial excellence with double-hit faces for branding, expander basements, dedicated escalators and lifts and a reputed ski garden at LID B level. These projects provide a perfect environment for retail, F&B and corporate development, making them a major investment site. Lionvest Realty Private. Ltd., we bring you the best living and commercial places, which ensure extraordinary quality, dominant place and high-value investments. Let us help you find the right property that matches your aspirations.",
    longDescription: "Experience the epitome of integrated retail and commercial development at AIPL Joy Square, Gurugram, India. Crafted by DP Architects, this visionary project embodies the essence of a bustling high street marketplace, offering a vibrant environment with shopping outlets, supermarkets, diverse dining options, and serviced apartments in Gurugram. Strategically located on Golf Course extn. road in sector 63A, this project boasts seamless connectivity to the rest of the city, making it a top choice among upcoming commercial projects in Gurugram. Spanning 2.84 acres and featuring 10 floors (G+9) with ample basement and surface parking, AIPL Joy Square promises a dynamic experience. This project redefines high-street retail in Gurugram, setting new standards under AIPL's expertise.",
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
    title: "Birla Arika Sector 31, Gurgaon",
    location: "Sector 31, Gurgaon",
    image: "https://i.postimg.cc/NFWpPcFN/image.png",
    heroImage: "https://i.postimg.cc/NFWpPcFN/image.png",
    fullAddress: "Sector 31, Gurugram, Haryana 122001, India",
    description: "Birla Estates Private Limited, a 100 per cent wholly owned subsidiary of Century Textiles and Industries Limited.",
    longDescription: "Birla Estates Private Limited, a 100 per cent wholly owned subsidiary of Century Textiles and Industries Limited, the over Rs. 8000 crore flagship Company of the B. K. Birla Group of Companies with presence in cement, textiles, rayon yarn, pulp & paper, salt, chemicals and more. Birla Estates will be developing many land parcels held by the group as well as look at joint development/strategic tie-ups across top cities. We will transform the perception of Indian Real Estate sector by delivering an exceptional experience and creating value, at every level, for every stakeholder. Birla Estates works towards maintaining the highest standards of environmental care and ensures that the standards of health and environment are maintained in spite of increasing level of operations. Being well aware of our responsibility towards a better and cleaner environment, our efforts in environment management go well beyond mere compliance with statutory requirements.",
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
    title: "Tarc Ishva – Sector – 63A, Gurugram",
    location: "Sector - 63A, Gurugram",
    image: "https://i.imgur.com/YQSL3gr.jpg",
    heroImage: "https://i.postimg.cc/rF59LRby/image.png",
    fullAddress: "Sector 63A, Gurugram, Haryana 122001, India",
    description: "At TARC Ishva, experience a blend of luxurious and harmonious lifestyle that celebrates the essence of your aspirations.",
    longDescription: "At TARC Ishva, experience a blend of luxurious and harmonious lifestyle that celebrates the essence of your aspirations. Inspired by the four directions, TARC Ishva embodies the nurturing spirit of the south, the potential of new beginnings from the east, the realm of dreams in the west and the ambition to achieve in the north. Embrace a home inspired by India, where the openness elevates wisdom, balance and peaceful living. Experience the best of luxury living that residents of Tarc Ishva Apartments in Gurgaon get to enjoy every day. Every unit is equipped with modern features and specifications. But that's not all - residents of this development can take advantage of top-notch amenities, making it a truly exceptional living experience. From the plush interiors to the lavish exteriors, every aspect of these apartments has been meticulously designed to cater to the discerning tastes of modern-day residents. With its combination of breathtaking views, world-class amenities, and thoughtfully crafted homes, Tarc Ishva Gurgaon is undoubtedly one of the finest residential developments in the city.",
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

// Export the independent version of projectsData
export const projectsDataIndependent: ProjectDataType[] = projectsData.map(project => deepClone(project));
