'use client'

import { createContext, ReactNode, useContext, useState } from "react";
import { CartContextType } from "../models/cartContext.modal"
import { CartItem } from "../models/cartItems.modal";
import { Product } from "../models/product.model";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('Оберните в CartProvider')
  }

  return context
}

export default function CartProvider({children}: {children: ReactNode}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderSum, setOrderSum] = useState<number>(0);
  const [countProducts, setCountProducts] = useState(0)

  const addCartItem = (product: Product) => {
    setCartItems((prev) => {
      const findProduct = cartItems.find(p => p.id === product.id)
      if (findProduct) {
        
        setOrderSum(orderSum + (findProduct.price * findProduct.count))
        return prev.map(p => p.id === findProduct.id ? {...p, count: p.count + 1} : p)
      } else {
        
        setOrderSum(orderSum + product.price)
        return [...prev, {...product, count: 1}]
      }
    })
    setCountProducts(cartItems.length + 1)
  }

  const deleteCartItem = (product: Product) => {
    setCartItems((prev) => {
      const findProduct = cartItems.find(p => p.id === product.id)
      if (findProduct) {
        if (findProduct.count > 1) {
          
          return prev.map(p => p.id === findProduct.id ? {...p, count: p.count - 1} : p)
        } else {
        
          return prev.filter(p => p.id !== product.id)
        }
      } else {
        return prev
      }
    })
    setCountProducts(cartItems.length - 1)
    setOrderSum(orderSum - product.price)
  }

  return (
    <CartContext.Provider value={{isOpen, cartItems, setIsOpen, addCartItem, deleteCartItem, orderSum, countProducts}}>
      {children}
    </CartContext.Provider>  
  )
}