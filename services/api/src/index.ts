import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;
const district = process.env.DISTRICT || 'Lucknow';
const state = process.env.STATE || 'Uttar Pradesh';

app.use(cors());
app.use(express.json());

// In-memory database (replace with real PostgreSQL + Prisma later)
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

// ============ AUTH ENDPOINTS ============
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

// ============ PRODUCT ENDPOINTS ============
app.get('/api/products', (req: Request, res: Response) => {
  const { category, search } = req.query;

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(String(search).toLowerCase())
    );
  }

  return res.status(200).json({
    products: filtered,
    total: filtered.length,
  });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json({ product });
});

app.post('/api/products', (req: Request, res: Response) => {
  const { farmerId, name, category, description, unit, pricePerUnit, stockQuantity } = req.body;

  if (!farmerId || !name || !category || !unit || !pricePerUnit) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const farmer = farmers.find((f) => f.id === farmerId);

  if (!farmer) {
    return res.status(404).json({ message: 'Farmer not found' });
  }

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

  return res.status(201).json({
    message: 'Product created successfully',
    product: newProduct,
  });
});

// ============ FARMER ENDPOINTS ============
app.get('/api/farmers/:id', (req: Request, res: Response) => {
  const farmer = farmers.find((f) => f.id === req.params.id);

  if (!farmer) {
    return res.status(404).json({ message: 'Farmer not found' });
  }

  return res.status(200).json({ farmer });
});

app.get('/api/farmers/:id/products', (req: Request, res: Response) => {
  const farmerId = req.params.id;
  const farmerProducts = products.filter((p) => p.farmerId === farmerId);

  return res.status(200).json({
    farmerId,
    products: farmerProducts,
  });
});

app.get('/api/farmers/:id/earnings', (req: Request, res: Response) => {
  const farmer = farmers.find((f) => f.id === req.params.id);

  if (!farmer) {
    return res.status(404).json({ message: 'Farmer not found' });
  }

  return res.status(200).json({
    farmerId: farmer.id,
    totalEarnings: farmer.earnings,
    totalOrders: farmer.totalOrders,
  });
});

// ============ ORDER ENDPOINTS ============
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

  const farmer = farmers.find((f) => f.id === farmerId);
  if (farmer) {
    farmer.totalOrders += 1;
    farmer.earnings += totalAmount * 0.9; // 90% to farmer
  }

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

  return res.status(200).json({
    message: 'Order updated successfully',
    order,
  });
});

// ============ SHOP ENDPOINTS ============
app.post('/api/shops/bulk-order', (req: Request, res: Response) => {
  const { shopId, items, deliveryDate } = req.body;

  if (!shopId || !items || items.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }

  let totalAmount = 0;
  const orderItems: any[] = [];

  items.forEach((item: any) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      const itemTotal = product.pricePerUnit * item.quantity;
      totalAmount += itemTotal;
      orderItems.push({
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        price: product.pricePerUnit,
        total: itemTotal,
      });
    }
  });

  const order = {
    id: `o${orders.length + 1}`,
    orderNumber: `BULK-${Date.now()}`,
    shopId,
    buyerType: 'SHOP',
    items: orderItems,
    totalAmount,
    status: 'PENDING',
    deliveryDate,
    createdAt: new Date(),
  };

  orders.push(order);

  return res.status(201).json({
    message: 'Bulk order created successfully',
    order,
  });
});

// ============ TRADER ENDPOINTS ============
app.post('/api/traders/buy', (req: Request, res: Response) => {
  const { traderId, farmerId, items } = req.body;

  if (!traderId || !farmerId || !items) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  let totalAmount = 0;
  items.forEach((item: any) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      totalAmount += product.pricePerUnit * item.quantity;
    }
  });

  const order = {
    id: `o${orders.length + 1}`,
    orderNumber: `TRD-BUY-${Date.now()}`,
    traderId,
    farmerId,
    buyerType: 'TRADER',
    items,
    totalAmount,
    status: 'PENDING',
  };

  orders.push(order);

  return res.status(201).json({
    message: 'Trader purchase order created',
    order,
  });
});

// ============ ADMIN ENDPOINTS ============
app.get('/api/admin/dashboard', (req: Request, res: Response) => {
  return res.status(200).json({
    dashboard: {
      totalUsers: users.length,
      totalProducts: products.length,
      totalOrders: orders.length,
      totalFarmers: farmers.length,
      district,
      state,
      gmv: orders.reduce((sum: number, o: any) => sum + o.totalAmount, 0),
    },
  });
});

app.get('/api/admin/users', (req: Request, res: Response) => {
  return res.status(200).json({ users });
});

app.patch('/api/admin/users/:id/verify', (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.verified = true;

  return res.status(200).json({
    message: 'User verified successfully',
    user,
  });
});

// ============ HEALTH CHECK ============
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'farm-link-api',
    district,
    state,
    version: '1.0.0',
    timestamp: new Date(),
  });
});

// ============ ERROR HANDLING ============
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
  console.log(`
🚀 FarmLink API v1.0.0`);
  console.log(`📍 District: ${district}`);
  console.log(`🌍 State: ${state}`);
  console.log(`🔗 Running on http://localhost:${port}`);
  console.log(`✅ All modules ready: Auth, Products, Farmer, Shop, Trader, Admin\n`);
});
