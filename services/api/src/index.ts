import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;
const district = process.env.DISTRICT || 'Lucknow';

app.use(cors());
app.use(express.json());

// Sample data
const users: any[] = [
  {
    id: 'u1',
    name: 'Ramesh Verma',
    email: 'farmer@farmlink.in',
    phone: '9876543210',
    role: 'FARMER',
    district,
    state: 'Uttar Pradesh',
    profileImage: null,
  },
  {
    id: 'u2',
    name: 'Demo Customer',
    email: 'customer@farmlink.in',
    phone: '9876543211',
    role: 'CUSTOMER',
    district,
    state: 'Uttar Pradesh',
    profileImage: null,
  },
  {
    id: 'u3',
    name: 'Shop Owner',
    email: 'shop@farmlink.in',
    phone: '9876543212',
    role: 'SHOP_OWNER',
    district,
    state: 'Uttar Pradesh',
    profileImage: null,
  },
  {
    id: 'u4',
    name: 'Bulk Trader',
    email: 'trader@farmlink.in',
    phone: '9876543213',
    role: 'TRADER',
    district,
    state: 'Uttar Pradesh',
    profileImage: null,
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
    minOrderQuantity: 1,
    stockQuantity: 500,
    qualityGrade: 'A',
    images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80'],
    active: true,
    ratingCount: 0,
    totalRating: 0,
  },
  {
    id: 'p2',
    farmerId: 'f1',
    category: 'Vegetables',
    name: 'Pink Onion',
    description: 'Fresh pink onions from local farms',
    unit: 'kg',
    pricePerUnit: 30,
    minOrderQuantity: 1,
    stockQuantity: 1200,
    qualityGrade: 'A',
    images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80'],
    active: true,
    ratingCount: 0,
    totalRating: 0,
  },
  {
    id: 'p3',
    farmerId: 'f1',
    category: 'Spices',
    name: 'Dry Chili',
    description: 'Premium dry chili from Lucknow region',
    unit: 'kg',
    pricePerUnit: 180,
    minOrderQuantity: 1,
    stockQuantity: 450,
    qualityGrade: 'A',
    images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80'],
    active: true,
    ratingCount: 0,
    totalRating: 0,
  },
  {
    id: 'p4',
    farmerId: 'f1',
    category: 'Fruits',
    name: 'Banana',
    description: 'Fresh bananas from local orchards',
    unit: 'dozen',
    pricePerUnit: 55,
    minOrderQuantity: 1,
    stockQuantity: 2100,
    qualityGrade: 'A',
    images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80'],
    active: true,
    ratingCount: 0,
    totalRating: 0,
  },
  {
    id: 'p5',
    farmerId: 'f1',
    category: 'Spices',
    name: 'Turmeric',
    description: 'Pure turmeric powder',
    unit: 'kg',
    pricePerUnit: 160,
    minOrderQuantity: 1,
    stockQuantity: 650,
    qualityGrade: 'A',
    images: ['https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=900&q=80'],
    active: true,
    ratingCount: 0,
    totalRating: 0,
  },
  {
    id: 'p6',
    farmerId: 'f1',
    category: 'Fruits',
    name: 'Mango',
    description: 'Sweet and juicy mangoes',
    unit: 'kg',
    pricePerUnit: 120,
    minOrderQuantity: 1,
    stockQuantity: 950,
    qualityGrade: 'A',
    images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80'],
    active: true,
    ratingCount: 0,
    totalRating: 0,
  },
];

const orders: any[] = [];
const shops: any[] = [];
const traders: any[] = [];

// Auth endpoints
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
    user,
    token: 'fake-jwt-token-' + user.id,
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
    state: 'Uttar Pradesh',
    profileImage: null,
  };

  users.push(newUser);

  return res.status(201).json({
    message: 'User created successfully',
    user: newUser,
  });
});

// Product endpoints
app.get('/api/products', (req: Request, res: Response) => {
  const { category, search } = req.query;

  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(String(search).toLowerCase()));
  }

  return res.status(200).json({ products: filtered, total: filtered.length });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json({ product });
});

