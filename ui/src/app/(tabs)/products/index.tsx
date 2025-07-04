import React, { useState, useCallback } from 'react';
import { Link } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useProducts } from '@/hooks/useProduct';
import { useTheme } from '../../ThemeContext';

export default function ProductScreen() {
  const { products, fetchProducts, error, deleteProduct} = useProducts();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const { theme, resolvedTheme, setTheme } = useTheme();
  
  const backgroundColor = resolvedTheme === 'dark' ? '#000' : '#fff';
  const productBackgroundColor = resolvedTheme === 'dark' ? '#0f0f0f' : '#f0f0f0';
  const textColor = resolvedTheme === 'dark' ? '#fff' : '#000';


  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [fetchProducts])
  );

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  const openModal = (id: string) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    setDeletingLoading(true);
    try {
      await deleteProduct(selectedId);
      setModalVisible(false);
      setSelectedId(null);
    } catch (e: any) {
      console.error(e);
    } finally {
      setDeletingLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={[styles.container, {backgroundColor}]}>
        <Text style={[styles.title, {color: textColor}]}>Our Products</Text>
        {products.map((product) => (
          <View key={product.id} style={[styles.productCard, {backgroundColor: productBackgroundColor}]}>
            <Link href={`/products/${product.id}`} asChild>
              <Pressable style={styles.productInfo}>
                <Text style={[styles.productName, {color: textColor}]}>{product.name}</Text>
                <Text style={styles.productPrice}>
                  {product.price} {product.currency}
                </Text>
              </Pressable>
            </Link>
            <Pressable
              style={styles.deleteButton}
              onPress={() => openModal(product.id)}
              disabled={deletingLoading && selectedId === product.id}
            >
              {deletingLoading && selectedId === product.id ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.deleteButtonText}>Delete</Text>
              )}
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {backgroundColor}]}>
            <Text style={[styles.modalTitle, {color: textColor}]}>Confirm Delete</Text>
            <Text style={[styles.modalMessage, {color: textColor}]}>
              Are you sure you want to delete this product?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={closeModal} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={[styles.modalButton, styles.deleteConfirmButton]} disabled={deletingLoading}>
                {deletingLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.deleteConfirmText}>Delete</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: { fontSize: 18 },
  productPrice: { color: 'green' },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
  deleteConfirmButton: {
    backgroundColor: '#ff4444',
  },
  deleteConfirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
