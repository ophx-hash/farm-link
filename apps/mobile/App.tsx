import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const products = [
  { id: 1, name: 'Organic Wheat', price: '₹42/kg', origin: 'Nashik', tag: 'Fresh' },
  { id: 2, name: 'Red Onion', price: '₹30/kg', origin: 'Pune', tag: 'Popular' },
  { id: 3, name: 'Turmeric', price: '₹180/kg', origin: 'Nagpur', tag: 'Premium' },
  { id: 4, name: 'Banana', price: '₹55/dozen', origin: 'Maharashtra', tag: 'Local' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>FarmLink</Text>
          <TouchableOpacity style={styles.buttonSmall}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Fresh farm produce, direct from farmers</Text>
          <Text style={styles.heroSubtitle}>
            Buy grains, vegetables, fruits, and spices from verified local farmers.
          </Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Shop now</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Popular nearby products</Text>

        <View style={styles.grid}>
          {products.map((product) => (
            <View key={product.id} style={styles.card}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80' }}
                style={styles.image}
              />
              <View style={styles.badgeContainer}>
                <Text style={styles.badge}>{product.tag}</Text>
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.price}>{product.price}</Text>
              <Text style={styles.origin}>{product.origin}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1b3d2f',
  },
  buttonSmall: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  buttonText: {
    color: '#1b3d2f',
    fontWeight: '700',
  },
  heroCard: {
    backgroundColor: '#1d7a4e',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 14,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#eafaf1',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#1d7a4e',
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1d2d2d',
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
  },
  grid: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  badgeContainer: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#ecfdf5',
    color: '#166534',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '700',
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1c2a2a',
  },
  price: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: '800',
    color: '#1d7a4e',
  },
  origin: {
    marginTop: 6,
    color: '#66707a',
    fontSize: 13,
  },
});
