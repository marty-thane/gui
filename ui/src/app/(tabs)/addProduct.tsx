import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useProducts } from '@/hooks/useProduct';
import { Product } from '@/api/models'; 

export default function AddProductScreen() {
  const { createProduct } = useProducts();
  const router = useRouter();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [currencyError, setCurrencyError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    let valid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    const parsedPrice = parseInt(price, 10);
    if (!price.trim()) {
      setPriceError('Price is required');
      valid = false;
    } else if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setPriceError('Price must be a positive whole number greater than zero');
      valid = false;
    } else {
      setPriceError('');
    }

    if (!currency.trim()) {
      setCurrencyError('Currency is required');
      valid = false;
    } else if (currency.trim().length !== 3) {
      setCurrencyError('Currency must be exactly 3 characters');
      valid = false;
    } else {
      setCurrencyError('');
    }

    return valid;
  };

  const handleAddProduct = async () => {
    setSubmitError('');
    if (!validate()) {
      return;
    }

    const parsedPrice = parseInt(price, 10);

    const newProduct: Product = {
      name,
      price: parsedPrice,
      currency: currency.toUpperCase(),
      description,
    };

    try {
      const createdProduct = await createProduct(newProduct); 

      alert('Product created successfully!');

      setName('');
      setPrice('');
      setCurrency('');
      setDescription('');
      setNameError('');
      setPriceError('');
      setCurrencyError('');
      setSubmitError('');

      router.replace(`/products/${createdProduct.id}`); 
    } catch (e: any) {
      setSubmitError(e.message || 'Failed to add product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}

      <TextInput
        placeholder="Currency (e.g. USD)"
        value={currency}
        onChangeText={setCurrency}
        style={styles.input}
      />
      {currencyError ? <Text style={styles.errorText}>{currencyError}</Text> : null}

      <TextInput
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, styles.textArea]}
      />

      <Button title="Add Product" onPress={handleAddProduct} />

      {submitError ? <Text style={styles.submitErrorText}>{submitError}</Text> : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,         
    borderRadius: 6,
    marginBottom: 10,    
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    padding: 15,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,   
  },
  submitErrorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  }
});