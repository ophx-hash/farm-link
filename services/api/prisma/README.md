# Prisma Database Schema for FarmLink

This file contains the complete database model for FarmLink agri marketplace.

## Models

### User Models
- **User**: Base user model with role-based access
- **Farmer**: Farmer profile with KYC and banking details
- **Customer**: Customer profile for individual buyers
- **Shop**: Retail shop profile with GST and credit limits
- **Trader**: Wholesaler/trader profile with warehouse details
- **DeliveryAgent**: Delivery partner profile
- **Admin**: Admin user with permissions

### Product & Order Models
- **Product**: Product listing by farmers
- **Order**: Order creation from customers, shops, or traders
- **OrderItem**: Individual items in an order
- **Payment**: Payment transaction details
- **Delivery**: Delivery tracking

### Support Models
- **Hub**: District-level collection and storage hubs
- **TraderInventory**: Trader's warehouse inventory
- **Review**: Product reviews and ratings
- **Message**: Direct messaging between users
- **Notification**: User notifications

## Setup

1. Install Prisma
```bash
npm install @prisma/client prisma
```

2. Create .env file with DATABASE_URL
```
DATABASE_URL="postgresql://user:password@localhost:5432/farmlink"
```

3. Run migrations
```bash
npx prisma migrate dev --name init
```

4. Access Prisma Studio
```bash
npx prisma studio
```
