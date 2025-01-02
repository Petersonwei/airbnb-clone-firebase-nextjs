// FIXME It shows error when using import but the seed is working
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const serviceAccount = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

const mockProperties = [
  {
    address1: "123 Main Street",
    city: "London",
    postcode: "SW1A 1AA",
    description: "Beautiful 2-bedroom apartment in central London",
    price: 500000,
    bedrooms: 2,
    bathrooms: 1,
    status: "for-sale",
    created: new Date(),
    updated: new Date(),
  },
  {
    address1: "456 Park Avenue",
    city: "Manchester",
    postcode: "M1 1AA",
    description: "Spacious 3-bedroom house with garden",
    price: 350000,
    bedrooms: 3,
    bathrooms: 2,
    status: "for-sale",
    created: new Date(),
    updated: new Date(),
  },
  {
    address1: "789 High Street",
    city: "Birmingham",
    postcode: "B1 1AA",
    description: "Modern 1-bedroom studio",
    price: 200000,
    bedrooms: 1,
    bathrooms: 1,
    status: "for-sale",
    created: new Date(),
    updated: new Date(),
  },
  {
    address1: "10 Riverside Drive",
    city: "Liverpool",
    postcode: "L3 4AA",
    description: "Luxury waterfront penthouse with stunning views",
    price: 750000,
    bedrooms: 3,
    bathrooms: 2,
    status: "for-sale",
    created: new Date(),
    updated: new Date(),
  },
  {
    address1: "25 Queen's Road",
    city: "Edinburgh",
    postcode: "EH2 1JX",
    description: "Traditional Scottish townhouse with period features",
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    status: "for-sale",
    created: new Date(),
    updated: new Date(),
  },
  {
    address1: "8 Marina Way",
    city: "Brighton",
    postcode: "BN2 5ZA",
    description: "Modern seafront apartment with private balcony",
    price: 425000,
    bedrooms: 2,
    bathrooms: 2,
    status: "for-sale",
    created: new Date(),
    updated: new Date(),
  },
  {
    address1: "15 Cathedral Close",
    city: "York",
    postcode: "YO1 7JH",
    description: "Historic cottage in the heart of York",
    price: 375000,
    bedrooms: 2,
    bathrooms: 1,
    status: "for-sale",
    created: new Date(),
    updated: new Date(),
  },
  {
    address1: "42 Tech Hub Avenue",
    city: "Cambridge",
    postcode: "CB1 2GA",
    description: "Contemporary eco-friendly home near Science Park",
    price: 600000,
    bedrooms: 4,
    bathrooms: 3,
    status: "for-sale",
    created: new Date(),
    updated: new Date(),
  }
];

async function seedDatabase() {
  try {
    const batch = db.batch();
    
    // Add properties
    for (const property of mockProperties) {
      const propertyRef = db.collection('properties').doc();
      batch.set(propertyRef, property);
    }
    
    await batch.commit();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seedDatabase(); 