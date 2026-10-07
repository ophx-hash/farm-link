import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { config } from './config';

dotenv.config();

const app = express();
const port = config.port;
const district = config.district;
const state = config.state;

app.use(cors());
app.use(express.json());

const users: any[] = [
  {
    id: 'u1',
    name: 'Ramesh Verma',
    email: 'farmer@farmlink.in',
    phone: '9876543210',
    role: 'FARMER',
    district,
    state,
    verified: true,
  },
  {
    id: 'u2',
    name: 'Demo Customer',
    email: 'customer@farmlink.in',
    phone: '9876543211',
    role: 'CUSTOMER',
    district,
    state,
    verified: true,
  },
  {
    id: 'u3',
    name: 'Shop Owner',
    email: 'shop@farmlink.in',
    phone: '9876543212',
    role: 'SHOP_OWNER',
    district,
    state,
    verified: true,
  },
  {
    id: 'u4',
    name: 'Bulk Trader',
    email: 'trader@farmlink.in',
    phone: '9876543213',
    role: 'TRADER',
    district,
    state,
    verified: true,
  },
  {
    id: 'u5',
    name: 'Admin',
    email: 'admin@farmlink.in',
    phone: '9876543214',
    role: 'ADMIN',
    district,
    state,
    verified: true,
  },
];

const farmers: any[] = [
  {
    id: 'f1',
    userId: 'u1',
    farmName: 'Verma Farm',
    farmAddress: 'Gomti Nagar, Lucknow',
    landSize: '5 acres',
    kycStatus: 'APPROVED',
    rating: 4.8,
    totalOrders: 145,
    productsCount: 6,
    bankAccount: '1234567890',
    earnings: 280000,
  },
];

const products: any[] = [
  {
    id: 'p1',
    farmerId: 'f1',
    category: 'Grains',
    name: 'Lucknow Wheat',
    description: 'Premium quality wheat from Lucknow farms',
    unit: 'kg',
    pricePerUnit: 42,
    stockQuantity: 500,
    qualityGrade: 'A',
    farmer: 'Ramesh Verma',
  },
  {
    id: 'p2',
    farmerId: 'f1',
    category: 'Vegetables',
    name: 'Pink Onion',
    description: 'Fresh pink onions',
    unit: 'kg',
    pricePerUnit: 30,
    stockQuantity: 1200,
    qualityGrade: 'A',
    farmer: 'Ramesh Verma',
  },
  {
    id: 'p3',
    farmerId: 'f1',
    category: 'Spices',
    name: 'Dry Chili',
    description: 'Premium dry chili',
    unit: 'kg',
    pricePerUnit: 180,
    stockQuantity: 450,
    qualityGrade: 'A',
    farmer: 'Ramesh Verma',
  },
  {
    id: 'p4',
    farmerId: 'f1',
    category: 'Fruits',
    name: 'Banana',
    description: 'Fresh bananas',
    unit: 'dozen',
    pricePerUnit: 55,
    stockQuantity: 2100,
    qualityGrade: 'A',
    farmer: 'Ramesh Verma',
  },
  {
    id: 'p5',
    farmerId: 'f1',
    category: 'Spices',
    name: 'Turmeric',
    description: 'Pure turmeric powder',
    unit: 'kg',
    pricePerUnit: 160,
    stockQuantity: 650,
    qualityGrade: 'A',
    farmer: 'Ramesh Verma',
  },
  {
    id: 'p6',
    farmerId: 'f1',
    category: 'Fruits',
    name: 'Mango',
    description: 'Sweet and juicy mangoes',
    unit: 'kg',
    pricePerUnit: 120,
    stockQuantity: 950,
    qualityGrade: 'A',
    farmer: 'Ramesh Verma',
  },
];

const orders: any[] = [];

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
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
    token: `jwt-token-${user.id}`,
  });
});

app.post('/api/auth/signup', (req: Request, res: Response) => {
  const { name, email, password, role, phone } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = {
    id: `u${users.length + 1}`,
    name,
    email,
    phone,
    role,
    district,
    state,
    verified: false,
  };

  users.push(newUser);

  return res.status(201).json({
    message: 'User created successfully',
    user: newUser,
  });
});

