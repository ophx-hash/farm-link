import React, { useMemo, useState } from 'react';
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
  FlatList,
  Alert,
} from 'react-native';

const initialProducts = [
  {
    id: 'p1',
    name: 'Lucknow Wheat',
    category: 'Grains',
    price: '₹42/kg',
    farmer: 'Ramesh Verma',
    location: 'Lucknow',
    stock: '80 kg',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'p2',
    name: 'Pink Onion',
    category: 'Vegetables',
    price: '₹30/kg',
    farmer: 'Suresh Yadav',
    location: 'Lucknow',
    stock: '120 kg',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'p3',
    name: 'Dry Chili',
    category: 'Spices',
    price: '₹180/kg',
    farmer: 'Asha Singh',
    location: 'Lucknow',
    stock: '45 kg',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'p4',
    name: 'Banana',
    category: 'Fruits',
    price: '₹55/dozen',
    farmer: 'Kiran Mishra',
    location: 'Lucknow',
    stock: '210 dozen',
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'p5',
    name: 'Turmeric',
    category: 'Spices',
    price: '₹160/kg',
    farmer: 'Meena Devi',
    location: 'Lucknow',
    stock: '65 kg',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'p6',
    name: 'Mango',
    category: 'Fruits',
    price: '₹120/kg',
    farmer: 'Sunil Singh',
    location: 'Lucknow',
    stock: '95 kg',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80',
  },
];

const stats = [
  { label: 'Farmers', value: '140+' },
  { label: 'Orders', value: '2.4K' },
  { label: 'Happy users', value: '1.1K' },
  { label: 'District hub', value: 'Lucknow' },
];

const tabs = ['Home', 'Products', 'Orders', 'Profile'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('demo@farmlink.in');
  const [password, setPassword] = useState('password123');

  const loggedInLabel = useMemo(() => (isLoggedIn ? 'Farmer + Customer Access' : 'Login to continue'), [isLoggedIn]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing details', 'Please enter email and password.');
      return;
    }

    setIsLoggedIn(true);
    Alert.alert('Welcome', 'You are now logged in to FarmLink.');
  };

  const handleOrder = (productName: string) => {
    Alert.alert('Order placed', `${productName} has been placed successfully.`);
  };

  const renderHome = () => (
    <View style={styles.contentSection}>
      <View style={styles.heroCard}>
        <Text style={styles.heroSmall}>District launch: Lucknow</Text>
        <Text style={styles.heroTitle}>Fresh food, direct from farmers</Text>
        <Text style={styles.heroText}>
          Buy grains, vegetables, fruits and spices from verified local producers with transparent pricing and easy delivery.
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => setActiveTab('Products')}>
          <Text style={styles.primaryButtonText}>Browse products</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        {stats.map((item) => (
          <View key={item.label} style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionHeading}>Featured products</Text>
      <FlatList
        data={initialProducts.slice(0, 3)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.featureCard}>
            <Image source={{ uri: item.image }} style={styles.featureImage} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>{item.price}</Text>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => handleOrder(item.name)}>
              <Text style={styles.secondaryButtonText}>Order now</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

  const renderProducts = () => (
    <View style={styles.contentSection}>
      <Text style={styles.sectionHeading}>Available in Lucknow</Text>
      {initialProducts.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <View style={styles.productHeaderRow}>
              <Text style={styles.productTitle}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
            <Text style={styles.metaText}>{product.category}</Text>
            <Text style={styles.metaText}>Farmer: {product.farmer}</Text>
            <Text style={styles.metaText}>Location: {product.location}</Text>
            <Text style={styles.metaText}>Stock: {product.stock}</Text>
            <View style={styles.productFooterRow}>
              <Text style={styles.ratingText}>⭐ {product.rating}</Text>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => handleOrder(product.name)}>
                <Text style={styles.secondaryButtonText}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderOrders = () => (
    <View style={styles.contentSection}>
      <Text style={styles.sectionHeading}>Recent orders</Text>
      {[
        { id: 'o1', item: 'Red Onion', status: 'Delivered', total: '₹240' },
        { id: 'o2', item: 'Dry Chili', status: 'In transit', total: '₹540' },
        { id: 'o3', item: 'Lucknow Wheat', status: 'Confirmed', total: '₹420' },
      ].map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <Text style={styles.orderItem}>{order.item}</Text>
          <Text style={styles.orderStatus}>{order.status}</Text>
          <Text style={styles.orderTotal}>{order.total}</Text>
        </View>
      ))}
    </View>
  );

  const renderProfile = () => (
    <View style={styles.contentSection}>
      <Text style={styles.sectionHeading}>Profile</Text>
      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>Welcome to FarmLink</Text>
        <Text style={styles.metaText}>User role: Farmer + Customer</Text>
        <Text style={styles.metaText}>District: Lucknow</Text>
        <Text style={styles.metaText}>Status: {loggedInLabel}</Text>

        {!isLoggedIn ? (
          <View style={{ marginTop: 16 }}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.primaryButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.primaryButton} onPress={() => setIsLoggedIn(false)}>
            <Text style={styles.primaryButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderScreen = () => {
    if (activeTab === 'Products') return renderProducts();
    if (activeTab === 'Orders') return renderOrders();
    if (activeTab === 'Profile') return renderProfile();
    return renderHome();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f9f5" />
      <View style={styles.header}>
        <Text style={styles.appName}>FarmLink</Text>
        <Text style={styles.location}>Lucknow</Text>
      </View>

      {renderScreen()}

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f9f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#143d2d',
  },
  location: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d7a4e',
    backgroundColor: '#e8f5ea',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  contentSection: {
    flex: 1,
    paddingBottom: 20,
  },
  heroCard: {
    marginHorizontal: 20,
    backgroundColor: '#1e7b4d',
    borderRadius: 22,
    padding: 20,
  },
  heroSmall: {
    color: '#dffaf1',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  heroText: {
    color: '#edfdf6',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#1d7a4d',
    fontSize: 15,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: 18,
    gap: 10,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1d2d2d',
  },
  statLabel: {
    fontSize: 12,
    color: '#5f6d73',
    marginTop: 4,
  },
  sectionHeading: {
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '800',
    color: '#16382d',
  },
  featureCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginRight: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  featureImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  cardTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#1d2d2d',
  },
  cardText: {
    marginTop: 4,
    color: '#1d7a4e',
    fontWeight: '800',
  },
  secondaryButton: {
    marginTop: 12,
    backgroundColor: '#eaf7ef',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1d7a4e',
    fontWeight: '700',
  },
  productCard: {
    marginHorizontal: 20,
    marginBottom: 14,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1b2d2d',
    flexShrink: 1,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1d7a4e',
  },
  metaText: {
    fontSize: 12,
    color: '#59666d',
    marginTop: 4,
  },
  productFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingText: {
    fontSize: 12,
    color: '#545d65',
    fontWeight: '700',
  },
  orderCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  orderItem: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1b2d2d',
  },
  orderStatus: {
    marginTop: 6,
    color: '#1d7a4e',
    fontWeight: '700',
  },
  orderTotal: {
    marginTop: 8,
    fontWeight: '800',
    color: '#1d2d2d',
  },
  profileCard: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1d2d2d',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#f3f7f3',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
    color: '#1d2d2d',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 18,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e6eee6',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  tabButtonActive: {
    backgroundColor: '#eaf7ef',
  },
  tabText: {
    color: '#5d6467',
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#1d7a4e',
  },
});
