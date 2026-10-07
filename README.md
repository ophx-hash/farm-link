# FarmLink

FarmLink is a district-first agri marketplace connecting farmers, customers, shops, and traders. This version is optimized for a Lucknow launch and designed to expand into city, state, and national scale.

## Overview
- Farmers can list grains, vegetables, fruits, and spices
- Customers can browse and buy products directly
- Shops can place bulk orders
- Traders can source and sell at scale
- District-based hub model helps reduce spoilage and improve logistics

## Current MVP features
- Mobile app starter with product listing, dashboard, profile, and order screens
- Express API with health, product, auth, and order endpoints
- Lucknow-based demo data
- Ready for further extension into admin, farmer, shop, and trader modules
- Virtual environment config so the project can run even before real service credentials are created

## Local setup

### 1. Install root dependencies
```bash
npm install
```

### 2. Start backend
```bash
npm run dev:api
```

### 3. Start mobile app
```bash
npm run dev:mobile
```

## Virtual credentials
The project is already wired to run with placeholder values so you can continue building before creating real accounts.

Use these values in development until you add real credentials:

```env
PORT=4000
DISTRICT=Lucknow
STATE=Uttar Pradesh
NODE_ENV=development

SUPABASE_URL=https://example-project.supabase.co
SUPABASE_ANON_KEY=demo-anon-key
SUPABASE_SERVICE_ROLE_KEY=demo-service-role-key

RAZORPAY_KEY_ID=rzp_test_dummy_key_id
RAZORPAY_KEY_SECRET=dummy_key_secret

CLOUDINARY_CLOUD_NAME=demo-cloud-name
CLOUDINARY_API_KEY=demo-api-key
CLOUDINARY_API_SECRET=demo-api-secret

FIREBASE_PROJECT_ID=demo-farmlink-project
```

When you later create real accounts, replace these with actual values.

## API endpoints
- GET /api/health
- GET /api/products
- GET /api/products/:id
- POST /api/auth/login
- POST /api/auth/signup
- POST /api/orders
- GET /api/orders
- GET /api/admin/dashboard
- POST /api/shops/bulk-order
- POST /api/traders/buy

## Login demo
```text
email: farmer@farmlink.in
password: password123
```

## Future roadmap
- Farmer dashboard
- Shop bulk order flow
- Trader module
- Admin panel
- Payment gateway integration
- Real database with PostgreSQL and Prisma
- Deployment to Vercel + Railway
