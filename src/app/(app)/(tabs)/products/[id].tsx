import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

const mockProducts = [
  { id: '1', name: 'Wireless Headphones', price: '$99', description: 'Premium noise-cancelling headphones with 30hr battery' },
  { id: '2', name: 'Smart Watch', price: '$199', description: 'Fitness tracking and notifications on your wrist' },
  { id: '3', name: 'Bluetooth Speaker', price: '$59', description: 'Portable speaker with 10hr playtime' },
];

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.id}</Text>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, color: 'green', marginBottom: 20 },
  description: { fontSize: 16, lineHeight: 24 }
});