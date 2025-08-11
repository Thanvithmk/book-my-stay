const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const ownerId = new ObjectId("66b860e95d7e3a76d42fa111"); // Replace with real user ID

const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage1",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-118.7798, 34.0259] },
    category: "Beach",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage2",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-74.006, 40.7128] },
    category: "Iconic cities",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage3",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-106.8175, 39.1911] },
    category: "Mountains",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage4",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [11.2558, 43.7699] },
    category: "Iconic cities",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage5",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-122.6765, 45.5231] },
    category: "Forest",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage6",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-86.8515, 21.1619] },
    category: "Beach",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage7",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-120.0324, 39.0968] },
    category: "Cabins",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage8",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-118.2437, 34.0522] },
    category: "Trending",
  },
  {
    title: "Eco-Friendly Glamping Pod",
    description:
      "A unique and sustainable glamping experience in the heart of nature. Disconnect and enjoy the wilderness without sacrificing comfort.",
    image: {
      filename: "listingimage11",
      url: "https://images.unsplash.com/photo-1596436889106-946722a420a1?auto=format&fit=crop&w=800&q=60",
    },
    price: 600,
    location: "Joshua Tree",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-115.897, 34.0112] },
    category: "Camping",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage2",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-74.006, 40.7128] },
    category: "Iconic cities",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage3",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-106.8175, 39.1911] },
    category: "Mountains",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage4",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [11.2558, 43.7699] },
    category: "Iconic cities",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage5",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-122.6765, 45.5231] },
    category: "Forest",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage6",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-86.8515, 21.1619] },
    category: "Beach",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage7",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-120.0324, 39.0968] },
    category: "Cabins",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage8",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [-118.2437, 34.0522] },
    category: "Trending",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage9",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [7.2275, 46.0956] },
    category: "Mountains",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage10",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [34.8233, -2.3333] },
    category: "Desert",
  },
  {
    title: "Luxury Houseboat Stay on Dal Lake",
    description:
      "Experience the timeless charm of Srinagar on a luxurious Kashmiri houseboat. Surrounded by the majestic Himalayas.",
    image: {
      filename: "listingimage28",
      url: "https://images.unsplash.com/photo-1625479494097-34239d1f5b43?auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Srinagar",
    country: "India",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [74.7973, 34.0837] },
    category: "Iconic cities",
  },
  {
    title: "Heritage Haveli in Jaipur",
    description:
      "Stay in a beautifully restored Rajasthani haveli with courtyards, frescoes, and royal charm.",
    image: {
      filename: "listingimage29",
      url: "https://images.unsplash.com/photo-1602672961513-78a6e4b41d22?auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Jaipur",
    country: "India",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [75.7873, 26.9124] },
    category: "Iconic cities",
  },
  {
    title: "Beach Shack Stay in Goa",
    description:
      "Relax in a cozy beachfront shack with golden sands and the sound of waves at your doorstep.",
    image: {
      filename: "listingimage30",
      url: "https://images.unsplash.com/photo-1619119435621-4d0707402972?auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Goa",
    country: "India",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [73.8567, 15.2993] },
    category: "Beach",
  },
  {
    title: "Tea Estate Bungalow in Munnar",
    description:
      "Wake up to panoramic views of tea plantations from this charming colonial-era bungalow.",
    image: {
      filename: "listingimage31",
      url: "https://images.unsplash.com/photo-1504531467198-b923c15f1076?auto=format&fit=crop&w=800&q=60",
    },
    price: 1400,
    location: "Munnar",
    country: "India",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [77.0595, 10.0889] },
    category: "Mountains",
  },
  {
    title: "Luxury Tent Stay in Thar Desert",
    description:
      "Enjoy a royal desert camping experience with cultural performances and starry skies.",
    image: {
      filename: "listingimage32",
      url: "https://images.unsplash.com/photo-1551884170-09fb70a3a2c2?auto=format&fit=crop&w=800&q=60",
    },
    price: 1250,
    location: "Jaisalmer",
    country: "India",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [70.9083, 26.9157] },
    category: "Desert",
  },
  {
    title: "Backwater Villa in Alleppey",
    description:
      "Stay in a serene villa by the Kerala backwaters. Enjoy canoe rides and local cuisine.",
    image: {
      filename: "listingimage33",
      url: "https://images.unsplash.com/photo-1588943211346-3903a7427a3a?auto=format&fit=crop&w=800&q=60",
    },
    price: 1300,
    location: "Alleppey",
    country: "India",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [76.3388, 9.4981] },
    category: "Amazing pools",
  },
  {
    title: "Himalayan Cabin Retreat in Manali",
    description:
      "A cozy wooden cabin with spectacular mountain views. Ideal for trekkers and peace seekers.",
    image: {
      filename: "listingimage34",
      url: "https://images.unsplash.com/photo-1604844329774-5e72a2b06405?auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Manali",
    country: "India",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [77.1892, 32.2396] },
    category: "Cabins",
  },
  {
    title: "Forest Treehouse in Wayanad",
    description:
      "Stay high above the forest floor in a secluded treehouse with views of the lush greenery.",
    image: {
      filename: "listingimage35",
      url: "https://images.unsplash.com/photo-1593181171744-08e3a9c2bb2e?auto=format&fit=crop&w=800&q=60",
    },
    price: 950,
    location: "Wayanad",
    country: "India",
    reviews: [],
    owner: ownerId,
    geometry: { type: "Point", coordinates: [76.132, 11.6854] },
    category: "Forest",
  }
  
];

module.exports = { data: sampleListings };
