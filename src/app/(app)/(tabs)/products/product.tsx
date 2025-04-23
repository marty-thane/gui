import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const mockProducts = [
  { id: '1', name: 'Wireless Headphones', price: '$99' },
  { id: '2', name: 'Smart Watch', price: '$199' },
  { id: '3', name: 'Bluetooth Speaker', price: '$59' },
];

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      {mockProducts.map((product) => (
        <Link 
          key={product.id} 
          href={`/products/${product.id}`} 
          asChild
        >
          <Pressable style={styles.productCard}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  productCard: { 
    padding: 15, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 8, 
    marginBottom: 10 
  },
  productName: { fontSize: 18 },
  productPrice: { color: 'green' }
});