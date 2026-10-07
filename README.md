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

## API endpoints
- GET /api/health
- GET /api/products
- GET /api/products/:id
- POST /api/auth/login
- POST /api/auth/signup
- POST /api/orders
- GET /api/orders

## Login demo
```text
email: demo@farmlink.in
password: password123
```

## Future roadmap
- Farmer dashboard
- Shop bulk order flow
- Trader module
- Admin panel
- Payment gateway integration
- Real database with PostgreSQL and Prisma
- Deployment to Vercel + Render / Railway
