export const LOGISTICS_SERVICES = [
  {
    id: "express-air",
    title: "Priority Air Express",
    badge: "Fastest Delivery",
    tagline: "Next-Day Air Shipping across 180+ Hubs",
    deliveryTime: "24 - 48 Hours",
    baseRate: 25.00,
    perKgRate: 8.50,
    icon: "Plane",
    color: "from-amber-500 to-orange-600",
    features: [
      "Guaranteed next-flight-out dispatch",
      "Real-time GPS minute-by-minute tracking",
      "Full loss & damage coverage up to $5,000",
      "Dedicated priority handling & customs pass",
      "Direct recipient SMS & WhatsApp alerts"
    ],
    popular: true
  },
  {
    id: "standard-ground",
    title: "Standard Ground Cargo",
    badge: "Most Economical",
    tagline: "Cost-Effective Nationwide Linehaul",
    deliveryTime: "3 - 5 Business Days",
    baseRate: 10.00,
    perKgRate: 3.20,
    icon: "Truck",
    color: "from-blue-500 to-indigo-600",
    features: [
      "Nationwide door-to-door network",
      "Scheduled pickup from home or office",
      "Automated milestone checkpoint tracking",
      "Proof of delivery with digital signature",
      "Standard transit insurance included"
    ],
    popular: false
  },
  {
    id: "same-day-city",
    title: "Same-Day Hyperlocal",
    badge: "Under 4 Hours",
    tagline: "Ultra-Fast Intra-City Courier",
    deliveryTime: "2 - 4 Hours",
    baseRate: 18.00,
    perKgRate: 4.50,
    icon: "Zap",
    color: "from-emerald-500 to-teal-600",
    features: [
      "Instant courier dispatch in under 15 mins",
      "Live courier map tracking in real-time",
      "Direct point A to point B without hub stops",
      "Secure OTP delivery confirmation",
      "Ideal for documents, keys, tech & gifts"
    ],
    popular: false
  },
  {
    id: "cold-chain",
    title: "Cold-Chain & Pharma",
    badge: "Temp Controlled",
    tagline: "Certified Biopharma & Fresh Goods",
    deliveryTime: "12 - 24 Hours",
    baseRate: 45.00,
    perKgRate: 12.00,
    icon: "ThermometerSnowflake",
    color: "from-cyan-500 to-blue-600",
    features: [
      "Strict temperature range (-20°C to +8°C)",
      "IoT continuous temperature logger",
      "Certified medical courier protocols",
      "Priority hospital & lab dock access",
      "Instant excursion alarm notifications"
    ],
    popular: false
  },
  {
    id: "heavy-freight",
    title: "Heavy Freight & Pallet",
    badge: "Bulk Cargo",
    tagline: "Commercial Pallets & Oversized Machinery",
    deliveryTime: "4 - 7 Business Days",
    baseRate: 75.00,
    perKgRate: 2.10,
    icon: "Boxes",
    color: "from-purple-500 to-violet-700",
    features: [
      "Liftgate pickup & delivery trucks",
      "Pallet jack & warehouse staging",
      "Commercial loading dock scheduling",
      "Volume discounts for 500kg+ consignments",
      "Custom clearance & freight paperwork"
    ],
    popular: false
  },
  {
    id: "international-courier",
    title: "Global Cross-Border",
    badge: "Worldwide 220+ Countries",
    tagline: "Door-to-Door Worldwide Delivery",
    deliveryTime: "3 - 7 Business Days",
    baseRate: 55.00,
    perKgRate: 14.00,
    icon: "Globe",
    color: "from-rose-500 to-pink-600",
    features: [
      "Automated customs duty calculations",
      "International air freight partnerships",
      "Multi-currency payment support",
      "End-to-end international tracking code",
      "Export documentation assistance"
    ],
    popular: false
  }
];

export const CITIES_LIST = [
  "New York, NY",
  "San Francisco, CA",
  "Chicago, IL",
  "Boston, MA",
  "Los Angeles, CA",
  "Seattle, WA",
  "Austin, TX",
  "Miami, FL",
  "Denver, CO",
  "Dallas, TX",
  "Atlanta, GA",
  "Detroit, MI",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "Houston, TX"
];
