import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

type Screen = 'auth' | 'home' | 'products' | 'orders' | 'profile' | 'farmer' | 'shop' | 'trader' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'FARMER' | 'CUSTOMER' | 'SHOP_OWNER' | 'TRADER' | 'ADMIN';
  district: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  stockQuantity: number;
  farmer: string;
}

const API_URL = 'http://localhost:4000/api';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('demo@farmlink.in');
  const [password, setPassword] = useState('password123');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState([]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setCurrentScreen('home');
        Alert.alert('Success', `Welcome ${data.user.name}!`);
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      Alert.alert('Error', 'Failed to load products');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('auth');
    setEmail('demo@farmlink.in');
    setPassword('password123');
    Alert.alert('Logged out', 'You have been logged out successfully');
  };

  // Login Screen
  const renderAuthScreen = () => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.authContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.appTitle}>🌾 FarmLink</Text>
          <Text style={styles.subtitle}>Lucknow | District Launch</Text>
        </View>

        <View style={styles.authCard}>
          <Text style={styles.authTitle}>Login to your account</Text>

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.demoText}>Demo: farmer@farmlink.in / password123</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>140+</Text>
            <Text style={styles.statLabel}>Farmers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.4K</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.1K</Text>
            <Text style={styles.statLabel}>Users</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Home Screen
  const renderHomeScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name}!</Text>
          <Text style={styles.role}>{user?.role}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.homeContent}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Welcome to FarmLink</Text>
          <Text style={styles.heroText}>Direct from farms to your doorstep</Text>
        </View>

        <View style={styles.quickActions}>
          {user?.role === 'FARMER' && (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  setCurrentScreen('farmer');
                }}
              >
                <Text style={styles.actionIcon}>🌾</Text>
                <Text style={styles.actionLabel}>My Products</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setCurrentScreen('orders')}
              >
                <Text style={styles.actionIcon}>📦</Text>
                <Text style={styles.actionLabel}>Orders</Text>
              </TouchableOpacity>
            </>
          )}

          {user?.role === 'CUSTOMER' && (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  fetchProducts();
                  setCurrentScreen('products');
                }}
              >
                <Text style={styles.actionIcon}>🛒</Text>
                <Text style={styles.actionLabel}>Shop</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setCurrentScreen('orders')}
              >
                <Text style={styles.actionIcon}>📦</Text>
                <Text style={styles.actionLabel}>My Orders</Text>
              </TouchableOpacity>
            </>
          )}

          {user?.role === 'SHOP_OWNER' && (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  fetchProducts();
                  setCurrentScreen('shop');
                }}
              >
                <Text style={styles.actionIcon}>🏪</Text>
                <Text style={styles.actionLabel}>Bulk Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setCurrentScreen('orders')}
              >
                <Text style={styles.actionIcon}>📋</Text>
                <Text style={styles.actionLabel}>My Orders</Text>
              </TouchableOpacity>
            </>
          )}

          {user?.role === 'TRADER' && (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  fetchProducts();
                  setCurrentScreen('trader');
                }}
              >
                <Text style={styles.actionIcon}>💼</Text>
                <Text style={styles.actionLabel}>Buy/Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setCurrentScreen('orders')}
              >
                <Text style={styles.actionIcon}>📦</Text>
                <Text style={styles.actionLabel}>Inventory</Text>
              </TouchableOpacity>
            </>
          )}

          {user?.role === 'ADMIN' && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setCurrentScreen('admin')}
            >
              <Text style={styles.actionIcon}>⚙️</Text>
              <Text style={styles.actionLabel}>Dashboard</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Products Screen
  const renderProductsScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Available Products</Text>
      </View>

      <ScrollView contentContainerStyle={styles.productsList}>
        {products.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No products available</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={fetchProducts}
            >
              <Text style={styles.primaryButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        ) : (
          products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
              <Text style={styles.productPrice}>₹{product.pricePerUnit}/{product.unit}</Text>
              <Text style={styles.productStock}>Stock: {product.stockQuantity}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );

  // Farmer Dashboard Screen
  const renderFarmerScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>My Products</Text>
      </View>

      <ScrollView contentContainerStyle={styles.farmerContent}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Manage your products</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>+ Add New Product</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>6</Text>
            <Text style={styles.statBoxLabel}>Products</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>145</Text>
            <Text style={styles.statBoxLabel}>Orders</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>₹2.8L</Text>
            <Text style={styles.statBoxLabel}>Earnings</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Shop Dashboard Screen
  const renderShopScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Bulk Orders</Text>
      </View>

      <ScrollView contentContainerStyle={styles.shopContent}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Create Bulk Order</Text>
          <Text style={styles.infoText}>Select multiple products from different farmers</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Create Bulk Order</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>12</Text>
            <Text style={styles.statBoxLabel}>Orders</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>₹5L</Text>
            <Text style={styles.statBoxLabel}>Spent</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>14</Text>
            <Text style={styles.statBoxLabel}>Suppliers</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Trader Dashboard Screen
  const renderTraderScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Trading</Text>
      </View>

      <ScrollView contentContainerStyle={styles.traderContent}>
        <View style={styles.traderActions}>
          <TouchableOpacity style={styles.traderButton}>
            <Text style={styles.traderButtonText}>📥 Buy from Farmers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.traderButton}>
            <Text style={styles.traderButtonText}>📤 Sell to Retailers</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>45</Text>
            <Text style={styles.statBoxLabel}>Inventory Items</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>120T</Text>
            <Text style={styles.statBoxLabel}>Capacity</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>₹15L</Text>
            <Text style={styles.statBoxLabel}>Profit</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Admin Dashboard Screen
  const renderAdminScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Admin Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={styles.adminContent}>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>4</Text>
            <Text style={styles.statBoxLabel}>Total Users</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>6</Text>
            <Text style={styles.statBoxLabel}>Products</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statBoxNumber}>0</Text>
            <Text style={styles.statBoxLabel}>Orders</Text>
          </View>
        </View>

        <View style={styles.adminActions}>
          <TouchableOpacity style={styles.adminButton}>
            <Text style={styles.adminButtonText}>👥 Manage Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminButton}>
            <Text style={styles.adminButtonText}>✅ Verify Farmers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminButton}>
            <Text style={styles.adminButtonText}>💰 Commission Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminButton}>
            <Text style={styles.adminButtonText}>📊 Analytics</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Orders Screen
  const renderOrdersScreen = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>My Orders</Text>
      </View>

      <ScrollView contentContainerStyle={styles.ordersContent}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No orders yet</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Start Ordering</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Route handler
  switch (currentScreen) {
    case 'auth':
      return renderAuthScreen();
    case 'home':
      return user ? renderHomeScreen() : renderAuthScreen();
    case 'products':
      return renderProductsScreen();
    case 'orders':
      return renderOrdersScreen();
    case 'farmer':
      return renderFarmerScreen();
    case 'shop':
      return renderShopScreen();
    case 'trader':
      return renderTraderScreen();
    case 'admin':
      return renderAdminScreen();
    default:
      return renderAuthScreen();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9f5',
  },
  authContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: '#1d7a4e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#5f6d73',
    fontWeight: '600',
  },
  authCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1d2d2d',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e6e0',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 15,
    backgroundColor: '#f9fbf9',
  },
  loginButton: {
    backgroundColor: '#1d7a4e',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  demoText: {
    textAlign: 'center',
    color: '#5f6d73',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1d7a4e',
  },
  statLabel: {
    fontSize: 12,
    color: '#5f6d73',
    marginTop: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6eee6',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1d2d2d',
  },
  role: {
    fontSize: 12,
    color: '#1d7a4e',
    marginTop: 4,
  },
  logoutButton: {
    color: '#d32f2f',
    fontWeight: '700',
  },
  homeContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heroSection: {
    backgroundColor: '#1d7a4e',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  heroText: {
    fontSize: 14,
    color: '#eafaf1',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1d2d2d',
    textAlign: 'center',
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6eee6',
  },
  backButton: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d7a4e',
    marginRight: 12,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d2d2d',
    flex: 1,
  },
  productsList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1d7a4e',
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d2d2d',
  },
  productCategory: {
    fontSize: 12,
    color: '#5f6d73',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1d7a4e',
    marginTop: 8,
  },
  productStock: {
    fontSize: 12,
    color: '#5f6d73',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#eaf7ef',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#1d7a4e',
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#5f6d73',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#1d7a4e',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  farmerContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d2d2d',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#5f6d73',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  statBoxNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1d7a4e',
  },
  statBoxLabel: {
    fontSize: 11,
    color: '#5f6d73',
    marginTop: 6,
    textAlign: 'center',
  },
  shopContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  traderContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  traderActions: {
    gap: 12,
    marginBottom: 20,
  },
  traderButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#1d7a4e',
  },
  traderButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1d2d2d',
  },
  adminContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  adminActions: {
    gap: 12,
    marginTop: 20,
  },
  adminButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  adminButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1d2d2d',
  },
  ordersContent: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});