// Farmer endpoints
app.get('/api/farmers/:id', (req: Request, res: Response) => {
  const farmer = farmers.find((f) => f.id === req.params.id);

  if (!farmer) {
    return res.status(404).json({ message: 'Farmer not found' });
  }

  return res.status(200).json({ farmer });
});

app.post('/api/farmers/:id/products', (req: Request, res: Response) => {
  const { name, category, description, unit, pricePerUnit, stockQuantity } = req.body;
  const farmerId = req.params.id;

  if (!name || !category || !unit || !pricePerUnit || !stockQuantity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newProduct = {
    id: `p${products.length + 1}`,
    farmerId,
    category,
    name,
    description,
    unit,
    pricePerUnit: Number(pricePerUnit),
    minOrderQuantity: 1,
    stockQuantity: Number(stockQuantity),
    qualityGrade: 'A',
    images: [],
    active: true,
    ratingCount: 0,
    totalRating: 0,
  };

  products.push(newProduct);

  return res.status(201).json({
    message: 'Product created successfully',
    product: newProduct,
  });
});

// Order endpoints
app.post('/api/orders', (req: Request, res: Response) => {
  const { farmerId, buyerId, buyerType, items, totalAmount, paymentMethod } = req.body;

  if (!farmerId || !buyerId || !buyerType || !items || !totalAmount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const orderNumber = `ORD-${Date.now()}`;

  const newOrder = {
    id: `o${orders.length + 1}`,
    orderNumber,
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

  orders.push(newOrder);

  return res.status(201).json({
    message: 'Order created successfully',
    order: newOrder,
  });
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = orders.find((o) => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  return res.status(200).json({ order });
});

app.patch('/api/orders/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const order = orders.find((o) => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;
  order.updatedAt = new Date();

  return res.status(200).json({ message: 'Order updated', order });
});

// Shop endpoints
app.post('/api/shops/register', (req: Request, res: Response) => {
  const { userId, shopName, gstNumber, address } = req.body;

  if (!userId || !shopName || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newShop = {
    id: `s${shops.length + 1}`,
    userId,
    shopName,
    gstNumber,
    address,
    city: district,
    creditLimit: 50000,
    creditUsed: 0,
    rating: 0,
    verified: false,
  };

  shops.push(newShop);

  return res.status(201).json({
    message: 'Shop registered successfully',
    shop: newShop,
  });
});

app.post('/api/shops/:id/bulk-order', (req: Request, res: Response) => {
  const { items, deliveryDate } = req.body;
  const shopId = req.params.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }

  const order = {
    id: `o${orders.length + 1}`,
    orderNumber: `BLK-${Date.now()}`,
    shopId,
    buyerType: 'SHOP',
    items,
    status: 'PENDING',
    deliveryDate,
  };

  orders.push(order);

  return res.status(201).json({
    message: 'Bulk order created',
    order,
  });
});

// Trader endpoints
app.post('/api/traders/register', (req: Request, res: Response) => {
  const { userId, companyName, warehouseAddress } = req.body;

  if (!userId || !companyName || !warehouseAddress) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newTrader = {
    id: `t${traders.length + 1}`,
    userId,
    companyName,
    warehouseAddress,
    warehouseCity: district,
    storageCapacity: 100,
    verified: false,
    rating: 0,
  };

  traders.push(newTrader);

  return res.status(201).json({
    message: 'Trader registered successfully',
    trader: newTrader,
  });
});

app.get('/api/traders/:id/inventory', (req: Request, res: Response) => {
  const traderId = req.params.id;

  return res.status(200).json({
    traderId,
    inventory: [],
  });
});

// Admin endpoints
app.get('/api/admin/dashboard', (req: Request, res: Response) => {
  return res.status(200).json({
    totalUsers: users.length,
    totalProducts: products.length,
    totalOrders: orders.length,
    totalFarmers: farmers.length,
    district,
    state: 'Uttar Pradesh',
  });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'farm-link-api',
    district,
    timestamp: new Date(),
  });
});

app.listen(port, () => {
  console.log(`🚀 FarmLink API running on http://localhost:${port}`);
  console.log(`📍 District: ${district}`);
  console.log(`API ready for mobile app connections`);
});
