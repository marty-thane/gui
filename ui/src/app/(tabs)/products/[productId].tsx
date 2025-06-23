import { useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useProducts } from '@/hooks/useProduct';
import { Product } from '@/api/models';
import { useTheme } from '../../ThemeContext';

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams();
  const { fetchProductById } = useProducts(); 
  const [product, setProduct] = useState<Product | null>(null);

  const { theme, resolvedTheme, setTheme } = useTheme();
  
  const backgroundColor = resolvedTheme === 'dark' ? '#000' : '#fff';
  const textColor = resolvedTheme === 'dark' ? '#fff' : '#000';

  useEffect(() => {
    const loadProduct = async () => {
      if (typeof productId !== 'string') return;

      try {
        const res = await fetchProductById(productId);
        if (!res) throw new Error('Product not found');
        setProduct(res);
      } catch (e: any) {
        const message = e?.message || 'Unable to load the product details. Please try again later.';
        alert(message);
      }
    };

    loadProduct();
  }, [productId]);

  if (!product) {
    return (
      <View style={[styles.centered, {backgroundColor}]}>
        <Text style={styles.error}>No product to display</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{product.name}</Text>
      <Text style={styles.price}>
        {product.price} {product.currency}
      </Text>
      <Text style={[styles.description, {color: textColor}]}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, color: 'green', marginBottom: 10 },
  description: { fontSize: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
});