app.get('/api/products', (req: Request, res: Response) => {
  const { category, search } = req.query;
  let filtered = [...products];

  if (category) filtered = filtered.filter((p) => p.category === category);
  if (search) filtered = filtered.filter((p) => p.name.toLowerCase().includes(String(search).toLowerCase()));

  return res.status(200).json({ products: filtered, total: filtered.length });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json({ product });
});

app.post('/api/products', (req: Request, res: Response) => {
  const { farmerId, name, category, description, unit, pricePerUnit, stockQuantity } = req.body;

  if (!farmerId || !name || !category || !unit || !pricePerUnit) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const farmer = farmers.find((f) => f.id === farmerId);
  if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

  const newProduct = {
    id: `p${products.length + 1}`,
    farmerId,
    category,
    name,
    description,
    unit,
    pricePerUnit: Number(pricePerUnit),
    stockQuantity: Number(stockQuantity),
    qualityGrade: 'A',
    farmer: farmer.farmName,
  };

  products.push(newProduct);
  farmer.productsCount += 1;

  return res.status(201).json({ message: 'Product created successfully', product: newProduct });
});

app.get('/api/farmers/:id', (req: Request, res: Response) => {
  const farmer = farmers.find((f) => f.id === req.params.id);
  if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
  return res.status(200).json({ farmer });
});

app.get('/api/admin/dashboard', (req: Request, res: Response) => {
  return res.status(200).json({
    dashboard: {
      totalUsers: users.length,
      totalProducts: products.length,
      totalOrders: orders.length,
      totalFarmers: farmers.length,
      district,
      state,
      gmv: orders.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0),
    },
  });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { farmerId, buyerId, buyerType, items, totalAmount, paymentMethod } = req.body;

  if (!farmerId || !buyerId || !buyerType || !items || !totalAmount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const order = {
    id: `o${orders.length + 1}`,
    orderNumber: `ORD-${Date.now()}`,
    farmerId,
    buyerId,
    buyerType,
    totalAmount,
    paymentMethod: paymentMethod || 'COD',
    status: 'PENDING',
    paymentStatus: 'PENDING',
    items,
    createdAt: new Date(),
  };

  orders.push(order);
  return res.status(201).json({ message: 'Order created successfully', order });
});

app.post('/api/shops/bulk-order', (req: Request, res: Response) => {
  const { shopId, items, deliveryDate } = req.body;
  if (!shopId || !items || items.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }

  const order = {
    id: `o${orders.length + 1}`,
    orderNumber: `BULK-${Date.now()}`,
    shopId,
    buyerType: 'SHOP',
    items,
    totalAmount: items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0),
    status: 'PENDING',
    deliveryDate,
    createdAt: new Date(),
  };

  orders.push(order);

  return res.status(201).json({ message: 'Bulk order created successfully', order });
});

app.post('/api/traders/buy', (req: Request, res: Response) => {
  const { traderId, farmerId, items } = req.body;
  if (!traderId || !farmerId || !items) return res.status(400).json({ message: 'Missing required fields' });

  const order = {
    id: `o${orders.length + 1}`,
    orderNumber: `TRD-BUY-${Date.now()}`,
    traderId,
    farmerId,
    buyerType: 'TRADER',
    items,
    totalAmount: items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0),
    status: 'PENDING',
  };

  orders.push(order);
  return res.status(201).json({ message: 'Trader purchase order created', order });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'farm-link-api',
    district,
    state,
    env: config.nodeEnv,
    version: '1.0.0',
    paymentMode: config.razorpay.keyId.includes('dummy') ? 'sandbox-demo' : 'live-configured',
    supabaseStatus: config.supabase.url.includes('example') ? 'demo-config' : 'configured',
  });
});

app.use((_req: Request, res: Response) => res.status(404).json({ message: 'Route not found' }));

app.listen(port, () => {
  console.log(`🚀 FarmLink API running on http://localhost:${port}`);
  console.log(`📍 District: ${district}`);
  console.log(`🌍 State: ${state}`);
  console.log(`🧪 Virtual config active. Replace demo keys with real credentials when ready.`);
});
