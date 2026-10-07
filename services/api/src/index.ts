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
    id: 'p1',
    name: 'Lucknow Wheat',
    category: 'Grains',
    price: 42,
    unit: 'kg',
    farmer: 'Ramesh Verma',
    location: 'Lucknow',
    stock: 80,
    rating: 4.8,
  },
  {
    id: 'p2',
    name: 'Pink Onion',
    category: 'Vegetables',
    price: 30,
    unit: 'kg',
    farmer: 'Suresh Yadav',
    location: 'Lucknow',
    stock: 120,
    rating: 4.7,
  },
  {
    id: 'p3',
    name: 'Dry Chili',
    category: 'Spices',
    price: 180,
    unit: 'kg',
    farmer: 'Asha Singh',
    location: 'Lucknow',
    stock: 45,
    rating: 4.9,
  },
  {
    id: 'p4',
    name: 'Banana',
    category: 'Fruits',
    price: 55,
    unit: 'dozen',
    farmer: 'Kiran Mishra',
    location: 'Lucknow',
    stock: 210,
    rating: 4.6,
  },
  {
    id: 'p5',
    name: 'Turmeric',
    category: 'Spices',
    price: 160,
    unit: 'kg',
    farmer: 'Meena Devi',
    location: 'Lucknow',
    stock: 65,
    rating: 4.8,
  },
  {
    id: 'p6',
    name: 'Mango',
    category: 'Fruits',
    price: 120,
    unit: 'kg',
    farmer: 'Sunil Singh',
    location: 'Lucknow',
    stock: 95,
    rating: 4.9,
  },
];

const users = [
  {
    id: 'u1',
    name: 'Demo User',
    email: 'demo@farmlink.in',
    password: 'password123',
    role: 'customer',
    district: 'Lucknow',
  },
  {
    id: 'u2',
    name: 'Farmer One',
    email: 'farmer@farmlink.in',
    password: 'farmer123',
    role: 'farmer',
    district: 'Lucknow',
  },
];

const orders: any[] = [];

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'farm-link-api',
    district: 'Lucknow',
    message: 'FarmLink API is running successfully.',
  });
});

app.get('/api/products', (_req, res) => {
  res.status(200).json({ products });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((item) => item.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json({ product });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = users.find(
    (item) => item.email.toLowerCase() === String(email).toLowerCase() && item.password === String(password)
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  return res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      district: user.district,
    },
  });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const exists = users.some((item) => item.email.toLowerCase() === String(email).toLowerCase());

  if (exists) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const newUser = {
    id: `u${users.length + 1}`,
    name,
    email,
    password,
    role: role || 'customer',
    district: 'Lucknow',
  };

  users.push(newUser);

  return res.status(201).json({
    message: 'User created successfully',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      district: newUser.district,
    },
  });
});

app.post('/api/orders', (req, res) => {
  const { productId, buyerName, quantity, address } = req.body;

  if (!productId || !buyerName || !quantity || !address) {
    return res.status(400).json({ message: 'Missing required order fields.' });
  }

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  const order = {
    id: `o${orders.length + 1}`,
    productName: product.name,
    buyerName,
    quantity,
    address,
    total: Number(product.price) * Number(quantity),
    status: 'Confirmed',
    district: 'Lucknow',
  };

  orders.push(order);

  return res.status(201).json({ message: 'Order created successfully', order });
});

app.get('/api/orders', (_req, res) => {
  res.status(200).json({ orders });
});

app.listen(port, () => {
  console.log(`FarmLink API running on http://localhost:${port}`);
});
