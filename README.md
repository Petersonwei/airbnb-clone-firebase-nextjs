# 🏠 Fire Homes

A modern real estate platform built with Next.js and Firebase, featuring property listings, advanced search, and admin management capabilities.

## Features

- **Property Management:** Comprehensive property listing system with search and filtering.
- **User Authentication:** Secure Firebase-based authentication with role management.
- **Admin Dashboard:** Protected admin interface for property and user management.
- **Advanced Search:** Rich search functionality with multiple filters.
- **Responsive Design:** Mobile-first approach with modern UI components.
- **Image Management:** Secure image upload and optimization.
- **Real-time Updates:** Live data synchronization where applicable.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Deployment:** Vercel
- **Type Safety:** TypeScript
- **Form Handling:** Zod for validation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Vercel account (for deployment)

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Petersonwei/airbnb-clone-firebase-nextjs
   cd fire-homes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local`:

   #### Firebase Configuration Values
   These keys are used to configure Firebase services for the application:

   - **`FIREBASE_API_KEY`:** The API key for the Firebase project.
   - **`FIREBASE_AUTH_DOMAIN`:** The authentication domain for Firebase Auth.
   - **`FIREBASE_PROJECT_ID`:** The unique identifier for the Firebase project.
   - **`FIREBASE_STORAGE_BUCKET`:** The storage bucket URL for Firebase.
   - **`FIREBASE_MESSAGING_SENDER_ID`:** The sender ID for Firebase Cloud Messaging.
   - **`FIREBASE_APP_ID`:** The unique identifier for the Firebase app.

   #### Firebase Admin SDK Configuration
   These keys are required for Firebase Admin SDK to perform server-side actions:

   - **`FIREBASE_PRIVATE_KEY_ID`:** The ID of the private key for Firebase Admin SDK.
   - **`FIREBASE_PRIVATE_KEY`:** The private key for Firebase Admin SDK (formatted as a PEM file).
   - **`FIREBASE_CLIENT_EMAIL`:** The client email associated with Firebase Admin SDK.
   - **`FIREBASE_CLIENT_ID`:** The client ID for Firebase Admin SDK.

   #### Public Firebase Configuration (Next.js)
   These keys are accessible on the client side and used for integrating Firebase with a Next.js application:

   - **`NEXT_PUBLIC_FIREBASE_API_KEY`:** Public API key for Firebase.
   - **`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`:** Public authentication domain.
   - **`NEXT_PUBLIC_FIREBASE_PROJECT_ID`:** Public Firebase project ID.
   - **`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`:** Public storage bucket URL.
   - **`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`:** Public messaging sender ID.
   - **`NEXT_PUBLIC_FIREBASE_APP_ID`:** Public app identifier.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
fire-homes/
├── app/                    # Next.js app directory
│   ├── admin-dashboard/    # Admin interface
│   ├── property-search/    # Search functionality
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
├── firebase/             # Firebase configuration
├── types/                # TypeScript type definitions
├── validation/           # Zod schemas
└── public/              # Static assets
```

## Core Features Implementation

### Authentication System

The application uses Firebase Authentication with role-based access control:

```typescript
// firebase/server.ts
const serviceAccount = {
  type: "service_account",
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... other credentials
};

let firestore: Firestore;
let auth: Auth;
const currentApps = getApps();

if (!currentApps.length) {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
  firestore = getFirestore(app);
  auth = getAuth(app);
}
```

### Property Management

Properties are managed through a robust data model with support for various statuses and filtering options:

```typescript
// data/properties.ts
export const getProperties = async (options?: GetPropertiesOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;
  const { minPrice, maxPrice, minBedrooms, status } = options?.filters || {};

  let propertiesQuery = firestore
    .collection("properties")
    .orderBy("updated", "desc");

  // Apply filters
  if (minPrice !== null && minPrice !== undefined) {
    propertiesQuery = propertiesQuery.where("price", ">=", minPrice);
  }
  // ... other filters
};
```

## Security

### Firestore Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /properties/{property} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /favourites/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Deployment

### Firebase Setup

1. Create a new Firebase project
2. Enable required services:
   - Authentication
   - Firestore Database
   - Storage
3. Deploy security rules:
```bash
firebase deploy --only firestore:rules
```

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### Code Style Guidelines

- Use TypeScript for all new code
- Follow existing ESLint configuration
- Use Prettier for code formatting
- Write tests for new features

## Maintenance

### Regular Tasks

- Monitor Firebase usage and quotas
- Update dependencies regularly
- Backup database regularly
- Review security rules and access patterns

### Performance Monitoring

- Use Vercel Analytics for frontend performance
- Monitor Firebase performance metrics
- Track error rates and user feedback

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify Firebase configuration
   - Check token validity
   - Review security rules

2. **Image Upload Issues**
   - Verify storage permissions
   - Check file size limits
   - Validate upload paths

3. **Database Access Problems**
   - Review Firestore rules
   - Check index configuration
   - Monitor quota usage

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Next.js team for the fantastic framework
- Firebase team for the robust backend services
- The open-source community for various tools and libraries used in this project
