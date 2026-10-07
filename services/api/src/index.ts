import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: 'Organic Wheat',
    category: 'Grains',
    price: 42,
    unit: 'kg',
    district: 'Nashik',
    farmer: 'Ramesh Patil',
  },
  {
    id: 2,
    name: 'Red Onion',
    category: 'Vegetables',
    price: 30,
    unit: 'kg',
    district: 'Pune',
    farmer: 'Suresh Kale',
  },
  {
    id: 3,
    name: 'Dry Chili',
    category: 'Spices',
    price: 180,
    unit: 'kg',
    district: 'Nagpur',
    farmer: 'Anita Wagh',
  },
  {
    id: 4,
    name: 'Banana',
    category: 'Fruits',
    price: 55,
    unit: 'dozen',
    district: 'Maharashtra',
    farmer: 'Kiran Patil',
  },
];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'farm-link-api' });
});

app.get('/api/products', (_req, res) => {
  res.json({ products });
});

app.listen(port, () => {
  console.log(`FarmLink API running on http://localhost:${port}`);
});
