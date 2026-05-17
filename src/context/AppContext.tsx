import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { CartItem, Diagnosis, Medicine, Order, UserProfile } from '../types';

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  cart: CartItem[];
  addToCart: (medicine: Medicine, quantity: number) => void;
  removeFromCart: (medicineId: string) => void;
  updateCartItemQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  currentDiagnosis: Diagnosis | null;
  setCurrentDiagnosis: (diagnosis: Diagnosis | null) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '555-123-4567',
  address: '123 Main St, Anytown, USA',
  medicalHistory: [],
};

const readLocalStorage = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEMO_USER);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<Diagnosis | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCart(readLocalStorage<CartItem[]>('cart', []));
    setOrders(readLocalStorage<Order[]>('orders', []));
    setUser(readLocalStorage<UserProfile>('medicare-user', DEMO_USER));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('medicare-user', JSON.stringify(user));
    }
  }, [user]);

  const addToCart = (medicine: Medicine, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.medicine.id === medicine.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.medicine.id === medicine.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...prevCart, { medicine, quantity }];
    });
  };

  const removeFromCart = (medicineId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.medicine.id !== medicineId));
  };

  const updateCartItemQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => (item.medicine.id === medicineId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [order, ...prevOrders]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        currentDiagnosis,
        setCurrentDiagnosis,
        orders,
        addOrder,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
