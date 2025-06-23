import { useEffect, useState, useCallback } from 'react';
import { Product } from '@/api/models'; 
import { useApiClient } from './useApiClient'; 

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const api = useApiClient();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.readProductsGet();
      setProducts(result);
    } catch (err) {
      console.error(err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (productId: string): Promise<Product | null> => {
    setLoading(true);
    setError(null);
    try {
      const product = await api.readProductProductIdGet({ productId });
      return product;
    } catch (err) {
      console.error(err);
      setError('Failed to load product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData: Product): Promise<Product | null> => {
    setLoading(true);
    setError(null);
    try {
      const created = await api.createProductPost({ product: productData });
      return created;
    } catch (err) {
      console.error(err);
      setError('Failed to create product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);


  const deleteProduct = useCallback(async (productId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteProductProductIdDelete({ productId });
      await fetchProducts();
      return true;
    } catch (err) {
      console.error(err);
      setError('Failed to delete product');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    createProduct,
    deleteProduct
  };
}
